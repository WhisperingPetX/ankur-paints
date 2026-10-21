"use client";

import React from "react";
import Image from "next/image";

export const ColourfulSplashBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-[#040914] overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="relative w-full aspect-[1024/342] overflow-hidden bg-[#040914]">
          <Image
            src="/branding/ankur_splash_wave_4k.jpg"
            alt="Ankur Paints and Inks Private Limited - Let's Colour Your World"
            fill
            quality={100}
            unoptimized={true}
            priority
            className="object-contain object-center [image-rendering:-webkit-optimize-contrast]"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
};
