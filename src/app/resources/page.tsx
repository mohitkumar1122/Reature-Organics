import React from "react";
import { dbConnect } from "@/lib/db";
import { Resource } from "@/lib/models/Resource";
import { Download, Video, FileText, ExternalLink, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Resources & Education - Reature Organic",
  description: "Download Ayurvedic product catalogs, usage guides, wellness brochures, and view herbal tutorials.",
};

export default async function ResourcesPage() {
  await dbConnect();

  const resources = await Resource.find({}).sort({ createdAt: -1 });

  // Separate PDF manuals vs Video tutorials
  const pdfResources = resources.filter((r) => r.type === "pdf");
  const videoResources = resources.filter((r) => r.type === "video" || r.category === "Tutorial");

  const faqs = [
    { q: "What makes Reature Organic different from other Ayurvedic brands?", a: "We vertically source organic, wild-harvested herbs and utilize standardized green extraction methodologies that preserve natural alkaloid concentrations, certified under WHO-GMP protocols." },
    { q: "How should I store herbal powders and tablets?", a: "Store in a cool, dry place away from direct sunlight. Ensure container lids are tightly closed immediately after use to protect ingredients from atmospheric humidity." },
    { q: "Do your liquid syrups contain sugar bases?", a: "Our traditional syrups use minor amounts of organic unrefined jaggery or wild honey as natural excipients. We offer sugar-free variants for diabetic patients." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1.5 rounded-full">
          Downloads & Learning
        </span>
        <h1 className="text-4xl font-serif font-bold text-darkText">Resource Center</h1>
        <p className="text-sm text-gray-500">
          Access printable dosage manuals, digital product brochures, and health awareness videos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* PDF Downloads column */}
        <section className="space-y-6 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-darkText flex items-center gap-2 border-b border-gray-50 pb-4">
            <FileText className="w-6 h-6 text-primary" /> Guides & Brochures (PDF)
          </h2>

          {pdfResources.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No manuals uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {pdfResources.map((res) => (
                <div
                  key={res._id}
                  className="p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary-light text-primary">
                      {res.category}
                    </span>
                    <h4 className="font-bold text-darkText text-sm leading-snug">{res.title}</h4>
                    <p className="text-gray-500 leading-normal">{res.description}</p>
                  </div>
                  
                  <a
                    href={res.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-primary-light text-primary hover:bg-primary hover:text-white rounded-full transition-all shrink-0"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Video Library column */}
        <section className="space-y-6 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-darkText flex items-center gap-2 border-b border-gray-50 pb-4">
            <Video className="w-6 h-6 text-primary" /> Video Tutorials
          </h2>

          {videoResources.length === 0 ? (
            // Display clean sample tutorials if empty
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-secondary/10 text-secondary">
                    Usage Guide
                  </span>
                  <h4 className="font-bold text-darkText text-sm leading-snug">How to consume Chyawanprash correctly</h4>
                  <p className="text-gray-500">Expert video showing correct timings and dosage with warm milk.</p>
                </div>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  className="p-3 bg-secondary/10 text-secondary rounded-full hover:bg-secondary hover:text-white transition-all shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-secondary/10 text-secondary">
                    Therapy
                  </span>
                  <h4 className="font-bold text-darkText text-sm leading-snug">Ayurvedic Daily Wellness Ritual (Dinacharya)</h4>
                  <p className="text-gray-500">Comprehensive walk-through of the ancient morning wellness routines.</p>
                </div>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  className="p-3 bg-secondary/10 text-secondary rounded-full hover:bg-secondary hover:text-white transition-all shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {videoResources.map((res) => (
                <div
                  key={res._id}
                  className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-secondary/10 text-secondary">
                      {res.category}
                    </span>
                    <h4 className="font-bold text-darkText text-sm">{res.title}</h4>
                    <p className="text-gray-500">{res.description}</p>
                  </div>
                  
                  <a
                    href={res.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary/10 text-secondary rounded-full hover:bg-secondary hover:text-white transition-all shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* FAQ Center */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-8 max-w-4xl mx-auto">
        <h3 className="font-serif font-bold text-3xl text-darkText text-center flex items-center justify-center gap-2">
          <HelpCircle className="w-8 h-8 text-primary" /> FAQ Center
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {faqs.map((faq, i) => (
            <div key={i} className="space-y-2 text-xs">
              <h4 className="font-bold text-sm text-darkText flex gap-1.5">
                <span className="text-primary font-serif">Q.</span> {faq.q}
              </h4>
              <p className="text-gray-500 leading-relaxed pl-4 border-l border-primary-light">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
