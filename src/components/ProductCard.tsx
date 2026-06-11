"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    slug: string;
    price: number;
    discountPercentage: number;
    images: string[];
    stock: number;
    brand: string;
    rating: number;
    reviewsCount: number;
    category?: {
      name: string;
      slug: string;
    };
  };
  onQuickView?: (product: any) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100));

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);
    await addToCart(product, 1);
    // Mimic micro animation
    setTimeout(() => setAdding(false), 800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    // Optionally trigger server action
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full relative">
      
      {/* Discount Badge */}
      {product.discountPercentage > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-secondary text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
          {product.discountPercentage}% Off
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow text-gray-500 hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
      </button>

      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images?.[0] || "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=600"}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Overlay hover actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="p-3 bg-white text-darkText rounded-full hover:bg-primary hover:text-white transition-all shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          <Link
            href={`/product/${product.slug}`}
            className="p-3 bg-white text-darkText rounded-full hover:bg-primary hover:text-white transition-all shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            title="View Details"
          >
            <ShoppingCart className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="space-y-1">
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
            <span>{product.category?.name || "Ayurveda"}</span>
            <span>{product.brand}</span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif font-bold text-sm text-darkText hover:text-primary transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Ratings */}
          <div className="flex items-center gap-1">
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) ? "fill-amber-500" : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing and Cart Action */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-primary">Rs. {discountedPrice}</span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-gray-400 line-through">Rs. {product.price}</span>
              )}
            </div>
            {product.stock <= 0 ? (
              <span className="text-[9px] text-red-500 font-bold uppercase tracking-wide">Out of Stock</span>
            ) : product.stock <= 3 ? (
              <span className="text-[9px] text-orange-500 font-bold uppercase tracking-wide">Only {product.stock} left</span>
            ) : (
              <span className="text-[9px] text-green-600 font-medium">In Stock</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || adding}
            className={`flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 ${
              adding
                ? "bg-secondary text-white scale-95"
                : product.stock <= 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-primary-light text-primary hover:bg-primary hover:text-white"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
