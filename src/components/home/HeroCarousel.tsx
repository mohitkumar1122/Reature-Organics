"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Leaf } from "lucide-react";
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isAutoPlaying]);

  if (!banners || banners.length === 0) return null;

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] lg:h-[680px] overflow-hidden rounded-3xl shadow-large group/carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background image with ken-burns effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banners[currentIdx].imageUrl})` }}
          />
          
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-darkText/80 via-darkText/50 to-darkText/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" />

          {/* Decorative floating leaves */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 hidden lg:block"
          >
            <Leaf className="w-12 h-12 text-secondary/30" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 right-40 hidden lg:block"
          >
            <Leaf className="w-8 h-8 text-secondary/20" />
          </motion.div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
              <div className="text-white space-y-6 max-w-2xl">
                
                {/* Offer Badge */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-secondary/20 backdrop-blur-md text-white uppercase tracking-widest border border-secondary/40 shadow-glow"
                >
                  <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
                  100% Ayurvedic Herbals
                </motion.div>

                <motion.h1
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight font-serif leading-[1.05]"
                >
                  {banners[currentIdx].title}
                </motion.h1>

                <motion.p
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.7 }}
                  className="text-base md:text-lg lg:text-xl text-gray-200 font-normal leading-relaxed max-w-xl"
                >
                  {banners[currentIdx].subtitle}
                </motion.p>

                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.7 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <Link
                    href={banners[currentIdx].linkUrl}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-secondary text-white hover:bg-white hover:text-primary shadow-glow-secondary transition-all duration-300 hover:scale-105"
                  >
                    Shop Remedies
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white transition-all duration-300"
                  >
                    Our Heritage
                    <Leaf className="w-4 h-4" />
                  </Link>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.7 }}
                  className="flex items-center gap-6 md:gap-8 pt-6 border-t border-white/20 mt-2"
                >
                  {[
                    { value: "50K+", label: "Happy Customers" },
                    { value: "500+", label: "Natural Products" },
                    { value: "100%", label: "Authentic" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="text-2xl md:text-3xl font-bold text-secondary font-serif">{stat.value}</p>
                      <p className="text-[11px] text-gray-300 uppercase tracking-wider font-medium">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-primary hover:scale-110 transition-all z-10 focus:outline-none opacity-0 group-hover/carousel:opacity-100 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-primary hover:scale-110 transition-all z-10 focus:outline-none opacity-0 group-hover/carousel:opacity-100 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10 bg-darkText/40 backdrop-blur-md px-5 py-3 rounded-full border border-white/10">
        {/* Slide Counter */}
        <span className="text-white text-xs font-mono font-bold tabular-nums">
          {String(currentIdx + 1).padStart(2, "0")}
          <span className="text-white/50 mx-1">/</span>
          <span className="text-white/70">{String(banners.length).padStart(2, "0")}</span>
        </span>

        <div className="w-px h-4 bg-white/20" />

        {/* Dots Navigation */}
        <div className="flex gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentIdx === idx
                  ? "bg-secondary w-8 shadow-glow-secondary"
                  : "bg-white/40 hover:bg-white/70 w-2"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-10">
        <motion.div
          key={currentIdx}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-gradient-to-r from-secondary to-primary"
        />
      </div>
    </div>
  );
}