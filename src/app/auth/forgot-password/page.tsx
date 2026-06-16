"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPasswordAction } from "@/app/actions/authActions";
import {
  Mail, HelpCircle, ArrowLeft, Leaf, Sparkles,
  AlertCircle, CheckCircle2, ShieldCheck, KeyRound,
  Lock, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
      setSuccessMsg(res.message || "Reset OTP dispatched to your email!");
      setTimeout(() => {
        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
      }, 1500);
    } else {
      setErrorMsg(res.message || "Failed to dispatch reset code.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lightBg via-white to-secondary-light/30 p-4 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      {/* Floating leaves */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 hidden lg:block"
      >
        <Leaf className="w-10 h-10 text-secondary/30" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-32 hidden lg:block"
      >
        <Leaf className="w-12 h-12 text-primary/20" />
      </motion.div>

      <div className="relative w-full max-w-md">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-100 rounded-3xl shadow-large overflow-hidden"
        >
          {/* Back Button */}
          <div className="px-6 pt-6">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>

          {/* Header */}
          <div className="px-6 pt-4 pb-6 text-center border-b border-gray-100">

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-darkText leading-tight">
              Forgot <span className="italic text-primary">Password?</span>
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-sm mx-auto">
              No worries! Enter your registered email and we'll send you a code to reset your password.
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-5">
            {/* Messages */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs font-medium"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-2 p-3 bg-primary-light border border-primary/20 text-primary rounded-xl text-xs font-bold"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary text-sm bg-lightBg/50 focus:bg-white transition-all"
                  />
                </div>
                <p className="text-[11px] text-gray-500 pt-1">
                  We'll send a 6-digit OTP to this email
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold transition-all hover:shadow-glow-primary disabled:opacity-55 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    Send Reset Code
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* How It Works */}
            <div className="p-4 bg-lightBg rounded-2xl border border-gray-100 space-y-3">
              <p className="text-[10px] font-bold text-darkText uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                How It Works
              </p>
              <div className="space-y-2">
                {[
                  { step: "1", text: "Enter your registered email above" },
                  { step: "2", text: "Check your inbox for the 6-digit OTP" },
                  { step: "3", text: "Use OTP to set a new password" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-[11px] text-gray-600"
                  >
                    <div className="w-5 h-5 shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                      {item.step}
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-5 border-t border-gray-100 space-y-2">
              <p className="text-xs text-gray-500">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="font-bold text-primary hover:text-primary-dark hover:underline transition-colors"
                >
                  Sign In
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                New to ReaTure?{" "}
                <Link
                  href="/auth/signup"
                  className="font-bold text-primary hover:text-primary-dark hover:underline transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 mt-6 text-[10px] text-gray-500 font-semibold">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-primary" />
            Secure Recovery
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-primary" />
            Encrypted
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1">
            <Leaf className="w-3 h-3 text-primary" />
            Trusted
          </span>
        </div>

        {/* Help Link */}
        <div className="text-center mt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-primary transition-colors"
          >
            <HelpCircle className="w-3 h-3" />
            Need help? Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}