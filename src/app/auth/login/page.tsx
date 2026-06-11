import React, { Suspense } from "react";
import LoginContent from "@/components/auth/LoginContent";

export const metadata = {
  title: "Login - Reature Organic",
  description: "Access your premium Ayurvedic wellness profile.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto my-16 px-6 py-8 text-center text-xs text-gray-400 bg-white border border-gray-100 rounded-3xl shadow-sm">Loading login screen...</div>}>
      <LoginContent />
    </Suspense>
  );
}
