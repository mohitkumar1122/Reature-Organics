"use client";

import React, { useState, useEffect } from "react";
import { adminGetBlogsAction, adminCreateBlogAction, adminDeleteBlogAction } from "@/app/actions/adminActions";
import { Plus, Trash2, BookOpen, Calendar, User, Clock, Tag, ExternalLink } from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("Reature Ayurvedic Expert");
  const [category, setCategory] = useState<"Ayurveda" | "Nutrition" | "Wellness" | "Fitness" | "Herbal Remedies">("Ayurveda");
  const [tagsRaw, setTagsRaw] = useState("");
  const [seoKeywordsRaw, setSeoKeywordsRaw] = useState("");
  const [readTime, setReadTime] = useState("5");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const list = await adminGetBlogsAction();
      setBlogs(list);
    } catch (err: any) {
      setErrorMsg("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title || !content || !image) {
      setErrorMsg("Title, content, and image URL are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await adminCreateBlogAction({
        title: title.trim(),
        content: content.trim(),
        image: image.trim(),
        author: author.trim() || "Reature Ayurvedic Expert",
        category,
        tags: tagsRaw.split(",").map((s) => s.trim()).filter(Boolean),
        seoKeywords: seoKeywordsRaw.split(",").map((s) => s.trim()).filter(Boolean),
        readTime: Number(readTime || "5"),
      });

      if (res.success) {
        setSuccessMsg("Blog published successfully!");
        setTitle("");
        setContent("");
        setImage("");
        setAuthor("Reature Ayurvedic Expert");
        setCategory("Ayurveda");
        setTagsRaw("");
        setSeoKeywordsRaw("");
        setReadTime("5");
        await loadBlogs();
      } else {
        setErrorMsg(res.message || "Failed to create blog post.");
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create blog post.");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setLoading(true);
      try {
        const res = await adminDeleteBlogAction(id);
        if (res.success) {
          await loadBlogs();
        } else {
          setErrorMsg(res.message || "Failed to delete blog post.");
          setLoading(false);
        }
      } catch (err: any) {
        setErrorMsg("Failed to delete blog post.");
        setLoading(false);
      }
    }
  };

  const categoryOptions = ["Ayurveda", "Nutrition", "Wellness", "Fitness", "Herbal Remedies"];

  return (
    <div className="space-y-8 text-xs">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-darkText">Blog Article Management</h1>
        <p className="text-gray-500">Publish educational Ayurvedic content, expert advices, and wellness tips.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Form */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-sm text-darkText flex items-center gap-1.5 border-b border-gray-50 pb-3">
            <Plus className="w-4 h-4 text-primary" /> Publish Health Article
          </h3>

          {errorMsg && <p className="text-red-500 font-bold">⚠️ {errorMsg}</p>}
          {successMsg && <p className="text-primary font-bold">🌱 {successMsg}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Article Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Guide to Understanding Pitta Dosha"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs text-gray-600"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Read Time (Mins)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Author Name</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Cover Image URL</label>
              <input
                type="text"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Content Description / Body</label>
              <textarea
                required
                placeholder="Write the full post contents here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Tags (comma split)</label>
                <input
                  type="text"
                  placeholder="Ayurveda, Pitta, Herbs"
                  value={tagsRaw}
                  onChange={(e) => setTagsRaw(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">SEO Keywords (comma split)</label>
                <input
                  type="text"
                  placeholder="pitta dosha, ayurvedic guide"
                  value={seoKeywordsRaw}
                  onChange={(e) => setSeoKeywordsRaw(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-white hover:bg-primary-dark font-bold rounded-full transition-all shadow"
            >
              Publish Article
            </button>
          </form>
        </div>

        {/* Right Columns: List */}
        <div className="lg:col-span-2 space-y-4">
          {loading && blogs.length === 0 ? (
            <div className="bg-white p-12 text-center text-gray-400 border rounded-3xl">Loading articles...</div>
          ) : blogs.length === 0 ? (
            <div className="bg-white p-12 text-center text-gray-400 border rounded-3xl">No articles published yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col justify-between">
                  <img src={blog.image} alt={blog.title} className="h-36 w-full object-cover bg-gray-50 border-b border-gray-100" />
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary-light text-primary">
                        {blog.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Clock className="w-3 h-3 text-secondary" /> {blog.readTime} min read
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-darkText leading-snug truncate" title={blog.title}>{blog.title}</h4>
                    <p className="text-[10px] text-gray-500 line-clamp-2">{blog.content}</p>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-50">
                      <span className="flex items-center gap-1 font-semibold"><User className="w-3.5 h-3.5 text-gray-300" /> {blog.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <a href={`/blog/${blog.slug}`} target="_blank" className="text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-0.5 font-bold">
                        <ExternalLink className="w-3 h-3" /> Visit Post
                      </a>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
