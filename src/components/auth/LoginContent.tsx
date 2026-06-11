"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAction, sendLoginOtpAction, verifyLoginOtpAction } from "@/app/actions/authActions";
import { Mail, Lock } from "lucide-react";

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [loginMode, setLoginMode] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

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
      setTimeout(() => router.push(`/auth/verify?email=${encodeURIComponent(email)}`), 1500);
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
    <div className="max-w-md mx-auto my-16 px-6 py-8 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-darkText">Welcome Back</h2>
        <p className="text-xs text-gray-500 mt-1">Access your premium Ayurvedic wellness profile.</p>
      </div>

      <div className="grid grid-cols-2 gap-1 bg-gray-50 p-1 rounded-2xl border border-gray-200/50 text-xs font-bold">
        <button
          onClick={() => {
            setLoginMode("password");
            setErrorMsg("");
            setSuccessMsg("");
          }}
          className={`py-2 rounded-xl transition-all ${
            loginMode === "password" ? "bg-white text-primary shadow-sm" : "text-gray-500"
          }`}
        >
          Password Login
        </button>
        <button
          onClick={() => {
            setLoginMode("otp");
            setErrorMsg("");
            setSuccessMsg("");
          }}
          className={`py-2 rounded-xl transition-all ${
            loginMode === "otp" ? "bg-white text-primary shadow-sm" : "text-gray-500"
          }`}
        >
          OTP Login
        </button>
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

      {loginMode === "password" && (
        <form onSubmit={handlePasswordLogin} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-gray-50/50 focus:bg-white"
              />
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-700">Password</label>
              <Link href="/auth/forgot-password" className="text-[10px] font-bold text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-gray-50/50 focus:bg-white"
              />
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-all shadow-md disabled:opacity-55"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      )}

      {loginMode === "otp" && (
        <div className="space-y-4 text-xs">
          {!otpSent ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
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
                {loading ? "Sending OTP..." : "Get OTP via Email"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtpLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">Enter 6-Digit OTP</label>
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
                className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white rounded-full font-bold transition-all shadow-md disabled:opacity-55"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-gray-400 hover:text-darkText hover:underline"
              >
                Change Email
              </button>
            </form>
          )}
        </div>
      )}

      <div className="text-center pt-4 border-t border-gray-100 text-xs">
        <span className="text-gray-400">New to Reature Organic? </span>
        <Link href="/auth/signup" className="font-bold text-primary hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
}
