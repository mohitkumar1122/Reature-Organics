"use client";

import React, { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({
    display: "none",
    transformOrigin: "center center",
    transform: "scale(1)",
  });

  const productImages = images && images.length > 0
    ? images
    : ["https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=600"];

  const activeImage = productImages[activeIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    // Calculate cursor percentage relative to image container bounds
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: "block",
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      display: "none",
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  return (
    <div className="space-y-4">
      
      {/* Large Display Image with Zoom Lens */}
      <div
        className="relative h-96 md:h-[450px] w-full rounded-3xl border border-gray-100 overflow-hidden cursor-zoom-in bg-gray-50 flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={activeImage}
          alt="Product details zoom view"
          className="w-full h-full object-cover transition-transform duration-75"
          style={{
            transform: zoomStyle.transform,
            transformOrigin: zoomStyle.transformOrigin,
          }}
        />
      </div>

      {/* Thumbnails slider */}
      {productImages.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-20 h-20 rounded-2xl overflow-hidden border-2 bg-gray-50 transition-all ${
                activeIdx === idx ? "border-primary shadow-sm" : "border-gray-200/50 hover:border-gray-300"
              }`}
            >
              <img src={img} alt="Product thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
