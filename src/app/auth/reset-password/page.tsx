import React, { Suspense } from "react";
import ResetPasswordContent from "@/components/auth/ResetPasswordContent";
import { Leaf } from "lucide-react";

export const metadata = {
  title: "Reset Password - ReaTure Organic",
  description: "Set a new password for your Ayurvedic wellness store account.",
};

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lightBg via-white to-secondary-light/30 p-4">
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
          <div className="bg-gradient-to-br from-primary-light to-secondary-light/40 px-6 py-8 border-b border-gray-100">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/40 animate-pulse mb-4" />
            <div className="h-6 w-40 mx-auto bg-white/40 rounded-full animate-pulse mb-2" />
            <div className="h-3 w-60 mx-auto bg-white/40 rounded-full animate-pulse" />
          </div>

          <div className="p-6 md:p-8 space-y-4">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            </div>
            <div className="h-12 bg-primary/30 rounded-full animate-pulse" />
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6 font-medium">
          Loading password reset screen...
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ResetPasswordContent />
    </Suspense>
  );
}