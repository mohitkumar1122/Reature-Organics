import React, { Suspense } from "react";
import SuccessPageContent from "@/components/checkout/SuccessPageContent";

export const metadata = {
  title: "Order Success - Reature Organic",
  description: "Your order details and invoice receipt are confirmed.",
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-20 text-center text-xs text-gray-500">Loading order receipt details...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
