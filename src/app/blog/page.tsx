import React from "react";
import { dbConnect } from "@/lib/db";
import { Blog } from "@/lib/models/Blog";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

interface PageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export const metadata = {
  title: "Health & Wellness Blog - Reature Organic",
  description: "Read expert articles on Ayurvedic remedies, herbal treatments, sleep solutions, and digestive care.",
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

  const categories = ["Ayurveda", "Nutrition", "Wellness", "Fitness", "Herbal Remedies"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1.5 rounded-full">
          Wellness Insights
        </span>
        <h1 className="text-4xl font-serif font-bold text-darkText">Health & Wellness Blog</h1>
        <p className="text-sm text-gray-500">
          Unlock ancient wisdom validated by modern medical science for daily vitality.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-gray-100 pb-6 text-xs font-bold uppercase tracking-wider">
        <Link
          href="/blog"
          className={`px-4 py-2 rounded-full border transition-all ${
            !activeCategory
              ? "border-primary bg-primary text-white"
              : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          All Articles
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/blog?category=${encodeURIComponent(cat)}`}
            className={`px-4 py-2 rounded-full border transition-all ${
              activeCategory === cat
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Blog Cards Grid */}
      {blogs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center text-xs text-gray-400">
          No articles published under this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <article
              key={blog._id}
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              {/* Banner Image */}
              <Link href={`/blog/${blog.slug}`} className="h-48 relative overflow-hidden bg-gray-50 block">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <span>{blog.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.readTime} min read</span>
                  </div>

                  <Link href={`/blog/${blog.slug}`} className="block">
                    <h3 className="font-serif font-bold text-lg text-darkText hover:text-primary transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {blog.content}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 text-gray-500 font-medium">
                    <User className="w-3.5 h-3.5 text-primary shrink-0" /> By {blog.author}
                  </span>
                  
                  <Link href={`/blog/${blog.slug}`} className="font-bold text-primary hover:underline flex items-center gap-0.5">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </article>
          ))}
        </div>
      )}

    </div>
  );
}
