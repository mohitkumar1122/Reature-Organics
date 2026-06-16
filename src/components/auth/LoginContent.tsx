"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  loginAction,
  sendLoginOtpAction,
  verifyLoginOtpAction,
} from "@/app/actions/authActions";
import {
  Mail, Lock, Eye, EyeOff, KeyRound, Sparkles,
  ShieldCheck, Leaf, ArrowRight, AlertCircle, CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [loginMode, setLoginMode] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (!email || !password) {
      setErrorMsg("Please enter email and password.");
      return;
    }

    setLoading(true);
    const res = await loginAction({ email, password });
    if (res.success) {
      router.push(redirectUrl);
      router.refresh();
    } else if (res.requiresVerification) {
      setErrorMsg(res.message);
      setTimeout(
        () =>
          router.push(`/auth/verify?email=${encodeURIComponent(email)}`),
        1500
      );
    } else {
      setErrorMsg(res.message || "Login failed.");
      setLoading(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (!email) {
      setErrorMsg("Please enter email.");
      return;
    }

    setLoading(true);
    const res = await sendLoginOtpAction(email);
    if (res.success) {
      setOtpSent(true);
      setSuccessMsg(res.message || "OTP sent to email.");
    } else {
      setErrorMsg(res.message || "Failed to send OTP.");
    }
    setLoading(false);
  };

  const handleVerifyOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (!otp) {
      setErrorMsg("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    const res = await verifyLoginOtpAction(email, otp);
    if (res.success) {
      router.push(redirectUrl);
      router.refresh();
    } else {
      setErrorMsg(res.message || "Failed to verify OTP.");
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

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-100 rounded-3xl shadow-large overflow-hidden"
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-primary-light to-secondary-light/40 px-6 py-8 text-center border-b border-gray-100">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/10 mb-3">
              <Sparkles className="w-3 h-3" />
              Welcome Back
            </span>
            <h2 className="font-serif text-3xl font-bold text-darkText leading-tight">
              Sign In to <span className="italic text-primary">ReaTure</span>
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              Access your premium Ayurvedic wellness profile
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-5">
            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-1 bg-lightBg p-1 rounded-2xl border border-gray-100 text-xs font-bold">
              <button
                onClick={() => {
                  setLoginMode("password");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  loginMode === "password"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-500 hover:text-darkText"
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                Password
              </button>
              <button
                onClick={() => {
                  setLoginMode("otp");
                  setErrorMsg("");
                  setSuccessMsg("");
                  setOtpSent(false);
                }}
                className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  loginMode === "otp"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-500 hover:text-darkText"
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                OTP Login
              </button>
            </div>

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

            {/* Password Login Form */}
            <AnimatePresence mode="wait">
              {loginMode === "password" && (
                <motion.form
                  key="password-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handlePasswordLogin}
                  className="space-y-4"
                >
                  {/* Email */}
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
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                        Password
                      </label>
                      <Link
                        href="/auth/forgot-password"
                        className="text-[11px] font-bold text-primary hover:text-primary-dark hover:underline transition-colors"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-12 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary text-sm bg-lightBg/50 focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                    />
                    <label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer">
                      Remember me for 30 days
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold transition-all hover:shadow-glow-primary disabled:opacity-55 flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {loginMode === "otp" && (
                <motion.div
                  key="otp-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  {!otpSent ? (
                    <form onSubmit={handleRequestOtp} className="space-y-4">
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
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold transition-all hover:shadow-glow-primary disabled:opacity-55 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending OTP...
                          </>
                        ) : (
                          <>
                            <KeyRound className="w-4 h-4" />
                            Send OTP Code
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtpLogin} className="space-y-4">
                      <div className="text-center bg-primary-light/40 p-4 rounded-2xl border border-primary/10">
                        <p className="text-xs text-gray-600">
                          Code sent to{" "}
                          <span className="font-bold text-darkText">{email}</span>
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-darkText uppercase tracking-wider text-center block">
                          Enter 6-Digit OTP
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="• • • • • •"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                          className="w-full px-4 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary text-center tracking-[0.5em] text-2xl font-bold bg-lightBg/50 focus:bg-white transition-all tabular-nums"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-full font-bold transition-all hover:shadow-glow-secondary disabled:opacity-55 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Verify & Sign In
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setOtp("");
                        }}
                        className="w-full text-xs text-gray-500 hover:text-primary hover:underline transition-colors"
                      >
                        ← Change email address
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="text-center pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                New to ReaTure Organic?{" "}
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

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 mt-6 text-[10px] text-gray-500 font-semibold">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-primary" />
            Secure
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
      </div>
    </div>
  );
}