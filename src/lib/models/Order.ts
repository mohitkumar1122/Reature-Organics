import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  title: string;
  quantity: number;
  price: number; // captured at checkout
  image: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: "razorpay" | "cod";
  paymentStatus: "pending" | "paid" | "failed";
  paymentDetails?: {
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
  };
  deliveryStatus: "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  couponApplied?: string;
  discountAmount: number;
  taxAmount: number;
  shippingCharge: number;
  invoiceNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    items: [OrderItemSchema],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: "India" },
    },
    paymentMethod: { type: String, enum: ["razorpay", "cod"], required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    paymentDetails: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
    },
    deliveryStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    totalAmount: { type: Number, required: true },
    couponApplied: String,
    discountAmount: { type: Number, default: 0 },
    taxAmount: { type: Number, required: true },
    shippingCharge: { type: Number, required: true },
    invoiceNumber: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
