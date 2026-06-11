import React from "react";
import { ShimmerBlogCard } from "@/components/Shimmer";

export default function BlogLoading() {
  const dummyCategories = ["All Articles", "Ayurveda", "Nutrition", "Wellness", "Fitness", "Herbal Remedies"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-pulse">
      
      {/* Header Skeleton */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="w-32 h-6 bg-primary-light text-primary mx-auto rounded-full" />
        <div className="w-72 h-9 bg-gray-200 mx-auto rounded-lg" />
        <div className="w-96 h-4 bg-gray-100 mx-auto rounded mt-2" />
      </div>

      {/* Category Tabs Skeleton */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-gray-100 pb-6">
        {dummyCategories.map((cat, idx) => (
          <div
            key={idx}
            className="w-24 h-8 bg-gray-100 rounded-full border border-gray-200"
          />
        ))}
      </div>

      {/* Blog Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ShimmerBlogCard />
        <ShimmerBlogCard />
        <ShimmerBlogCard />
      </div>

    </div>
  );
}
