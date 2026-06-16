import React from "react";
import { dbConnect } from "@/lib/db";
import { seedDatabase } from "@/lib/seedData";
import { Banner } from "@/lib/models/Banner";
import { Category } from "@/lib/models/Category";
import { Product } from "@/lib/models/Product";
import { Blog } from "@/lib/models/Blog";
import HeroCarousel from "@/components/home/HeroCarousel";
import CountdownTimer from "@/components/home/CountdownTimer";
import HomeClient from "@/components/home/HomeClient";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowRight, Sparkles, Quote, Calendar, Clock, User } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";


export default async function HomePage() {
  await dbConnect();
  await seedDatabase();

  const bannersData = await Banner.find({ isActive: true }).sort({ order: 1 });
  const categoriesData = await Category.find({}).limit(12).sort({ name: 1 });
  const featuredProductsData = await Product.find({ isFeatured: true }).populate("category").limit(4);
  const topSellingProductsData = await Product.find({}).sort({ reviewsCount: -1 }).populate("category").limit(4);
  const newArrivalProductsData = await Product.find({}).sort({ createdAt: -1 }).populate("category").limit(4);
  const blogsData = await Blog.find({}).sort({ createdAt: -1 }).limit(3);

  const banners = JSON.parse(JSON.stringify(bannersData));
  const categories = JSON.parse(JSON.stringify(categoriesData));
  const featuredProducts = JSON.parse(JSON.stringify(featuredProductsData));
  const topSellingProducts = JSON.parse(JSON.stringify(topSellingProductsData));
  const newArrivalProducts = JSON.parse(JSON.stringify(newArrivalProductsData));
  const blogs = JSON.parse(JSON.stringify(blogsData));

  const trustIndicators = [
    { title: "100% Ayurvedic", desc: "No artificial chemicals", icon: "Leaf" },
    { title: "GMP Certified", desc: "Highest standards", icon: "ShieldCheck" },
    { title: "Secure Payment", desc: "Encrypted checkout", icon: "Lock" },
    { title: "Fast Delivery", desc: "Shipped in 24 hours", icon: "Truck" },
    { title: "Easy Returns", desc: "7-day guarantee", icon: "RefreshCw" },
  ];

  const testimonials = [
    {
      name: "Ramesh Kumar",
      location: "Mumbai",
      rating: 5,
      text: "The KSM-66 Ashwagandha is incredible. My daily fatigue is gone and my sleep has improved dramatically.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    },
    {
      name: "Sneha Patel",
      location: "Ahmedabad",
      rating: 5,
      text: "I use Neem & Aloe Vera Gel daily. It cleared my acne in just two weeks! Extremely gentle on skin.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
    },
    {
      name: "Dr. Alok Sharma",
      location: "Delhi",
      rating: 5,
      text: "As a doctor, I highly recommend ReaTure Organic. Their extraction methodology preserves active alkaloids.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150",
    },
  ];

  return (
    <div className="overflow-hidden">
      
      {/* Hero Carousel Section */}
      <section className="pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroCarousel banners={banners} />
        </div>
      </section>

      {/* Trust Indicators - Premium Floating Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-large border border-primary/5 p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {trustIndicators.map((item, i) => {
              const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;
              return (
                <div
                  key={i}
                  className="flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left group px-2 md:px-4 pt-4 md:pt-0 first:pt-0"
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-primary-light to-secondary-light flex items-center justify-center text-primary group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-darkText">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shop By Category - Premium */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full border border-primary/10">
            <Sparkles className="w-3 h-3" />
            Curated Collections
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-darkText mt-5 leading-tight">
            Shop By <span className="text-primary italic">Category</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
            Explore targeted healing categories curated for complete mind-body equilibrium.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat: any, idx: number) => {
            const IconComponent = (Icons as any)[cat.icon] || Icons.Leaf;
            return (
              <Link
                key={cat._id}
                href={`/shop?category=${cat.slug}`}
                className="group relative flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-3xl hover:border-primary/30 hover:shadow-medium transition-all duration-500 text-center overflow-hidden"
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light/0 to-secondary-light/0 group-hover:from-primary-light group-hover:to-secondary-light/50 transition-all duration-500" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-light to-secondary-light text-primary flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xs md:text-sm text-darkText mt-4 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h4>
                  <span className="block mt-2 text-[10px] text-gray-400 font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Product Grids */}
      <HomeClient
        featuredProducts={featuredProducts}
        topSellingProducts={topSellingProducts}
        newArrivalProducts={newArrivalProducts}
      />

      {/* Seasonal Offers - Premium */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#003D1B] text-white p-8 md:p-16 shadow-large">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-[120px] opacity-30 translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary rounded-full filter blur-[100px] opacity-20 -translate-x-20 translate-y-20" />
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                Limited Time Campaign
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                Seasonal Wellness Sale
                <span className="block text-secondary mt-2">Get Flat 15% Off!</span>
              </h2>
              <p className="text-sm md:text-base text-gray-200 max-w-md leading-relaxed">
                Fortify your seasonal immunity with our premium herbal collection. Apply coupon{" "}
                <span className="inline-block bg-white/20 backdrop-blur-sm font-bold px-3 py-1 rounded-lg font-mono text-secondary border border-white/20">
                  WELCOME15
                </span>{" "}
                at checkout on orders above ₹499.
              </p>
              
              <CountdownTimer />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4 lg:items-end">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-secondary text-white hover:bg-white hover:text-primary shadow-glow transition-all duration-300 hover:scale-105 w-full lg:w-auto"
              >
                Claim Offer Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shop?featured=true"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 w-full lg:w-auto"
              >
                View Featured
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials - Premium */}
      <section className="py-20 bg-gradient-to-b from-lightBg via-white to-lightBg relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full border border-primary/10">
              <Icons.Heart className="w-3 h-3" />
              Customer Love
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-darkText mt-5 leading-tight">
              Trusted By <span className="text-primary italic">Thousands</span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-4">
              See how our natural remedies are transforming lives and restoring wellness everyday.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="group relative p-8 bg-white rounded-3xl border border-gray-100 hover:border-primary/20 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-2 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-medium rotate-[-6deg] group-hover:rotate-0 transition-transform">
                  <Quote className="w-5 h-5 fill-current" />
                </div>

                <div className="space-y-4 flex-grow pt-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Icons.Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <img
                      src={test.image}
                      alt={test.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-light"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                      <Icons.Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-darkText">{test.name}</h4>
                    <span className="text-[11px] text-gray-500 font-medium">
                      Verified Buyer • {test.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Blog - Premium */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full border border-primary/10">
              <Icons.BookOpen className="w-3 h-3" />
              Wellness Education
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-darkText mt-5 leading-tight">
              Health & <span className="text-primary italic">Wellness</span> Blog
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-4">
              Discover ancient wisdom and modern science for a balanced life.
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-light text-primary text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300 shrink-0"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog: any, idx: number) => (
            <article
              key={blog._id}
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 flex flex-col h-full hover:-translate-y-2"
            >
              <Link href={`/blog/${blog.slug}`} className="block relative h-56 overflow-hidden bg-gray-50">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-primary border border-primary/10 shadow-sm">
                  {blog.category}
                </span>

                {/* Read Time Badge */}
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold bg-darkText/80 backdrop-blur-sm text-white">
                  <Clock className="w-3 h-3" />
                  {blog.readTime} min
                </span>
              </Link>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <Link href={`/blog/${blog.slug}`} className="block">
                    <h3 className="font-serif font-bold text-lg text-darkText group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {blog.content}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-[10px] font-bold">
                      {blog.author?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{blog.author}</span>
                  </div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary group/link"
                  >
                    Read
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Instagram-style Brand Strip */}
      <section className="py-12 bg-gradient-to-r from-primary via-primary-dark to-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold">Join Our Wellness Tribe</h3>
              <p className="text-sm text-gray-200 mt-2">Follow @reatureorganic for daily wellness tips & exclusive offers</p>
            </div>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-primary text-sm font-bold hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <FaInstagram className="w-4 h-4" />
              Follow on Instagram
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}