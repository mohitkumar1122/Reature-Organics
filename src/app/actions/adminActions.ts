"use server";

import { dbConnect } from "@/lib/db";
import { getCurrentUserAction } from "./authActions";
import { Product } from "@/lib/models/Product";
import { Category } from "@/lib/models/Category";
import { Order } from "@/lib/models/Order";
import { User } from "@/lib/models/User";
import { Coupon } from "@/lib/models/Coupon";
import { Banner } from "@/lib/models/Banner";
import { Blog } from "@/lib/models/Blog";
import { Resource } from "@/lib/models/Resource";
import { Review } from "@/lib/models/Review";
import { revalidatePath } from "next/cache";

// Helper to check admin authorization
async function verifyAdmin() {
  const currentUser = await getCurrentUserAction();
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Access denied. Admin role required.");
  }
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}

// -----------------------------------------------------------------------------
// Dashboard Metrics
// -----------------------------------------------------------------------------
export async function getAdminMetricsAction() {
  await verifyAdmin();
  await dbConnect();

  const totalUsers = await User.countDocuments({ role: "customer" });
  const totalOrders = await Order.countDocuments({});
  
  // Total Revenue (excluding cancelled orders)
  const revenueAgg = await Order.aggregate([
    { $match: { deliveryStatus: { $ne: "cancelled" } } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);
  const totalRevenue = revenueAgg[0]?.total || 0;

  // Monthly Sales Aggregation
  const monthlySales = await Order.aggregate([
    { $match: { deliveryStatus: { $ne: "cancelled" } } },
    {
      $group: {
        _id: { $month: "$createdAt" },
        sales: { $sum: "$totalAmount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const salesChartData = monthNames.map((name, index) => {
    const matched = monthlySales.find((m) => m._id === index + 1);
    return {
      name,
      sales: matched ? Math.round(matched.sales) : 0,
      orders: matched ? matched.count : 0,
    };
  });

  // Latest Orders
  const latestOrders = await Order.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "name email");

  // Out of Stock Products count
  const lowStockCount = await Product.countDocuments({ stock: { $lte: 3 } });

  return {
    totalUsers,
    totalOrders,
    totalRevenue: Math.round(totalRevenue),
    salesChartData,
    latestOrders: JSON.parse(JSON.stringify(latestOrders)),
    lowStockCount,
  };
}

// -----------------------------------------------------------------------------
// Product Management CRUD
// -----------------------------------------------------------------------------
export async function adminCreateProductAction(productData: {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  category: string;
  brand: string;
  sku: string;
  ingredients: string[];
  benefits: string[];
  usageInstructions: string;
  precautions?: string;
  healthConditions: string[];
  images: string[];
  specifications?: Record<string, string>;
}) {
  await verifyAdmin();
  await dbConnect();

  const slug = `${slugify(productData.title)}-${Date.now().toString().slice(-4)}`;

  const newProduct = new Product({
    ...productData,
    slug,
  });

  await newProduct.save();
  revalidatePath("/shop");
  revalidatePath(`/product/${slug}`);
  return { success: true, message: "Product created successfully." };
}

export async function adminUpdateProductAction(
  productId: string,
  productData: Partial<typeof Product>
) {
  await verifyAdmin();
  await dbConnect();

  await Product.findByIdAndUpdate(productId, productData);
  revalidatePath("/shop");
  return { success: true, message: "Product updated successfully." };
}

export async function adminDeleteProductAction(productId: string) {
  await verifyAdmin();
  await dbConnect();

  await Product.findByIdAndDelete(productId);
  revalidatePath("/shop");
  return { success: true, message: "Product deleted successfully." };
}

// -----------------------------------------------------------------------------
// Category Management CRUD
// -----------------------------------------------------------------------------
export async function adminGetCategoriesAction() {
  await verifyAdmin();
  await dbConnect();
  const categories = await Category.find({}).sort({ name: 1 });
  return JSON.parse(JSON.stringify(categories));
}

export async function adminCreateCategoryAction(categoryData: {
  name: string;
  description?: string;
  image?: string;
  icon?: string;
}) {
  await verifyAdmin();
  await dbConnect();

  const slug = slugify(categoryData.name);

  const newCategory = new Category({
    ...categoryData,
    slug,
  });

  await newCategory.save();
  revalidatePath("/shop");
  return { success: true, message: "Category created successfully." };
}

export async function adminDeleteCategoryAction(categoryId: string) {
  await verifyAdmin();
  await dbConnect();

  await Category.findByIdAndDelete(categoryId);
  revalidatePath("/shop");
  return { success: true, message: "Category deleted successfully." };
}

// -----------------------------------------------------------------------------
// Order Status Management
// -----------------------------------------------------------------------------
export async function adminGetOrdersAction() {
  await verifyAdmin();
  await dbConnect();

  const orders = await Order.find({}).sort({ createdAt: -1 }).populate("user", "name email");
  return JSON.parse(JSON.stringify(orders));
}

export async function adminUpdateOrderStatusAction(orderId: string, status: string) {
  await verifyAdmin();
  await dbConnect();

  const order = await Order.findById(orderId);
  if (!order) return { success: false, message: "Order not found." };

  order.deliveryStatus = status;
  
  if (status === "delivered" && order.paymentMethod === "cod") {
    order.paymentStatus = "paid";
  }

  await order.save();
  return { success: true, message: "Order status updated successfully." };
}

// -----------------------------------------------------------------------------
// Coupon Management CRUD
// -----------------------------------------------------------------------------
export async function adminGetCouponsAction() {
  await verifyAdmin();
  await dbConnect();
  const coupons = await Coupon.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(coupons));
}

export async function adminCreateCouponAction(couponData: {
  code: string;
  discountType: "percentage" | "flat";
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
}) {
  await verifyAdmin();
  await dbConnect();

  const newCoupon = new Coupon({
    ...couponData,
    code: couponData.code.toUpperCase(),
    expiryDate: new Date(couponData.expiryDate),
  });

  await newCoupon.save();
  return { success: true, message: "Coupon created successfully." };
}

export async function adminDeleteCouponAction(couponId: string) {
  await verifyAdmin();
  await dbConnect();

  await Coupon.findByIdAndDelete(couponId);
  return { success: true, message: "Coupon deleted successfully." };
}

// -----------------------------------------------------------------------------
// Banner Management CRUD
// -----------------------------------------------------------------------------
export async function adminGetBannersAction() {
  await verifyAdmin();
  await dbConnect();
  const banners = await Banner.find({}).sort({ order: 1 });
  return JSON.parse(JSON.stringify(banners));
}

export async function adminCreateBannerAction(bannerData: {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl: string;
  position: "hero" | "promotional";
  order: number;
}) {
  await verifyAdmin();
  await dbConnect();

  const newBanner = new Banner(bannerData);
  await newBanner.save();
  revalidatePath("/");
  return { success: true, message: "Banner created successfully." };
}

export async function adminDeleteBannerAction(bannerId: string) {
  await verifyAdmin();
  await dbConnect();

  await Banner.findByIdAndDelete(bannerId);
  revalidatePath("/");
  return { success: true, message: "Banner deleted successfully." };
}

// -----------------------------------------------------------------------------
// Customer Management
// -----------------------------------------------------------------------------
export async function adminGetUsersAction() {
  await verifyAdmin();
  await dbConnect();

  const users = await User.find({}).sort({ createdAt: -1 }).select("-passwordHash");
  return JSON.parse(JSON.stringify(users));
}

export async function adminToggleUserRoleAction(userId: string) {
  await verifyAdmin();
  await dbConnect();

  const user = await User.findById(userId);
  if (!user) return { success: false, message: "User not found." };

  user.role = user.role === "admin" ? "customer" : "admin";
  await user.save();
  return { success: true, message: `Role updated to ${user.role}.` };
}

// -----------------------------------------------------------------------------
// Review Moderation CRUD
// -----------------------------------------------------------------------------
export async function adminGetReviewsAction() {
  await verifyAdmin();
  await dbConnect();

  const reviews = await Review.find({}).sort({ createdAt: -1 }).populate("product", "title slug");
  return JSON.parse(JSON.stringify(reviews));
}

export async function adminDeleteReviewAction(reviewId: string) {
  await verifyAdmin();
  await dbConnect();

  const review = await Review.findByIdAndDelete(reviewId);
  if (review) {
    // Re-verify averages
    const ReviewModel = Review as any;
    await ReviewModel.calculateAverageRating(review.product);
  }

  return { success: true, message: "Review removed successfully." };
}

// -----------------------------------------------------------------------------
// Blog Management CRUD
// -----------------------------------------------------------------------------
export async function adminGetBlogsAction() {
  await verifyAdmin();
  await dbConnect();
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(blogs));
}

export async function adminCreateBlogAction(blogData: {
  title: string;
  content: string;
  image: string;
  author: string;
  category: "Ayurveda" | "Nutrition" | "Wellness" | "Fitness" | "Herbal Remedies";
  tags: string[];
  seoKeywords: string[];
  readTime: number;
}) {
  await verifyAdmin();
  await dbConnect();

  const slug = slugify(blogData.title);

  const newBlog = new Blog({
    ...blogData,
    slug,
  });

  await newBlog.save();
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return { success: true, message: "Blog article published." };
}

export async function adminDeleteBlogAction(blogId: string) {
  await verifyAdmin();
  await dbConnect();

  await Blog.findByIdAndDelete(blogId);
  revalidatePath("/blog");
  return { success: true, message: "Blog article deleted." };
}

// -----------------------------------------------------------------------------
// Resource Center CRUD
// -----------------------------------------------------------------------------
export async function adminGetResourcesAction() {
  await verifyAdmin();
  await dbConnect();
  const resources = await Resource.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(resources));
}

export async function adminCreateResourceAction(resourceData: {
  title: string;
  description: string;
  fileUrl?: string;
  videoUrl?: string;
  category: "Brochure" | "Catalog" | "User Guide" | "Tutorial";
  type: "pdf" | "video";
}) {
  await verifyAdmin();
  await dbConnect();

  const newResource = new Resource(resourceData);
  await newResource.save();
  revalidatePath("/resources");
  return { success: true, message: "Resource added successfully." };
}

export async function adminDeleteResourceAction(resourceId: string) {
  await verifyAdmin();
  await dbConnect();

  await Resource.findByIdAndDelete(resourceId);
  revalidatePath("/resources");
  return { success: true, message: "Resource deleted successfully." };
}
