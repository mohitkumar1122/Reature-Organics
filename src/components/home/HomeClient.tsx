"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";

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

  const sections = [
    {
      products: featuredProducts,
      badge: "Recommended",
      badgeIcon: Sparkles,
      title: "Featured",
      titleAccent: "Formulations",
      description: "Clinically tested recipes designed to restore elemental balance and promote daily longevity.",
      bgClass: "bg-gradient-to-b from-lightBg to-white",
      badgeColor: "text-primary bg-primary-light border-primary/10",
      link: "/shop?featured=true",
    },
    {
      products: topSellingProducts,
      badge: "Customer Favorites",
      badgeIcon: TrendingUp,
      title: "Top Selling",
      titleAccent: "Products",
      description: "Our most popular natural remedies trusted by thousands of active wellness seekers.",
      bgClass: "bg-white",
      badgeColor: "text-secondary-dark bg-secondary-light border-secondary/20",
      link: "/shop?sort=popular",
    },
    {
      products: newArrivalProducts,
      badge: "New Launches",
      badgeIcon: Zap,
      title: "Recently",
      titleAccent: "Launched",
      description: "Discover our latest herbal combinations prepared directly from fresh farm harvests.",
      bgClass: "bg-gradient-to-b from-white to-lightBg",
      badgeColor: "text-primary bg-primary-light border-primary/10",
      link: "/shop?sort=newest",
    },
  ];

  return (
    <>
      {sections.map((section, sectionIdx) => (
        <section
          key={sectionIdx}
          className={`py-20 ${section.bgClass} relative overflow-hidden`}
        >
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="text-center md:text-left max-w-xl">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border ${section.badgeColor}`}>
                  <section.badgeIcon className="w-3 h-3" />
                  {section.badge}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-darkText mt-5 leading-tight">
                  {section.title}{" "}
                  <span className="text-primary italic">{section.titleAccent}</span>
                </h2>
                <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
                  {section.description}
                </p>
              </div>

              <Link
                href={section.link}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-primary/20 text-primary text-sm font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm hover:shadow-medium shrink-0 self-center md:self-auto"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {section.products.map((product, idx) => (
                <div
                  key={product._id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <ProductCard
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                </div>
              ))}
            </div>

            {/* Empty state */}
            {section.products.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm">No products available in this section yet.</p>
              </div>
            )}
          </div>
        </section>
      ))}

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