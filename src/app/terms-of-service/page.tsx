import React from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Scale,
  Activity,
  AlertCircle,
  CreditCard,
  HeartHandshake
} from "lucide-react";

export const metadata = {
  title: "Terms of Service - ReaTure Organic",
  description:
    "Read our terms of service, user agreements, payment terms, and critical medical disclaimers for purchasing Ayurvedic formulations.",
};

export default function TermsOfServicePage() {
  const coreTerms = [
    {
      icon: Scale,
      title: "User Obligations",
      desc: "Users must be at least 18 years old or browsing under parent supervision to buy medical wellness products.",
    },
    {
      icon: Activity,
      title: "Medical Disclaimer",
      desc: "Our Ayurvedic descriptions are for information only and do not replace professional clinical consultations.",
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      desc: "Payments are processed securely through Razorpay. Orders dispatch post authorization clearance.",
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
            <span className="text-white font-semibold">Terms of Service</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-5">
              <HeartHandshake className="w-3 h-3 text-secondary" />
              Acceptance of Terms
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-[1.1] mb-4">
              Terms &
              <span className="block text-secondary italic mt-2">Conditions</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl font-sans">
              Welcome to ReaTure Organic. By accessing or shopping on our website, you agree to comply with and be bound by the following terms of use.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Core Terms Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -mt-20 relative z-20">
          {coreTerms.map((item, idx) => (
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

        {/* Legal Text Layout */}
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed font-sans">
          
          {/* CRITICAL MEDICAL DISCLAIMER CALLOUT */}
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/80 shadow-inner-soft">
            <h3 className="text-lg font-serif font-bold text-amber-800 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700" />
              CRITICAL MEDICAL DISCLAIMER
            </h3>
            <p className="text-xs text-amber-900 leading-relaxed">
              All herbal supplements, Ayurvedic medicines, guidelines, articles, and recommendations listed on this platform are intended for informational purposes and general wellness support. 
              <strong> They have not been evaluated to substitute medical diagnoses, expert clinical prescriptions, or therapies by qualified healthcare practitioners.</strong>
            </p>
            <p className="text-xs text-amber-900 leading-relaxed mt-2.5">
              Do not use the details on this site to self-diagnose or self-treat health disorders. If you suffer from underlying cardiovascular, renal, hepatic, diabetic, or hormonal concerns, consult with your primary care physician before beginning any alternative Ayurvedic regimen.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              1. Acceptance & Usage License
            </h2>
            <p className="text-sm mb-3">
              By visiting our platform or initiating purchases, you participate in our &quot;Service&quot; and consent to accept these terms and conditions, including secondary policy links referenced herein.
            </p>
            <p className="text-sm">
              We grant you a restricted, non-transferable, revocable license to access information on our domain solely for individual shopping purposes. Any copy, scrap, reproduction, or commercial distribution of site layouts, product catalogs, or illustrations without written consent from ReaTure Organic is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              2. Purchasing and Secured Billing via Razorpay
            </h2>
            <p className="text-sm mb-3">
              When checking out, you represent that all information shared (such as contact addresses and recipient names) is current, valid, and accurate.
            </p>
            <p className="text-sm mb-3">
              For online transactions, the final price is gathered immediately through our payment aggregator, <strong>Razorpay</strong>. We offer credit cards, debit cards, net banking, and UPI interfaces.
            </p>
            <p className="text-sm font-semibold mb-3">
              We reserve the right to cancel orders or limit buying volumes if we detect suspicious transacting indicators, bulk arbitrage attempts, or unauthorized retail distributions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              3. Accuracy of Descriptions and Batch Variances
            </h2>
            <p className="text-sm mb-3">
              Because our formulations are manufactured from natural botanical ingredients, variations in color, consistency, odor, or taste may occur from batch to batch. These differences do not signify a decline in quality, but rather verify the raw, organic roots of our materials.
            </p>
            <p className="text-sm">
              While we attempt to list product details and specifications as accurately as possible, we do not warrant that all images, ingredient statements, and descriptions are entirely error-free.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              4. Governing Law & Dispute Resolution
            </h2>
            <p className="text-sm">
              These terms are regulated by the laws of India. Any disputes arising out of your purchases or operations on the website will be exclusively tried under the jurisdiction of courts in Gurugram, Haryana.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
