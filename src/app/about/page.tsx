import React from "react";
import Link from "next/link";
import {
  ShieldCheck, Heart, Leaf, Medal, Award, CheckCircle,
  Sparkles, Quote, Calendar, Microscope, Users, Globe,
  TrendingUp, ArrowRight, Target, Eye, Compass, BookOpen,
  Home, ChevronRight,  Briefcase,
} from "lucide-react";

export const metadata = {
  title: "About Our Brand - ReaTure Organic",
  description:
    "Learn about ReaTure Organic, our vertical supply chains, WHO-GMP processing certified facilities, and our dedication to organic herbal quality.",
};

export default function AboutPage() {
  const metrics = [
  { title: "25+", desc: "Years of Leadership", icon: Users },
  { title: "100%", desc: "Real & Natural", icon: Leaf },
  { title: "PAN India", desc: "Business Network", icon: Globe },
  { title: "Direct Selling", desc: "Business Opportunity", icon: Briefcase }, 
];

  const values = [
    {
      icon: Leaf,
      title: "Authentic Ingredients",
      desc: "We source raw herbs exclusively from pesticide-free, organic vertical farms across specialized geographical tracts.",
      gradient: "from-primary-light to-secondary-light",
    },
    {
      icon: ShieldCheck,
      title: "GMP Certification",
      desc: "Every formulation is packed inside WHO-GMP certified, sterile laboratories, conforming strictly to dynamic pharmacopoeial benchmarks.",
      gradient: "from-secondary-light to-primary-light",
    },
    {
      icon: Heart,
      title: "Biocompatible & Vegan",
      desc: "100% plant-derived capsules, gluten-free, with zero synthetic binders, magnesium stearates, or chemical preservatives.",
      gradient: "from-primary-light to-secondary-light",
    },
    {
      icon: Microscope,
      title: "Scientific Validation",
      desc: "Each batch undergoes rigorous HPLC testing to standardize active alkaloid concentrations for guaranteed potency.",
      gradient: "from-secondary-light to-primary-light",
    },
    {
      icon: Globe,
      title: "Sustainable Sourcing",
      desc: "We partner with 500+ farmers across India to support sustainable, regenerative agricultural practices.",
      gradient: "from-primary-light to-secondary-light",
    },
    {
      icon: Award,
      title: "Award Winning",
      desc: "Recognized by leading wellness associations for our commitment to authenticity and clinical excellence.",
      gradient: "from-secondary-light to-primary-light",
    },
  ];
}

  const timeline = [
    {
      year: "2021",
      title: "The Beginning",
      desc: "Founded by Dr. Vasudev Shastri with a vision to bridge ancient Ayurveda with modern science.",
    },
    {
      year: "2022",
      title: "WHO-GMP Certification",
      desc: "Achieved WHO-GMP certification for our state-of-the-art manufacturing facility in Gujarat.",
    },
    {
      year: "2023",
      title: "100+ Formulations",
      desc: "Launched 100+ clinically validated formulations targeting comprehensive wellness conditions.",
    },
    {
      year: "2024",
      title: "Global Recognition",
      desc: "Expanded operations to serve 10,000+ families globally with premium Ayurvedic remedies.",
    },
  ];

  const team = [
    {
      name: "Dr. Vasudev Shastri",
      role: "Founder & Chief Formulator",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400",
      qual: "Ph.D. Dravyaguna Vijnana",
    },
    {
      name: "Dr. Priya Sharma",
      role: "Head of R&D",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400",
      qual: "M.D. Rasashastra",
    },
    {
      name: "Mr. Arjun Mehta",
      role: "Quality Assurance Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
      qual: "B.Pharm, MBA",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-lightBg via-white to-lightBg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#003D1B] text-white">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/70" />

        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-white/70 mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home className="w-3 h-3" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">About Us</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
              <Sparkles className="w-3 h-3 text-secondary" />
              Our Heritage Since 2021
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-[1.1]">
              Ancient Wisdom,
              <span className="block text-secondary italic mt-2">Modern Wellness</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl leading-relaxed">
              ReaTure Organic was founded to bridge the gap between traditional Indian Ayurvedic pharmacology and contemporary scientific validation.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-secondary text-white hover:bg-white hover:text-primary transition-all duration-300 shadow-glow-secondary"
              >
                Explore Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80H1440V40C1440 40 1080 0 720 0C360 0 0 40 0 40V80Z" fill="rgb(248, 250, 247)" />
          </svg>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-large border border-primary/5 p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="text-center px-4 group pt-6 md:pt-0 first:pt-0"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-primary-light to-secondary-light text-primary flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <m.icon className="w-5 h-5" />
                </div>
                <p className="text-3xl md:text-4xl font-extrabold text-primary font-serif">
                  {m.title}
                </p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story / Founder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Founder Image with decorative frame */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 rounded-3xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-3xl -z-10" />

            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-large">
              <img
                src="https://res.cloudinary.com/mjd0pqh1/image/upload/sir_ji_new_photo_y4jkjf.png"
                alt="Founder of ReaTure Organic"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darkText/60 via-transparent to-transparent" />

              {/* Floating quote card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-medium">
                <Quote className="w-5 h-5 text-secondary mb-2" />
                <p className="text-xs text-darkText italic font-serif leading-relaxed">
                  "True wellness comes from understanding nature's wisdom — not by replacing it with synthetic alternatives."
                </p>
              </div>
            </div>

            {/* Stats badge */}
            <div className="absolute top-6 right-6 bg-white p-4 rounded-2xl shadow-large border border-gray-100">
              <p className="text-2xl font-bold text-primary font-serif">25+</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                Years Experience
              </p>
            </div>
          </div>

          {/* Content */}
  <div className="space-y-6">
  {/* Badge */}
  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full border border-primary/10">
    <Users className="w-3 h-3" />
    Meet Our Leader
  </span>

  {/* Heading */}
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-darkText leading-tight">
    Yudhishthir <span className="text-primary italic">Singh</span>
  </h2>

  {/* Designation */}
  <p className="text-sm text-primary font-semibold">
    CEO & Founder
  </p>

  {/* Description */}
  <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
    <p>
      Yudhishthir Singh is a modern-day business leader with over
      25 years of experience in leadership, entrepreneurship, and
      the direct-selling industry. His clear vision and dedication
      have established him as a trusted leader committed to creating
      opportunities for thousands of people.
    </p>

    <p>
      He firmly believes that true success comes from helping others
      achieve their dreams. Through his leadership, ReaTure has built
      a strong community focused on growth, trust, quality, and
      long-term relationships.
    </p>

    <p>
      His journey reflects determination, perseverance, ethical
      business practices, and a passion for delivering natural
      healthcare products while empowering individuals to achieve
      financial independence and a better future.
    </p>
  </div>
</div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {[
 { icon: Users, label: "Experience", value: "25+ Years" },
{ icon: Briefcase, label: "Industry", value: "Direct Selling" },
{ icon: Target, label: "Mission", value: "Helping People" },
{ icon: Leaf, label: "Vision", value: "Real + Nature" },
].map((cred, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-lightBg border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                    <cred.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-darkText">{cred.value}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                      {cred.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-gradient-to-b from-primary-light/30 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-primary/10">
              <Compass className="w-3 h-3" />
              Our Compass
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-darkText mt-5 leading-tight">
              Guided By <span className="text-primary italic">Purpose</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To make authentic Ayurvedic wellness accessible to every household through clinically validated, premium-quality natural formulations.",
                color: "from-primary to-primary-dark",
              },
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To become India's most trusted Ayurvedic brand, empowering millions to live healthier, balanced lives through nature's wisdom.",
                color: "from-secondary to-secondary-dark",
              },
              {
                icon: Heart,
                title: "Our Promise",
                desc: "Every product is crafted with integrity, transparency, and an unwavering commitment to your wellness journey.",
                color: "from-primary to-secondary",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-primary/20 shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-5 shadow-medium group-hover:rotate-6 transition-transform`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-xl text-darkText mb-3">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full border border-primary/10">
            <Sparkles className="w-3 h-3" />
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-darkText mt-5 leading-tight">
            What Makes Us <span className="text-primary italic">Different</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-4">
            Our commitment to soil safety and quality sets our remedies apart from the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <div
              key={i}
              className="group relative bg-white p-7 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-medium transition-all duration-500 overflow-hidden"
            >
              {/* Hover background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
              />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-light to-secondary-light text-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                  <value.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-darkText mb-2">{value.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="bg-gradient-to-br from-darkText via-[#0a1a0c] to-[#050d06] text-white py-20 relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">
              <Calendar className="w-3 h-3" />
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-5 leading-tight">
              Milestones That <span className="text-secondary italic">Define Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50" />

            {timeline.map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all hover:-translate-y-2 duration-500">
                  {/* Year badge */}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary-dark text-white shadow-glow mb-4 -mt-12 mx-auto md:mx-0">
                    <span className="text-lg font-bold font-serif">{item.year}</span>
                  </div>

                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full border border-primary/10">
            <Users className="w-3 h-3" />
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-darkText mt-5 leading-tight">
            Experts Behind Our <span className="text-primary italic">Success</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-large transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-80 overflow-hidden bg-lightBg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkText/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6 text-center">
                <h4 className="font-serif font-bold text-lg text-darkText">{member.name}</h4>
                <p className="text-sm text-primary font-semibold mt-1">{member.role}</p>
                <p className="text-xs text-gray-500 mt-2">{member.qual}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#003D1B] text-white p-8 md:p-16 shadow-large">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-[120px] opacity-30 translate-x-20 -translate-y-20" />

          <div className="relative text-center max-w-2xl mx-auto space-y-6">
            <Leaf className="w-12 h-12 mx-auto text-secondary" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-sm md:text-base text-gray-200">
              Join thousands of families who trust ReaTure Organic for their daily wellness needs.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-secondary text-white hover:bg-white hover:text-primary shadow-glow-secondary transition-all duration-300 hover:scale-105"
            >
              Shop Our Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
