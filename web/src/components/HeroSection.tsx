"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Award } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 0,
      eyebrow: "PREMIUM PAINTS FOR A BRIGHTER TOMORROW",
      titleStart: "Colour Your",
      titleAccent: "World",
      description:
        "Transform your spaces with premium quality paints that bring life, beauty and lasting protection to your walls.",
      badgeText: "German Crosslinking Polymers",
      badgeIcon: Sparkles,
      bgImage: "/branding/hero_slide_1.png",
      tagline: "Premium Quality Lasting Beauty",
    },
    {
      id: 1,
      eyebrow: "GERMAN WEATHER DEFENSE TECHNOLOGY",
      titleStart: "Shield Your",
      titleAccent: "Exteriors",
      description:
        "Engineered with advanced weather-guard crosslinking polymers for 10 years of crack-resistant exterior beauty against extreme Indian monsoons & UV heat.",
      badgeText: "10 Years Warranty Defense",
      badgeIcon: ShieldCheck,
      bgImage: "/branding/hero_slide_2.png",
      tagline: "Epic Coat & Rose Gold Exterior Armor",
    },
    {
      id: 2,
      eyebrow: "HEALTHY LIVING SPACES",
      titleStart: "Elevate Your",
      titleAccent: "Interiors",
      description:
        "Ultra-low VOC formulation with rich silky eggshell sheen, antimicrobial defense, and easy-clean stain resistance for modern Indian luxury homes.",
      badgeText: "7 Years Washable Sheen Guarantee",
      badgeIcon: Award,
      bgImage: "/branding/hero_slide_3.png",
      tagline: "Rang Ritu & Colour Create Luxury",
    },
  ];

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[activeSlide];
  const BadgeIcon = current.badgeIcon;

  return (
    <section
      id="hero"
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] w-full flex items-center overflow-hidden bg-[#071324] select-none"
    >
      {/* 1. Full-Bleed 4K Ultra-Sharp Living Room & Paint Showcase Stage Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0 w-full h-full"
        >
          <Image
            src={current.bgImage}
            alt={current.titleStart + " " + current.titleAccent}
            fill
            quality={95}
            className="object-cover object-right md:object-center"
            priority
          />
          {/* Architectural Left Shadow Vignette for 4K Typography Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050D1A]/95 via-[#050D1A]/75 via-45% to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050B14] to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* 2. Hero Interactive Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full z-10">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl lg:max-w-2xl space-y-6 text-left"
        >
          {/* Eyebrow Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/60 backdrop-blur-md">
            <BadgeIcon className="w-4 h-4 text-[#00B2E3]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#00B2E3] drop-shadow-sm">
              {current.eyebrow}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-serif drop-shadow-md">
            {current.titleStart}{" "}
            <span className="text-[#E8501E] block sm:inline drop-shadow-[0_4px_25px_rgba(232,80,30,0.5)]">
              {current.titleAccent}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-100/90 max-w-lg leading-relaxed font-normal drop-shadow-sm">
            {current.description}
          </p>

          {/* Single Explore Products Button (Watch Video Removed as requested) */}
          <div className="pt-2">
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#E8501E] hover:bg-[#D04212] text-white text-sm font-bold rounded-full shadow-[0_10px_30px_rgba(232,80,30,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Horizontal Slide Carousel Controls & Dot Indicators */}
          <div className="flex items-center gap-4 pt-6">
            {/* Prev/Next Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-[#004B87] text-white flex items-center justify-center border border-slate-700/80 transition-all hover:scale-105"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-[#004B87] text-white flex items-center justify-center border border-slate-700/80 transition-all hover:scale-105"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Clickable Pill Indicators */}
            <div className="flex items-center gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-400 ${
                    activeSlide === idx
                      ? "w-8 bg-[#E8501E] shadow-[0_0_10px_#E8501E]"
                      : "w-3 bg-slate-600/70 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slide Index Counter */}
            <span className="text-xs font-semibold text-slate-400 pl-2">
              0{activeSlide + 1} / 0{slides.length}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating Right-Side Script Accent */}
      <div className="hidden lg:block absolute bottom-8 right-10 z-10 pointer-events-none">
        <span className="font-cursive text-2xl text-amber-200/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-wide">
          {current.tagline}
        </span>
      </div>
    </section>
  );
};
