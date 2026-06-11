"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getWishlistAction, toggleWishlistAction } from "@/app/actions/wishlistActions";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    setLoading(true);
    const list = await getWishlistAction();
    setWishlist(list);
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (productId: string) => {
    setLoading(true);
    const res = await toggleWishlistAction(productId);
    if (res.success) {
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    }
    setLoading(false);
  };

  const handleAddToCart = async (product: any) => {
    await addToCart(product, 1);
  };

  if (loading && wishlist.length === 0) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm text-center text-xs text-gray-400">
        Loading bookmarked remedies...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-serif font-bold text-darkText">My Wishlist</h2>
        <p className="text-xs text-gray-500 mt-1">Products you saved for future wellness treatment cycles.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 space-y-4 text-xs text-gray-400 border border-dashed border-gray-200 rounded-2xl">
          <Heart className="w-10 h-10 mx-auto text-gray-300" />
          <p>Your wishlist is empty.</p>
          <Link
            href="/shop"
            className="inline-block py-2 px-5 bg-primary text-white hover:bg-primary-dark font-bold rounded-full font-sans"
          >
            Find Remedies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlist.map((product) => {
            const discPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
            return (
              <div
                key={product._id}
                className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all flex gap-4 text-xs relative"
              >
                {/* Product image */}
                <Link href={`/product/${product.slug}`} className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                  <img
                    src={product.images?.[0] || "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=600"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-between min-w-0">
                  <div className="space-y-0.5">
                    <Link href={`/product/${product.slug}`} className="font-serif font-bold text-sm text-darkText hover:text-primary transition-colors block truncate pr-5">
                      {product.title}
                    </Link>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.brand}</p>
                    <div className="flex items-baseline gap-1.5 pt-1">
                      <span className="font-bold text-primary">Rs. {discPrice}</span>
                      {product.discountPercentage > 0 && (
                        <span className="text-[10px] text-gray-400 line-through">Rs. {product.price}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="inline-flex items-center gap-1 font-bold text-[10px] text-primary hover:underline bg-primary-light px-2.5 py-1.5 rounded-full"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                    
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
