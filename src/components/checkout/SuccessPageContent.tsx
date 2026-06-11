"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getOrderDetailsAction } from "@/app/actions/orderActions";
import { CheckCircle2, FileText, ArrowRight, Printer, AlertTriangle } from "lucide-react";
import confetti from "canvas-confetti";

export default function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#00843D", "#8BC61F", "#ffffff"],
    });
  }, []);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    async function loadOrder() {
      try {
        const details = await getOrderDetailsAction(orderId!);
        setOrder(details);
      } catch (e) {
        console.error("Failed to load order:", e);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-xs text-gray-500">
        Loading order receipt details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto border border-amber-100">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-serif font-bold text-darkText">Receipt Not Found</h2>
        <p className="text-xs text-gray-500">
          The requested transaction details were not found or you are unauthorized.
        </p>
        <Link href="/" className="inline-block py-2.5 px-6 rounded-full bg-primary text-white text-xs font-bold shadow">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary-light text-primary animate-bounce">
          <CheckCircle2 className="w-14 h-14" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-darkText">
          Order Placed Successfully!
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Thank you for choosing Reature Organic. Your prescription is being processed and will be shipped shortly.
        </p>
      </div>

      <div id="printable-invoice" className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <span className="font-serif font-bold text-lg text-darkText">Reature Organic</span>
            <p className="text-gray-400 text-[10px]">Gurugram, Haryana, India</p>
          </div>
          <div className="text-right">
            <span className="font-bold text-darkText">Invoice</span>
            <p className="text-mono text-gray-500 font-bold">{order.invoiceNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-500 border-b border-gray-100 pb-4">
          <div>
            <span className="font-bold text-darkText">Shipped To:</span>
            <p className="mt-1 font-semibold text-darkText">{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
            <p className="mt-1">📞 {order.shippingAddress.phone}</p>
          </div>
          <div className="text-right">
            <span className="font-bold text-darkText">Transaction Details:</span>
            <p className="mt-1">Date: <span className="font-semibold text-darkText">{new Date(order.createdAt).toLocaleDateString()}</span></p>
            <p>Payment: <span className="font-semibold text-darkText uppercase">{order.paymentMethod}</span></p>
            <p>Status: <span className="font-bold text-green-600 uppercase">{order.paymentStatus}</span></p>
          </div>
        </div>

        <div className="space-y-4">
          <span className="font-bold text-darkText block">Remedies:</span>
          
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 text-gray-400 font-bold">
                <th className="pb-2">Description</th>
                <th className="pb-2 text-center">Qty</th>
                <th className="pb-2 text-right">Price</th>
                <th className="pb-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {order.items.map((item: any) => (
                <tr key={item.product}>
                  <td className="py-2.5 font-bold text-darkText">{item.title}</td>
                  <td className="py-2.5 text-center text-gray-500">{item.quantity}</td>
                  <td className="py-2.5 text-right text-gray-500">Rs. {item.price}</td>
                  <td className="py-2.5 text-right font-bold text-darkText">Rs. {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 pt-4 flex justify-end">
          <div className="w-64 space-y-2 text-right">
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-secondary font-bold">
                <span>Voucher Discount:</span>
                <span>-Rs. {order.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-500">
              <span>GST Tax (5%):</span>
              <span>Rs. {order.taxAmount}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping Charge:</span>
              <span>{order.shippingCharge === 0 ? "FREE" : `Rs. ${order.shippingCharge}`}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-darkText pt-2 border-t border-gray-100">
              <span>Amount Paid:</span>
              <span className="text-primary">Rs. {order.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-600 transition-colors shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print Invoice
        </button>

        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-600 transition-colors shadow-sm"
        >
          <FileText className="w-4 h-4" /> View My Orders
        </Link>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary hover:bg-primary-dark text-xs font-bold text-white transition-all shadow-md"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
