"use server";

import { dbConnect } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Category } from "@/lib/models/Category";
import { Review } from "@/lib/models/Review";
import { Order } from "@/lib/models/Order";
import { getCurrentUserAction } from "./authActions";
import mongoose from "mongoose";

export async function getCategoriesAction() {
  await dbConnect();
  const categories = await Category.find({}).sort({ name: 1 });
  return JSON.parse(JSON.stringify(categories));
}

export async function getProductsAction(filters: {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  healthCondition?: string;
  sort?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  await dbConnect();

  const {
    category,
    brand,
    minPrice = 0,
    maxPrice = 100000,
    rating,
    inStock,
    healthCondition,
    sort = "newest",
    search,
    page = 1,
    limit = 12,
  } = filters;

  const query: any = {};

  // Text Search
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
    ];
  }

  // Category Filter
  if (category) {
    const cat = await Category.findOne({ slug: category });
    if (cat) {
      query.category = cat._id;
    }
  }

  // Brand Filter
  if (brand) {
    query.brand = { $regex: new RegExp("^" + brand + "$", "i") };
  }

  // Price range
  query.price = { $gte: minPrice, $lte: maxPrice };

  // Rating Filter
  if (rating) {
    query.rating = { $gte: rating };
  }

  // Stock Availability
  if (inStock) {
    query.stock = { $gt: 0 };
  }

  // Health Condition Filter
  if (healthCondition) {
    query.healthConditions = healthCondition;
  }

  // Sort criteria
  let sortOptions: any = {};
  if (sort === "price_low_high") {
    sortOptions.price = 1;
  } else if (sort === "price_high_low") {
    sortOptions.price = -1;
  } else if (sort === "highest_rated") {
    sortOptions.rating = -1;
  } else if (sort === "best_selling" || sort === "most_popular") {
    sortOptions.reviewsCount = -1;
  } else {
    // Default newest
    sortOptions.createdAt = -1;
  }

  const skip = (page - 1) * limit;

  const productsPromise = Product.find(query)
    .populate("category")
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const countPromise = Product.countDocuments(query);

  const [products, totalCount] = await Promise.all([productsPromise, countPromise]);

  return {
    products: JSON.parse(JSON.stringify(products)),
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    totalCount,
  };
}

export async function getProductBySlugAction(slug: string) {
  await dbConnect();

  const product = await Product.findOne({ slug }).populate("category");
  if (!product) return null;

  // Fetch reviews
  const reviews = await Review.find({ product: product._id }).sort({ createdAt: -1 });

  // Fetch related products (same category, excluding current product)
  const relatedProducts = await Product.find({
    category: product.category._id,
    _id: { $ne: product._id },
  })
    .limit(4)
    .populate("category");

  return {
    product: JSON.parse(JSON.stringify(product)),
    reviews: JSON.parse(JSON.stringify(reviews)),
    relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
  };
}

export async function createReviewAction(
  productId: string,
  reviewData: { rating: number; comment: string; images?: string[] }
) {
  await dbConnect();
  const currentUser = await getCurrentUserAction();
  if (!currentUser) {
    return { success: false, message: "You must be logged in to post a review." };
  }

  // Check if user bought this product to award "Verified Purchase"
  const completedOrder = await Order.findOne({
    user: currentUser._id,
    deliveryStatus: "delivered",
    "items.product": new mongoose.Types.ObjectId(productId),
  });

  const isVerifiedPurchase = !!completedOrder;

  const newReview = new Review({
    product: productId,
    user: currentUser._id,
    userName: currentUser.name,
    rating: reviewData.rating,
    comment: reviewData.comment,
    images: reviewData.images || [],
    isVerifiedPurchase,
    helpfulVotes: 0,
  });

  await newReview.save();

  return { success: true, message: "Review submitted successfully." };
}

export async function voteReviewHelpfulAction(reviewId: string) {
  await dbConnect();
  const review = await Review.findByIdAndUpdate(reviewId, { $inc: { helpfulVotes: 1 } }, { new: true });
  if (!review) return { success: false, message: "Review not found" };
  return { success: true, helpfulVotes: review.helpfulVotes };
}

export async function submitNewsletterAction(email: string) {
  // Simulating subscriber logging (could write to a Subscriber model or marketing tool)
  console.log(`Newsletter Subscriber registered: ${email}`);
  return { success: true, message: "Thank you for subscribing to our wellness newsletter!" };
}
