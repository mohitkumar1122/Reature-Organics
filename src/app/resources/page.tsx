import React from "react";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import { Resource } from "@/lib/models/Resource";
import {
  Download, Video, FileText, ExternalLink, HelpCircle,
  Sparkles, BookOpen, Play, FileType, Search, ArrowRight,
  Home, ChevronRight, Leaf, GraduationCap,
} from "lucide-react";

export const metadata = {
  title: "Resources & Education - ReaTure Organic",
  description:
    "Download Ayurvedic product catalogs, usage guides, wellness brochures, and view herbal tutorials.",
};

export default async function ResourcesPage() {
  await dbConnect();

  const resources = await Resource.find({}).sort({ createdAt: -1 });

  const pdfResources = resources.filter((r) => r.type === "pdf");
  const videoResources = resources.filter(
    (r) => r.type === "video" || r.category === "Tutorial"
  );

  const faqs = [
    {
      q: "What makes ReaTure Organic different from other Ayurvedic brands?",
      a: "We vertically source organic, wild-harvested herbs and utilize standardized green extraction methodologies that preserve natural alkaloid concentrations, certified under WHO-GMP protocols.",
    },
    {
      q: "How should I store herbal powders and tablets?",
      a: "Store in a cool, dry place away from direct sunlight. Ensure container lids are tightly closed immediately after use to protect ingredients from atmospheric humidity.",
    },
    {
      q: "Do your liquid syrups contain sugar bases?",
      a: "Our traditional syrups use minor amounts of organic unrefined jaggery or wild honey as natural excipients. We offer sugar-free variants for diabetic patients.",
    },
    {
      q: "Can I take multiple Ayurvedic supplements together?",
      a: "While most of our formulations are designed to complement each other, we recommend consulting our certified Ayurvedic experts for personalized guidance on combinations.",
    },
    {
      q: "What is the shelf life of your products?",
      a: "Most of our products have a shelf life of 24-36 months from the date of manufacturing. Specific expiry details are mentioned on each product label.",
    },
    {
      q: "Are your products suitable for pregnant or lactating women?",
      a: "We strongly recommend consulting with a healthcare provider before consuming any herbal supplements during pregnancy or lactation.",
    },
  ];

  const categories = [
    {
      icon: FileType,
      title: "Product Catalogs",
      count: pdfResources.length,
      color: "from-primary to-primary-dark",
    },
    {
      icon: Play,
      title: "Video Tutorials",
      count: videoResources.length || 2,
      color: "from-secondary to-secondary-dark",
    },
    {
      icon: BookOpen,
      title: "Wellness Guides",
      count: 12,
      color: "from-primary to-secondary",
    },
    {
      icon: GraduationCap,
      title: "Expert Articles",
      count: 25,
      color: "from-secondary to-primary",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-lightBg via-white to-lightBg min-h-screen">
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
            <span className="text-white font-semibold">Resources</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-5">
              <BookOpen className="w-3 h-3 text-secondary" />
              Knowledge Center
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-serif font-bold leading-[1.1] mb-4">
              Learn, Heal &
              <span className="block text-secondary italic mt-2">Thrive Naturally</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl">
              Access expert-curated guides, video tutorials, and educational materials to deepen your Ayurvedic wisdom journey.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Resource Categories */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group bg-white p-6 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-medium transition-all duration-500 hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all`}
              >
                <cat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-darkText font-serif">{cat.count}</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                {cat.title}
              </p>
            </div>
          ))}
        </section>

        {/* PDF & Video Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PDF Downloads */}
          <section className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
            <div className="bg-gradient-to-r from-primary-light to-secondary-light/40 px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-darkText">
                    Downloadable Guides
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">PDF format • Printable</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {pdfResources.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary-light flex items-center justify-center mb-4">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm text-darkText font-bold">No manuals uploaded yet</p>
                  <p className="text-xs text-gray-500 mt-1">Check back soon for new resources</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pdfResources.map((res) => (
                    <div
                      key={res._id}
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-primary/20 hover:bg-primary-light/30 transition-all"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary-light text-primary mb-1">
                          {res.category}
                        </span>
                        <h4 className="font-bold text-darkText text-sm leading-snug line-clamp-1">
                          {res.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {res.description}
                        </p>
                      </div>

                      <a
                        href={res.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full text-xs font-bold transition-all shrink-0"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Get</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Video Tutorials */}
          <section className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
            <div className="bg-gradient-to-r from-secondary-light/40 to-primary-light px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark text-white flex items-center justify-center shadow-sm">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-darkText">
                    Video Tutorials
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">Expert demonstrations</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {videoResources.length === 0 ? (
                <div className="space-y-3">
                  {[
                    {
                      cat: "Usage Guide",
                      title: "How to consume Chyawanprash correctly",
                      desc: "Expert video showing correct timings and dosage with warm milk.",
                    },
                    {
                      cat: "Therapy",
                      title: "Ayurvedic Daily Wellness Ritual (Dinacharya)",
                      desc: "Comprehensive walk-through of the ancient morning wellness routines.",
                    },
                  ].map((vid, i) => (
                    <a
                      key={i}
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-secondary/20 hover:bg-secondary-light/30 transition-all"
                    >
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-white shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary-dark mb-1">
                          {vid.cat}
                        </span>
                        <h4 className="font-bold text-darkText text-sm leading-snug line-clamp-1">
                          {vid.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {vid.desc}
                        </p>
                      </div>

                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-secondary transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {videoResources.map((res) => (
                    <a
                      key={res._id}
                      href={res.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-secondary/20 hover:bg-secondary-light/30 transition-all"
                    >
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-white shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary-dark mb-1">
                          {res.category}
                        </span>
                        <h4 className="font-bold text-darkText text-sm leading-snug">
                          {res.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">{res.description}</p>
                      </div>

                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-secondary transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full border border-primary/10">
              <HelpCircle className="w-3 h-3" />
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-darkText mt-5 leading-tight">
              Frequently Asked <span className="text-primary italic">Questions</span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-4">
              Find answers to commonly asked questions about our products and Ayurveda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white p-5 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-soft transition-all duration-300 cursor-pointer"
              >
                <summary className="flex items-start gap-3 list-none">
                  <div className="w-8 h-8 shrink-0 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold text-xs font-serif group-open:bg-primary group-open:text-white transition-colors">
                    Q
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-darkText group-hover:text-primary transition-colors">
                      {faq.q}
                    </h4>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0 mt-1" />
                </summary>
                <div className="mt-4 pl-11 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA: Need More Help */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#003D1B] text-white p-8 md:p-12 shadow-large">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-[120px] opacity-30 translate-x-20 -translate-y-20" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <Leaf className="w-10 h-10 text-secondary" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight">
                Still Have Questions?
              </h2>
              <p className="text-sm text-gray-200">
                Our Ayurvedic experts are here to help you on your wellness journey. Get personalized guidance today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-secondary text-white hover:bg-white hover:text-primary transition-all shadow-glow-secondary"
              >
                Contact Expert
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}