"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export const ColourHero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[600px] sm:min-h-[680px] lg:min-h-[760px] w-full flex items-center overflow-hidden bg-slate-900 text-white">
      
      {/* 1. Full-Bleed Realistic High-Ceiling Room with Abstract Splash Mural Background */}
      <div className="absolute inset-0">
        <Image
          src="/branding/high_ceiling_abstract_room.jpg"
          alt="Ankur Paints Colour Your World Living Room"
          fill
          className="object-cover object-center lg:object-[center_35%]"
          priority
        />
        {/* Cinematic Gradient Vignette for Text Legibility on Left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full z-10">
        <div className="max-w-2xl text-left space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD100]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              PREMIUM PAINTS FOR A BRIGHTER TOMORROW
            </span>
          </div>

          {/* Master Headline (Colour Your World) */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-lg font-sans">
            Colour <br />
            <span className="text-[#FFD100]">Your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#10B981] to-[#FF4B8B]">
              World
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200 max-w-xl font-normal leading-relaxed drop-shadow-md">
            Transform your spaces with Ankur Paints — where quality meets creativity. Premium architectural coatings engineered for homes, offices, and every dream space.
          </p>

          {/* Call To Action Button (Warm Orange Rounded Pill) */}
          <div className="pt-2">
            <a
              href="#products"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#E8501E] hover:bg-[#D04212] text-white text-sm font-bold rounded-full shadow-[0_10px_25px_rgba(232,80,30,0.45)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Explore Our Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};
