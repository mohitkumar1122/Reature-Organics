import React, { Suspense } from "react";
import LoginContent from "@/components/auth/LoginContent";
import { Leaf, Lock } from "lucide-react";

export const metadata = {
  title: "Login - ReaTure Organic",
  description: "Access your premium Ayurvedic wellness profile.",
};

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lightBg via-white to-secondary-light/30 p-4 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo placeholder */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-medium animate-pulse">
              <Leaf className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Card skeleton */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-large overflow-hidden">
          {/* Header skeleton */}
          <div className="bg-gradient-to-br from-primary-light to-secondary-light/40 px-6 py-8 text-center border-b border-gray-100">
            <div className="h-5 w-32 mx-auto bg-white/40 rounded-full animate-pulse mb-3" />
            <div className="h-8 w-52 mx-auto bg-white/40 rounded-full animate-pulse mb-2" />
            <div className="h-3 w-64 mx-auto bg-white/40 rounded-full animate-pulse" />
          </div>

          <div className="p-6 md:p-8 space-y-5">
            {/* Mode switcher skeleton */}
            <div className="grid grid-cols-2 gap-1 bg-lightBg p-1 rounded-2xl border border-gray-100">
              <div className="h-10 bg-white rounded-xl animate-pulse" />
              <div className="h-10 bg-transparent rounded-xl" />
            </div>

            {/* Email field skeleton */}
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            </div>

            {/* Password field skeleton */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-3 w-16 bg-gray-100 rounded-full animate-pulse" />
              </div>
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            </div>

            {/* Remember me skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-40 bg-gray-100 rounded-full animate-pulse" />
            </div>

            {/* Submit button skeleton */}
            <div className="h-12 bg-gradient-to-r from-primary/30 to-primary-dark/30 rounded-full animate-pulse" />

            {/* Footer skeleton */}
            <div className="text-center pt-5 border-t border-gray-100">
              <div className="h-3 w-56 mx-auto bg-gray-100 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500 font-semibold">
            Loading login screen...
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-gray-400 font-semibold">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Secure
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1">
            <Leaf className="w-3 h-3" />
            Trusted
          </span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <LoginContent />
    </Suspense>
  );
}