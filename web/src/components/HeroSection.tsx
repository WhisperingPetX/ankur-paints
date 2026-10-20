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
      heroImage: "/branding/hero_buckets_livingroom.png",
      tagline: "Premium Quality Lasting Beauty",
    },
    {
      eyebrow: "GERMAN POLYMER PROTECTION",
      titleStart: "Shield Your",
      titleAccent: "Exteriors",
      description:
        "Engineered with advanced weather-guard crosslinking polymers for up to 10 years of crack-resistant exterior beauty.",
      heroImage: "/branding/hero_banner_full.png",
      tagline: "Extreme Weather Defense",
    },
  ];

  const current = slides[activeSlide];

  return (
    <section id="hero" className="relative min-h-[640px] lg:min-h-[740px] flex items-center overflow-hidden bg-[#070E1A]">
      {/* Ambient Radial Auroras */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] lg:w-[850px] h-[600px] lg:h-[850px] rounded-full bg-gradient-to-br from-[#004B87]/30 via-[#E8501E]/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#004B87]/20 blur-[100px] pointer-events-none" />

      {/* Background Architectural Backdrop (Subtle) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image
          src="/branding/living_room_hero.png"
          alt="Luxury Living Room"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B14] via-[#050B14]/85 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            {/* Eyebrow Tagline */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#00B2E3] drop-shadow-sm">
                {current.eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-serif">
              {current.titleStart}{" "}
              <span className="text-[#E8501E] block sm:inline drop-shadow-md">
                {current.titleAccent}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed font-normal">
              {current.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#E8501E] hover:bg-[#D04212] text-white text-sm font-semibold rounded-full shadow-[0_10px_25px_rgba(232,80,30,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onWatchVideoClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-sm font-semibold rounded-full border border-white/15 backdrop-blur-md transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5 text-white" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Carousel Navigation Bars */}
            <div className="flex items-center gap-2 pt-6">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? "w-8 bg-[#E8501E]"
                      : "w-3 bg-slate-700 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column: Hero Showcase Visual Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-7 relative flex items-center justify-center"
          >
            {/* The Integrated Target Living Room & Buckets Master Art */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-w-2xl lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <Image
                src="/branding/hero_buckets_livingroom.png"
                alt="Ankur Paints Bucket Lineup in Luxury Penthouse"
                fill
                className="object-cover object-center"
                priority
              />

              {/* Subtle Gradient Overlays for integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Handwritten Script Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-right z-20 pointer-events-none">
                <span className="font-cursive text-xl sm:text-2xl text-amber-200/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-wide">
                  {current.tagline}
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
