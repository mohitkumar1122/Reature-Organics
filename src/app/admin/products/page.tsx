import React from "react";
import { dbConnect } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Category } from "@/lib/models/Category";
import ProductsAdminClient from "@/components/admin/ProductsAdminClient";

export const metadata = {
  title: "Admin Product Management - Reature Organic",
  description: "Create, update, or remove Ayurvedic remedies from the store catalog.",
};

export default async function AdminProductsPage() {
  await dbConnect();

  // Load all products with populated categories
  const productsData = await Product.find({})
    .populate("category")
    .sort({ createdAt: -1 });

  // Load categories
  const categoriesData = await Category.find({}).sort({ name: 1 });

  const products = JSON.parse(JSON.stringify(productsData));
  const categories = JSON.parse(JSON.stringify(categoriesData));

  return <ProductsAdminClient products={products} categories={categories} />;
}
