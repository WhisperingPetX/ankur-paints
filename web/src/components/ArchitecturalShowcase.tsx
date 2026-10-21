"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export const ArchitecturalShowcase: React.FC = () => {
  return (
    <section id="spaces" className="py-24 bg-black text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00B2E3]">
            ARCHITECTURAL EXCELLENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Designed for the world’s most refined spaces.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            From premier luxury penthouses to contemporary residential villas, Ankur Paints formulations deliver unmatched aesthetic richness and environmental endurance.
          </p>
        </div>

        {/* Feature 1: The Penthouse Interior (Smooth Velvet Interior) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Image */}
          <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src="/branding/generated/ankur_luxury_penthouse_interior.jpg"
              alt="Ankur Paints Penthouse Interior Living Space"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-xs text-slate-200">
              <span className="font-bold text-white">Royal Indigo & Warm Ochre</span> • Penthouse Lounge
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#00B2E3] text-[10px] font-bold uppercase tracking-wider">
              <span>Interior Luxury Emulsion</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Velvety Depth. Effortless Washability.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Formulated with ultra-fine crosslinked acrylics that create a micro-smooth, silky eggshell sheen. Repels grease stains, marker scuffs, and household spills with Class 1 scrub resistance.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-300 font-semibold border-t border-white/10">
              <div>
                <span className="block text-slate-500 text-[10px] uppercase">Warranty</span>
                <span className="text-white">7 Years Sheen</span>
              </div>
              <div>
                <span className="block text-slate-500 text-[10px] uppercase">Washability</span>
                <span className="text-emerald-400">Class 1 Scrub Proof</span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature 2: The Contemporary Villa Facade (Extreme Weather Exterior) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Text (Left on Desktop) */}
          <div className="lg:col-span-5 space-y-5 text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#FFD100] text-[10px] font-bold uppercase tracking-wider">
              <span>Exterior Weatherproof Shield</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Extreme Climate Armor. Rain or Shine.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Hydrophobic silicone nano-beading repels tropical downpours and prevents black algae growth, while Total Solar Reflectance (TSR) pigments reduce exterior wall temperatures by up to 5°C.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-300 font-semibold border-t border-white/10">
              <div>
                <span className="block text-slate-500 text-[10px] uppercase">Warranty</span>
                <span className="text-white">10 Years All-Weather</span>
              </div>
              <div>
                <span className="block text-slate-500 text-[10px] uppercase">Thermal Drop</span>
                <span className="text-[#FFD100]">Up to 5°C Cooler</span>
              </div>
            </div>
          </div>

          {/* Image (Right on Desktop) */}
          <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group order-1 lg:order-2">
            <Image
              src="/branding/generated/ankur_contemporary_villa_facade.jpg"
              alt="Ankur Paints Contemporary Luxury Villa Facade"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-xs text-slate-200">
              <span className="font-bold text-white">Warm Cream & Stone Grey</span> • Coastal Villa
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
