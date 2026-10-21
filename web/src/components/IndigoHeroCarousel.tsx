"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Award, Droplets, Sun, CheckCircle2 } from "lucide-react";

export const IndigoHeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: "Flagship Exterior Protection",
      title: "Surprise Your Exterior Walls With",
      highlight: "10-Year Weather Defense",
      desc: "Engineered with German crosslinking polymers to withstand severe Indian monsoons, intense ultraviolet solar radiation, and extreme temperature swings.",
      productName: "Epic Coat Luxury Exterior Emulsion",
      bucketImg: "/branding/bucket_5.png",
      bgGradient: "from-[#002D5A] via-[#004B87] to-[#0A192F]",
      warranty: "10-Year Warranty",
      sheen: "High Weather Sheen",
      ctaPrimary: "Explore Exterior Range",
      ctaPrimaryHref: "#products",
      ctaSecondary: "Try Colour Visualizer",
      ctaSecondaryHref: "#visualizer",
      features: ["2.2mm Crack Bridging", "Anti-Algae Silicone", "Solar Heat Reflective"],
    },
    {
      id: 2,
      badge: "Signature Washable Interior",
      title: "Velvety Sheen That Erases Stains",
      highlight: "With a Single Wipe",
      desc: "Give your living spaces and bedrooms a rich, silky texture that repels household spills, grease marks, and scuffs with Class 1 scrub resistance.",
      productName: "Rang Ritu Washable Luxury Emulsion",
      bucketImg: "/branding/bucket_2.png",
      bgGradient: "from-[#4A0E2E] via-[#831843] to-[#1E1B4B]",
      warranty: "7-Year Sheen Warranty",
      sheen: "Silky Velvet Sheen",
      ctaPrimary: "Explore Interior Range",
      ctaPrimaryHref: "#products",
      ctaSecondary: "Paint Calculator",
      ctaSecondaryHref: "#calculator",
      features: ["Class 1 Scrub Proof", "Zero VOC Odorless", "Rich Stain Repellent"],
    },
    {
      id: 3,
      badge: "Advanced Waterproofing Shield",
      title: "Say Goodbye to Wall Dampness",
      highlight: "Zero Seepage Guaranteed",
      desc: "Heavy-duty elastomeric membrane that locks out rain and dampness on exterior terraces, parapets, and exterior vertical surfaces with micro-fiber tensile strength.",
      productName: "Damp Proof Advanced Waterproofing",
      bucketImg: "/branding/bucket_6.png",
      bgGradient: "from-[#042F2E] via-[#0D9488] to-[#0F172A]",
      warranty: "10-Year Seepage Proof",
      sheen: "Elastomeric Membrane",
      ctaPrimary: "Explore Waterproofing",
      ctaPrimaryHref: "#products",
      ctaSecondary: "Locate Nearest Dealer",
      ctaSecondaryHref: "#dealer-locator",
      features: ["Positive & Negative Hydrostatic", "100% Water Repellent", "Crack Bridging 2.0mm"],
    },
  ];

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-slate-900 text-white">
      
      {/* Dynamic Slide Background with Smooth Transition */}
      <div className={`relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] w-full flex items-center bg-gradient-to-r ${slide.bgGradient} transition-all duration-1000`}>
        
        {/* Subtle Architectural Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

        {/* Ambient Light Bloom */}
        <div className="absolute top-1/4 right-1/4 w-[450px] lg:w-[650px] h-[450px] lg:h-[650px] rounded-full bg-white/10 blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD100]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  {slide.badge}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                {slide.title}{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD100] via-[#FFAE00] to-[#E8501E] drop-shadow-sm">
                  {slide.highlight}
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed font-normal">
                {slide.desc}
              </p>

              {/* 3 Key Formulation Feature Tags */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {slide.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-slate-100 backdrop-blur-sm"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>

              {/* Action Buttons (Indigo Style: Vibrant Rounded CTAs) */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href={slide.ctaPrimaryHref}
                  className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#E8501E] hover:bg-[#D04212] text-white text-sm font-bold rounded-full shadow-[0_10px_25px_rgba(232,80,30,0.4)] transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span>{slide.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href={slide.ctaSecondaryHref}
                  className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-full border border-white/25 backdrop-blur-md transition-all duration-200 shadow-sm"
                >
                  <span>{slide.ctaSecondary}</span>
                </a>
              </div>

            </div>

            {/* Right Column: 3D Bucket Packaging Visual */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md group">
                
                {/* Glow behind bucket */}
                <div className="absolute inset-0 -top-8 rounded-full bg-white/15 blur-[60px] pointer-events-none" />

                {/* Packaging Can */}
                <div className="relative aspect-square w-full flex items-center justify-center animate-float">
                  <div className="relative w-72 h-84 sm:w-80 sm:h-96">
                    <Image
                      src={slide.bucketImg}
                      alt={slide.productName}
                      fill
                      className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]"
                      priority
                    />
                  </div>
                </div>

                {/* Floating Official Stamp Badge */}
                <div className="absolute -bottom-2 right-2 sm:right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 shadow-2xl flex items-center gap-3 text-slate-900">
                  <div className="w-9 h-9 rounded-xl bg-[#004B87] text-[#FFD100] flex items-center justify-center font-extrabold text-sm shadow-sm">
                    ★
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold leading-tight text-slate-900">{slide.warranty}</div>
                    <div className="text-[11px] font-semibold text-[#004B87]">{slide.sheen}</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Carousel Next / Prev Controls */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all z-20 shadow-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all z-20 shadow-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? "w-8 bg-[#FFD100]"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

      </div>

      {/* Feature Strip Banner Below Hero (Indigo Paints Style Value Strip) */}
      <div className="bg-white text-slate-800 border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-slate-100">
            <div className="space-y-0.5">
              <div className="text-lg sm:text-xl font-extrabold text-[#004B87]">25+ Years</div>
              <div className="text-xs text-slate-500 font-medium">Manufacturing Heritage</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-lg sm:text-xl font-extrabold text-[#E8501E]">100% Genuine</div>
              <div className="text-xs text-slate-500 font-medium">German Polymer Resins</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-lg sm:text-xl font-extrabold text-emerald-600">Zero VOC</div>
              <div className="text-xs text-slate-500 font-medium">Safe for Kids & Family</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-lg sm:text-xl font-extrabold text-[#004B87]">1,200+</div>
              <div className="text-xs text-slate-500 font-medium">Authorized Retail Stores</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
