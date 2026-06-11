"use server";

import { dbConnect } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Product } from "@/lib/models/Product";
import { getCurrentUserAction } from "./authActions";
import { revalidatePath } from "next/cache";

export async function getWishlistAction() {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return [];

  const user = await User.findById(currentUser._id).populate({
    path: "wishlist",
    model: Product,
    populate: { path: "category" }
  });

  if (!user || !user.wishlist) return [];
  
  // Filter out any deleted products
  const validWishlist = user.wishlist.filter((item: any) => item !== null);
  
  return JSON.parse(JSON.stringify(validWishlist));
}

export async function toggleWishlistAction(productId: string) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) return { success: false, message: "Not logged in" };

  const user = await User.findById(currentUser._id);
  if (!user) return { success: false, message: "User not found" };

  const index = user.wishlist.findIndex((id: any) => id.toString() === productId);
  let isAdded = false;

  if (index > -1) {
    user.wishlist.splice(index, 1);
  } else {
    user.wishlist.push(productId);
    isAdded = true;
  }

  await user.save();
  revalidatePath("/dashboard/wishlist");
  return { success: true, isWishlisted: isAdded };
}
