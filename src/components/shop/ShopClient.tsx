"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { ShimmerProductCard } from "@/components/Shimmer";
import {
  SlidersHorizontal,
  Search,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Grid3x3,
  LayoutGrid,
  Tag,
  Sparkles,
  Filter,
  TrendingUp,
  Package,
  Check,
  Leaf,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const maxPriceVal = searchParams.get("maxPrice") || "5000";
  const ratingVal = searchParams.get("rating") || "";

  // Client states
  const [searchInput, setSearchInput] = useState(searchVal);
  const [minPrice, setMinPrice] = useState(minPriceVal);
  const [maxPrice, setMaxPrice] = useState(maxPriceVal);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [gridLayout, setGridLayout] = useState<"grid" | "list">("grid");

  useEffect(() => {
    setSearchInput(searchVal);
  }, [searchVal]);

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
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
    setMaxPrice("5000");
    startTransition(() => {
      router.push("/shop");
    });
  };

  // Count active filters
  const activeFiltersCount = [
    selectedCategory,
    selectedBrand,
    selectedCondition,
    searchVal,
    inStockVal ? "true" : "",
    ratingVal,
    minPriceVal !== "0" ? minPriceVal : "",
    maxPriceVal !== "5000" ? maxPriceVal : "",
  ].filter(Boolean).length;

  // Get active filter chips
  const activeChips = [
    selectedCategory && {
      label: categories.find((c) => c.slug === selectedCategory)?.name,
      key: "category",
    },
    selectedBrand && { label: selectedBrand, key: "brand" },
    selectedCondition && { label: selectedCondition, key: "healthCondition" },
    searchVal && { label: `"${searchVal}"`, key: "search" },
    inStockVal && { label: "In Stock", key: "inStock" },
    ratingVal && { label: `${ratingVal}★ & above`, key: "rating" },
  ].filter(Boolean) as { label: string; key: string }[];

  // Filter Component (Reusable for Desktop & Mobile)
  const FiltersContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs uppercase text-darkText tracking-wider flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-primary" />
          Categories
        </h4>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => {
                updateFilters({ category: selectedCategory === cat.slug ? "" : cat.slug });
                if (isMobile) setShowMobileFilters(false);
              }}
              className={`flex items-center justify-between w-full text-left text-xs py-2 px-3 rounded-xl transition-all ${
                selectedCategory === cat.slug
                  ? "bg-gradient-to-r from-primary to-primary-dark text-white font-bold shadow-sm"
                  : "text-gray-600 hover:bg-primary-light hover:text-primary"
              }`}
            >
              <span>{cat.name}</span>
              {selectedCategory === cat.slug && <Check className="w-3 h-3" strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>

      {/* Health Conditions */}
      <div className="space-y-3 pt-5 border-t border-gray-100">
        <h4 className="font-bold text-xs uppercase text-darkText tracking-wider flex items-center gap-1.5">
          <Leaf className="w-3 h-3 text-primary" />
          Health Conditions
        </h4>
        <div className="flex flex-wrap gap-2">
          {healthConditions.map((cond) => (
            <button
              key={cond}
              onClick={() => {
                updateFilters({ healthCondition: selectedCondition === cond ? "" : cond });
                if (isMobile) setShowMobileFilters(false);
              }}
              className={`text-[11px] py-1.5 px-3 rounded-full border transition-all font-medium ${
                selectedCondition === cond
                  ? "bg-primary border-primary text-white shadow-sm"
                  : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary bg-white"
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-5 border-t border-gray-100">
        <h4 className="font-bold text-xs uppercase text-darkText tracking-wider flex items-center gap-1.5">
          <TrendingUp className="w-3 h-3 text-primary" />
          Price Range
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-semibold">
              ₹
            </span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-semibold">
              ₹
            </span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Quick price buttons */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: "Under ₹500", min: "0", max: "500" },
            { label: "₹500-₹1k", min: "500", max: "1000" },
            { label: "₹1k-₹2k", min: "1000", max: "2000" },
            { label: "Above ₹2k", min: "2000", max: "50000" },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setMinPrice(preset.min);
                setMaxPrice(preset.max);
                updateFilters({ minPrice: preset.min, maxPrice: preset.max });
              }}
              className="text-[10px] py-1.5 rounded-lg bg-lightBg hover:bg-primary-light hover:text-primary text-gray-600 font-semibold transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <button
          onClick={handlePriceApply}
          className="w-full py-2.5 bg-gradient-to-r from-primary to-primary-dark hover:shadow-glow-primary text-white rounded-xl text-xs font-bold transition-all"
        >
          Apply Range
        </button>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3 pt-5 border-t border-gray-100">
        <h4 className="font-bold text-xs uppercase text-darkText tracking-wider flex items-center gap-1.5">
          <Star className="w-3 h-3 text-primary fill-current" />
          Rating
        </h4>
        <div className="space-y-1">
          {[4, 3, 2].map((r) => (
            <button
              key={r}
              onClick={() => updateFilters({ rating: ratingVal === r.toString() ? "" : r.toString() })}
              className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-xl transition-all ${
                ratingVal === r.toString()
                  ? "bg-amber-50 border border-amber-200"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < r ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                  />
                ))}
                <span className="text-[11px] text-gray-600 ml-1 font-medium">& Up</span>
              </div>
              {ratingVal === r.toString() && (
                <Check className="w-3 h-3 text-primary" strokeWidth={3} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3 pt-5 border-t border-gray-100">
        <h4 className="font-bold text-xs uppercase text-darkText tracking-wider flex items-center gap-1.5">
          <Package className="w-3 h-3 text-primary" />
          Brands
        </h4>
        <div className="space-y-1 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
          {brands.map((b) => (
            <label
              key={b}
              className={`flex items-center gap-2 w-full text-left text-xs py-2 px-3 rounded-xl cursor-pointer transition-all ${
                selectedBrand === b
                  ? "bg-primary-light text-primary font-bold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                  selectedBrand === b ? "bg-primary border-primary" : "bg-white border-gray-300"
                }`}
              >
                {selectedBrand === b && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
              </div>
              <button
                onClick={() => updateFilters({ brand: selectedBrand === b ? "" : b })}
                className="flex-1 text-left"
              >
                {b}
              </button>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Toggle */}
      <div className="pt-5 border-t border-gray-100">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <Package className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-darkText">In Stock Only</span>
          </div>
          <button
            onClick={() => updateFilters({ inStock: inStockVal ? "" : "true" })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              inStockVal ? "bg-primary" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                inStockVal ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </label>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-lightBg via-white to-lightBg min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#003D1B] text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-20 -translate-y-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -translate-x-20 translate-y-20" />
        
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-white/70 mb-4">
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home className="w-3 h-3" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">Shop</span>
            {selectedCategory && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-secondary">
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                </span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-3 h-3 text-secondary" />
                Premium Collection
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                Herbal <span className="text-secondary italic">Dispensary</span>
              </h1>
              <p className="text-sm md:text-base text-gray-200 mt-3 max-w-lg">
                Explore {totalCount}+ authentic Ayurvedic remedies, crafted with ancient wisdom for modern wellness.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="w-full md:max-w-md">
              <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20 focus-within:border-secondary/50 focus-within:shadow-glow-secondary transition-all">
                <Search className="absolute left-5 w-4 h-4 text-secondary" />
                <input
                  type="text"
                  placeholder="Search ingredients, brands..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-12 pr-2 py-2.5 bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary hover:bg-white hover:text-primary text-white text-xs font-bold rounded-full transition-all"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Filters Chips */}
        {activeChips.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-4 mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-darkText uppercase tracking-wider mr-2">
              Active:
            </span>
            {activeChips.map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-primary-light text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/10"
              >
                {chip.label}
                <button
                  onClick={() => updateFilters({ [chip.key]: "" })}
                  className="hover:bg-primary hover:text-white rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-red-500 hover:text-red-700 hover:underline ml-auto"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                <span className="font-serif font-bold text-lg text-darkText flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-primary-light flex items-center justify-center">
                    <Filter className="w-4 h-4 text-primary" />
                  </div>
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] font-bold text-red-500 hover:text-red-700"
                  >
                    Reset
                  </button>
                )}
              </div>

              <FiltersContent />
            </div>
          </aside>

          {/* Right Column */}
          <div className="flex-1 space-y-5 min-w-0">
            {/* Controls Bar */}
            <div className="flex items-center justify-between bg-white px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-gray-100 shadow-soft gap-3 flex-wrap">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden inline-flex items-center gap-1.5 font-bold text-xs text-primary bg-primary-light hover:bg-primary hover:text-white px-4 py-2 rounded-full transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600">
                <span className="font-semibold">
                  Showing <span className="text-darkText font-bold">{initialProducts.length}</span> of{" "}
                  <span className="text-darkText font-bold">{totalCount}</span>
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-3 ml-auto">
                {/* Layout Toggle */}
                <div className="hidden md:flex items-center bg-lightBg rounded-full p-1 border border-gray-100">
                  <button
                    onClick={() => setGridLayout("grid")}
                    className={`p-1.5 rounded-full transition-all ${
                      gridLayout === "grid"
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-400 hover:text-darkText"
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setGridLayout("list")}
                    className={`p-1.5 rounded-full transition-all ${
                      gridLayout === "list"
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-400 hover:text-darkText"
                    }`}
                    aria-label="List view"
                  >
                    <Grid3x3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 bg-lightBg rounded-full px-4 py-2 border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider hidden sm:block">
                    Sort
                  </span>
                  <select
                    value={selectedSort}
                    onChange={(e) => updateFilters({ sort: e.target.value })}
                    className="bg-transparent text-xs font-bold text-darkText focus:outline-none cursor-pointer pr-2"
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="price_low_high">Price: Low to High</option>
                    <option value="price_high_low">Price: High to Low</option>
                    <option value="highest_rated">Highest Rated</option>
                    <option value="best_selling">Best Selling</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Catalog Grid */}
            {isPending ? (
              <div
                className={`grid gap-5 md:gap-6 ${
                  gridLayout === "list" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <ShimmerProductCard key={i} />
                ))}
              </div>
            ) : initialProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-12 md:p-16 text-center space-y-5">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary-light to-secondary-light flex items-center justify-center">
                  <Leaf className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-darkText font-serif">No Remedies Found</h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    No products match your active filters. Try adjusting your search or clearing filters.
                  </p>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-glow-primary transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear All Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={`grid gap-5 md:gap-6 ${
                  gridLayout === "list" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                <AnimatePresence>
                  {initialProducts.map((product, idx) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      <ProductCard product={product} onQuickView={setQuickViewProduct} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 bg-white rounded-2xl border border-gray-100 p-4 shadow-soft">
                <p className="text-xs text-gray-500 font-medium">
                  Page <span className="font-bold text-darkText">{currentPage}</span> of{" "}
                  <span className="font-bold text-darkText">{totalPages}</span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage <= 1 || isPending}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set("page", (currentPage - 1).toString());
                      startTransition(() => {
                        router.push(`/shop?${params.toString()}`);
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-primary hover:text-white hover:border-primary text-xs font-bold text-gray-600 disabled:opacity-45 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Prev
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      // Smart pagination - show only nearby pages
                      if (
                        totalPages > 7 &&
                        pageNum !== 1 &&
                        pageNum !== totalPages &&
                        (pageNum < currentPage - 1 || pageNum > currentPage + 1)
                      ) {
                        if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                          return (
                            <span key={pageNum} className="px-1 text-gray-400">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }

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
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                            currentPage === pageNum
                              ? "bg-gradient-to-br from-primary to-primary-dark text-white shadow-medium scale-110"
                              : "bg-white border border-gray-200 hover:border-primary hover:text-primary text-gray-600 disabled:opacity-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={currentPage >= totalPages || isPending}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set("page", (currentPage + 1).toString());
                      startTransition(() => {
                        router.push(`/shop?${params.toString()}`);
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-primary hover:text-white hover:border-primary text-xs font-bold text-gray-600 disabled:opacity-45 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-darkText/60 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-[90%] max-w-sm bg-white h-full overflow-y-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white z-10 p-5 border-b border-gray-100 flex items-center justify-between">
                <span className="font-serif font-bold text-lg text-darkText flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-primary-light flex items-center justify-center">
                    <Filter className="w-4 h-4 text-primary" />
                  </div>
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </span>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-darkText flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-5">
                <FiltersContent isMobile />
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    clearAllFilters();
                    setShowMobileFilters(false);
                  }}
                  className="py-3 bg-gray-100 hover:bg-gray-200 text-darkText rounded-full text-xs font-bold transition-all"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full text-xs font-bold transition-all shadow-medium"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c2e1cc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00843d;
        }
      `}</style>
    </div>
  );
}