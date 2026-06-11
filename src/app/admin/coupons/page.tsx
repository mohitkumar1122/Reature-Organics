"use client";

import React, { useState, useEffect } from "react";
import { adminGetCouponsAction, adminCreateCouponAction, adminDeleteCouponAction } from "@/app/actions/adminActions";
import { Tag, Plus, Trash2, Calendar, Percent } from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "flat">("percentage");
  const [value, setValue] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadCoupons = async () => {
    setLoading(true);
    const list = await adminGetCouponsAction();
    setCoupons(list);
    setLoading(false);
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!code || !value || !expiryDate) {
      setErrorMsg("Please fill in Coupon Code, Value, and Expiry Date.");
      return;
    }

    setLoading(true);
    const res = await adminCreateCouponAction({
      code: code.toUpperCase().trim(),
      discountType,
      value: Number(value),
      minOrderValue: Number(minOrderValue || "0"),
      maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
      expiryDate,
    });

    if (res.success) {
      setSuccessMsg("Coupon created successfully!");
      setCode("");
      setValue("");
      setMinOrderValue("");
      setMaxDiscount("");
      setExpiryDate("");
      await loadCoupons();
    } else {
      setErrorMsg(res.message || "Failed to create coupon.");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      setLoading(true);
      await adminDeleteCouponAction(id);
      await loadCoupons();
    }
  };

  return (
    <div className="space-y-8 text-xs">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-darkText">Coupon Management</h1>
        <p className="text-gray-500">Configure percentage/flat discounts and purchase campaign codes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Create Coupon Form */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-sm text-darkText flex items-center gap-1.5 border-b border-gray-50 pb-3">
            <Plus className="w-4 h-4 text-primary" /> Create Campaign Coupon
          </h3>

          {errorMsg && <p className="text-red-500 font-bold">⚠️ {errorMsg}</p>}
          {successMsg && <p className="text-primary font-bold">🌱 {successMsg}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Coupon Code</label>
              <input
                type="text"
                required
                placeholder="WELCOME15"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Type</label>
                <select
                  value={discountType}
                  onChange={(e: any) => setDiscountType(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (Rs.)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Value</label>
                <input
                  type="number"
                  required
                  placeholder="15"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Min Order Value</label>
                <input
                  type="number"
                  placeholder="499"
                  value={minOrderValue}
                  onChange={(e) => setMinOrderValue(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Max Cap Discount</label>
                <input
                  type="number"
                  placeholder="150"
                  value={maxDiscount}
                  onChange={(e) => setMaxDiscount(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Expiry Date</label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg text-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-white hover:bg-primary-dark font-bold rounded-full transition-all shadow"
            >
              Publish Coupon
            </button>
          </form>
        </div>

        {/* Right Columns: Coupon list table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {loading && coupons.length === 0 ? (
            <p className="text-gray-400 italic py-16 text-center">Loading coupons...</p>
          ) : coupons.length === 0 ? (
            <p className="text-gray-400 italic py-16 text-center">No active coupons available.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold bg-gray-50/50">
                  <th className="p-4">Code</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Expiry Date</th>
                  <th className="p-4 text-center">Min Subtotal</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium">
                {coupons.map((c) => (
                  <tr key={c._id}>
                    <td className="p-4 font-mono font-bold text-primary text-sm">{c.code}</td>
                    <td className="p-4 text-darkText capitalize">
                      {c.discountType === "percentage" ? `${c.value}% off (Cap: Rs. ${c.maxDiscount || "No Cap"})` : `Rs. ${c.value} off`}
                    </td>
                    <td className="p-4 text-gray-500 flex items-center gap-1 mt-2">
                      <Calendar className="w-3.5 h-3.5 text-primary" /> {new Date(c.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center text-darkText">Rs. {c.minOrderValue}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </div>
  );
}
