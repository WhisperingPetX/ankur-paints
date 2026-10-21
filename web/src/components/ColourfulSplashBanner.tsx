"use client";

import React from "react";
import Image from "next/image";

export const ColourfulSplashBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#F8F9FA] py-8 sm:py-12 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Normal-Width Contained 16:9 Banner (Not Overly Wide, Zero Cropping) */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 shadow-2xl border border-slate-200/80">
          
          {/* 1. 4K India Heritage Artwork — Dimmed with Soft Darkness so it Stays in Background */}
          <div className="absolute inset-0">
            <Image
              src="/branding/india_heritage_banner_4k.jpg"
              alt="Ankur Paints — The Vibrant Colours of India"
              fill
              quality={100}
              unoptimized={true}
              priority
              className="object-contain sm:object-cover object-center brightness-[0.70] [image-rendering:-webkit-optimize-contrast]"
              sizes="(max-width: 1200px) 100vw, 1152px"
            />
            {/* Subtle Atmospheric Overlay */}
            <div className="absolute inset-0 bg-black/25" />
          </div>

          {/* 2. Big Bada Sa "Ankur Paints" Official Logo in the Exact Center */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 z-10">
            <div className="w-[92%] sm:w-auto max-w-xl p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-white/92 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.45)] flex flex-col items-center text-center transform transition-transform hover:scale-[1.02] duration-300">
              
              {/* Eyebrow */}
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#E8501E] mb-2 sm:mb-3">
                LET’S COLOUR YOUR WORLD
              </span>

              {/* Exact Header Brand Logo - Big & Bold in Center */}
              <div className="py-1">
                <Image
                  src="/branding/ankur_logo_hd.png"
                  alt="Ankur Paints and Inks Private Limited"
                  width={485}
                  height={155}
                  priority
                  unoptimized={true}
                  className="h-14 sm:h-20 md:h-24 lg:h-28 w-auto object-contain [image-rendering:-webkit-optimize-contrast]"
                />
              </div>

              {/* Subtitle */}
              <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 font-medium max-w-sm sm:max-w-md mt-2 leading-relaxed">
                Premium Architectural & Industrial Coatings Engineered for Every Dream Space
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
