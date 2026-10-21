"use client";

import React from "react";
import Image from "next/image";

export const ApprovedSpacesShowcase: React.FC = () => {
  return (
    <section id="spaces" className="py-16 sm:py-20 bg-white text-slate-900 relative border-b border-slate-200/80">
      
      {/* Compact & Well-Balanced Container (max-w-4xl) - Sleek, Not Overly Wide */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E8501E] flex items-center justify-center gap-2">
            <span className="w-5 h-[2px] bg-[#E8501E]" />
            <span>ARCHITECTURAL EXCELLENCE</span>
            <span className="w-5 h-[2px] bg-[#E8501E]" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 font-sans">
            Designed for the world’s most refined spaces.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From grand heritage lobbies to contemporary jali residences, heavy industrial plants, and luxury timber interiors.
          </p>
        </div>

        {/* 4 Cards in Modern Zig-Zag Arrangement */}
        <div className="space-y-6 sm:space-y-7">
          
          {/* Card 1: Interior Luxury Emulsion (Image Left, Text Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center bg-slate-50/90 hover:bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Image (Left) */}
            <div className="md:col-span-6 relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-slate-200/80 shadow-sm group md:order-1">
              <Image
                src="/branding/grand_interior_heritage_hall.jpg"
                alt="Ankur Paints Grand Architectural Interior Hall"
                fill
                quality={100}
                unoptimized={true}
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 [image-rendering:-webkit-optimize-contrast]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-[11px] text-slate-200">
                <span className="font-bold text-white">Traditional Landscape Mural</span> • Grand Interior Hall
              </div>
            </div>

            {/* Content (Right) */}
            <div className="md:col-span-6 space-y-3 text-left md:order-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#0A3E80] text-[10px] font-bold uppercase tracking-wider">
                <span>Interior Luxury Emulsion</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                Velvety Depth. Effortless Washability.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Formulated with ultra-fine crosslinked acrylics creating a micro-smooth, silky eggshell sheen. Repels grease stains, marker scuffs, and household spills with Class 1 scrub resistance.
              </p>
              <div className="pt-2 flex items-center gap-6 text-xs text-slate-700 font-semibold border-t border-slate-200/80">
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Warranty</span>
                  <span className="text-slate-900 font-bold">7 Years Sheen</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Washability</span>
                  <span className="text-emerald-600 font-bold">Class 1 Scrub Proof</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Exterior Weatherproof Shield (Text Left, Image Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center bg-slate-50/90 hover:bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Content (Left) */}
            <div className="md:col-span-6 space-y-3 text-left md:order-1 order-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-[#E8501E] text-[10px] font-bold uppercase tracking-wider">
                <span>Exterior Weatherproof Shield</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                Extreme Climate Armor. Rain or Shine.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hydrophobic silicone nano-beading repels tropical downpours and prevents black algae growth, while TSR pigments reduce exterior wall temperatures by up to 5°C.
              </p>
              <div className="pt-2 flex items-center gap-6 text-xs text-slate-700 font-semibold border-t border-slate-200/80">
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Warranty</span>
                  <span className="text-slate-900 font-bold">10 Years All-Weather</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Thermal Drop</span>
                  <span className="text-[#E8501E] font-bold">Up to 5°C Cooler</span>
                </div>
              </div>
            </div>

            {/* Image (Right) */}
            <div className="md:col-span-6 relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-slate-200/80 shadow-sm group md:order-2 order-1">
              <Image
                src="/branding/contemporary_jali_villa_exterior.jpg"
                alt="Ankur Paints Contemporary Luxury Jali Villa Exterior"
                fill
                quality={100}
                unoptimized={true}
                className="object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 [image-rendering:-webkit-optimize-contrast]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-[11px] text-slate-200">
                <span className="font-bold text-white">Traditional Jali Craft & Stone</span> • Luxury Residence
              </div>
            </div>
          </div>

          {/* Card 3: Heavy-Duty Industrial Coatings (Image Left, Text Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center bg-slate-50/90 hover:bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Image (Left) */}
            <div className="md:col-span-6 relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-slate-200/80 shadow-sm group md:order-1">
              <Image
                src="/branding/industrial_high_build_epoxy.jpg"
                alt="Ankur Paints Heavy-Duty Industrial Flooring and Steel Coatings"
                fill
                quality={100}
                unoptimized={true}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 [image-rendering:-webkit-optimize-contrast]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-[11px] text-slate-200">
                <span className="font-bold text-white">High-Gloss Safety Epoxy</span> • Industrial Facility
              </div>
            </div>

            {/* Content (Right) */}
            <div className="md:col-span-6 space-y-3 text-left md:order-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[#B45309] text-[10px] font-bold uppercase tracking-wider">
                <span>Heavy-Duty Industrial Coatings</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                Industrial Strength. Chemical & Abrasion Proof.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                High-solid epoxy floorings and polyurethane primers engineered for manufacturing plants, heavy machinery bays, and chemical storage with zero peel adhesion.
              </p>
              <div className="pt-2 flex items-center gap-6 text-xs text-slate-700 font-semibold border-t border-slate-200/80">
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Bonding</span>
                  <span className="text-slate-900 font-bold">500+ PSI Adhesion</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Formulation</span>
                  <span className="text-amber-700 font-bold">100% Solid Epoxy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Luxury Wood Coatings & Speciality (Text Left, Image Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center bg-slate-50/90 hover:bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Content (Left) */}
            <div className="md:col-span-6 space-y-3 text-left md:order-1 order-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-900/10 border border-amber-800/20 text-[#78350F] text-[10px] font-bold uppercase tracking-wider">
                <span>Luxury Wood Finishes & Speciality</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                Natural Grain Radiance. Deep Timber Seal.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Premium Italian PU wood coats and polyurethane sealers highlight raw timber grain textures, providing non-yellowing satin luster with scratch and heat resistance.
              </p>
              <div className="pt-2 flex items-center gap-6 text-xs text-slate-700 font-semibold border-t border-slate-200/80">
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Durability</span>
                  <span className="text-slate-900 font-bold">Scratch & Heat Proof</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Clarity</span>
                  <span className="text-[#78350F] font-bold">Non-Yellowing PU</span>
                </div>
              </div>
            </div>

            {/* Image (Right) */}
            <div className="md:col-span-6 relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-slate-200/80 shadow-sm group md:order-2 order-1">
              <Image
                src="/branding/luxury_wood_finish_lounge.jpg"
                alt="Ankur Paints Luxury Wood Finishes and Natural Timber Lounge"
                fill
                quality={100}
                unoptimized={true}
                className="object-cover object-[center_65%] group-hover:scale-105 transition-transform duration-700 [image-rendering:-webkit-optimize-contrast]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-[11px] text-slate-200">
                <span className="font-bold text-white">Live-Edge Natural Timber</span> • Luxury Lounge
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};