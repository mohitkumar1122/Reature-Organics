"use server";

import { dbConnect } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { User, IAddress } from "@/lib/models/User";
import { Product } from "@/lib/models/Product";
import { Coupon } from "@/lib/models/Coupon";
import { getCurrentUserAction } from "./authActions";
import { clearCartAction } from "./cartActions";
import Razorpay from "razorpay";
import crypto from "crypto";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";

let razorpay: any = null;
try {
  razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
} catch (e) {
  console.warn("Razorpay initialization warning (usually during serverless prep or missing keys):", e);
}

// -----------------------------------------------------------------------------
// Coupon Actions
// -----------------------------------------------------------------------------
export async function validateCouponAction(code: string, cartSubtotal: number) {
  await dbConnect();

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
    expiryDate: { $gt: new Date() },
  });

  if (!coupon) {
    return { success: false, message: "Invalid or expired coupon code." };
  }

  if (cartSubtotal < coupon.minOrderValue) {
    return {
      success: false,
      message: `Minimum order subtotal to use this coupon is ₹${coupon.minOrderValue}`,
    };
  }

  let discount = 0;
  if (coupon.discountType === "percentage") {
    discount = (cartSubtotal * coupon.value) / 100;
    if (coupon.maxDiscount) {
      discount = Math.min(discount, coupon.maxDiscount);
    }
  } else {
    discount = coupon.value;
  }

  discount = Math.min(discount, cartSubtotal);

  return {
    success: true,
    couponCode: coupon.code,
    discount,
  };
}

// -----------------------------------------------------------------------------
// Address Actions
// -----------------------------------------------------------------------------
export async function addAddressAction(addressData: Omit<IAddress, "isDefault">) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return { success: false, message: "Not logged in" };

  const user = await User.findById(currentUser._id);
  if (!user) return { success: false, message: "User not found" };

  const isFirst = user.addresses.length === 0;

  user.addresses.push({
    ...addressData,
    isDefault: isFirst,
  });

  await user.save();
  return { success: true, message: "Address added successfully" };
}

export async function deleteAddressAction(addressId: string) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return { success: false, message: "Not logged in" };

  const user = await User.findById(currentUser._id);
  if (!user) return { success: false, message: "User not found" };

  user.addresses = user.addresses.filter((addr: any) => addr._id.toString() !== addressId);
  
  // Reset default if necessary
  if (user.addresses.length > 0 && !user.addresses.some((addr: any) => addr.isDefault)) {
    user.addresses[0].isDefault = true;
  }

  await user.save();
  return { success: true, message: "Address deleted successfully" };
}

export async function setDefaultAddressAction(addressId: string) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return { success: false, message: "Not logged in" };

  const user = await User.findById(currentUser._id);
  if (!user) return { success: false, message: "User not found" };

  user.addresses.forEach((addr: any) => {
    addr.isDefault = addr._id.toString() === addressId;
  });

  await user.save();
  return { success: true, message: "Default address updated" };
}

// -----------------------------------------------------------------------------
// Order Actions
// -----------------------------------------------------------------------------
interface OrderInput {
  items: {
    product: string;
    title: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  couponCode?: string;
  paymentMethod: "cod" | "razorpay";
}

async function calculateTotals(items: any[], couponCode?: string) {
  let subtotal = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.quantity) {
      throw new Error(`Product ${item.title} is out of stock or does not exist.`);
    }
    const currentPrice = product.price * (1 - product.discountPercentage / 100);
    subtotal += currentPrice * item.quantity;
  }

  let discount = 0;
  if (couponCode) {
    const couponValidation = await validateCouponAction(couponCode, subtotal);
    if (couponValidation.success && couponValidation.discount) {
      discount = couponValidation.discount;
    }
  }

  const taxableAmount = subtotal - discount;
  const taxAmount = parseFloat((taxableAmount * 0.05).toFixed(2)); // 5% Ayurvedic Product Tax
  const shippingCharge = taxableAmount > 500 ? 0 : 50; // Free shipping above Rs 500
  const totalAmount = parseFloat((taxableAmount + taxAmount + shippingCharge).toFixed(2));

  return {
    subtotal,
    discount,
    taxAmount,
    shippingCharge,
    totalAmount,
  };
}

export async function createCodOrderAction(orderInput: OrderInput) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return { success: false, message: "Not logged in" };

  try {
    const { subtotal, discount, taxAmount, shippingCharge, totalAmount } =
      await calculateTotals(orderInput.items, orderInput.couponCode);

    // Generate unique invoice number
    const invoiceNumber = `INV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = new Order({
      user: currentUser._id,
      items: orderInput.items,
      shippingAddress: orderInput.shippingAddress,
      paymentMethod: "cod",
      paymentStatus: "pending",
      deliveryStatus: "processing",
      totalAmount,
      couponApplied: orderInput.couponCode,
      discountAmount: discount,
      taxAmount,
      shippingCharge,
      invoiceNumber,
    });

    await newOrder.save();

    // Deduct stock
    for (const item of orderInput.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear cart
    await clearCartAction();

    return { success: true, orderId: newOrder._id.toString(), invoiceNumber };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to place COD order." };
  }
}

export async function createRazorpayOrderAction(orderInput: OrderInput) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return { success: false, message: "Not logged in" };

  if (!razorpay) {
    return { success: false, message: "Razorpay payment integration is not configured." };
  }

  try {
    const { totalAmount } = await calculateTotals(orderInput.items, orderInput.couponCode);

    const options = {
      amount: Math.round(totalAmount * 100), // in paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    return {
      success: true,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to initiate Razorpay transaction." };
  }
}

export async function verifyRazorpayPaymentAction(
  orderInput: OrderInput,
  razorpayResponse: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return { success: false, message: "Not logged in" };

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = razorpayResponse;

  const generatedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return { success: false, message: "Payment verification failed. Signature mismatch." };
  }

  try {
    const { subtotal, discount, taxAmount, shippingCharge, totalAmount } =
      await calculateTotals(orderInput.items, orderInput.couponCode);

    const invoiceNumber = `INV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = new Order({
      user: currentUser._id,
      items: orderInput.items,
      shippingAddress: orderInput.shippingAddress,
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      paymentDetails: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      deliveryStatus: "processing",
      totalAmount,
      couponApplied: orderInput.couponCode,
      discountAmount: discount,
      taxAmount,
      shippingCharge,
      invoiceNumber,
    });

    await newOrder.save();

    // Deduct stock
    for (const item of orderInput.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear cart
    await clearCartAction();

    return { success: true, orderId: newOrder._id.toString(), invoiceNumber };
  } catch (error: any) {
    return { success: false, message: error.message || "Payment verified but order creation failed." };
  }
}

export async function getOrdersAction() {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return [];

  const orders = await Order.find({ user: currentUser._id }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(orders));
}

export async function getOrderDetailsAction(orderId: string) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return null;

  const order = await Order.findOne({ _id: orderId, user: currentUser._id });
  if (!order) return null;

  return JSON.parse(JSON.stringify(order));
}
