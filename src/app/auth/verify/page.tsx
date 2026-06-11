import React, { Suspense } from "react";
import VerifyOtpContent from "@/components/auth/VerifyOtpContent";

export const metadata = {
  title: "Verify Account - Reature Organic",
  description: "Verify your email verification code to access your customer dashboard.",
};

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto my-16 px-6 py-8 text-center text-xs text-gray-400 bg-white border border-gray-100 rounded-3xl shadow-sm">Loading verification screen...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
