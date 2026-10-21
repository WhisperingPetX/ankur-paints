"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ColourfulSplashBannerProps {
  onOpenGoogleAuth?: () => void;
}

export const ColourfulSplashBanner: React.FC<ColourfulSplashBannerProps> = ({
  onOpenGoogleAuth,
}) => {
  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden text-center text-white bg-[#030712]">
      
      {/* 1. Full-Bleed 4K India Heritage Artwork — Edge-to-Edge with Atmospheric Dark Dimming */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/branding/india_heritage_banner_4k.jpg"
          alt="The Vibrant Heritage and Living Colours of India"
          fill
          priority
          quality={100}
          unoptimized={true}
          className="object-cover object-center brightness-[0.55] [image-rendering:-webkit-optimize-contrast]"
          sizes="100vw"
        />
        {/* Soft Contrast Scrim so Text & Dancers Pop with 100% Clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-black/40 to-[#030712]/80" />
      </div>

      {/* 2. Seamless Floating Center Content — Inspiring, Patriotic & Colour-Centric */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 flex flex-col items-center space-y-6">
        
        {/* Patriotic Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD100] text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] shadow-lg">
          <span className="text-[#FF9933]">★</span>
          <span>PROUDLY CRAFTED FOR INDIA</span>
          <span className="text-[#138808]">★</span>
        </div>

        {/* Fascinating Patriotic Main Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)] max-w-3xl">
          Where Every Colour Echoes the <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.35)]">
            Proud Soul of India.
          </span>
        </h2>

        {/* Inspiring Patriotic Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-2xl font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          From royal heritage architecture to modern dream spaces — celebrating the living colours, enduring strength, and cultural brilliance of our motherland on every wall.
        </p>

        {/* Call to Action Button: "Take A Tour" triggering Google Login */}
        <div className="pt-3">
          <button
            onClick={onOpenGoogleAuth}
            type="button"
            className="group inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-slate-900 hover:bg-slate-100 font-extrabold rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer"
          >
            <span>Take A Tour</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>

    </section>
  );
};