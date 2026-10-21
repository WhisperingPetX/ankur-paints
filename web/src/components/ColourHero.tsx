"use client";

import React from "react";
import Image from "next/image";

export const ColourHero: React.FC = () => {
  return (
    <section id="hero" className="w-full bg-[#F8F9FA] py-6 sm:py-8 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-[1024/521] overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-lg border border-slate-200/70">
          <Image
            src="/branding/ankur_master_lineup_hd.jpg"
            alt="Ankur Paints and Inks Private Limited - Colours for a Better Tomorrow"
            fill
            priority
            quality={100}
            unoptimized={true}
            className="object-contain object-center [image-rendering:-webkit-optimize-contrast]"
            sizes="(max-width: 1200px) 100vw, 1152px"
          />
        </div>
      </div>
    </section>
  );
};
