"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getOrderDetailsAction } from "@/app/actions/orderActions";
import {
  CheckCircle2, FileText, ArrowRight, Printer, AlertTriangle,
  Package, Truck, MapPin, Phone, Calendar, CreditCard,
  Sparkles, Leaf, Home, ChevronRight, Mail, Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trigger multiple confetti bursts
    const fire = () => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6, x: 0.3 },
        colors: ["#00843D", "#8BC61F", "#ffffff"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6, x: 0.7 },
          colors: ["#00843D", "#8BC61F", "#ffffff"],
        });
      }, 200);
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.5 },
          colors: ["#00843D", "#8BC61F", "#ffffff"],
        });
      }, 400);
    };
    fire();
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lightBg to-white">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading your order receipt...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lightBg to-white p-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl shadow-large border border-gray-100">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-50 text-amber-500 flex items-center justify-center border-2 border-amber-100">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-bold text-darkText">
              Receipt Not Found
            </h2>
            <p className="text-sm text-gray-500">
              The requested transaction details were not found or you are unauthorized.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold shadow-medium hover:shadow-glow-primary transition-all"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const orderSteps = [
    { label: "Order Placed", icon: CheckCircle2, completed: true },
    { label: "Processing", icon: Package, completed: order.orderStatus !== "pending" },
    { label: "Shipped", icon: Truck, completed: order.orderStatus === "shipped" || order.orderStatus === "delivered" },
    { label: "Delivered", icon: CheckCircle2, completed: order.orderStatus === "delivered" },
  ];

  return (
    <div className="bg-gradient-to-b from-lightBg via-white to-lightBg min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-[72px] z-30 no-print">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Home className="w-3 h-3" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <Link href="/dashboard/orders" className="hover:text-primary transition-colors">
              Orders
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-darkText font-semibold">Order Confirmation</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 space-y-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-5"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
            className="relative inline-flex"
          >
            <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative inline-flex items-center justify-center p-5 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-large">
              <CheckCircle2 className="w-16 h-16" strokeWidth={2.5} />
            </div>
          </motion.div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full border border-primary/10">
              <Sparkles className="w-3 h-3" />
              Order Confirmed
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-darkText leading-tight text-balance">
              Thank You for Your <span className="italic text-primary">Order!</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto">
              Your prescription is being lovingly prepared by our Ayurvedic experts.
            </p>
          </div>

          {/* Order Number */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-gray-100 shadow-soft">
            <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center text-primary">
              <Package className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                Order Number
              </p>
              <p className="text-sm font-bold text-darkText font-mono tabular-nums">
                #{order.invoiceNumber}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6 md:p-8"
        >
          <h3 className="font-serif font-bold text-lg text-darkText mb-6 text-center">
            Order Progress
          </h3>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-100 rounded-full hidden md:block" />
            <div
              className="absolute top-6 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full hidden md:block transition-all duration-1000"
              style={{
                width: `${(orderSteps.filter((s) => s.completed).length - 1) * 33.33}%`,
              }}
            />

            {/* Steps */}
            <div className="grid grid-cols-4 gap-2 relative">
              {orderSteps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step.completed
                        ? "bg-gradient-to-br from-primary to-primary-dark text-white shadow-medium"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                    {step.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + i * 0.15 }}
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-secondary border-2 border-white flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                  <p
                    className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${
                      step.completed ? "text-darkText" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Delivery */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-600">
            <Truck className="w-4 h-4 text-primary" />
            <span>Expected delivery in</span>
            <span className="font-bold text-primary">3-5 business days</span>
          </div>
        </motion.div>

        {/* Invoice Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          id="printable-invoice"
          className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden"
        >
          {/* Invoice Header */}
          <div className="bg-gradient-to-br from-primary-light to-secondary-light/40 px-6 md:px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-sm">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-darkText">
                    ReaTure Organic
                  </h3>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    Gurugram, Haryana, India
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                  Invoice
                </p>
                <p className="text-sm font-bold text-primary font-mono tabular-nums">
                  #{order.invoiceNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Shipping & Transaction Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-darkText uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-primary" />
                  Shipping Address
                </div>
                <div className="p-4 bg-lightBg rounded-2xl border border-gray-100 space-y-1 text-sm">
                  <p className="font-bold text-darkText">{order.shippingAddress.name}</p>
                  <p className="text-gray-600">{order.shippingAddress.street}</p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-600 flex items-center gap-1.5 pt-2 border-t border-gray-200">
                    <Phone className="w-3 h-3 text-primary" />
                    {order.shippingAddress.phone}
                  </p>
                </div>
              </div>

              {/* Transaction */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-darkText uppercase tracking-wider">
                  <CreditCard className="w-4 h-4 text-primary" />
                  Transaction Details
                </div>
                <div className="p-4 bg-lightBg rounded-2xl border border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-xs">Date</span>
                    <span className="font-semibold text-darkText text-xs">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-xs">Payment</span>
                    <span className="font-semibold text-darkText text-xs uppercase">
                      {order.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-500 text-xs">Status</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full uppercase">
                      <CheckCircle2 className="w-3 h-3" />
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-darkText uppercase tracking-wider">
                <Package className="w-4 h-4 text-primary" />
                Order Items ({order.items.length})
              </div>

              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-lightBg">
                    <tr className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3 text-center">Qty</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {order.items.map((item: any) => (
                      <tr
                        key={item.product}
                        className="hover:bg-lightBg/50 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <p className="font-bold text-darkText">{item.title}</p>
                        </td>
                        <td className="px-4 py-4 text-center text-gray-600 tabular-nums">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 text-right text-gray-600 tabular-nums">
                          ₹{item.price}
                        </td>
                        <td className="px-4 py-4 text-right font-bold text-darkText tabular-nums">
                          ₹{item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full md:w-80 space-y-2 p-5 bg-gradient-to-br from-primary-light/40 to-secondary-light/30 rounded-2xl border border-primary/10">
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-secondary-dark font-bold text-sm">
                    <span>Voucher Discount</span>
                    <span className="tabular-nums">-₹{order.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>GST Tax (5%)</span>
                  <span className="tabular-nums">₹{order.taxAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="tabular-nums">
                    {order.shippingCharge === 0 ? (
                      <span className="text-primary font-bold">FREE</span>
                    ) : (
                      `₹${order.shippingCharge}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-primary/20">
                  <span className="text-base font-bold text-darkText">Total Paid</span>
                  <span className="text-2xl font-extrabold text-primary tabular-nums">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6 md:p-8 no-print"
        >
          <h3 className="font-serif font-bold text-lg text-darkText mb-5">
            What Happens Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Mail,
                title: "Confirmation Email",
                desc: "Order details sent to your inbox",
              },
              {
                icon: Package,
                title: "Order Processing",
                desc: "We'll prepare your wellness items",
              },
              {
                icon: Truck,
                title: "Shipping Updates",
                desc: "Track via SMS & email",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl bg-lightBg border border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-darkText">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 no-print"
        >
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full border-2 border-gray-100 bg-white hover:border-primary hover:text-primary text-xs font-bold text-gray-600 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" /> Print Invoice
          </button>

          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full border-2 border-gray-100 bg-white hover:border-primary hover:text-primary text-xs font-bold text-gray-600 transition-all shadow-sm"
          >
            <FileText className="w-4 h-4" /> View All Orders
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold transition-all shadow-medium hover:shadow-glow-primary"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}