"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/app/actions/authActions";
import {
  KeyRound, Lock, ArrowLeft, Eye, EyeOff, Leaf,
  CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!email) {
      router.push("/auth/forgot-password");
    }
  }, [email, router]);

  // Password strength checker
  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(newPassword);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-500",
  ];

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lightBg via-white to-secondary-light/30 p-4 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-100 rounded-3xl shadow-large overflow-hidden"
        >
          {/* Back Button */}
          <div className="px-6 pt-6">
            <Link
              href="/auth/forgot-password"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </Link>
          </div>

          {/* Header */}
          <div className="px-6 pt-4 pb-6 text-center border-b border-gray-100">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-medium mb-4">
              <KeyRound className="w-7 h-7" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1.5 rounded-full border border-primary/10 mb-3">
              <Sparkles className="w-3 h-3" />
              Almost There
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-darkText leading-tight">
              Set New <span className="italic text-primary">Password</span>
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              Enter the OTP sent to{" "}
              <span className="font-bold text-darkText">{email}</span>
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* OTP */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                  Verification Code (6-Digits)
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

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Choose a strong password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

                {/* Password Strength */}
                {newPassword && (
                  <div className="space-y-2 pt-1">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            i < passwordStrength
                              ? strengthColors[passwordStrength - 1]
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    {passwordStrength > 0 && (
                      <p className="text-[10px] font-semibold text-gray-500 flex items-center justify-between">
                        <span>Password strength:</span>
                        <span
                          className={`font-bold ${
                            passwordStrength === 4
                              ? "text-green-600"
                              : passwordStrength === 3
                              ? "text-yellow-600"
                              : passwordStrength === 2
                              ? "text-orange-600"
                              : "text-red-600"
                          }`}
                        >
                          {strengthLabels[passwordStrength - 1]}
                        </span>
                      </p>
                    )}
                  </div>
                )}

                {/* Password Requirements */}
                <div className="grid grid-cols-2 gap-1 pt-2 text-[10px]">
                  {[
                    { check: newPassword.length >= 8, label: "8+ characters" },
                    { check: /[A-Z]/.test(newPassword), label: "Uppercase" },
                    { check: /[0-9]/.test(newPassword), label: "Number" },
                    { check: /[^A-Za-z0-9]/.test(newPassword), label: "Special char" },
                  ].map((req, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-1 ${
                        req.check ? "text-primary" : "text-gray-400"
                      }`}
                    >
                      <Check className={`w-3 h-3 ${req.check ? "opacity-100" : "opacity-30"}`} />
                      {req.label}
                    </div>
                  ))}
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
                    Updating...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Update Password
                  </>
                )}
              </button>
            </form>
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
        </div>
      </div>
    </div>
  );
}