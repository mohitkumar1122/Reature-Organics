"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createReviewAction, voteReviewHelpfulAction } from "@/app/actions/productActions";
import { ShoppingCart, Star, CheckCircle, ChevronDown, ChevronUp, Clock, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface ProductDetailsClientProps {
  product: any;
  reviews: any[];
  relatedProducts: any[];
}

export default function ProductDetailsClient({
  product,
  reviews,
  relatedProducts,
}: ProductDetailsClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  // Quantities & tabs
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "ingr" | "instructions" | "precautions">("desc");
  
  // Review inputs
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [reviewErr, setReviewErr] = useState("");
  const [reviewing, setReviewing] = useState(false);

  // FAQ states
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Bundle state ("Frequently Bought Together")
  // Choose up to 2 related products
  const [selectedBundleItems, setSelectedBundleItems] = useState<string[]>([product._id]);
  const [bundleAdding, setBundleAdding] = useState(false);

  const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100));

  const handleAddToCart = async () => {
    await addToCart(product, qty);
  };

  const handleBuyNow = async () => {
    await addToCart(product, qty);
    router.push("/cart");
  };

  // Bundle calculations
  const bundleProducts = [product, ...relatedProducts.slice(0, 2)];
  const bundleSubtotal = bundleProducts.reduce((acc, p) => {
    if (selectedBundleItems.includes(p._id)) {
      const price = p.price * (1 - p.discountPercentage / 100);
      return acc + price;
    }
    return acc;
  }, 0);
  
  // Apply an additional 10% bundle discount if 2 or more products are bundled!
  const isBundleEligible = selectedBundleItems.length >= 2;
  const bundleDiscount = isBundleEligible ? bundleSubtotal * 0.1 : 0;
  const bundleTotal = bundleSubtotal - bundleDiscount;

  const handleAddBundleToCart = async () => {
    setBundleAdding(true);
    for (const p of bundleProducts) {
      if (selectedBundleItems.includes(p._id)) {
        await addToCart(p, 1);
      }
    }
    setBundleAdding(false);
    router.push("/cart");
  };

  const handleBundleCheckboxChange = (id: string) => {
    setSelectedBundleItems((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id && i !== product._id) // don't allow unchecking core product
        : [...prev, id]
    );
  };

  // Submit review
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewErr("");
    setReviewMsg("");
    if (!comment.trim()) {
      setReviewErr("Please enter a comment.");
      return;
    }
    setReviewing(true);
    const res = await createReviewAction(product._id, { rating, comment });
    if (res.success) {
      setReviewMsg("Review posted successfully!");
      setComment("");
      setRating(5);
      router.refresh();
    } else {
      setReviewErr(res.message || "Failed to submit review.");
    }
    setReviewing(false);
  };

  // Helpful reviews
  const [votedHelpful, setVotedHelpful] = useState<string[]>([]);
  const handleHelpfulVote = async (reviewId: string) => {
    if (votedHelpful.includes(reviewId)) return;
    const res = await voteReviewHelpfulAction(reviewId);
    if (res.success) {
      setVotedHelpful((prev) => [...prev, reviewId]);
      router.refresh();
    }
  };

  const faqData = [
    {
      q: "Are Reature Organic products safe for long-term usage?",
      a: "Yes, our products are made from 100% natural organic herbs without chemical binders or heavy metals, making them perfectly safe for regular dietary use. However, we advise following dosage instructions.",
    },
    {
      q: "How soon can I expect results from Ayurvedic supplements?",
      a: "Ayurveda works by healing root causes rather than masking symptoms. Most customers report noticeable metabolic and cognitive improvements within 2 to 3 weeks of consistent daily usage.",
    },
    {
      q: "Can I take these products alongside other modern medications?",
      a: "Ayurvedic supplements general play well with other dietary components. If you are under critical medication for cardiovascular, thyroid, or diabetic care, we highly advise consulting your clinical physician.",
    },
  ];

  return (
    <div className="space-y-12">
      
      {/* Right Column Core Info details */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary-light px-2.5 py-1 rounded-full">
            {product.category?.name || "Ayurvedic Care"}
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-darkText leading-tight">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-4 text-xs">
            <span className="text-gray-400">SKU: <span className="font-mono text-darkText font-semibold">{product.sku}</span></span>
            <span className="text-gray-400">Brand: <span className="text-darkText font-semibold">{product.brand}</span></span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="font-bold text-darkText">{product.rating}</span>
              <span className="text-gray-400">({product.reviewsCount} Reviews)</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-3 pt-2">
          <span className="text-3xl font-extrabold text-primary">Rs. {discountedPrice}</span>
          {product.discountPercentage > 0 && (
            <span className="text-base text-gray-400 line-through">Rs. {product.price}</span>
          )}
          {product.discountPercentage > 0 && (
            <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">
              Save {product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Quantity selector & buttons */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          
          {/* Item Counter */}
          <div className="flex items-center border border-gray-200 rounded-full p-1 bg-white">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 font-bold"
            >
              -
            </button>
            <span className="w-10 text-center text-sm font-bold">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              disabled={qty >= product.stock}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 font-bold disabled:opacity-40"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="flex-1 max-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-primary text-white hover:bg-primary-dark transition-all duration-300 disabled:bg-gray-100 disabled:text-gray-400 shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
          
          <button
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
            className="flex-1 max-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-secondary text-white hover:bg-secondary-dark transition-all duration-300 disabled:bg-gray-100 disabled:text-gray-400 shadow-md hover:shadow-lg"
          >
            Buy Now
          </button>
        </div>

        {/* Dynamic description/specs tabs */}
        <div className="border border-gray-100 rounded-3xl p-6 bg-white shadow-sm space-y-6">
          <div className="flex gap-4 border-b border-gray-100 pb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            <button
              onClick={() => setActiveTab("desc")}
              className={`pb-2 transition-colors ${activeTab === "desc" ? "border-b-2 border-primary text-primary" : "hover:text-darkText"}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("ingr")}
              className={`pb-2 transition-colors ${activeTab === "ingr" ? "border-b-2 border-primary text-primary" : "hover:text-darkText"}`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab("instructions")}
              className={`pb-2 transition-colors ${activeTab === "instructions" ? "border-b-2 border-primary text-primary" : "hover:text-darkText"}`}
            >
              How to Use
            </button>
            {product.precautions && (
              <button
                onClick={() => setActiveTab("precautions")}
                className={`pb-2 transition-colors ${activeTab === "precautions" ? "border-b-2 border-primary text-primary" : "hover:text-darkText"}`}
              >
                Precautions
              </button>
            )}
          </div>

          <div className="text-xs text-gray-600 leading-relaxed min-h-[100px]">
            {activeTab === "desc" && (
              <div className="space-y-4">
                <p>{product.description}</p>
                {product.benefits && (
                  <div className="space-y-2 pt-2">
                    <p className="font-bold text-darkText uppercase tracking-wide">Key Benefits:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.benefits.map((b: string, i: number) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-secondary shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "ingr" && (
              <div className="space-y-3">
                <p className="italic text-gray-500 mb-2">Formulated using standardized herbal extracts:</p>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-darkText font-medium">
                      🍃 {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "instructions" && (
              <p className="whitespace-pre-line">{product.usageInstructions}</p>
            )}

            {activeTab === "precautions" && (
              <p className="whitespace-pre-line text-red-600">{product.precautions}</p>
            )}
          </div>
        </div>

      </div>

      {/* Conversion-optimized D2C "Frequently Bought Together" Bundle */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="bg-gradient-to-br from-primary-light/40 to-secondary/5 border border-primary-light/30 rounded-3xl p-6 md:p-8">
          <h3 className="font-serif font-bold text-lg text-darkText mb-6">Frequently Bought Together</h3>
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              
              {/* Product list */}
              {bundleProducts.map((p, idx) => (
                <React.Fragment key={p._id}>
                  {idx > 0 && <span className="text-xl font-bold text-gray-400">+</span>}
                  
                  <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm relative">
                    {idx > 0 && (
                      <input
                        type="checkbox"
                        checked={selectedBundleItems.includes(p._id)}
                        onChange={() => handleBundleCheckboxChange(p._id)}
                        className="absolute top-2 left-2 rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                    )}
                    <img
                      src={p.images?.[0]}
                      alt={p.title}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="max-w-[120px] text-xs">
                      <p className="font-bold truncate text-darkText">{p.title}</p>
                      <p className="text-primary font-bold">Rs. {Math.round(p.price * (1 - p.discountPercentage / 100))}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}

            </div>

            {/* Calculations and bundle action */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm min-w-[220px] text-center space-y-3">
              <div className="text-xs">
                <span className="text-gray-500">Bundle Price: </span>
                <span className="font-bold text-gray-500 line-through">Rs. {Math.round(bundleSubtotal)}</span>
              </div>
              
              {isBundleEligible && (
                <div className="text-xs text-secondary font-bold">
                  Bundle Discount (10%): -Rs. {Math.round(bundleDiscount)}
                </div>
              )}

              <div className="text-lg font-extrabold text-primary">
                Total: Rs. {Math.round(bundleTotal)}
              </div>

              <button
                onClick={handleAddBundleToCart}
                disabled={bundleAdding}
                className="w-full py-2.5 bg-primary text-white hover:bg-primary-dark rounded-full text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                Add Bundle to Cart
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FAQs Panel */}
      <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="font-serif font-bold text-xl text-darkText">Usage FAQs</h3>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <div key={i} className="border-b border-gray-50 pb-3">
              <button
                onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}
                className="w-full flex items-center justify-between text-left text-sm font-bold text-darkText hover:text-primary py-2"
              >
                <span>{faq.q}</span>
                {openFaqIdx === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openFaqIdx === i && (
                <p className="text-xs text-gray-500 leading-relaxed mt-2 pl-1 animate-in slide-in-from-top-2 duration-200">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Review list & input form */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: reviews statistics & review submission form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-darkText">Write a Review</h3>
            
            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">Rating</label>
                <div className="flex gap-1.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i + 1)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${i < rating ? "fill-amber-500 text-amber-500" : "text-gray-200"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">Comments</label>
                <textarea
                  rows={4}
                  placeholder="Share your experience with this natural formula..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-xs"
                />
              </div>

              {reviewErr && <p className="text-xs text-red-500 font-medium">{reviewErr}</p>}
              {reviewMsg && <p className="text-xs text-primary font-bold">{reviewMsg}</p>}

              <button
                type="submit"
                disabled={reviewing}
                className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-all disabled:opacity-55 shadow-sm"
              >
                {reviewing ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>

        {/* Right: reviews listing */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-lg text-darkText">Customer Reviews ({reviews.length})</h3>
            
            {reviews.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-4">No reviews submitted yet for this product. Be the first to share your thoughts!</p>
            ) : (
              <div className="space-y-6 divide-y divide-gray-50">
                {reviews.map((rev) => (
                  <div key={rev._id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-darkText">{rev.userName}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < rev.rating ? "fill-amber-500 text-amber-500" : "text-gray-200"}`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400">
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {rev.isVerifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified Purchase
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {rev.comment}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] pt-1">
                      <span className="text-gray-400">Was this review helpful?</span>
                      <button
                        onClick={() => handleHelpfulVote(rev._id)}
                        disabled={votedHelpful.includes(rev._id)}
                        className={`font-semibold transition-colors ${
                          votedHelpful.includes(rev._id) ? "text-primary cursor-default" : "text-gray-500 hover:text-primary"
                        }`}
                      >
                        👍 Helpful ({rev.helpfulVotes + (votedHelpful.includes(rev._id) ? 1 : 0)})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </section>

    </div>
  );
}
