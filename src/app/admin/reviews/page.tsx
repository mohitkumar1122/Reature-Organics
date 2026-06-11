"use client";

import React, { useState, useEffect } from "react";
import { adminGetReviewsAction, adminDeleteReviewAction } from "@/app/actions/adminActions";
import { Trash2, Star, CheckSquare, MessageSquare, ShieldCheck, Filter, Calendar } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [errorMsg, setErrorMsg] = useState("");

  const loadReviews = async () => {
    setLoading(true);
    try {
      const list = await adminGetReviewsAction();
      setReviews(list);
    } catch (err: any) {
      setErrorMsg("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this customer review? The product average rating will be automatically recalculated.")) {
      setLoading(true);
      try {
        const res = await adminDeleteReviewAction(id);
        if (res.success) {
          await loadReviews();
        } else {
          setErrorMsg(res.message || "Failed to delete review.");
          setLoading(false);
        }
      } catch (err: any) {
        setErrorMsg("Failed to delete review.");
        setLoading(false);
      }
    }
  };

  // Compute metrics
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) : "0.0";
  const verifiedPercentage = totalReviews > 0 ? Math.round((reviews.filter((r) => r.isVerifiedPurchase).length / totalReviews) * 100) : 0;

  const filteredReviews = reviews.filter((r) => {
    if (ratingFilter === "all") return true;
    return r.rating === Number(ratingFilter);
  });

  return (
    <div className="space-y-8 text-xs">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-darkText">Review Moderation</h1>
        <p className="text-gray-500">Monitor customer experiences, review feedbacks, and moderate spam posts.</p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Metrics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Total Reviews</span>
            <p className="text-2xl font-extrabold text-primary">{totalReviews}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Average Rating</span>
            <p className="text-2xl font-extrabold text-darkText">{avgRating} / 5.0</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FFF8EB] text-amber-500 flex items-center justify-center">
            <Star className="w-5 h-5 fill-amber-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Verified Purchases</span>
            <p className="text-2xl font-extrabold text-darkText">{verifiedPercentage}%</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-secondary-light text-secondary flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <span className="font-bold text-gray-500 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Filter by Rating:</span>
        <div className="flex gap-2">
          {["all", 5, 4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => setRatingFilter(r as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                ratingFilter === r
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100"
              }`}
            >
              {r === "all" ? "All Ratings" : `${r} Star`}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading && reviews.length === 0 ? (
          <p className="text-gray-400 italic py-16 text-center">Loading reviews...</p>
        ) : filteredReviews.length === 0 ? (
          <p className="text-gray-400 italic py-16 text-center">No reviews match the selected filter.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold bg-gray-50/50">
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Product Formulation</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Review Message</th>
                  <th className="p-4 text-center">Helpful</th>
                  <th className="p-4 text-center">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium text-darkText">
                {filteredReviews.map((rev) => (
                  <tr key={rev._id} className="hover:bg-gray-50/20">
                    <td className="p-4">
                      <p className="font-bold text-darkText">{rev.userName}</p>
                      {rev.isVerifiedPurchase ? (
                        <span className="inline-flex items-center gap-0.5 text-[8px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold uppercase mt-1">
                          ✓ Verified Purchase
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-[8px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded font-bold uppercase mt-1">
                          Standard Review
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {rev.product ? (
                        <a
                          href={`/product/${rev.product.slug}`}
                          target="_blank"
                          className="font-semibold text-primary hover:underline"
                        >
                          {rev.product.title}
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">Discontinued Product</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-700 leading-relaxed font-normal whitespace-pre-line max-w-sm">
                        {rev.comment}
                      </p>
                      <span className="flex items-center gap-1 text-[9px] text-gray-400 mt-1.5">
                        <Calendar className="w-3 h-3" /> {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4 text-center text-gray-500 font-bold">
                      {rev.helpfulVotes || 0}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(rev._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
