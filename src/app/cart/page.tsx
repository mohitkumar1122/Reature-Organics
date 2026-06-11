"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Tag, X } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    subtotal,
    discount,
    couponCode,
    tax,
    shipping,
    total,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    loading,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponErr, setCouponErr] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponErr("");
    setCouponMsg("");
    if (!couponInput.trim()) return;

    const res = await applyCoupon(couponInput.toUpperCase().trim());
    if (res.success) {
      setCouponMsg(res.message);
      setCouponInput("");
    } else {
      setCouponErr(res.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-bold text-darkText">Your Cart is Empty</h2>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Fortify your health by adding authentic organic remedies to your healing catalog.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold bg-primary text-white hover:bg-primary-dark shadow-md transition-all duration-300"
        >
          Explore Remedies
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-3xl font-serif font-bold text-darkText">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Cart Items list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm divide-y divide-gray-100">
            {cart.map((item) => {
              const itemPrice = Math.round(item.product.price * (1 - item.product.discountPercentage / 100));
              return (
                <div key={item.product._id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  
                  {/* Image & Details */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.images?.[0] || "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=600"}
                      alt={item.product.title}
                      className="w-20 h-20 rounded-2xl object-cover border border-gray-100 shrink-0 bg-gray-50"
                    />
                    <div className="space-y-1">
                      <Link href={`/product/${item.product.slug}`} className="font-serif font-bold text-sm text-darkText hover:text-primary transition-colors line-clamp-2">
                        {item.product.title}
                      </Link>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.product.brand}</p>
                      <p className="text-xs text-primary font-bold">Rs. {itemPrice}</p>
                    </div>
                  </div>

                  {/* Quantity Actions & Remove */}
                  <div className="flex items-center gap-6 self-end sm:self-center">
                    
                    {/* Item Counter */}
                    <div className="flex items-center border border-gray-200 rounded-full p-0.5 bg-white">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Order Summary & Voucher */}
        <div className="space-y-6">
          
          {/* Coupon Input */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-sm text-darkText flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" /> Apply Promo Code
            </h3>

            {couponCode ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold">
                <span>Voucher Applied: {couponCode}</span>
                <button onClick={removeCoupon} className="p-1 rounded-full hover:bg-white/50 text-secondary">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="WELCOME15 or AYURNEW"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-xs uppercase focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-full text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {couponErr && <p className="text-[11px] text-red-500 font-medium">{couponErr}</p>}
            {couponMsg && <p className="text-[11px] text-primary font-bold">{couponMsg}</p>}
          </div>

          {/* Checkout calculations summary */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 text-xs">
            <h3 className="font-serif font-bold text-sm text-darkText pb-3 border-b border-gray-50">
              Checkout Details
            </h3>

            <div className="space-y-2.5">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>Rs. {Math.round(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-secondary font-bold">
                  <span>Coupon Discount</span>
                  <span>-Rs. {Math.round(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>GST (5%)</span>
                <span>Rs. {tax}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Charges</span>
                <span>{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
              </div>
              
              {shipping > 0 && (
                <p className="text-[10px] text-gray-400 italic">Add Rs. {Math.round(500 - (subtotal - discount))} more to unlock FREE delivery.</p>
              )}
            </div>

            <div className="flex justify-between text-base font-extrabold text-darkText pt-4 border-t border-gray-100">
              <span>Grand Total</span>
              <span className="text-primary">Rs. {total}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg transition-all"
            >
              Secure Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
