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

export default async function HomePage() {
  await dbConnect();
  // Auto-seed database if empty
  await seedDatabase();

  // Fetch data
  const bannersData = await Banner.find({ isActive: true }).sort({ order: 1 });
  const categoriesData = await Category.find({}).limit(12).sort({ name: 1 });
  
  // Featured, Top Selling, and New arrivals
  const featuredProductsData = await Product.find({ isFeatured: true })
    .populate("category")
    .limit(4);
  
  const topSellingProductsData = await Product.find({})
    .sort({ reviewsCount: -1 })
    .populate("category")
    .limit(4);

  const newArrivalProductsData = await Product.find({})
    .sort({ createdAt: -1 })
    .populate("category")
    .limit(4);

  const blogsData = await Blog.find({}).sort({ createdAt: -1 }).limit(3);

  // Convert mongoose documents to plain JS objects for client components
  const banners = JSON.parse(JSON.stringify(bannersData));
  const categories = JSON.parse(JSON.stringify(categoriesData));
  const featuredProducts = JSON.parse(JSON.stringify(featuredProductsData));
  const topSellingProducts = JSON.parse(JSON.stringify(topSellingProductsData));
  const newArrivalProducts = JSON.parse(JSON.stringify(newArrivalProductsData));
  const blogs = JSON.parse(JSON.stringify(blogsData));

  // Default fallback if categories or banners are empty
  const trustIndicators = [
    { title: "100% Ayurvedic", desc: "No artificial chemicals", icon: "Leaf" },
    { title: "GMP Certified", desc: "Highest production standards", icon: "Shield" },
    { title: "Secure Payments", desc: "Fully encrypted checkout", icon: "Lock" },
    { title: "Fast Delivery", desc: "Shipped within 24 hours", icon: "Truck" },
    { title: "Easy Returns", desc: "7-day money back guarantee", icon: "RefreshCw" },
  ];

  const testimonials = [
    {
      name: "Ramesh Kumar",
      rating: 5,
      text: "The KSM-66 Ashwagandha is incredible. My daily fatigue is gone and my sleep has improved dramatically.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    },
    {
      name: "Sneha Patel",
      rating: 5,
      text: "I use Neem & Aloe Vera Gel daily. It cleared my acne in just two weeks! Extremely gentle on skin.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
    },
    {
      name: "Dr. Alok Sharma",
      rating: 5,
      text: "As a doctor, I highly recommend Reature Organic. Their extraction methodology preserves active alkaloids.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150",
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Carousel Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroCarousel banners={banners} />
      </section>

      {/* Trust Indicators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          {trustIndicators.map((item, i) => {
            const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;
            return (
              <div key={i} className="flex flex-col items-center text-center space-y-2 group p-2">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-darkText">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1.5 rounded-full">
            Collections
          </span>
          <h2 className="text-3xl font-serif font-bold text-darkText mt-4">Shop By Category</h2>
          <p className="text-sm text-gray-500 mt-2">Explore targeted healing categories curated for complete mind-body equilibrium.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {categories.map((cat: any) => {
            const IconComponent = (Icons as any)[cat.icon] || Icons.Leaf;
            return (
              <Link
                key={cat._id}
                href={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-3xl hover:border-primary hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F8FAF7] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xs text-darkText mt-4 group-hover:text-primary transition-colors">
                  {cat.name}
                </h4>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Product Grids Client (Featured, Best Selling, New Arrival) */}
      <HomeClient
        featuredProducts={featuredProducts}
        topSellingProducts={topSellingProducts}
        newArrivalProducts={newArrivalProducts}
      />

      {/* Seasonal Offers section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#00843D] text-white p-8 md:p-16 border border-primary/20 shadow-md">
          {/* Decorative circular gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-[120px] opacity-25 translate-x-20 -translate-y-20" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20">
                ⌛ Limited Time Campaign
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                Seasonal Wellness Sale: Get Flat 15% Off!
              </h2>
              <p className="text-sm md:text-base text-gray-100 max-w-md">
                Fortify your seasonal immunity. Apply coupon <span className="bg-white/20 font-bold px-2 py-0.5 rounded font-mono">WELCOME15</span> at checkout on orders above Rs. 499.
              </p>
              
              <CountdownTimer />
            </div>

            <div className="flex justify-start lg:justify-end">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold bg-secondary text-white hover:bg-secondary-dark shadow-lg hover:scale-105 transition-all duration-300"
              >
                Claim Offer Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-16 bg-white border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1.5 rounded-full">
              Reviews
            </span>
            <h2 className="text-3xl font-serif font-bold text-darkText mt-4">
              Trusted By Thousands
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              See how our natural remedies are transforming lives and restoring wellness everyday.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#F8FAF7] rounded-3xl border border-gray-100 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Icons.Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200/50">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-darkText">{test.name}</h4>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      Verified Buyer
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1.5 rounded-full">
              Education
            </span>
            <h2 className="text-3xl font-serif font-bold text-darkText mt-4">Health Blog</h2>
          </div>
          <Link href="/blog" className="text-sm font-bold text-primary hover:text-primary-dark">
            View All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <article
              key={blog._id}
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-48 relative overflow-hidden bg-gray-50">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    <span>{blog.category}</span>
                    <span>{blog.readTime} min read</span>
                  </div>
                  <Link href={`/blog/${blog.slug}`} className="block">
                    <h3 className="font-serif font-bold text-lg text-darkText hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {blog.content}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">By {blog.author}</span>
                  <Link href={`/blog/${blog.slug}`} className="text-xs font-bold text-primary hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
