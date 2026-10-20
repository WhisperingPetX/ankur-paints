"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onWatchVideoClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onWatchVideoClick,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      eyebrow: "PREMIUM PAINTS FOR A BRIGHTER TOMORROW",
      titleStart: "Colour Your",
      titleAccent: "World",
      description:
        "Transform your spaces with premium quality paints that bring life, beauty and lasting protection to your walls.",
    },
    {
      eyebrow: "GERMAN POLYMER PROTECTION",
      titleStart: "Shield Your",
      titleAccent: "Exteriors",
      description:
        "Engineered with advanced weather-guard crosslinking polymers for up to 10 years of crack-resistant exterior beauty.",
    },
    {
      eyebrow: "HEALTHY LIVING SPACES",
      titleStart: "Eco-Friendly",
      titleAccent: "Interiors",
      description:
        "Ultra-low VOC formulation with rich washability and stain-resistant acrylic sheen for modern Indian homes.",
    },
  ];

  const current = slides[activeSlide];

  return (
    <section
      id="hero"
      className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[700px] w-full flex items-center overflow-hidden bg-[#071324]"
    >
      {/* 1. Full-Bleed Grand Living Room & Paint Showcase Stage Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/branding/hero_room_clean_1600.png"
          alt="Ankur Paints Luxury Living Room & Products"
          fill
          className="object-cover object-right md:object-center"
          priority
        />
        {/* Architectural Left Shadow Vignette for Ultra-Sharp Typography Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050D1A]/95 via-[#050D1A]/70 via-45% to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050B14]/80 to-transparent pointer-events-none" />
      </div>

      {/* 2. Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full z-10">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl lg:max-w-2xl space-y-6 text-left"
        >
          {/* Eyebrow Tagline */}
          <div className="inline-flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#00B2E3] drop-shadow-sm">
              {current.eyebrow}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-serif">
            {current.titleStart}{" "}
            <span className="text-[#E8501E] block sm:inline drop-shadow-[0_4px_20px_rgba(232,80,30,0.4)]">
              {current.titleAccent}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-200/90 max-w-lg leading-relaxed font-normal drop-shadow-sm">
            {current.description}
          </p>

          {/* Interactive CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#E8501E] hover:bg-[#D04212] text-white text-sm font-semibold rounded-full shadow-[0_10px_25px_rgba(232,80,30,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onWatchVideoClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full border border-white/20 backdrop-blur-md transition-all duration-300"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5 text-white" />
              </div>
              <span>Watch Video</span>
            </button>
          </div>

          {/* Carousel Slide Indicators */}
          <div className="flex items-center gap-2 pt-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx
                    ? "w-8 bg-[#E8501E] shadow-[0_0_8px_#E8501E]"
                    : "w-3 bg-slate-600/80 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
