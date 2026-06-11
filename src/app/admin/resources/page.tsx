"use client";

import React, { useState, useEffect } from "react";
import { adminGetResourcesAction, adminCreateResourceAction, adminDeleteResourceAction } from "@/app/actions/adminActions";
import { Plus, Trash2, FileText, Video, Download, ExternalLink } from "lucide-react";

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"pdf" | "video">("pdf");
  const [fileUrl, setFileUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState<"Brochure" | "Catalog" | "User Guide" | "Tutorial">("Catalog");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadResources = async () => {
    setLoading(true);
    const list = await adminGetResourcesAction();
    setResources(list);
    setLoading(false);
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title || !description) {
      setErrorMsg("Title and description are required.");
      return;
    }

    if (type === "pdf" && !fileUrl) {
      setErrorMsg("File URL (PDF) is required for PDF type.");
      return;
    }

    if (type === "video" && !videoUrl) {
      setErrorMsg("Video URL is required for Video type.");
      return;
    }

    setLoading(true);
    const res = await adminCreateResourceAction({
      title,
      description,
      type,
      fileUrl: type === "pdf" ? fileUrl : undefined,
      videoUrl: type === "video" ? videoUrl : undefined,
      category,
    });

    if (res.success) {
      setSuccessMsg("Resource created successfully!");
      setTitle("");
      setDescription("");
      setFileUrl("");
      setVideoUrl("");
      await loadResources();
    } else {
      setErrorMsg(res.message || "Failed to create resource.");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      setLoading(true);
      await adminDeleteResourceAction(id);
      await loadResources();
    }
  };

  return (
    <div className="space-y-8 text-xs">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-darkText">Resource Management</h1>
        <p className="text-gray-500">Configure medical guides, catalogs, user manuals, and video tutorials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Form */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-sm text-darkText flex items-center gap-1.5 border-b border-gray-50 pb-3">
            <Plus className="w-4 h-4 text-primary" /> Publish Resource
          </h3>

          {errorMsg && <p className="text-red-500 font-bold">⚠️ {errorMsg}</p>}
          {successMsg && <p className="text-primary font-bold">🌱 {successMsg}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Resource Title</label>
              <input
                type="text"
                required
                placeholder="Product Catalog 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Description</label>
              <input
                type="text"
                required
                placeholder="Brief description of the PDF or video content."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Type</label>
                <select
                  value={type}
                  onChange={(e: any) => {
                    setType(e.target.value);
                    if (e.target.value === "video") setCategory("Tutorial");
                  }}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-gray-500"
                >
                  <option value="pdf">PDF Download</option>
                  <option value="video">Video Link</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-gray-500"
                >
                  <option value="Catalog">Catalog</option>
                  <option value="Brochure">Brochure</option>
                  <option value="User Guide">User Guide</option>
                  <option value="Tutorial">Tutorial</option>
                </select>
              </div>
            </div>

            {type === "pdf" ? (
              <div className="space-y-1">
                <label className="font-bold text-gray-700">PDF File URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/manual.pdf"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Video Link / YouTube URL</label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-white hover:bg-primary-dark font-bold rounded-full transition-all shadow"
            >
              Publish Resource
            </button>
          </form>
        </div>

        {/* Right Columns: List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {loading && resources.length === 0 ? (
            <p className="text-gray-400 italic py-16 text-center">Loading resources...</p>
          ) : resources.length === 0 ? (
            <p className="text-gray-400 italic py-16 text-center">No resources published yet.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold bg-gray-50/50">
                  <th className="p-4">Resource Info</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium text-darkText">
                {resources.map((res) => (
                  <tr key={res._id}>
                    <td className="p-4">
                      <p className="font-bold text-sm text-darkText leading-snug">{res.title}</p>
                      <p className="text-gray-400 text-[10px] line-clamp-1 mt-0.5">{res.description}</p>
                    </td>
                    <td className="p-4 uppercase text-gray-500 font-bold font-mono">
                      {res.type === "pdf" ? (
                        <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-primary" /> PDF</span>
                      ) : (
                        <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5 text-secondary" /> Video</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-500">{res.category}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {res.type === "pdf" ? (
                          <a
                            href={res.fileUrl}
                            target="_blank"
                            className="p-1.5 bg-primary-light text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                            title="Open Link"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <a
                            href={res.videoUrl}
                            target="_blank"
                            className="p-1.5 bg-secondary/15 text-secondary hover:bg-secondary hover:text-white rounded-lg transition-colors"
                            title="Open Video"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(res._id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Resource"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </div>
  );
}
