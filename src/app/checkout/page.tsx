"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCart } from "@/context/CartContext";
import { getCurrentUserAction } from "@/app/actions/authActions";
import { addAddressAction, createCodOrderAction, createRazorpayOrderAction, verifyRazorpayPaymentAction } from "@/app/actions/orderActions";
import { MapPin, Phone, User, CreditCard, ShieldCheck, Plus, Check } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, couponCode, tax, shipping, total, clearCart } = useCart();

  const [user, setUser] = useState<any>(null);
  const [selectedAddressIdx, setSelectedAddressIdx] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "razorpay">("cod");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Address creation form states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // Verify authentication session and cart
  useEffect(() => {
    async function loadCheckoutData() {
      const currentUser = await getCurrentUserAction();
      if (!currentUser) {
        // Redirect to login with callback
        router.push("/auth/login?redirect=/checkout");
        return;
      }
      setUser(currentUser);
      
      // Select default address if exists
      const defaultIdx = currentUser.addresses?.findIndex((addr: any) => addr.isDefault) ?? 0;
      setSelectedAddressIdx(defaultIdx > -1 ? defaultIdx : 0);
    }

    if (cart.length === 0) {
      router.push("/cart");
    } else {
      loadCheckoutData();
    }
  }, [cart]);

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!newAddress.name || !newAddress.phone || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postalCode) {
      setErrorMsg("All address fields are required.");
      return;
    }

    setLoading(true);
    const res = await addAddressAction(newAddress);
    if (res.success) {
      // Reload user data
      const updatedUser = await getCurrentUserAction();
      setUser(updatedUser);
      setShowAddressForm(false);
      setNewAddress({
        label: "Home",
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
      });
      // Select the newly added address (last in array)
      if (updatedUser && updatedUser.addresses) {
        setSelectedAddressIdx(updatedUser.addresses.length - 1);
      }
    } else {
      setErrorMsg(res.message || "Failed to save address.");
    }
    setLoading(false);
  };

  const handlePlaceOrder = async () => {
    setErrorMsg("");
    if (!user || !user.addresses || user.addresses.length === 0) {
      setErrorMsg("Please add a shipping address first.");
      return;
    }

    const shippingAddress = user.addresses[selectedAddressIdx];
    const orderItems = cart.map((item) => ({
      product: item.product._id,
      title: item.product.title,
      quantity: item.quantity,
      price: Math.round(item.product.price * (1 - item.product.discountPercentage / 100)),
      image: item.product.images?.[0] || "",
    }));

    setLoading(true);

    if (paymentMethod === "cod") {
      const res = await createCodOrderAction({
        items: orderItems,
        shippingAddress: {
          name: shippingAddress.name,
          phone: shippingAddress.phone,
          street: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country || "India",
        },
        couponCode: couponCode || undefined,
        paymentMethod: "cod",
      });

      if (res.success) {
        await clearCart();
        router.push(`/checkout/success?id=${res.orderId}`);
      } else {
        setErrorMsg(res.message || "Failed to place Cash on Delivery order.");
      }
      setLoading(false);
    } else {
      // Razorpay Checkout
      const res = await createRazorpayOrderAction({
        items: orderItems,
        shippingAddress: {
          name: shippingAddress.name,
          phone: shippingAddress.phone,
          street: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country || "India",
        },
        couponCode: couponCode || undefined,
        paymentMethod: "razorpay",
      });

      if (!res.success || !res.razorpayOrder) {
        setErrorMsg(res.message || "Failed to create payment order.");
        setLoading(false);
        return;
      }

      const orderData = res.razorpayOrder;

      // Launch Razorpay overlay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Reature Organic",
        description: "Payment for Ayurvedic Remedies",
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await verifyRazorpayPaymentAction(
              {
                items: orderItems,
                shippingAddress: {
                  name: shippingAddress.name,
                  phone: shippingAddress.phone,
                  street: shippingAddress.street,
                  city: shippingAddress.city,
                  state: shippingAddress.state,
                  postalCode: shippingAddress.postalCode,
                  country: shippingAddress.country || "India",
                },
                couponCode: couponCode || undefined,
                paymentMethod: "razorpay",
              },
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.success) {
              await clearCart();
              router.push(`/checkout/success?id=${verifyRes.orderId}`);
            } else {
              setErrorMsg(verifyRes.message || "Payment verification failed.");
            }
          } catch (e: any) {
            setErrorMsg("Payment verify error: " + e.message);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingAddress.phone,
        },
        theme: {
          color: "#00843D",
        },
      };

      try {
        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          setErrorMsg("Payment failed: " + response.error.description);
          setLoading(false);
        });
        rzp.open();
      } catch (e) {
        setErrorMsg("Failed to open Razorpay overlay. Check SDK Script load.");
        setLoading(false);
      }
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm text-gray-500">
        Loading checkout session...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Load Razorpay script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <h1 className="text-3xl font-serif font-bold text-darkText">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Columns: Address and Payments choice */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Shipping Address Section */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <h3 className="font-serif font-bold text-lg text-darkText flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Shipping Address
              </h3>
              {!showAddressForm && (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline bg-primary-light px-3 py-1.5 rounded-full"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New
                </button>
              )}
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-medium">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Form to add address */}
            {showAddressForm && (
              <form onSubmit={handleAddressSubmit} className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">Label (e.g. Home, Work)</label>
                    <input
                      type="text"
                      placeholder="Home"
                      value={newAddress.label}
                      onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">Recipient Name</label>
                    <input
                      type="text"
                      placeholder="Recipient Full Name"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">Phone Number</label>
                    <input
                      type="text"
                      placeholder="10-digit number"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">Postal / PIN Code</label>
                    <input
                      type="text"
                      placeholder="e.g. 122002"
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Street Address</label>
                  <input
                    type="text"
                    placeholder="House number, flat, building name, area"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">State</label>
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-primary text-white hover:bg-primary-dark rounded-full font-bold"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* List of saved addresses */}
            {user.addresses && user.addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.addresses.map((addr: any, idx: number) => (
                  <div
                    key={addr._id}
                    onClick={() => setSelectedAddressIdx(idx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedAddressIdx === idx
                        ? "border-primary bg-primary-light/30 shadow-sm"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                        {addr.label}
                      </span>
                      {selectedAddressIdx === idx && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-bold text-darkText flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-gray-400" /> {addr.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-gray-400" /> {addr.phone}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              !showAddressForm && (
                <div className="p-8 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-3xl space-y-3">
                  <p>No shipping addresses saved on your profile.</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="px-4 py-2 bg-primary text-white rounded-full font-bold"
                  >
                    Add Shipping Address
                  </button>
                </div>
              )
            )}
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-lg text-darkText flex items-center gap-2 border-b border-gray-50 pb-4">
              <CreditCard className="w-5 h-5 text-primary" /> Payment Method
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* COD */}
              <div
                onClick={() => setPaymentMethod("cod")}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                  paymentMethod === "cod"
                    ? "border-primary bg-primary-light/30 shadow-sm"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  paymentMethod === "cod" ? "border-primary bg-primary text-white" : "border-gray-300"
                }`}>
                  {paymentMethod === "cod" && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-darkText">Cash on Delivery (COD)</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Pay in cash when parcel is delivered</p>
                </div>
              </div>

              {/* Razorpay */}
              <div
                onClick={() => setPaymentMethod("razorpay")}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                  paymentMethod === "razorpay"
                    ? "border-primary bg-primary-light/30 shadow-sm"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  paymentMethod === "razorpay" ? "border-primary bg-primary text-white" : "border-gray-300"
                }`}>
                  {paymentMethod === "razorpay" && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-darkText">Razorpay Online Payment</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Pay securely using Cards, UPI, NetBanking</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-xs">
            <h3 className="font-serif font-bold text-sm text-darkText border-b border-gray-50 pb-3">
              Order Summary
            </h3>

            {/* Cart products list */}
            <div className="space-y-4 divide-y divide-gray-50 max-h-60 overflow-y-auto pr-2">
              {cart.map((item) => {
                const itemPrice = Math.round(item.product.price * (1 - item.product.discountPercentage / 100));
                return (
                  <div key={item.product._id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.product.images?.[0]}
                      alt={item.product.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-50 bg-gray-50"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate text-darkText">{item.product.title}</p>
                      <p className="text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-darkText shrink-0">Rs. {itemPrice * item.quantity}</span>
                  </div>
                );
              })}
            </div>

            {/* Calculation list */}
            <div className="space-y-2.5 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>Rs. {Math.round(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-secondary font-bold">
                  <span>Coupon Discount</span>
                  <span>-Rs. {Math.round(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>GST (5%)</span>
                <span>Rs. {tax}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Charges</span>
                <span>{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
              </div>
            </div>

            <div className="flex justify-between text-base font-extrabold text-darkText pt-4 border-t border-gray-100">
              <span>Grand Total</span>
              <span className="text-primary">Rs. {total}</span>
            </div>

            {/* Verification label */}
            <div className="flex items-center gap-2 p-3 bg-[#F8FAF7] rounded-xl border border-gray-100 text-[10px] text-gray-500 leading-normal">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
              <span>We secure your transactional credentials using 256-bit bank-grade SSL encryption technologies.</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading || cart.length === 0}
              className="w-full py-3 bg-primary text-white hover:bg-primary-dark rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-55 disabled:cursor-not-allowed"
            >
              {loading ? "Processing Order..." : "Confirm & Pay"}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
