import React from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Truck,
  DollarSign,
  FileText
} from "lucide-react";

export const metadata = {
  title: "Cancellation & Refund Policy - ReaTure Organic",
  description:
    "Review our 7-day cancellation and refund policy, including specific return guidelines and limitations for Ayurvedic and herbal medicine formulations.",
};

export default function RefundPolicyPage() {
  const highlightFeatures = [
    {
      icon: RotateCcw,
      title: "7-Day Return Window",
      desc: "Eligible unopened items can be returned within 7 days of delivery.",
      color: "text-primary",
      bg: "bg-primary-light"
    },
    {
      icon: ShieldAlert,
      title: "Medicine Restrictions",
      desc: "Due to health and safety standards, sealed packaging is strictly required for returns.",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      icon: DollarSign,
      title: "Quick Refunds",
      desc: "Processed back to your original source (UPI, Card, RPay) in 5-7 business days.",
      color: "text-secondary-dark",
      bg: "bg-secondary-light"
    }
  ];

  const policyFaqs = [
    {
      q: "Can I return a medicine bottle after opening the outer seal?",
      a: "No. For safety and hygiene reasons, we cannot accept returns for medicines where the safety seal has been broken or the packaging has been opened, even if the medicine is unused. We strictly enforce this to maintain GMP safety standards for all customers."
    },
    {
      q: "What products are completely non-returnable?",
      a: "The following items are exempt from returns: opened or used health supplements, temperature-sensitive cold storage formulations, customized Ayurvedic preparations, and loose herbal extracts."
    },
    {
      q: "What should I do if my medicine order is damaged or incorrect?",
      a: "If you receive a damaged, leaked, or wrong product, please record an unboxing video or take high-quality photos. Email these along with your order ID to support@reatureorganic.com within 48 hours of delivery. We will issue a free replacement or full refund immediately."
    },
    {
      q: "Are return shipping charges covered by ReaTure?",
      a: "Yes, if the return is due to an error on our part (damaged/incorrect product). For standard returns of unopened items, a nominal reverse shipping fee of ₹60 will be deducted from your final refund amount."
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
            <span className="text-white font-semibold">Refund Policy</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-5">
              <RotateCcw className="w-3 h-3 text-secondary" />
              Transparent Return Process
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-[1.1] mb-4">
              Cancellation &
              <span className="block text-secondary italic mt-2">Refund Policy</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl font-sans">
              Thank you for trusting ReaTure Organic. As a wellness provider, our priorities are your safety, hygiene, and complete transparency in our billing. Below is our comprehensive return and refund policy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Quick Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -mt-20 relative z-20">
          {highlightFeatures.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-large hover:border-primary/20 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-darkText mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Policy Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Policy Text - 7 Columns */}
          <div className="lg:col-span-7 space-y-8 text-gray-700 leading-relaxed font-sans">
            <div>
              <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                1. Overview of Return Rules
              </h2>
              <p className="text-sm mb-3">
                At ReaTure Organic, we guarantee that all Ayurvedic supplements and wellness formulations are packed under GMP-certified conditions. 
                Standard items can be returned within **7 days** from the date of delivery.
              </p>
              <p className="text-sm">
                To be eligible for a return, the product must be completely unused, in its original packaging, and with all protective seals intact. 
                Any packaging that shows signs of tampering, squeezing, or tearing will be rejected for reverse pick-up.
              </p>
            </div>

            {/* MEDICINE CRITICAL LIMITATIONS SECTION */}
            <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/80 shadow-inner-soft">
              <h3 className="text-lg font-serif font-bold text-amber-800 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                Special Notice: Medical & Medicine Limitations
              </h3>
              <p className="text-xs text-amber-900 leading-relaxed mb-4">
                Because medicines, herbal remedies, and dietary supplements are ingested or applied, they are governed by strict pharmaceutical and healthcare regulations in India. To prevent cross-contamination and ensure the medical safety of our community, we impose the following strict boundaries:
              </p>
              <ul className="space-y-3 text-xs text-amber-900 list-disc pl-5">
                <li>
                  <strong>Safety Seals:</strong> Under no circumstances will a refund be approved for medicines whose shrink-wrap or bottle cap seals have been broken.
                </li>
                <li>
                  <strong>Special Storage:</strong> Certain probiotics, fresh juices, and liquid extracts require cool storage conditions. We cannot accept returns of storage-sensitive items as we cannot verify their handling post-delivery.
                </li>
                <li>
                  <strong>Custom Formulations:</strong> Any wellness oils or herbal powders custom-blended by our physicians are tailored to individual health metrics and cannot be returned or refunded.
                </li>
                <li>
                  <strong>Unboxing Proof:</strong> For claims regarding missing capsules, broken bottles, or damaged seals upon delivery, you must supply a clear unboxing video or photographs sent to our customer care team.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-primary" />
                2. Order Cancellations
              </h2>
              <p className="text-sm mb-3">
                You can cancel your order free of charge at any time before it has been dispatched from our warehouse. Dispatched orders are already in the custody of our courier partners and cannot be cancelled.
              </p>
              <p className="text-sm">
                If you refuse delivery of a dispatched order, once the package is returned back to our fulfillment center, we will process a refund minus the shipping fee.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-darkText mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                3. Refund Processing & Timelines
              </h2>
              <p className="text-sm mb-3">
                Once a returned item is received at our center and passes quality check validation, the refund is initiated within **24-48 hours**.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>UPI Payments:</strong> Refund will reflect in your account within 2-3 business days.</li>
                <li><strong>Credit/Debit Cards & Net Banking:</strong> Refund will reflect in 5-7 business days depending on your bank's billing cycle.</li>
                <li><strong>COD Orders:</strong> We will request your bank account details or UPI ID to wire the refund amount directly. COD refund transactions take up to 7 business days to settle.</li>
              </ul>
            </div>
          </div>

          {/* FAQS & Help Sidebar - 5 Columns */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-cream p-6 md:p-8 rounded-3xl border border-amber-100">
              <h3 className="text-lg font-serif font-bold text-darkText mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-secondary-dark" />
                Frequently Asked Questions
              </h3>

              <div className="space-y-5">
                {policyFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-amber-200/40 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="text-xs font-bold text-darkText mb-1.5 font-sans leading-tight">
                      Q: {faq.q}
                    </h4>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help CTA */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 md:p-8 rounded-3xl border border-primary/10 space-y-4">
              <h3 className="text-lg font-serif font-bold text-primary-dark">Need Assistance?</h3>
              <p className="text-xs text-gray-700 leading-relaxed font-sans">
                Our medical and support desks are open from Monday through Saturday, between 9:00 AM and 6:00 PM.
              </p>
              <div className="space-y-2 text-xs">
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="font-semibold text-darkText">Email:</span>
                  <a href="mailto:support@reatureorganic.com" className="text-primary hover:underline font-medium">support@reatureorganic.com</a>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="font-semibold text-darkText">Phone:</span>
                  <a href="tel:+919876543210" className="text-primary hover:underline font-medium">+91 98765 43210</a>
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
