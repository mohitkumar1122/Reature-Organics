"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  verifySignupAction,
  resendVerificationOtpAction,
  isSmtpConfiguredAction,
} from "@/app/actions/authActions";
import { useCart } from "@/context/CartContext";
import {
  KeyRound, Leaf, Sparkles, AlertCircle, CheckCircle2,
  Mail, Clock, RefreshCw, ShieldCheck, AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { syncCartWithDb } = useCart();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [resending, setResending] = useState(false);
  const [smtpConfigured, setSmtpConfigured] = useState<boolean | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      router.push("/auth/signup");
    }
  }, [email, router]);

  // Check SMTP
  useEffect(() => {
    async function checkSmtp() {
      const configured = await isSmtpConfiguredAction();
      setSmtpConfigured(configured);
    }
    checkSmtp();
  }, []);

  // Auto-focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = ["", "", "", "", "", ""];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
    inputRefs.current[Math.min(pasteData.length, 5)]?.focus();
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0 || resending) return;

    setErrorMsg("");
    setSuccessMsg("");
    setResending(true);

    try {
      const res = await resendVerificationOtpAction(email);
      if (res.success) {
        setSuccessMsg(res.message || "A new verification code has been sent!");
        setResendTimer(30);
      } else {
        setErrorMsg(res.message || "Failed to resend verification code.");
      }
    } catch (err) {
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit OTP code.");
      return;
    }

    setLoading(true);
    const res = await verifySignupAction(email, otpCode);
    if (res.success) {
      setSuccessMsg("Account verified successfully! Logging you in...");
      await syncCartWithDb();

      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    } else {
      setErrorMsg(res.message || "Invalid or expired OTP.");
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
          {/* Header */}
          <div className="bg-gradient-to-br from-primary-light to-secondary-light/40 px-6 py-8 text-center border-b border-gray-100">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark text-white flex items-center justify-center shadow-medium mb-4"
            >
              <Mail className="w-7 h-7" />
            </motion.div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/10 mb-3">
              <Sparkles className="w-3 h-3" />
              Almost Done
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-darkText leading-tight">
              Verify Your <span className="italic text-primary">Email</span>
            </h2>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              We sent a 6-digit code to
              <br />
              <span className="font-bold text-darkText">{email}</span>
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-5">
            {/* Dev Mode Notification */}
            {smtpConfigured === false && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-800 leading-relaxed"
              >
                <p className="font-bold flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Development Sandbox Notice
                </p>
                <p>
                  SMTP not configured. The OTP is logged in your{" "}
                  <span className="font-bold underline">terminal console</span>.
                </p>
              </motion.div>
            )}

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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <label className="text-xs font-bold text-darkText uppercase tracking-wider text-center block">
                  Enter Verification Code
                </label>

                {/* 6 Individual OTP Inputs */}
                <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold tabular-nums bg-lightBg/50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
                    />
                  ))}
                </div>

                <p className="text-[11px] text-gray-500 text-center">
                  💡 Tip: You can paste the OTP code
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold transition-all hover:shadow-glow-primary disabled:opacity-55 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Verify Account
                  </>
                )}
              </button>
            </form>

            {/* Resend Section */}
            <div className="text-center pt-5 border-t border-gray-100 space-y-3">
              <div>
                {resendTimer > 0 ? (
                  <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    Resend code in{" "}
                    <span className="font-bold text-darkText tabular-nums">
                      {resendTimer}s
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={resending}
                    className="inline-flex items-center gap-1.5 font-bold text-primary hover:text-primary-dark hover:underline transition-all disabled:opacity-50 text-xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
                    {resending ? "Sending..." : "Resend Verification Code"}
                  </button>
                )}
              </div>

              <div className="text-xs text-gray-500">
                Wrong email?{" "}
                <button
                  onClick={() => router.push("/auth/signup")}
                  className="font-bold text-primary hover:text-primary-dark hover:underline transition-colors"
                >
                  Register again
                </button>
              </div>
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
            <Mail className="w-3 h-3 text-primary" />
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}