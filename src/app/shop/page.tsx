import React from "react";
import { dbConnect } from "@/lib/db";
import { getCategoriesAction, getProductsAction } from "@/app/actions/productActions";
import { Product } from "@/lib/models/Product";
import ShopClient from "@/components/shop/ShopClient";

interface SearchParams {
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  inStock?: string;
  healthCondition?: string;
  sort?: string;
  search?: string;
  page?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export const metadata = {
  title: "Herbal Shop",
  description: "Browse organic Ayurvedic medicines, natural supplements, health boosters, skin care, and wellness devices with advanced filtering.",
};

export default async function ShopPage({ searchParams }: PageProps) {
  await dbConnect();
  
  // Await searchParams in Next.js 15
  const params = await searchParams;

  const page = parseInt(params.page || "1", 10);
  const minPrice = parseFloat(params.minPrice || "0");
  const maxPrice = parseFloat(params.maxPrice || "100000");
  const rating = params.rating ? parseFloat(params.rating) : undefined;
  const inStock = params.inStock === "true";

  // Execute query action
  const { products, totalPages, currentPage, totalCount } = await getProductsAction({
    category: params.category,
    brand: params.brand,
    minPrice,
    maxPrice,
    rating,
    inStock,
    healthCondition: params.healthCondition,
    sort: params.sort,
    search: params.search,
    page,
    limit: 9, // 9 items per page for catalog grids
  });

  // Load distinct filters from database
  const categories = await getCategoriesAction();
  const brands = await Product.distinct("brand");
  
  const healthConditions = ["Diabetes", "Immunity", "Hair Fall", "Skin Care", "Weight Management"];

  return (
    <ShopClient
      categories={categories}
      brands={brands}
      healthConditions={healthConditions}
      initialProducts={products}
      totalPages={totalPages}
      currentPage={currentPage}
      totalCount={totalCount}
    />
  );
}
