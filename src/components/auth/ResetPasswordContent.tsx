"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/app/actions/authActions";
import { KeyRound, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!email) {
      router.push("/auth/forgot-password");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!otp || !newPassword) {
      setErrorMsg("All fields are required.");
      return;
    }

    setLoading(true);
    const res = await resetPasswordAction({ email, otp, newPassword });
    if (res.success) {
      setSuccessMsg(res.message || "Password updated successfully!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } else {
      setErrorMsg(res.message || "Failed to update password.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 px-6 py-8 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-6">
      <Link href="/auth/forgot-password" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold text-darkText">Set New Password</h2>
        <p className="text-xs text-gray-500">
          Enter the OTP sent to <span className="font-semibold text-darkText">{email}</span> and pick a new password.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-medium">
          ⚠️ {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-3 bg-primary-light border border-primary/20 text-primary rounded-xl text-xs font-bold">
          🌱 {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="space-y-1">
          <label className="font-bold text-gray-700 block">Verification OTP Code (6-Digits)</label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="e.g. 123456"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-gray-50/50"
            />
            <KeyRound className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-gray-700 block">New Password</label>
          <div className="relative">
            <input
              type="password"
              required
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-gray-50/50"
            />
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-all shadow-md disabled:opacity-55"
        >
          {loading ? "Updating..." : "Save Password"}
        </button>
      </form>
    </div>
  );
}
