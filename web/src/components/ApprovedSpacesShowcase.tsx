"use client";

import React from "react";
import Image from "next/image";

export const ApprovedSpacesShowcase: React.FC = () => {
  return (
    <section id="spaces" className="py-24 bg-white text-slate-800 relative border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#E8501E] flex items-center justify-center gap-2">
            <span className="w-6 h-[2px] bg-[#E8501E]" />
            <span>ARCHITECTURAL EXCELLENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
            Designed for the world’s most refined spaces.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From grand heritage lobbies to contemporary jali-crafted residences, Ankur Paints formulations deliver unmatched aesthetic richness and environmental endurance.
          </p>
        </div>

        {/* Feature 1: Grand Interior Hall (Velvety Depth. Effortless Washability.) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          
          {/* Image */}
          <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
            <Image
              src="/branding/grand_interior_heritage_hall.jpg"
              alt="Ankur Paints Grand Architectural Interior Hall"
              fill
              quality={100}
              unoptimized={true}
              className="object-cover group-hover:scale-105 transition-transform duration-700 [image-rendering:-webkit-optimize-contrast]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 bg-black/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs text-slate-200">
              <span className="font-bold text-white">Traditional Landscape Mural</span> • Grand Interior Hall
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#004B87] text-[10px] font-bold uppercase tracking-wider">
              <span>Interior Luxury Emulsion</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Velvety Depth. Effortless Washability.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Formulated with ultra-fine crosslinked acrylics that create a micro-smooth, silky eggshell sheen. Repels grease stains, marker scuffs, and household spills with Class 1 scrub resistance.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-700 font-semibold border-t border-slate-200">
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

        {/* Feature 2: Contemporary Jali Villa Facade (Extreme Weather Exterior) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          
          {/* Text (Left on Desktop) */}
          <div className="lg:col-span-5 space-y-5 text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#E8501E] text-[10px] font-bold uppercase tracking-wider">
              <span>Exterior Weatherproof Shield</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Extreme Climate Armor. Rain or Shine.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Hydrophobic silicone nano-beading repels tropical downpours and prevents black algae growth, while Total Solar Reflectance (TSR) pigments reduce exterior wall temperatures by up to 5°C.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-700 font-semibold border-t border-slate-200">
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

          {/* Image (Right on Desktop) */}
          <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md group order-1 lg:order-2">
            <Image
              src="/branding/contemporary_jali_villa_exterior.jpg"
              alt="Ankur Paints Contemporary Luxury Jali Villa Exterior"
              fill
              quality={100}
              unoptimized={true}
              className="object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 [image-rendering:-webkit-optimize-contrast]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 bg-black/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs text-slate-200">
              <span className="font-bold text-white">Traditional Jali Craft & Stone</span> • Luxury Residence
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
