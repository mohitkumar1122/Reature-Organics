
"use client";

import React, { useState } from "react";

export default function ProductGallery({
  images,
}: {
  images: string[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const productImages =
    images && images.length > 0
      ? images.filter(Boolean).slice(0, 5)
      : [];

  if (productImages.length === 0) {
    return (
      <div className="w-full h-96 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-400">
        Product image not available
      </div>
    );
  }

  const activeImage = productImages[activeIdx];

  return (
    <div className="space-y-4">

      {/* Main Product Image */}
      <div
        className="relative h-96 md:h-[450px] w-full rounded-3xl border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center cursor-zoom-in"
        onClick={() => setIsZoomOpen(true)}
      >
        <img
          src={activeImage}
          alt="Product image"
          className="w-full h-full object-contain p-3 transition-transform duration-300 hover:scale-105"
        />

        <span className="absolute bottom-4 right-4 bg-white/90 rounded-full px-3 py-2 text-xs text-gray-600 shadow-sm">
          <span>Click to zoom</span>
        </span>
      </div>

      {/* Product Thumbnails */}
      {productImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 bg-gray-50 transition-all ${
                activeIdx === idx
                  ? "border-green-600 shadow-md"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <img
                src={img}
                alt={`Product thumbnail ${idx + 1}`}
                className="w-full h-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      {/* Full Screen Image Zoom */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl"
            aria-label="Close image zoom"
          >
            &times;
          </button>

          <img
            src={activeImage}
            alt="Zoomed product"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
}
