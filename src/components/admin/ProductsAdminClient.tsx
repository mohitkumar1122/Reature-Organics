"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminCreateProductAction, adminUpdateProductAction, adminDeleteProductAction } from "@/app/actions/adminActions";
import { Plus, Edit3, Trash2, Search, X } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface ProductsAdminClientProps {
  products: any[];
  categories: Category[];
}

export default function ProductsAdminClient({
  products,
  categories,
}: ProductsAdminClientProps) {
  const router = useRouter();

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form states
  const [form, setForm] = useState({
    title: "",
    price: 0,
    discountPercentage: 0,
    stock: 10,
    brand: "Reature Organic",
    category: "",
    sku: "",
    description: "",
    ingredientsRaw: "",
    benefitsRaw: "",
    usageInstructions: "",
    precautions: "",
    healthConditions: [] as string[],
    imagesRaw: "",
  });

  const healthConditionsOptions = ["Diabetes", "Immunity", "Hair Fall", "Skin Care", "Weight Management"];

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setForm({
      title: "",
      price: 0,
      discountPercentage: 0,
      stock: 10,
      brand: "Reature Organic",
      category: categories[0]?._id || "",
      sku: "",
      description: "",
      ingredientsRaw: "",
      benefitsRaw: "",
      usageInstructions: "",
      precautions: "",
      healthConditions: [],
      imagesRaw: "",
    });
    setErrorMsg("");
    setShowModal(true);
  };

  const handleOpenEditModal = (prod: any) => {
    setEditingProduct(prod);
    setForm({
      title: prod.title,
      price: prod.price,
      discountPercentage: prod.discountPercentage,
      stock: prod.stock,
      brand: prod.brand,
      category: prod.category?._id || categories[0]?._id || "",
      sku: prod.sku,
      description: prod.description,
      ingredientsRaw: prod.ingredients?.join(", ") || "",
      benefitsRaw: prod.benefits?.join(", ") || "",
      usageInstructions: prod.usageInstructions || "",
      precautions: prod.precautions || "",
      healthConditions: prod.healthConditions || [],
      imagesRaw: prod.images?.join(", ") || "",
    });
    setErrorMsg("");
    setShowModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.title || !form.price || !form.sku || !form.description || !form.usageInstructions) {
      setErrorMsg("All core product details are required.");
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      discountPercentage: Number(form.discountPercentage),
      stock: Number(form.stock),
      brand: form.brand,
      category: form.category,
      sku: form.sku,
      usageInstructions: form.usageInstructions,
      precautions: form.precautions || undefined,
      ingredients: form.ingredientsRaw.split(",").map((s) => s.trim()).filter(Boolean),
      benefits: form.benefitsRaw.split(",").map((s) => s.trim()).filter(Boolean),
      healthConditions: form.healthConditions,
      images: form.imagesRaw.split(",").map((s) => s.trim()).filter(Boolean),
    };

    if (payload.images.length === 0) {
      payload.images = ["https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=600"];
    }

    setLoading(true);

    let res;
    if (editingProduct) {
      res = await adminUpdateProductAction(editingProduct._id, payload as any);
    } else {
      res = await adminCreateProductAction(payload);
    }

    if (res.success) {
      setShowModal(false);
      router.refresh();
    } else {
      setErrorMsg(res.message || "Failed to save product.");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product from database?")) {
      await adminDeleteProductAction(id);
      router.refresh();
    }
  };

  const handleConditionCheckboxChange = (cond: string) => {
    setForm((prev) =>
      prev.healthConditions.includes(cond)
        ? { ...prev, healthConditions: prev.healthConditions.filter((c) => c !== cond) }
        : { ...prev, healthConditions: [...prev.healthConditions, cond] }
    );
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-xs">
      
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darkText">Product Management</h1>
          <p className="text-gray-500">Configure remedies, edit details, and manage inventories.</p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-1.5 py-2.5 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow"
        >
          <Plus className="w-4 h-4" /> Add Remedy
        </button>
      </div>

      {/* Filter and Search controls */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by title, brand, or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-xs"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Product table list */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold bg-gray-50/50">
              <th className="p-4">Product details</th>
              <th className="p-4">SKU / Brand</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Price</th>
              <th className="p-4 text-center">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-medium">
            {filteredProducts.map((p) => {
              const discountedPrice = Math.round(p.price * (1 - p.discountPercentage / 100));
              return (
                <tr key={p._id}>
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={p.images?.[0]}
                      alt={p.title}
                      className="w-10 h-10 rounded-lg object-cover bg-gray-50 border border-gray-100"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-darkText truncate max-w-[200px]">{p.title}</p>
                      <p className="text-[10px] text-gray-400">Rating: {p.rating} ({p.reviewsCount} reviews)</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-mono text-darkText">{p.sku}</p>
                    <p className="text-gray-400 text-[10px]">{p.brand}</p>
                  </td>
                  <td className="p-4 text-gray-500">{p.category?.name || "Ayurveda"}</td>
                  <td className="p-4 text-right">
                    <p className="font-bold text-primary">₹{discountedPrice}</p>
                    {p.discountPercentage > 0 && (
                      <p className="text-[10px] text-gray-400 line-through">₹{p.price}</p>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                      p.stock <= 0
                        ? "bg-red-50 text-red-600 border-red-100"
                        : p.stock <= 3
                        ? "bg-orange-50 text-orange-600 border-orange-100 animate-pulse"
                        : "bg-green-50 text-green-600 border-green-100"
                    }`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                        title="Edit Remedy"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Remedy"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CRUD Form overlay modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-darkText">
                {editingProduct ? "Modify Product details" : "Publish New Product"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-darkText"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Grid 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Organic Chyawanprash Booster"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">SKU Code</label>
                  <input
                    type="text"
                    required
                    placeholder="CHY-IMM-500"
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Grid 2 */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Base Price (₹)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Discount (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.discountPercentage}
                    onChange={(e) => setForm({ ...form, discountPercentage: Number(e.target.value) })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Stock Count</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Grid 3 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Brand</label>
                  <input
                    type="text"
                    required
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Image list URLs */}
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Image URLs (comma separated)</label>
                <input
                  type="text"
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                  value={form.imagesRaw}
                  onChange={(e) => setForm({ ...form, imagesRaw: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                />
              </div>

              {/* Health Conditions */}
              <div className="space-y-2.5">
                <label className="font-bold text-gray-700 block">Target Health Conditions</label>
                <div className="flex flex-wrap gap-3">
                  {healthConditionsOptions.map((cond) => (
                    <label key={cond} className="flex items-center gap-1.5 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.healthConditions.includes(cond)}
                        onChange={() => handleConditionCheckboxChange(cond)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span>{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Textareas */}
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Description</label>
                <textarea
                  rows={4}
                  placeholder="Formulation detail descriptions..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Ingredients (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Amla, Giloy, Honey"
                    value={form.ingredientsRaw}
                    onChange={(e) => setForm({ ...form, ingredientsRaw: e.target.value })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Benefits (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Boosts stamina, Improves sleep"
                    value={form.benefitsRaw}
                    onChange={(e) => setForm({ ...form, benefitsRaw: e.target.value })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">How to Consume</label>
                  <textarea
                    rows={2}
                    placeholder="1 tablet twice daily with water..."
                    value={form.usageInstructions}
                    onChange={(e) => setForm({ ...form, usageInstructions: e.target.value })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Precautions</label>
                  <textarea
                    rows={2}
                    placeholder="Avoid if pregnant..."
                    value={form.precautions}
                    onChange={(e) => setForm({ ...form, precautions: e.target.value })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 justify-end pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-full font-bold transition-all text-darkText"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-primary text-white hover:bg-primary-dark rounded-full font-bold transition-all shadow"
                >
                  {loading ? "Saving..." : "Save Product"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
