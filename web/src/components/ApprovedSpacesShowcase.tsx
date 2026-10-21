"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Sparkles, Droplets, Sun } from "lucide-react";

export const ApprovedSpacesShowcase: React.FC = () => {
  return (
    <section id="spaces" className="py-24 relative overflow-hidden text-white">
      
      {/* 1. Full-Bleed India Heritage Colors Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/branding/india_heritage_colors_bg.jpg"
          alt="Ankur Paints — The Vibrant Colours of India"
          fill
          priority
          quality={100}
          unoptimized={true}
          className="object-cover object-center [image-rendering:-webkit-optimize-contrast]"
        />
        {/* Ambient Overlay to Keep India Artwork Visible While Making Text Razor-Sharp */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070D]/80 via-transparent to-[#040914]/90" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/15 shadow-xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FFD100]">
            ARCHITECTURAL EXCELLENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans drop-shadow-md">
            Designed for the world’s most refined spaces.
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed drop-shadow">
            From grand heritage lobbies to contemporary jali-crafted residences, Ankur Paints formulations deliver unmatched aesthetic richness and environmental endurance.
          </p>
        </div>

        {/* Feature 1: Grand Interior Hall (Velvety Depth. Effortless Washability.) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/50 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl">
          
          {/* Image */}
          <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
            <Image
              src="/branding/grand_interior_heritage_hall.jpg"
              alt="Ankur Paints Grand Architectural Interior Hall"
              fill
              quality={100}
              unoptimized={true}
              className="object-cover group-hover:scale-105 transition-transform duration-700 [image-rendering:-webkit-optimize-contrast]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs text-slate-200">
              <span className="font-bold text-white">Traditional Landscape Mural</span> • Grand Interior Hall
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-[#00E5FF] text-[10px] font-bold uppercase tracking-wider">
              <span>Interior Luxury Emulsion</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow">
              Velvety Depth. Effortless Washability.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Formulated with ultra-fine crosslinked acrylics that create a micro-smooth, silky eggshell sheen. Repels grease stains, marker scuffs, and household spills with Class 1 scrub resistance.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-200 font-semibold border-t border-white/15">
              <div>
                <span className="block text-slate-400 text-[10px] uppercase">Warranty</span>
                <span className="text-white">7 Years Sheen</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[10px] uppercase">Washability</span>
                <span className="text-emerald-400">Class 1 Scrub Proof</span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature 2: Contemporary Jali Villa Facade (Extreme Weather Exterior) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/50 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl">
          
          {/* Text (Left on Desktop) */}
          <div className="lg:col-span-5 space-y-5 text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-[#FFD100] text-[10px] font-bold uppercase tracking-wider">
              <span>Exterior Weatherproof Shield</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow">
              Extreme Climate Armor. Rain or Shine.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Hydrophobic silicone nano-beading repels tropical downpours and prevents black algae growth, while Total Solar Reflectance (TSR) pigments reduce exterior wall temperatures by up to 5°C.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-200 font-semibold border-t border-white/15">
              <div>
                <span className="block text-slate-400 text-[10px] uppercase">Warranty</span>
                <span className="text-white">10 Years All-Weather</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[10px] uppercase">Thermal Drop</span>
                <span className="text-[#FFD100]">Up to 5°C Cooler</span>
              </div>
            </div>
          </div>

          {/* Image (Right on Desktop) */}
          <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl group order-1 lg:order-2">
            <Image
              src="/branding/contemporary_jali_villa_exterior.jpg"
              alt="Ankur Paints Contemporary Luxury Jali Villa Exterior"
              fill
              quality={100}
              unoptimized={true}
              className="object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 [image-rendering:-webkit-optimize-contrast]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs text-slate-200">
              <span className="font-bold text-white">Traditional Jali Craft & Stone</span> • Luxury Residence
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
