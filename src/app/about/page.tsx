import React from "react";
import { ShieldCheck, Heart, Leaf, Medal, Award, CheckCircle } from "lucide-react";

export const metadata = {
  title: "About Our Brand - Reature Organic",
  description: "Learn about Reature Organic, our vertical supply chains, WHO-GMP processing certified facilities, and our dedication to organic herbal quality.",
};

export default function AboutPage() {
  const metrics = [
    { title: "10,000+", desc: "Happy Wellness Families" },
    { title: "100%", desc: "Clinically Verified Herbs" },
    { title: "WHO-GMP", desc: "Certified Standard Processing" },
    { title: "45+", desc: "Potent Herbal Formulations" },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Story Hero */}
      <section className="relative bg-[#00843D] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200')" }} />
        <div className="max-w-4xl mx-auto text-center px-4 space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 border border-white/20 px-3 py-1 rounded-full text-white">
            Our Heritage
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
            Ancient Wisdom, Modern Wellness
          </h1>
          <p className="text-sm md:text-base text-gray-100 max-w-xl mx-auto leading-relaxed">
            Reature Organic was founded to bridge the gap between traditional Indian Ayurvedic pharmacology and contemporary scientific validation.
          </p>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
          <div className="h-96 w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600"
              alt="Founder of Reature Organic"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6 text-xs text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-2.5 py-1 rounded-full">
              Leadership
            </span>
            <h2 className="text-3xl font-serif font-bold text-darkText leading-tight">
              Dr. Vasudev Shastri, Founder
            </h2>
            <p>
              Dr. Vasudev Shastri completed his post-graduation in Ayurvedic Pharmacology (Dravyaguna Vijnana) from the Gujarat Ayurved University, Jamnagar. Observing a lack of consistency and clinical purity in D2C wellness brands, he established Reature Organic in 2021.
            </p>
            <p>
              Under his guidance, our research lab standardizes active constituents like Withanolides in Ashwagandha, Bacosides in Brahmi, and Guggulsterones in Guggul, ensuring every tablet provides exact biological doses.
            </p>
            
            <div className="flex gap-4 pt-4 border-t border-gray-50">
              <div>
                <span className="block font-bold text-darkText text-sm">20+ Years</span>
                <span className="text-gray-400">Clinical Research</span>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <span className="block font-bold text-darkText text-sm">WHO Guidelines</span>
                <span className="text-gray-400">Strict Quality Adherence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-serif font-bold text-darkText">Why Seek Reature Organic?</h2>
          <p className="text-xs text-gray-500 mt-2">Our commitment to soil safety and quality sets our remedies apart.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-darkText">Authentic Ingredients</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              We source raw herbs exclusively from pesticide-free, organic vertical farms across specialized geographical tracts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-darkText">GMP Certification</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every formulation is packed inside WHO-GMP certified, sterile laboratories, conforming strictly to dynamic pharmacopoeial benchmarks.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-darkText">Biocompatible & Vegan</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              100% plant-derived capsules, gluten-free, with zero synthetic binders, magnesium stearates, or chemical preservatives.
            </p>
          </div>

        </div>
      </section>

      {/* Certifications and metrics */}
      <section className="bg-white py-16 border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <div key={i} className="text-center space-y-2">
              <span className="block text-3xl md:text-4xl font-extrabold text-primary font-sans">{m.title}</span>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{m.desc}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
