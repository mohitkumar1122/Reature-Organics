"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPasswordAction } from "@/app/actions/authActions";
import { Mail, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email) {
      setErrorMsg("Please enter your email.");
      return;
    }

    setLoading(true);
    const res = await forgotPasswordAction(email);
    if (res.success) {
      setSuccessMsg(res.message || "Reset OTP dispatched.");
      setTimeout(() => {
        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
      }, 1500);
    } else {
      setErrorMsg(res.message || "Failed to dispatch reset code.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 px-6 py-8 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-6">
      
      {/* Back button */}
      <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Login
      </Link>

      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold text-darkText">Recover Password</h2>
        <p className="text-xs text-gray-500">
          Enter your registered email to receive a password reset OTP.
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="space-y-1">
          <label className="font-bold text-gray-700 block">Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-gray-50/50"
            />
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-all shadow-md disabled:opacity-55"
        >
          {loading ? "Sending Code..." : "Send Reset Code"}
        </button>
      </form>

    </div>
  );
}
