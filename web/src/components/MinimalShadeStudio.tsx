"use client";

import React, { useState } from "react";
import { Check, Sparkles, Layers, ShieldCheck } from "lucide-react";

export const MinimalShadeStudio: React.FC = () => {
  const shades = [
    {
      name: "Royal Peacock Indigo",
      code: "SH-101",
      hex: "#1E3A8A",
      pairing: "Pairs with Ivory Silk & Warm Brass",
      sheen: "Velvety Eggshell",
      application: "Living Room Accent & Facades",
    },
    {
      name: "Velvet Magenta Royale",
      code: "SH-204",
      hex: "#BE185D",
      pairing: "Pairs with Pearl Frost & Slate Grey",
      sheen: "Silky Washable Sheen",
      application: "Master Bedrooms & Executive Suites",
    },
    {
      name: "Mediterranean Ocean Teal",
      code: "SH-305",
      hex: "#0F766E",
      pairing: "Pairs with Sandstone & Natural Teak",
      sheen: "Weather-Guard Matt",
      application: "Dining Lounges & Verandahs",
    },
    {
      name: "Imperial Ochre Gold",
      code: "SH-508",
      hex: "#D97706",
      pairing: "Pairs with Warm Terracotta & Charcoal",
      sheen: "Subtle Radiance",
      application: "Courtyards & Entry Galleries",
    },
    {
      name: "Alpine Stone Grey",
      code: "SH-702",
      hex: "#475569",
      pairing: "Pairs with Pure White & Black Steel",
      sheen: "High Architectural Matt",
      application: "Modern Exterior Facades & Ceilings",
    },
  ];

  const [activeShade, setActiveShade] = useState(shades[0]);

  return (
    <section id="shades" className="py-24 bg-[#05070D] border-t border-b border-white/10 text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD100]">
            CURATED ARCHITECTURAL PALETTE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Pure Pigment Saturation.
          </h2>
          <p className="text-sm text-slate-400">
            Formulated with high-density lightfast tinting dispersions for deep, velvety light absorption.
          </p>
        </div>

        {/* Color Display Canvas */}
        <div className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden transition-all duration-700">
          
          {/* Subtle Ambient Color Aura */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[140px] opacity-25 transition-colors duration-700 pointer-events-none"
            style={{ backgroundColor: activeShade.hex }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Color Swatch Block */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div
                className="w-44 h-44 sm:w-56 sm:h-56 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20 transition-colors duration-700 relative flex items-center justify-center"
                style={{ backgroundColor: activeShade.hex }}
              >
                <div className="bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-white">
                  {activeShade.code}
                </div>
              </div>
            </div>

            {/* Color Information & Swatches */}
            <div className="md:col-span-7 space-y-6 text-left">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Signature Formulation
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeShade.name}
                </h3>
                <p className="text-xs text-[#00B2E3] font-medium pt-1">
                  {activeShade.pairing}
                </p>
              </div>

              {/* Swatch Selector Chips */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Select Shade Tone:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {shades.map((s) => {
                    const isSelected = activeShade.code === s.code;
                    return (
                      <button
                        key={s.code}
                        onClick={() => setActiveShade(s)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? "border-white bg-white/20 text-white shadow-md scale-105"
                            : "border-white/10 bg-white/5 text-slate-400 hover:border-white/30"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: s.hex }}
                        />
                        <span>{s.name.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10 text-xs text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Surface Finish</span>
                  <span className="font-semibold text-white">{activeShade.sheen}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Best Suited For</span>
                  <span className="font-semibold text-white">{activeShade.application}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
