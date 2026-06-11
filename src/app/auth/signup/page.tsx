"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupAction } from "@/app/actions/authActions";
import { Mail, Lock, User, ShieldCheck, Phone } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name || !email || !password || !phone) {
      setErrorMsg("All fields are required.");
      return;
    }

    setLoading(true);
    const res = await signupAction({ name, email, password, phone });
    if (res.success) {
      setSuccessMsg(res.message || "Registration OTP generated!");
      // Redirect to verification
      setTimeout(() => {
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
      }, 1500);
    } else {
      setErrorMsg(res.message || "Failed to sign up.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 px-6 py-8 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-6">
      
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-darkText">Join Reature Organic</h2>
        <p className="text-xs text-gray-500 mt-1">Begin your healing journey with natural Ayurveda.</p>
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
          <label className="font-bold text-gray-700 block">Full Name</label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-gray-50/50 focus:bg-white"
            />
            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-gray-700 block">Phone Number</label>
          <div className="relative">
            <input
              type="tel"
              required
              placeholder="e.g. +91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-gray-50/50 focus:bg-white"
            />
            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>
        </div>

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
          <label className="font-bold text-gray-700 block">Password</label>
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
          {loading ? "Registering..." : "Create Account"}
        </button>
      </form>

      {/* Redirect footer */}
      <div className="text-center pt-4 border-t border-gray-100 text-xs">
        <span className="text-gray-400">Already have an account? </span>
        <Link href="/auth/login" className="font-bold text-primary hover:underline">
          Login Instead
        </Link>
      </div>

    </div>
  );
}
