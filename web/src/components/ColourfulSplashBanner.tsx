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
          alt="Ankur Paints — The Vibrant Colours of India"
          fill
          priority
          quality={100}
          unoptimized={true}
          className="object-cover object-center brightness-[0.55] [image-rendering:-webkit-optimize-contrast]"
          sizes="100vw"
        />
        {/* Soft Contrast Scrim so Text & Logo Pop with 100% Clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-black/40 to-[#030712]/80" />
      </div>

      {/* 2. Seamless Floating Center Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 flex flex-col items-center space-y-6">
        
        {/* Eyebrow */}
        <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#FFD100] drop-shadow-md">
          LET’S COLOUR YOUR WORLD
        </span>

        {/* Official Ankur Paints Brand Logo (Exact Official Identity with Rainbow Brush & Tagline) */}
        <div className="py-2 transform transition-transform hover:scale-105 duration-300">
          <Image
            src="/branding/ankur_logo_hd.png"
            alt="Ankur Paints and Inks Private Limited - Colours for a Better Tomorrow"
            width={728}
            height={233}
            priority
            unoptimized={true}
            className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.7)] drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)] [image-rendering:-webkit-optimize-contrast]"
          />
        </div>

        {/* Subtitle Description — Bold as requested */}
        <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl font-bold leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Ready to transform your home with royal brilliance and enduring protection? Connect with our architectural paint experts today.
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
