import React, { Suspense } from "react";
import ResetPasswordContent from "@/components/auth/ResetPasswordContent";

export const metadata = {
  title: "Reset Password - Reature Organic",
  description: "Set a new password for your Ayurvedic wellness store account.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto my-16 px-6 py-8 text-center text-xs text-gray-400 bg-white border border-gray-100 rounded-3xl shadow-sm">Loading password reset screen...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
