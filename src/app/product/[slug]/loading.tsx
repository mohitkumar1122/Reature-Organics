import React from "react";
import { ShimmerProductDetail } from "@/components/Shimmer";

export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-pulse">
      <ShimmerProductDetail />
    </div>
  );
}
