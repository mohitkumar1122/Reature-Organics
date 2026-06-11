"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifySignupAction, resendVerificationOtpAction, isSmtpConfiguredAction } from "@/app/actions/authActions";
import { useCart } from "@/context/CartContext";
import { KeyRound } from "lucide-react";

export default function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { syncCartWithDb } = useCart();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [resending, setResending] = useState(false);
  const [smtpConfigured, setSmtpConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

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

  useEffect(() => {
    if (!email) {
      router.push("/auth/signup");
    }
  }, [email, router]);

  useEffect(() => {
    async function checkSmtp() {
      const configured = await isSmtpConfiguredAction();
      setSmtpConfigured(configured);
    }
    checkSmtp();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!otp) {
      setErrorMsg("Please enter the 6-digit OTP code.");
      return;
    }

    setLoading(true);
    const res = await verifySignupAction(email, otp);
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
    <div className="max-w-md mx-auto my-16 px-6 py-8 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mx-auto">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-darkText">Verify Email</h2>
        <p className="text-xs text-gray-500">
          We sent a verification OTP to <span className="font-semibold text-darkText">{email}</span>.
        </p>
      </div>

      {/* Dev Mode Notification */}
      {smtpConfigured === false && (
        <div className="p-3.5 bg-amber-50/80 border border-amber-100/60 rounded-2xl text-[11px] text-amber-800 leading-relaxed">
          <p className="font-bold flex items-center gap-1.5 mb-0.5">⚠️ Development Sandbox Notice</p>
          Since local SMTP credentials are not configured, the generated verification OTP has been printed directly to your <span className="font-bold underline">npm run dev terminal console logs</span>.
        </div>
      )}

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
          <label className="font-bold text-gray-700 block text-center">Verification Code (6-Digits)</label>
          <input
            type="text"
            required
            placeholder="e.g. 123456"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-center tracking-widest text-lg font-bold bg-gray-50/50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-all shadow-md disabled:opacity-55"
        >
          {loading ? "Verifying..." : "Verify Account"}
        </button>
      </form>

      <div className="text-center pt-2 text-xs space-y-3">
        <div className="border-t border-gray-100 pt-4">
          {resendTimer > 0 ? (
            <span className="text-gray-400">
              Didn't receive the code? Resend in <span className="font-bold text-darkText">{resendTimer}s</span>
            </span>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={resending}
              className="font-bold text-primary hover:underline transition-all disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend Verification Code"}
            </button>
          )}
        </div>

        <div className="text-gray-400">
          <span>Wrong email? </span>
          <button onClick={() => router.push("/auth/signup")} className="font-bold text-primary hover:underline">
            Register again
          </button>
        </div>
      </div>
    </div>
  );
}
