"use client";

import React, { useState, useEffect } from "react";
import { adminGetBannersAction, adminCreateBannerAction, adminDeleteBannerAction } from "@/app/actions/adminActions";
import { Plus, Trash2, Image as ImageIcon, ExternalLink } from "lucide-react";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("/");
  const [position, setPosition] = useState<"hero" | "promotional">("hero");
  const [order, setOrder] = useState("0");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadBanners = async () => {
    setLoading(true);
    const list = await adminGetBannersAction();
    setBanners(list);
    setLoading(false);
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title || !imageUrl) {
      setErrorMsg("Title and Image URL are required.");
      return;
    }

    setLoading(true);
    const res = await adminCreateBannerAction({
      title,
      subtitle: subtitle || undefined,
      imageUrl,
      linkUrl,
      position,
      order: Number(order || "0"),
    });

    if (res.success) {
      setSuccessMsg("Banner published successfully!");
      setTitle("");
      setSubtitle("");
      setImageUrl("");
      setLinkUrl("/");
      setOrder("0");
      await loadBanners();
    } else {
      setErrorMsg(res.message || "Failed to create banner.");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this homepage banner?")) {
      setLoading(true);
      await adminDeleteBannerAction(id);
      await loadBanners();
    }
  };

  return (
    <div className="space-y-8 text-xs">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-darkText">Banner Management</h1>
        <p className="text-gray-500">Configure homepage carousel slides and campaign banners.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Create Form */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-sm text-darkText flex items-center gap-1.5 border-b border-gray-50 pb-3">
            <Plus className="w-4 h-4 text-primary" /> Create Campaign Banner
          </h3>

          {errorMsg && <p className="text-red-500 font-bold">⚠️ {errorMsg}</p>}
          {successMsg && <p className="text-primary font-bold">🌱 {successMsg}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Banner Title</label>
              <input
                type="text"
                required
                placeholder="Ancient Wisdom, Modern Wellness"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Subtitle</label>
              <input
                type="text"
                placeholder="Pure herbal remedies clinically tested."
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Image URL</label>
              <input
                type="text"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Link URL</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Order</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Position</label>
              <select
                value={position}
                onChange={(e: any) => setPosition(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg"
              >
                <option value="hero">Hero Carousel</option>
                <option value="promotional">Promotional Grid Column</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-white hover:bg-primary-dark font-bold rounded-full transition-all shadow"
            >
              Publish Banner
            </button>
          </form>
        </div>

        {/* Right Columns: List */}
        <div className="lg:col-span-2 space-y-4">
          {loading && banners.length === 0 ? (
            <div className="bg-white p-12 text-center text-gray-400 border rounded-3xl">Loading banners...</div>
          ) : banners.length === 0 ? (
            <div className="bg-white p-12 text-center text-gray-400 border rounded-3xl">No banners published yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banners.map((ban) => (
                <div key={ban._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col justify-between">
                  <img src={ban.imageUrl} alt={ban.title} className="h-32 w-full object-cover bg-gray-50 border-b border-gray-100" />
                  <div className="p-4 space-y-2">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary-light text-primary">
                      {ban.position} (Order: {ban.order})
                    </span>
                    <h4 className="font-serif font-bold text-sm text-darkText leading-snug truncate">{ban.title}</h4>
                    <p className="text-[10px] text-gray-500 line-clamp-1">{ban.subtitle}</p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-2">
                      <a href={ban.linkUrl} target="_blank" className="text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-0.5">
                        <ExternalLink className="w-3.5 h-3.5" /> Visit Link
                      </a>
                      <button
                        onClick={() => handleDelete(ban._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Banner"
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
