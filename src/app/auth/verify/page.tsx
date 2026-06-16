import React, { Suspense } from "react";
import VerifyOtpContent from "@/components/auth/VerifyOtpContent";
import { Leaf, Mail } from "lucide-react";

export const metadata = {
  title: "Verify Account - ReaTure Organic",
  description: "Verify your email verification code to access your customer dashboard.",
};

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lightBg via-white to-secondary-light/30 p-4">
      <div className="relative w-full max-w-md">
        {/* Card skeleton */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-large overflow-hidden">
          <div className="bg-gradient-to-br from-primary-light to-secondary-light/40 px-6 py-8 border-b border-gray-100">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/40 flex items-center justify-center mb-4 animate-pulse">
              <Mail className="w-7 h-7 text-white/60" />
            </div>
            <div className="h-6 w-44 mx-auto bg-white/40 rounded-full animate-pulse mb-2" />
            <div className="h-3 w-56 mx-auto bg-white/40 rounded-full animate-pulse" />
          </div>

          <div className="p-6 md:p-8 space-y-5">
            <div className="space-y-3">
              <div className="h-3 w-40 mx-auto bg-gray-100 rounded-full animate-pulse" />
              <div className="flex gap-2 justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-14 bg-gray-100 rounded-xl animate-pulse"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>
            <div className="h-12 bg-primary/30 rounded-full animate-pulse" />
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6 font-medium">
          Loading verification screen...
        </p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyOtpContent />
    </Suspense>
  );
}