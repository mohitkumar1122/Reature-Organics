"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { ShimmerProductCard } from "@/components/Shimmer";
import { SlidersHorizontal, Search, Star, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface ShopClientProps {
  categories: Category[];
  brands: string[];
  healthConditions: string[];
  initialProducts: any[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export default function ShopClient({
  categories,
  brands,
  healthConditions,
  initialProducts,
  totalPages,
  currentPage,
  totalCount,
}: ShopClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Active filters from URL
  const selectedCategory = searchParams.get("category") || "";
  const selectedBrand = searchParams.get("brand") || "";
  const selectedCondition = searchParams.get("healthCondition") || "";
  const selectedSort = searchParams.get("sort") || "newest";
  const searchVal = searchParams.get("search") || "";
  const inStockVal = searchParams.get("inStock") === "true";
  const minPriceVal = searchParams.get("minPrice") || "0";
  const maxPriceVal = searchParams.get("maxPrice") || "1000";
  const ratingVal = searchParams.get("rating") || "";

  // Client states
  const [searchInput, setSearchInput] = useState(searchVal);
  const [minPrice, setMinPrice] = useState(minPriceVal);
  const [maxPrice, setMaxPrice] = useState(maxPriceVal);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);

  // Sync search input on url change
  useEffect(() => {
    setSearchInput(searchVal);
  }, [searchVal]);

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Reset page on filter change
    params.set("page", "1");

    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === "") {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });

    startTransition(() => {
      router.push(`/shop?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchInput });
  };

  const handlePriceApply = () => {
    updateFilters({ minPrice, maxPrice });
  };

  const clearAllFilters = () => {
    setSearchInput("");
    setMinPrice("0");
    setMaxPrice("1000");
    startTransition(() => {
      router.push("/shop");
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Search Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-serif font-bold text-darkText">Herbal Dispensary</h1>
          <p className="text-xs text-gray-500 mt-1">Showing {totalCount} authentic Ayurvedic remedies</p>
        </div>

        {/* Real-time search */}
        <form onSubmit={handleSearchSubmit} className="flex relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search active ingredients, brands..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary"
          />
          <button type="submit" className="absolute right-3 top-3 text-gray-400 hover:text-primary">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Main content grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar (Left Column) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <span className="font-serif font-bold text-base text-darkText flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-primary" /> Filters
              </span>
              <button onClick={clearAllFilters} className="text-[11px] font-bold text-primary hover:underline">
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Categories</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => updateFilters({ category: selectedCategory === cat.slug ? "" : cat.slug })}
                    className={`flex items-center justify-between w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                      selectedCategory === cat.slug
                        ? "bg-primary-light text-primary font-bold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Health Conditions */}
            <div className="space-y-2.5 pt-4 border-t border-gray-50">
              <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Health Conditions</h4>
              <div className="space-y-1.5">
                {healthConditions.map((cond) => (
                  <button
                    key={cond}
                    onClick={() => updateFilters({ healthCondition: selectedCondition === cond ? "" : cond })}
                    className={`flex items-center w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                      selectedCondition === cond
                        ? "bg-primary-light text-primary font-bold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    🌱 {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3 pt-4 border-t border-gray-50">
              <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Price Range</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 p-2 border border-gray-200 rounded-lg text-xs"
                />
                <span className="text-gray-400 text-xs">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 p-2 border border-gray-200 rounded-lg text-xs"
                />
              </div>
              <button
                onClick={handlePriceApply}
                className="w-full py-2 bg-primary-light hover:bg-primary text-primary hover:text-white rounded-lg text-xs font-bold transition-all"
              >
                Apply Range
              </button>
            </div>

            {/* Brand Checkbox */}
            <div className="space-y-2.5 pt-4 border-t border-gray-50">
              <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Brands</h4>
              <div className="space-y-1.5">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => updateFilters({ brand: selectedBrand === b ? "" : b })}
                    className={`flex items-center w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                      selectedBrand === b
                        ? "bg-primary-light text-primary font-bold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    🏷️ {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div className="space-y-2.5 pt-4 border-t border-gray-50">
              <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Availability</h4>
              <button
                onClick={() => updateFilters({ inStock: inStockVal ? "" : "true" })}
                className={`flex items-center w-full text-left text-xs py-2 px-2.5 rounded-lg border transition-all ${
                  inStockVal
                    ? "border-primary bg-primary-light text-primary font-bold"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {inStockVal ? "✓ In Stock Only" : "Show In Stock Only"}
              </button>
            </div>

          </div>
        </aside>

        {/* Right Column (Controls & Catalog Grid) */}
        <div className="flex-1 space-y-6">
          
          {/* Controls bar */}
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm text-sm">
            
            {/* Mobile filters toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-1.5 font-bold text-xs text-primary bg-primary-light px-3.5 py-2 rounded-full"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
            </button>

            <div className="hidden sm:block text-xs font-semibold text-gray-400">
              Found {totalCount} products
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-semibold uppercase">Sort By</span>
              <select
                value={selectedSort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="bg-transparent text-xs font-bold text-darkText focus:outline-none border-b border-gray-200 pb-0.5"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
                <option value="highest_rated">Highest Rated</option>
                <option value="best_selling">Best Selling</option>
              </select>
            </div>
          </div>

          {/* Catalog grid */}
          {isPending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ShimmerProductCard key={i} />
              ))}
            </div>
          ) : initialProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center space-y-4 shadow-sm">
              <span className="text-4xl">🍃</span>
              <h3 className="text-lg font-bold text-darkText font-serif">No Remedies Found</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                No products match your active search filter values. Try clearing your filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center px-6 py-2.5 rounded-full text-xs font-bold bg-primary text-white hover:bg-primary-dark transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2.5 pt-8">
              <button
                disabled={currentPage <= 1 || isPending}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("page", (currentPage - 1).toString());
                  startTransition(() => {
                    router.push(`/shop?${params.toString()}`);
                  });
                }}
                className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    disabled={isPending}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set("page", pageNum.toString());
                      startTransition(() => {
                        router.push(`/shop?${params.toString()}`);
                      });
                    }}
                    className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all ${
                      currentPage === pageNum
                        ? "border-primary bg-primary text-white shadow-sm shadow-primary/20"
                        : "border-gray-200 bg-white hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage >= totalPages || isPending}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("page", (currentPage + 1).toString());
                  startTransition(() => {
                    router.push(`/shop?${params.toString()}`);
                  });
                }}
                className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Mobile Filters Drawer Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-80 bg-white h-full p-6 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <span className="font-serif font-bold text-base text-darkText flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-primary" /> Filters
                </span>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-darkText"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Duplicate category filters for mobile */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Categories</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => {
                        updateFilters({ category: selectedCategory === cat.slug ? "" : cat.slug });
                        setShowMobileFilters(false);
                      }}
                      className={`block w-full text-left text-xs py-2 px-3 rounded-lg transition-colors ${
                        selectedCategory === cat.slug
                          ? "bg-primary-light text-primary font-bold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duplicate health conditions for mobile */}
              <div className="space-y-2.5 pt-4 border-t border-gray-50">
                <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Health Conditions</h4>
                <div className="space-y-1">
                  {healthConditions.map((cond) => (
                    <button
                      key={cond}
                      onClick={() => {
                        updateFilters({ healthCondition: selectedCondition === cond ? "" : cond });
                        setShowMobileFilters(false);
                      }}
                      className={`block w-full text-left text-xs py-2 px-3 rounded-lg transition-colors ${
                        selectedCondition === cond
                          ? "bg-primary-light text-primary font-bold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      🌱 {cond}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={() => {
                  clearAllFilters();
                  setShowMobileFilters(false);
                }}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-darkText rounded-xl text-xs font-bold transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
