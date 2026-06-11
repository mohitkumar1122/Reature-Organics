import React from "react";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Blog } from "@/lib/models/Blog";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await dbConnect();
  const resolvedParams = await params;
  const blog = await Blog.findOne({ slug: resolvedParams.slug });
  if (!blog) return { title: "Article Not Found" };
  return {
    title: `${blog.title} | Reature Organic Blog`,
    description: blog.content.slice(0, 160),
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  await dbConnect();
  const resolvedParams = await params;

  const blog = await Blog.findOne({ slug: resolvedParams.slug });
  if (!blog) {
    notFound();
  }

  // Fetch related articles (same category, excluding current one)
  const relatedArticles = await Blog.find({
    category: blog.category,
    _id: { $ne: blog._id },
  }).limit(3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary-light">
          {blog.category}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-darkText leading-tight">
          {blog.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1"><User className="w-4 h-4 text-primary" /> By {blog.author}</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-primary" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary" /> {blog.readTime} min read</span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="h-96 md:h-[450px] w-full rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm leading-relaxed text-sm text-gray-600 space-y-6 whitespace-pre-wrap font-sans">
        {blog.content}
      </div>

      {/* Related Articles Grid */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-gray-100">
          <h3 className="font-serif font-bold text-2xl text-darkText">Related Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((art: any) => (
              <div key={art._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-all flex flex-col justify-between">
                <img src={art.image} alt={art.title} className="h-32 w-full object-cover bg-gray-50" />
                <div className="p-4 space-y-2">
                  <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{art.category}</span>
                  <Link href={`/blog/${art.slug}`} className="block">
                    <h4 className="font-serif font-bold text-sm text-darkText hover:text-primary line-clamp-2 leading-snug">
                      {art.title}
                    </h4>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
