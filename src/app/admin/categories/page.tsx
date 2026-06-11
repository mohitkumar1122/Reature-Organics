"use client";

import React, { useState, useEffect } from "react";
import { adminGetCategoriesAction, adminCreateCategoryAction, adminDeleteCategoryAction } from "@/app/actions/adminActions";
import { Plus, Trash2, Layers, Tag, FileText, Image as ImageIcon } from "lucide-react";
import * as Icons from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [icon, setIcon] = useState("Leaf");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadCategories = async () => {
    setLoading(true);
    try {
      const list = await adminGetCategoriesAction();
      setCategories(list);
    } catch (err: any) {
      setErrorMsg("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name) {
      setErrorMsg("Category name is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await adminCreateCategoryAction({
        name: name.trim(),
        description: description.trim() || undefined,
        image: image.trim() || undefined,
        icon: icon.trim() || undefined,
      });

      if (res.success) {
        setSuccessMsg("Category created successfully!");
        setName("");
        setDescription("");
        setImage("");
        setIcon("Leaf");
        await loadCategories();
      } else {
        setErrorMsg(res.message || "Failed to create category.");
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create category.");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category? Products linked to it will need to be reclassified.")) {
      setLoading(true);
      try {
        const res = await adminDeleteCategoryAction(id);
        if (res.success) {
          await loadCategories();
        } else {
          setErrorMsg(res.message || "Failed to delete category.");
          setLoading(false);
        }
      } catch (err: any) {
        setErrorMsg("Failed to delete category.");
        setLoading(false);
      }
    }
  };

  // Predefined icons we recommend
  const iconOptions = ["Leaf", "Heart", "Shield", "Activity", "Sparkles", "Smile", "Flame", "Flower", "Droplet", "Sun"];

  return (
    <div className="space-y-8 text-xs">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-darkText">Category Management</h1>
        <p className="text-gray-500">Create collections, define taxonomy tags, and manage product classifications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Form */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-sm text-darkText flex items-center gap-1.5 border-b border-gray-50 pb-3">
            <Plus className="w-4 h-4 text-primary" /> Create Collection Category
          </h3>

          {errorMsg && <p className="text-red-500 font-bold">⚠️ {errorMsg}</p>}
          {successMsg && <p className="text-primary font-bold">🌱 {successMsg}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Category Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Immunity Boosters"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Description</label>
              <textarea
                placeholder="Herbal supplements formulated to strengthen immune defense systems."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Image URL (Optional)</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/photo-..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Lucide Icon name</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-xs text-gray-600"
              >
                {iconOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-white hover:bg-primary-dark font-bold rounded-full transition-all shadow"
            >
              Add Category
            </button>
          </form>
        </div>

        {/* Right Columns: List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {loading && categories.length === 0 ? (
            <p className="text-gray-400 italic py-16 text-center">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-gray-400 italic py-16 text-center">No categories published yet.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold bg-gray-50/50">
                  <th className="p-4">Icon</th>
                  <th className="p-4">Category Detail</th>
                  <th className="p-4">Slug Identifier</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium text-darkText">
                {categories.map((cat) => {
                  const IconComp = (Icons as any)[cat.icon || "Leaf"] || Icons.Leaf;
                  return (
                    <tr key={cat._id}>
                      <td className="p-4">
                        <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                          <IconComp className="w-4 h-4" />
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-sm text-darkText leading-snug">{cat.name}</p>
                        <p className="text-gray-400 text-[10px] line-clamp-1 mt-0.5">{cat.description || "No description provided."}</p>
                      </td>
                      <td className="p-4 font-mono text-gray-500">{cat.slug}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </div>
  );
}
