import React from "react";

// Helper component for Star icons placeholder
function ShimmerStar() {
  return (
    <div className="w-3.5 h-3.5 bg-gray-200 rounded-full animate-pulse" />
  );
}

// 1. Shimmer Skeleton for a Product Card
export function ShimmerProductCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full relative">
      {/* Discount Badge Placeholder */}
      <div className="absolute top-3 left-3 w-14 h-5 bg-gray-200 rounded-full animate-pulse z-10" />

      {/* Wishlist Button Placeholder */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-gray-200 rounded-full animate-pulse z-10" />

      {/* Product Image Placeholder */}
      <div className="h-48 w-full bg-gray-100 animate-pulse" />

      {/* Product Content Placeholder */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          {/* Category & Brand */}
          <div className="flex items-center justify-between">
            <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
            <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <div className="w-11/12 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-8/12 h-4 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex gap-0.5">
              <ShimmerStar />
              <ShimmerStar />
              <ShimmerStar />
              <ShimmerStar />
              <ShimmerStar />
            </div>
            <div className="w-6 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Pricing and Cart Action */}
        <div className="flex items-center justify-between mt-6 pt-3 border-t border-gray-50">
          <div className="space-y-1.5">
            <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-12 h-2.5 bg-gray-100 rounded animate-pulse" />
          </div>

          <div className="w-9 h-9 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// 2. Shimmer Skeleton for Product Detail Page
export function ShimmerProductDetail() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm animate-pulse">
      {/* Left Column: Gallery Skeleton */}
      <div className="space-y-4 w-full">
        <div className="w-full aspect-square bg-gray-100 rounded-3xl" />
        <div className="flex gap-3">
          <div className="w-20 h-20 bg-gray-100 rounded-xl" />
          <div className="w-20 h-20 bg-gray-100 rounded-xl" />
          <div className="w-20 h-20 bg-gray-100 rounded-xl" />
        </div>
      </div>

      {/* Right Column: Details Skeleton */}
      <div className="space-y-6 w-full">
        {/* Category & Brand */}
        <div className="flex items-center justify-between">
          <div className="w-24 h-3.5 bg-gray-200 rounded" />
          <div className="w-16 h-3.5 bg-gray-200 rounded" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="w-11/12 h-8 bg-gray-200 rounded" />
          <div className="w-6/12 h-8 bg-gray-200 rounded" />
        </div>

        {/* Stars & Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            <ShimmerStar />
            <ShimmerStar />
            <ShimmerStar />
            <ShimmerStar />
            <ShimmerStar />
          </div>
          <div className="w-20 h-3.5 bg-gray-200 rounded" />
        </div>

        {/* Price & Stock */}
        <div className="pt-2 border-t border-gray-50">
          <div className="flex items-baseline gap-2">
            <div className="w-28 h-7 bg-gray-200 rounded" />
            <div className="w-16 h-4 bg-gray-100 rounded" />
          </div>
          <div className="w-16 h-3 bg-gray-200 rounded mt-2" />
        </div>

        {/* Description Lines */}
        <div className="space-y-2.5 pt-4 border-t border-gray-50">
          <div className="w-full h-3 bg-gray-100 rounded" />
          <div className="w-full h-3 bg-gray-100 rounded" />
          <div className="w-5/6 h-3 bg-gray-100 rounded" />
        </div>

        {/* Actions (Qty & Add to Cart) */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
          <div className="w-24 h-11 bg-gray-200 rounded-xl" />
          <div className="flex-1 h-11 bg-gray-200 rounded-full" />
          <div className="w-11 h-11 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// 3. Shimmer Skeleton for a Blog Card
export function ShimmerBlogCard() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full">
      {/* Blog Image Placeholder */}
      <div className="h-48 w-full bg-gray-100 animate-pulse" />

      {/* Content Placeholder */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header info */}
          <div className="flex items-center justify-between">
            <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
            <div className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <div className="w-full h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-8/12 h-5 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Description Excerpt */}
          <div className="space-y-2">
            <div className="w-full h-3 bg-gray-100 rounded animate-pulse" />
            <div className="w-full h-3 bg-gray-100 rounded animate-pulse" />
            <div className="w-5/6 h-3 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="w-24 h-3.5 bg-gray-200 rounded animate-pulse" />
          <div className="w-16 h-3.5 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
