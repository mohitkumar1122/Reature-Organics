import React from "react";
import { ShimmerProductCard } from "@/components/Shimmer";

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      
      {/* Search Header Bar Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="space-y-2">
          <div className="w-56 h-8 bg-gray-200 rounded-lg" />
          <div className="w-64 h-3 bg-gray-100 rounded" />
        </div>
        {/* Search Input Skeleton */}
        <div className="w-full md:max-w-md h-10 bg-gray-100 rounded-full" />
      </div>

      {/* Main content grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar Skeleton */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <div className="w-16 h-5 bg-gray-200 rounded" />
              <div className="w-12 h-3 bg-gray-100 rounded" />
            </div>

            {/* Categories list placeholder */}
            <div className="space-y-2.5">
              <div className="w-20 h-3 bg-gray-200 rounded" />
              <div className="space-y-2">
                <div className="w-full h-8 bg-gray-100 rounded-lg" />
                <div className="w-full h-8 bg-gray-100 rounded-lg" />
                <div className="w-full h-8 bg-gray-100 rounded-lg" />
                <div className="w-full h-8 bg-gray-100 rounded-lg" />
              </div>
            </div>

            {/* Conditions list placeholder */}
            <div className="space-y-2.5 pt-4 border-t border-gray-50">
              <div className="w-28 h-3 bg-gray-200 rounded" />
              <div className="space-y-2">
                <div className="w-full h-8 bg-gray-100 rounded-lg" />
                <div className="w-full h-8 bg-gray-100 rounded-lg" />
                <div className="w-full h-8 bg-gray-100 rounded-lg" />
              </div>
            </div>

            {/* Price list placeholder */}
            <div className="space-y-3 pt-4 border-t border-gray-50">
              <div className="w-24 h-3 bg-gray-200 rounded" />
              <div className="flex gap-2">
                <div className="w-1/2 h-8 bg-gray-100 rounded-lg" />
                <div className="w-1/2 h-8 bg-gray-100 rounded-lg" />
              </div>
              <div className="w-full h-8 bg-gray-100 rounded-lg" />
            </div>
          </div>
        </aside>

        {/* Right Catalog Grid */}
        <div className="flex-1 space-y-6">
          {/* Controls Bar Skeleton */}
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-24 h-4 bg-gray-100 rounded" />
            <div className="w-36 h-4 bg-gray-100 rounded" />
          </div>

          {/* Shimmer Product Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ShimmerProductCard />
            <ShimmerProductCard />
            <ShimmerProductCard />
            <ShimmerProductCard />
            <ShimmerProductCard />
            <ShimmerProductCard />
          </div>
        </div>

      </div>

    </div>
  );
}
