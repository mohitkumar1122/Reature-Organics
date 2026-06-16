"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupAction } from "@/app/actions/authActions";
import {
  Mail, Lock, User, ShieldCheck, Phone, Eye, EyeOff,
  Sparkles, Leaf, AlertCircle, CheckCircle2, ArrowRight,
  Check, Gift, Heart, Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Password strength checker
  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
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

    if (!name || !email || !password || !phone) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg("Please agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);
    const res = await signupAction({ name, email, password, phone });
    if (res.success) {
      setSuccessMsg(res.message || "Registration OTP generated!");
      setTimeout(() => {
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
      }, 1500);
    } else {
      setErrorMsg(res.message || "Failed to sign up.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lightBg via-white to-secondary-light/30 p-4 py-10 relative overflow-hidden">
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

      <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Benefits (Desktop Only) */}
        <div className="hidden lg:block space-y-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-medium">
                <Leaf className="w-7 h-7" />
              </div>
            </Link>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full border border-primary/10 mb-4">
              <Sparkles className="w-3 h-3" />
              Welcome Offer
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-darkText leading-[1.1] mb-4 text-balance">
              Start Your <span className="italic text-primary">Wellness</span> Journey
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Join 10,000+ families experiencing the power of authentic Ayurvedic remedies.
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="space-y-3">
            {[
              {
                icon: Gift,
                title: "Get 15% Off",
                desc: "Welcome discount on your first order",
                color: "from-primary to-primary-dark",
              },
              {
                icon: Heart,
                title: "Free Shipping",
                desc: "On orders above ₹500",
                color: "from-secondary to-secondary-dark",
              },
              {
                icon: Star,
                title: "Earn Rewards",
                desc: "Points on every purchase",
                color: "from-amber-400 to-amber-600",
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} text-white flex items-center justify-center shadow-sm shrink-0`}
                >
                  <benefit.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-darkText">{benefit.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            {[
              { value: "10K+", label: "Customers" },
              { value: "4.9★", label: "Rating" },
              { value: "100%", label: "Authentic" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100"
              >
                <p className="text-xl font-serif font-bold text-primary tabular-nums">
                  {stat.value}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Mobile Logo */}
          <div className="text-center mb-6 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-medium">
                <Leaf className="w-7 h-7" />
              </div>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-100 rounded-3xl shadow-large overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-light to-secondary-light/40 px-6 py-6 text-center border-b border-gray-100">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/10 mb-2">
                <Sparkles className="w-3 h-3" />
                Create Account
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-darkText leading-tight">
                Join <span className="italic text-primary">ReaTure</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1.5">
                Begin your healing journey today
              </p>
            </div>

            <div className="p-6 md:p-7 space-y-4">
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
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary text-sm bg-lightBg/50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                      Email
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

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                      Phone
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary text-sm bg-lightBg/50 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Choose a strong password"
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

                  {/* Password Strength */}
                  {password && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              i < passwordStrength
                                ? strengthColors[passwordStrength - 1]
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      {passwordStrength > 0 && (
                        <p className="text-[10px] font-semibold flex items-center justify-between">
                          <span className="text-gray-500">Strength:</span>
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

                  {/* Quick Password Tips */}
                  <div className="grid grid-cols-2 gap-1 pt-1 text-[10px]">
                    {[
                      { check: password.length >= 8, label: "8+ chars" },
                      { check: /[A-Z]/.test(password), label: "Uppercase" },
                      { check: /[0-9]/.test(password), label: "Number" },
                      { check: /[^A-Za-z0-9]/.test(password), label: "Special" },
                    ].map((req, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-1 transition-colors ${
                          req.check ? "text-primary" : "text-gray-400"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            req.check ? "opacity-100" : "opacity-30"
                          }`}
                        />
                        {req.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-2 cursor-pointer group pt-1">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary/30 cursor-pointer"
                  />
                  <span className="text-[11px] text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary font-bold hover:underline"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary font-bold hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold transition-all hover:shadow-glow-primary disabled:opacity-55 flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-bold text-primary hover:text-primary-dark hover:underline transition-colors"
                  >
                    Sign In Instead
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 mt-6 text-[10px] text-gray-500 font-semibold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-primary" />
              Secure Signup
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-primary" />
              Data Protected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}