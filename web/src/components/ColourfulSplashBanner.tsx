"use client";

import React from "react";
import Image from "next/image";
import { AnkurLogo } from "./AnkurLogo";

export const ColourfulSplashBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-[#040914] overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#040914]">
          
          {/* 1. Full-Bleed 4K India Heritage Artwork (Zero Cropping - "kateee naa ho") */}
          <Image
            src="/branding/india_heritage_banner_4k.jpg"
            alt="Ankur Paints — The Vibrant Colours of India"
            fill
            quality={100}
            unoptimized={true}
            priority
            className="object-contain sm:object-cover object-center [image-rendering:-webkit-optimize-contrast]"
            sizes="100vw"
          />

          {/* 2. Aesthetic Frosted Glass Crown for "Ankur Paints" */}
          <div className="absolute top-4 sm:top-8 md:top-12 lg:top-14 left-1/2 -translate-x-1/2 z-10 w-[92%] max-w-lg md:max-w-xl text-center">
            <div className="inline-flex flex-col items-center gap-1.5 sm:gap-2.5 px-6 sm:px-10 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-black/45 backdrop-blur-md border border-white/25 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              {/* Eyebrow */}
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#FFD100]">
                LET’S COLOUR YOUR WORLD
              </span>

              {/* Ankur Paints Official Brand Logo */}
              <div className="py-0.5">
                <AnkurLogo className="h-9 sm:h-12 md:h-14 w-auto drop-shadow-2xl" variant="light" />
              </div>

              {/* Tagline */}
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-200">
                Colours for a Better Tomorrow
              </span>
            </div>
          </div>

          {/* 3. Subtle Bottom Vignette to Blend Seamlessly into Footer */}
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#040914] to-transparent pointer-events-none" />

        </div>
      </div>
    </section>
  );
};
