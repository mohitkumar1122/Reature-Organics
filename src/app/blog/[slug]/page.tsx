import React from "react";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Blog } from "@/lib/models/Blog";
import Link from "next/link";
import {
  Calendar, Clock, User, ArrowLeft, ArrowRight, Share2,
  Bookmark, Copy, Home,
  ChevronRight, BookOpen, Eye, ThumbsUp, MessageCircle,
} from "lucide-react";
import {FaFacebook, FaLinkedin, FaTwitter} from 'react-icons/fa';
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
    title: `${blog.title} | ReaTure Organic Blog`,
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

  // Fetch related articles
  const relatedArticles = await Blog.find({
    category: blog.category,
    _id: { $ne: blog._id },
  }).limit(3);

  // Get other popular articles
  const popularArticles = await Blog.find({
    _id: { $ne: blog._id },
  }).limit(4);

  const blogUrl = `https://reatureorganic.com/blog/${blog.slug}`;
  const encodedTitle = encodeURIComponent(blog.title);
  const encodedUrl = encodeURIComponent(blogUrl);

  return (
    <div className="bg-gradient-to-b from-lightBg via-white to-lightBg min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Home className="w-3 h-3" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <Link
              href={`/blog?category=${encodeURIComponent(blog.category)}`}
              className="hover:text-primary transition-colors"
            >
              {blog.category}
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-darkText font-semibold truncate max-w-[300px]">
              {blog.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to All Articles
        </Link>

        {/* Category */}
        <Link
          href={`/blog?category=${encodeURIComponent(blog.category)}`}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-primary to-primary-dark shadow-sm mb-6 hover:shadow-glow-primary transition-all"
        >
          <BookOpen className="w-3 h-3" />
          {blog.category}
        </Link>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl lg:text-6xl font-bold text-darkText leading-[1.1] mb-6 text-balance">
          {blog.title}
        </h1>

        {/* Subtitle / Excerpt */}
        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl text-pretty">
          {blog.content.slice(0, 200)}...
        </p>

        {/* Author & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-base shadow-medium ring-4 ring-white">
                {blog.author?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary border-2 border-white flex items-center justify-center">
                <BookOpen className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-darkText">{blog.author}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {blog.readTime} min read
                </span>
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-lightBg hover:bg-primary-light text-gray-600 hover:text-primary text-xs font-bold transition-all"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Like</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-lightBg hover:bg-primary-light text-gray-600 hover:text-primary text-xs font-bold transition-all"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-lightBg hover:bg-primary-light text-gray-600 hover:text-primary text-xs font-bold transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-72 md:h-[450px] lg:h-[500px] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-lightBg to-secondary-light/30 my-10 shadow-large">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darkText/20 via-transparent to-transparent" />

          {/* Image caption */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-xs text-white/70 italic">
              {blog.title}
            </p>
          </div>
        </div>

        {/* Article Content with Drop Cap */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white p-8 md:p-12 lg:p-14 rounded-3xl border border-gray-100 shadow-soft">
            <div className="drop-cap text-base md:text-lg text-gray-700 leading-[1.8] whitespace-pre-wrap font-sans">
              {blog.content}
            </div>

            {/* Article Tags */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-xs font-bold text-darkText uppercase tracking-wider mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {[blog.category, "Ayurveda", "Wellness", "Natural Healing"].map(
                  (tag, i) => (
                    <Link
                      key={i}
                      href={`/blog?category=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-light text-primary hover:bg-primary hover:text-white transition-all"
                    >
                      #{tag}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Share Bar */}
        <div className="my-10 p-6 bg-gradient-to-br from-primary-light/40 to-secondary-light/30 rounded-3xl border border-primary/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-darkText mb-1">
                Found this helpful?
              </h3>
              <p className="text-xs text-gray-600">
                Share this article with your wellness community
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#1DA1F2] text-darkText hover:text-white flex items-center justify-center shadow-sm transition-all hover:scale-110 border border-gray-100"
                aria-label="Share on Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#1877F2] text-darkText hover:text-white flex items-center justify-center shadow-sm transition-all hover:scale-110 border border-gray-100"
                aria-label="Share on Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#0A66C2] text-darkText hover:text-white flex items-center justify-center shadow-sm transition-all hover:scale-110 border border-gray-100"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white hover:bg-primary text-darkText hover:text-white flex items-center justify-center shadow-sm transition-all hover:scale-110 border border-gray-100"
                aria-label="Copy link"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Author Card */}
        <div className="my-10 p-8 bg-white rounded-3xl border border-gray-100 shadow-soft">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-2xl shadow-medium ring-4 ring-primary-light/50 shrink-0">
              {blog.author?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                Written by
              </p>
              <h3 className="font-serif font-bold text-xl text-darkText mb-2">
                {blog.author}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ayurvedic expert and wellness writer with over a decade of experience in traditional healing practices and modern integrative medicine.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mt-3 hover:gap-2.5 transition-all"
              >
                View all articles
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full border border-primary/10">
              <BookOpen className="w-3 h-3" />
              Continue Reading
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-darkText mt-5 leading-tight">
              Related <span className="italic text-primary">Insights</span>
            </h2>
            <p className="text-sm text-gray-500 mt-3">
              More wisdom from our wellness experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {relatedArticles.map((art: any) => (
              <article
                key={art._id}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-soft hover:shadow-large hover:border-primary/20 transition-all duration-500 flex flex-col h-full hover:-translate-y-2"
              >
                <Link
                  href={`/blog/${art.slug}`}
                  className="relative h-48 overflow-hidden bg-gradient-to-br from-lightBg to-secondary-light/30 block"
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-primary border border-primary/10 shadow-sm">
                    {art.category}
                  </span>
                </Link>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-semibold">
                      <Clock className="w-3 h-3" />
                      {art.readTime} min read
                    </div>
                    <Link href={`/blog/${art.slug}`} className="block">
                      <h4 className="font-serif font-bold text-base text-darkText group-hover:text-primary transition-colors leading-snug line-clamp-2 text-balance">
                        {art.title}
                      </h4>
                    </Link>
                  </div>

                  <Link
                    href={`/blog/${art.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-4 group/link"
                  >
                    Read more
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#003D1B] text-white p-8 md:p-12 shadow-large">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-[120px] opacity-30 translate-x-20 -translate-y-20" />

          <div className="relative text-center max-w-2xl mx-auto space-y-5">
            <BookOpen className="w-10 h-10 mx-auto text-secondary" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Never Miss an Article
            </h2>
            <p className="text-sm text-gray-200">
              Join 50,000+ readers getting weekly wellness wisdom delivered to their inbox.
            </p>

            <form className="max-w-md mx-auto">
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20 focus-within:border-secondary/50 transition-all">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-secondary hover:bg-white hover:text-primary text-white text-xs font-bold rounded-full transition-all"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}