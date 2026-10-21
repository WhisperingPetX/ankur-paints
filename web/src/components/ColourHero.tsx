"use client";

import React from "react";
import Image from "next/image";

export const ColourHero: React.FC = () => {
  return (
    <section id="hero" className="w-full bg-[#FAFAFA] border-b border-slate-200/80">
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="relative w-full aspect-[1024/521] overflow-hidden bg-white shadow-sm">
          <Image
            src="/branding/ankur_master_lineup_banner.jpg"
            alt="Ankur Paints and Inks Private Limited - Colours for a Better Tomorrow"
            fill
            priority
            quality={100}
            className="object-cover sm:object-contain object-center"
            sizes="(max-width: 1920px) 100vw, 1920px"
          />
        </div>
      </div>
    </section>
  );
};
