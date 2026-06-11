"use server";

import { dbConnect } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Product } from "@/lib/models/Product";
import { getCurrentUserAction } from "./authActions";

export async function getCartAction() {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return [];

  const user = await User.findById(currentUser._id)
    .populate({
      path: "cart.product",
      model: Product,
      populate: { path: "category" }
    });

  if (!user || !user.cart) return [];

  // Filter out any cart items where the product no longer exists
  const validCart = user.cart.filter((item: any) => item.product !== null);
  
  return JSON.parse(JSON.stringify(validCart));
}

export async function addToCartAction(productId: string, quantity: number = 1) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) {
    return { success: false, message: "Not logged in" };
  }

  const user = await User.findById(currentUser._id);
  if (!user) return { success: false, message: "User not found" };

  const existingItemIndex = user.cart.findIndex(
    (item: any) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    user.cart[existingItemIndex].quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }

  await user.save();
  return { success: true, message: "Added to cart" };
}

export async function updateCartItemAction(productId: string, quantity: number) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return { success: false, message: "Not logged in" };

  const user = await User.findById(currentUser._id);
  if (!user) return { success: false, message: "User not found" };

  const itemIndex = user.cart.findIndex(
    (item: any) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    if (quantity <= 0) {
      // Remove item
      user.cart.splice(itemIndex, 1);
    } else {
      user.cart[itemIndex].quantity = quantity;
    }
    await user.save();
    return { success: true };
  }

  return { success: false, message: "Item not found in cart" };
}

export async function syncCartAction(items: { product: string; quantity: number }[]) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return { success: false };

  const user = await User.findById(currentUser._id);
  if (!user) return { success: false };

  // Clear current cart and replace
  user.cart = items.map(item => ({ product: item.product, quantity: item.quantity }));
  await user.save();

  return { success: true };
}

export async function clearCartAction() {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return { success: false };

  const user = await User.findById(currentUser._id);
  if (!user) return { success: false };

  user.cart = [];
  await user.save();

  return { success: true };
}
