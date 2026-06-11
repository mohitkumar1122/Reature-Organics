"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";

interface HomeClientProps {
  featuredProducts: any[];
  topSellingProducts: any[];
  newArrivalProducts: any[];
}

export default function HomeClient({
  featuredProducts,
  topSellingProducts,
  newArrivalProducts,
}: HomeClientProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);

  return (
    <>
      {/* Featured Products Section */}
      <section className="py-16 bg-[#F8FAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1.5 rounded-full">
              Recommended
            </span>
            <h2 className="text-3xl font-serif font-bold text-darkText mt-4">
              Featured Formulations
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Clinically tested recipes designed to restore elemental balance and promote daily longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1.5 rounded-full">
              Customer Favorites
            </span>
            <h2 className="text-3xl font-serif font-bold text-darkText mt-4">
              Top Selling Products
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Our most popular natural remedies trusted by thousands of active wellness seekers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSellingProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newly Added Products */}
      <section className="py-16 bg-[#F8FAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1.5 rounded-full">
              New Launches
            </span>
            <h2 className="text-3xl font-serif font-bold text-darkText mt-4">
              Recently Launched
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Discover our latest herbal combinations prepared directly from fresh farm harvests.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivalProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
