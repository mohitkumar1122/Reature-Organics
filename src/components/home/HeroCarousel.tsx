"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Banner {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl: string;
  position: string;
  order: number;
}

export default function HeroCarousel({ banners }: { banners: Banner[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-gray-50 rounded-3xl mt-4 border border-gray-100 shadow-sm">
      
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banners[currentIdx].imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2">
              <div className="text-white space-y-6 max-w-xl">
                
                {/* Offer Badge */}
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-secondary text-white uppercase tracking-widest"
                >
                  🍃 100% Ayurvedic Herbals
                </motion.span>

                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif leading-tight"
                >
                  {banners[currentIdx].title}
                </motion.h1>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-base md:text-lg text-gray-200 font-normal leading-relaxed"
                >
                  {banners[currentIdx].subtitle}
                </motion.p>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap gap-4 pt-2"
                >
                  <Link
                    href={banners[currentIdx].linkUrl}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Shop Remedies <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white transition-all duration-300"
                  >
                    Our Heritage
                  </Link>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Left/Right Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/35 hover:scale-105 transition-all z-10 focus:outline-none"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/35 hover:scale-105 transition-all z-10 focus:outline-none"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIdx === idx ? "bg-secondary px-3" : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </div>
  );
}
