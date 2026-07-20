import React from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  ShieldCheck,
  Eye,
  Lock,
  Database,
  FileText,
  UserCheck
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy - ReaTure Organic",
  description:
    "Learn how ReaTure Organic collects, uses, and protects your personal health and payment information in compliance with Indian IT Act guidelines.",
};

export default function PrivacyPolicyPage() {
  const securityFeatures = [
    {
      icon: Eye,
      title: "Data Transparency",
      desc: "We only collect information needed to fulfill your Ayurvedic wellness orders.",
    },
    {
      icon: Lock,
      title: "Secure Payments",
      desc: "All transactions are encrypted and processed by Razorpay. We do not store card details.",
    },
    {
      icon: Database,
      title: "Encrypted Storage",
      desc: "Your medical profiles and contact details are stored under industry-standard security protocols.",
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
            <span className="text-white font-semibold">Privacy Policy</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-5">
              <ShieldCheck className="w-3 h-3 text-secondary" />
              100% Encrypted & Secure
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-[1.1] mb-4">
              Our Privacy
              <span className="block text-secondary italic mt-2">Commitment</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl font-sans">
              ReaTure Organic values the confidentiality of your health choices. We are dedicated to guarding the privacy of our patients, visitors, and customers under the Information Technology Act, 2000.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Trust Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -mt-20 relative z-20">
          {securityFeatures.map((item, idx) => (
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
              <FileText className="w-5 h-5 text-primary" />
              1. Information We Collect
            </h2>
            <p className="text-sm mb-3">
              We gather information to optimize your wellness journey. This collection happens in two ways:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Personal Data:</strong> Name, shipping address, billing address, phone number, and email address shared during checkout or account registration.
              </li>
              <li>
                <strong>Health Preferences:</strong> Dietary habits or body-constituent type (Dosha profile) that you voluntarily submit to customize your supplements.
              </li>
              <li>
                <strong>Device Data:</strong> IP address, browser type, and navigation logs tracked automatically via cookies to ensure clean web app performance.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              2. Payment Security and Third-Party Gateways
            </h2>
            <p className="text-sm mb-3">
              To offer a smooth checkout, we integrate payment APIs powered by **Razorpay Software Private Limited**.
            </p>
            <p className="text-sm mb-3">
              All payment credentials (card numbers, Net banking codes, UPI pins) are directly entered onto Razorpay's PCI-DSS compliant secure servers. ReaTure Organic does not view, collect, or store any card numbers or transactional banking passwords.
            </p>
            <p className="text-sm">
              Razorpay adheres to the standards set by PCI-SSC, which ensures secure handling of financial datasets, minimizing the likelihood of identity theft or payment frauds.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              3. How We Protect and Retain Your Data
            </h2>
            <p className="text-sm mb-3">
              We enforce SSL/TLS encryption for transmitting data between your browser and our server database. Your records are protected against unauthorized access, loss, or alteration.
            </p>
            <p className="text-sm">
              We retain personal data only for as long as is necessary to complete order fulfillments, address tax/regulatory requirements, or settle disputes. After this threshold, records are systematically scrubbed or anonymized.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary" />
              4. Cookies and Your Control
            </h2>
            <p className="text-sm mb-3">
              Cookies are small identifier files stored on your hardware. We use cookies to keep track of items in your cart and study browsing patterns.
            </p>
            <p className="text-sm">
              You can instruct your browser to block all cookies or notify you when a cookie is sent. However, disabling cookies might prevent certain components (like the Cart and checkout flows) from running correctly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              5. Contact Us Regarding Privacy
            </h2>
            <p className="text-sm">
              If you have any questions or wish to request the deletion of your personal data from our database, please contact our designated Grievance Officer at:
            </p>
            <p className="text-sm mt-3 font-semibold text-darkText">
              ReaTure Organic Support Desk
            </p>
            <p className="text-sm">
              Agra- Mathura Bypass Road, in front of Rehmatpur Garmai, near Kamalpur, Chauraha, Aligarh, Kamalpur, Uttar Pradesh 202001
            </p>
            <p className="text-sm">
              Email: <a href="Care@Reature.In" className="text-primary hover:underline font-medium">Care@Reature.In</a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
