import React from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Truck,
  Clock,
  MapPin,
  ShieldCheck,
  Package,
  AlertTriangle
} from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery Policy - ReaTure Organic",
  description:
    "Review shipping charges, delivery timelines, tracking info, and transit safety protocols for shipping wellness medicines across India.",
};

export default function ShippingPolicyPage() {
  const shippingMetrics = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "Automatically active for all orders value above ₹500 across India.",
    },
    {
      icon: Clock,
      title: "Quick Dispatches",
      desc: "Medicines leave our GMP warehouses within 24 to 48 hours of payment approval.",
    },
    {
      icon: MapPin,
      title: "Pan-India Delivery",
      desc: "Delivering to over 26,000 pincodes covering cities, towns, and rural tracts.",
    }
  ];

  return (
    <div className="bg-gradient-to-b from-lightBg via-white to-lightBg min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#003D1B] text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-20 -translate-y-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -translate-x-20 translate-y-20" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-white/70 mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home className="w-3 h-3" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">Shipping Policy</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-5">
              <Truck className="w-3 h-3 text-secondary animate-bounce-soft" />
              Safe & Sanitized Shipping
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-[1.1] mb-4">
              Shipping &
              <span className="block text-secondary italic mt-2">Delivery Policy</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl font-sans">
              At ReaTure Organic, we make sure that your health supplements and medicines reach you in pristine, temperature-regulated, and sealed boxes.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Shipping Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -mt-20 relative z-20">
          {shippingMetrics.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-large hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-darkText mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Policy Text Layout */}
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed font-sans">
          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              1. Delivery Timelines
            </h2>
            <p className="text-sm mb-3">
              We process and hand over orders to our logistics partners within **24 to 48 working hours** after order placement. 
              Subsequent transit time is approximately:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Metropolitan Cities (Delhi, Mumbai, Bengaluru, Chennai, etc.):</strong> 3 to 5 business days.</li>
              <li><strong>Tier 2 & Tier 3 Cities:</strong> 4 to 6 business days.</li>
              <li><strong>North-East & Remote Regions:</strong> 5 to 7 business days.</li>
            </ul>
            <p className="text-sm mt-3">
              *Please note that public holidays and extreme weather conditions may cause minor unexpected transit delays.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              2. Shipping Charges
            </h2>
            <p className="text-sm mb-3">
              Our delivery charges are straightforward:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Orders of ₹500 or above:</strong> Free of shipping cost.</li>
              <li><strong>Orders below ₹500:</strong> Flat shipping fee of ₹60 will be applied at check-out.</li>
              <li><strong>Cash On Delivery (COD):</strong> An additional charge of ₹40 is applied as COD handling fee. COD option is available for select pincodes.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              3. Courier Logistics & Real-Time Tracking
            </h2>
            <p className="text-sm mb-3">
              We coordinate with leading logistics networks including Delhivery, BlueDart, Expressbees, and Indian Post to deliver products safely.
            </p>
            <p className="text-sm">
              Once your package leaves our warehouse, a unique AWB tracking code and courier link will be forwarded to your registered email and phone number via SMS. You can inspect the step-by-step route mapping of your parcel directly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              4. Damaged Packages & Transit Issues
            </h2>
            <p className="text-sm mb-3">
              We package capsules, tablets, and oils in shock-resistant boxes. However, if you observe signs of structural damage or fluid leakage on your parcel:
            </p>
            <p className="text-sm">
              Do not accept the delivery from the courier. If already accepted, please email your unboxing recording or photographs to <a href="mailto:support@reatureorganic.com" className="text-primary hover:underline font-semibold">support@reatureorganic.com</a> within 48 hours. We will initiate a reshipment or refund for you at no additional cost.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
