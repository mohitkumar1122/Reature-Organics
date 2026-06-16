import React from "react";
import { dbConnect } from "@/lib/db";
import { Blog } from "@/lib/models/Blog";
import Link from "next/link";
import {
  Calendar, Clock, User, ArrowRight, BookOpen, Sparkles,
  Home, ChevronRight, TrendingUp, Search, Bookmark,
} from "lucide-react";

interface PageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export const metadata = {
  title: "Health & Wellness Blog - ReaTure Organic",
  description:
    "Read expert articles on Ayurvedic remedies, herbal treatments, sleep solutions, and digestive care.",
};

export default async function BlogIndexPage({ searchParams }: PageProps) {
  await dbConnect();

  const params = await searchParams;
  const activeCategory = params.category || "";

  const query: any = {};
  if (activeCategory) {
    query.category = activeCategory;
  }

  const blogs = await Blog.find(query).sort({ createdAt: -1 });
  const featuredBlog = blogs[0]; // First blog as featured
  const regularBlogs = blogs.slice(1); // Rest as regular

  const categories = [
    "Ayurveda",
    "Nutrition",
    "Wellness",
    "Fitness",
    "Herbal Remedies",
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
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-white/70 mb-6">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Home className="w-3 h-3" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">Blog</span>
            {activeCategory && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-secondary">{activeCategory}</span>
              </>
            )}
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-5">
              <BookOpen className="w-3 h-3 text-secondary" />
              Wellness Insights
            </span>
            <h1 className="font-serif text-fluid-3xl font-bold leading-[1.05] mb-4 text-balance">
              Stories That <span className="italic text-secondary">Heal</span> & Inspire
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl">
              Unlock ancient wisdom validated by modern medical science — your daily dose of vitality, expertly curated.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 md:gap-10 mt-8 pt-8 border-t border-white/10">
              {[
                { value: `${blogs.length}+`, label: "Articles" },
                { value: "12+", label: "Categories" },
                { value: "50K+", label: "Monthly Readers" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl md:text-3xl font-serif font-bold text-secondary tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-300 uppercase tracking-wider font-bold mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Category Filter Pills */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-darkText">
                Browse by Topic
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                  !activeCategory
                    ? "border-primary bg-primary text-white shadow-medium"
                    : "border-gray-100 bg-white text-gray-600 hover:border-primary hover:text-primary"
                }`}
              >
                All Articles
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                    activeCategory === cat
                      ? "border-primary bg-primary text-white shadow-medium"
                      : "border-gray-100 bg-white text-gray-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Article (Hero Card) */}
        {!activeCategory && featuredBlog && (
          <section className="group relative">
            <span className="absolute -top-3 left-6 z-10 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-secondary to-secondary-dark text-white text-xs font-bold uppercase tracking-wider shadow-glow-secondary">
              <Sparkles className="w-3 h-3" />
              Featured Article
            </span>

            <Link
              href={`/blog/${featuredBlog.slug}`}
              className="block bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-1"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-72 lg:h-auto overflow-hidden bg-gradient-to-br from-lightBg to-secondary-light/30">
                  <img
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkText/40 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-primary border border-primary/10 shadow-sm">
                    {featuredBlog.category}
                  </span>

                  {/* Read time */}
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold bg-darkText/70 backdrop-blur-sm text-white">
                    <Clock className="w-3 h-3" />
                    {featuredBlog.readTime} min read
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                    Editor's Pick
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-darkText leading-tight mb-4 group-hover:text-primary transition-colors text-balance">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-4 mb-6">
                    {featuredBlog.content}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        {featuredBlog.author?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-darkText">
                          {featuredBlog.author}
                        </p>
                        <p className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(featuredBlog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-12 md:p-16 text-center space-y-5">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary-light to-secondary-light flex items-center justify-center">
              <BookOpen className="w-9 h-9 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-darkText">
                No articles found
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                No articles published under this category yet. Try another topic.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-glow-primary transition-all"
            >
              View All Articles
            </Link>
          </div>
        ) : (
          <section className="space-y-8">
            {activeCategory ? null : (
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-darkText">
                  Latest <span className="italic text-primary">Insights</span>
                </h2>
                <span className="text-xs text-gray-500 font-semibold">
                  {regularBlogs.length} articles
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {(activeCategory ? blogs : regularBlogs).map((blog: any, idx: number) => (
                <article
                  key={blog._id}
                  className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-soft hover:shadow-large hover:border-primary/20 transition-all duration-500 flex flex-col h-full hover:-translate-y-2"
                >
                  {/* Banner Image */}
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="relative h-52 overflow-hidden bg-gradient-to-br from-lightBg to-secondary-light/30 block"
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-darkText/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-primary border border-primary/10 shadow-sm">
                      {blog.category}
                    </span>

                    {/* Bookmark Icon */}
                    <button
                      type="button"
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm text-gray-500 hover:text-primary flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      aria-label="Bookmark"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </Link>

                  {/* Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {blog.readTime} min
                        </span>
                      </div>

                      <Link href={`/blog/${blog.slug}`} className="block">
                        <h3 className="font-serif font-bold text-lg text-darkText group-hover:text-primary transition-colors leading-snug line-clamp-2 text-balance">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {blog.content}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-[10px]">
                          {blog.author?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs text-gray-600 font-semibold">
                          {blog.author}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${blog.slug}`}
                        className="font-bold text-primary text-xs flex items-center gap-1 group/link"
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
        )}

        {/* Newsletter CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#003D1B] text-white p-8 md:p-12 shadow-large">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-[120px] opacity-30 translate-x-20 -translate-y-20" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-secondary" />
                Stay Updated
              </span>
              <h2 className="font-serif text-2xl md:text-4xl font-bold leading-tight text-balance">
                Get Wellness Wisdom <br />
                <span className="italic text-secondary">In Your Inbox</span>
              </h2>
              <p className="text-sm text-gray-200">
                Subscribe to receive weekly Ayurvedic insights, herbal tips, and exclusive offers.
              </p>
            </div>

            <form className="w-full">
              <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20 focus-within:border-secondary/50 transition-all">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-secondary hover:bg-white hover:text-primary text-white text-xs font-bold rounded-full transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] text-gray-300 mt-3 text-center">
                🔒 Unsubscribe anytime. No spam, ever.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}