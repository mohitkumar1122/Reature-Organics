"use client";

import React from "react";
import { X, ShoppingCart, Star, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: any;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  if (!product) return null;

  const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100));

  const handleAddToCart = async () => {
    await addToCart(product, 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 text-gray-500 hover:text-darkText shadow-sm z-10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Product Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-50 relative min-h-[300px]">
          <img
            src={product.images?.[0] || "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=600"}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Info details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-2.5 py-1 rounded-full">
              {product.category?.name || "Ayurvedic Care"}
            </span>

            <h2 className="text-2xl font-serif font-bold text-darkText leading-tight">
              {product.title}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="text-sm font-bold text-darkText ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-500 font-medium">{product.reviewsCount} verified reviews</span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-5">
              {product.description}
            </p>

            {/* Key benefits list */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <p className="text-xs font-bold text-darkText uppercase tracking-wider">Key Benefits:</p>
                <ul className="space-y-1">
                  {product.benefits.slice(0, 2).map((b: string, i: number) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-5 mt-6 pt-4 border-t border-gray-100">
            {/* Pricing */}
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-500 font-bold uppercase mr-1">MRP</span>
              <span className="text-3xl font-extrabold text-primary">₹{discountedPrice}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
              )}
            </div>

            {/* Add to Cart button */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-primary text-white hover:bg-primary-dark transition-all duration-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:scale-[1.01]"
              >
                <ShoppingCart className="w-4 h-4" />
                {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
