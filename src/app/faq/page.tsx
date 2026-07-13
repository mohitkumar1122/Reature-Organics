import React from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  HelpCircle,
  Package,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  MessageSquare
} from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions (FAQ) - ReaTure Organic",
  description:
    "Find answers to queries about Ayurvedic medicine safety, WHO-GMP standards, Razorpay billing, and our 7-day return restrictions.",
};

export default function FaqPage() {
  const faqSections = [
    {
      title: "Product & Ayurvedic Quality",
      icon: ShieldCheck,
      items: [
        {
          q: "Are ReaTure Organic products safe and certified?",
          a: "Yes. All our products are formulated by experienced Ayurvedic physicians and packed in WHO-GMP certified facilities. We source standard grade herbs and conduct heavy-metal testing on every single batch to ensure ultimate purity and safety.",
        },
        {
          q: "Can I take your Ayurvedic supplements with other modern medicines?",
          a: "While Ayurvedic remedies are natural, we recommend keeping a gap of at least 60 minutes between Ayurvedic supplements and conventional modern pharmaceuticals. Please consult your physician for individualized advice.",
        },
        {
          q: "How should I store my medicines?",
          a: "Store the products in a cool, dry place away from direct sunlight. Ensure the cap is tightly closed after each use. Certain liquid formulas or fresh herbal juices may require refrigeration once opened; check individual bottle labels.",
        }
      ]
    },
    {
      title: "Payments & Order Support",
      icon: CreditCard,
      items: [
        {
          q: "What payment options do you support?",
          a: "We support multiple secure payment choices: credit cards, debit cards, UPI applications (Google Pay, PhonePe, Paytm), Net Banking, and select wallets. All transactions are securely handled by Razorpay.",
        },
        {
          q: "Is it safe to pay online on ReaTure Organic?",
          a: "Absolutely. We utilize Razorpay's PCI-DSS compliant checkout. All transaction details are encrypted using industry-standard TLS encryption. ReaTure Organic never views or stores your credit/debit card numbers on its servers.",
        },
        {
          q: "Will I get an invoice for my purchase?",
          a: "Yes. As soon as your payment is processed, a digital Tax Invoice is dispatched to your registered email address. A physical invoice copy is also packed with your delivery box.",
        }
      ]
    },
    {
      title: "Cancellations & Refunds",
      icon: RotateCcw,
      items: [
        {
          q: "How does the 7-day refund policy apply to medicines?",
          a: "You can return eligible products within 7 days of delivery. However, due to health regulations, all medicines must be completely unopened with the safety seal intact. Opened bottles or partially consumed supplements cannot be returned.",
        },
        {
          q: "How do I claim a refund for a damaged or leaking bottle?",
          a: "Please record an unboxing video when you open your parcel. If you find any damaged caps or leaks, email the video along with your Order ID to support@reatureorganic.com within 48 hours. We will issue a free replacement or complete refund.",
        },
        {
          q: "When will the refund amount reflect in my account?",
          a: "Once the quality inspection team accepts your return, refunds are processed within 24-48 hours. Depending on the payment method: UPI returns take 2-3 business days, while credit card/net banking refunds take 5-7 business days to credit.",
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      icon: Package,
      items: [
        {
          q: "What are your shipping rates?",
          a: "We offer Free Shipping on all orders valued above ₹500. For orders under ₹500, a flat shipping charge of ₹60 is applied at check-out.",
        },
        {
          q: "How can I track my order route?",
          a: "Once dispatched, we email and SMS your tracking ID (AWB) and a link to the tracking page. You can follow the courier route online in real-time.",
        },
        {
          q: "Do you ship internationally?",
          a: "Currently, ReaTure Organic ships exclusively within India. We are working on establishing international shipping pathways soon.",
        }
      ]
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
            <span className="text-white font-semibold">FAQ</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-5">
              <HelpCircle className="w-3 h-3 text-secondary animate-pulse-soft" />
              Information Center
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-[1.1] mb-4">
              Frequently Asked
              <span className="block text-secondary italic mt-2">Questions</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl font-sans">
              Have queries regarding product purity, shipping details, or return limitations? Browse our comprehensive FAQ directory below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        <div className="space-y-12">
          {faqSections.map((section, secIdx) => (
            <div key={secIdx} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                  <section.icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-serif font-bold text-darkText">{section.title}</h2>
              </div>

              <div className="grid gap-6">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300"
                  >
                    <h3 className="text-sm font-bold text-darkText mb-2.5 font-sans flex items-start gap-2">
                      <span className="text-primary font-serif font-extrabold text-base leading-none">Q.</span>
                      {item.q}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed pl-5 font-sans">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-16 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/5 border border-primary/10 rounded-4xl p-8 md:p-10 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary-dark flex items-center justify-center mx-auto mb-2">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-darkText">Still have queries?</h3>
          <p className="text-sm text-gray-600 max-w-xl mx-auto font-sans leading-relaxed">
            Our wellness support desk is available to assist you. Ask our Ayurvedic consultants about product dosages or track your shipping transit details.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold bg-primary text-white hover:bg-primary-dark shadow-medium transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@reatureorganic.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
