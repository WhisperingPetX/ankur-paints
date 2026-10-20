"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Plus, Sparkles, Check } from "lucide-react";

export const ColourExplorer: React.FC = () => {
  const [selectedShade, setSelectedShade] = useState({
    name: "Royal Peacock Blue",
    code: "AP-408",
    color: "#0F4C81",
    family: "Blues & Navies",
  });

  const shadePresets = [
    { name: "Royal Peacock Blue", code: "AP-408", color: "#0F4C81", family: "Royalty" },
    { name: "Terracotta Sunset", code: "AP-214", color: "#C85A32", family: "Warm Earth" },
    { name: "Emerald Forest", code: "AP-512", color: "#1D5C42", family: "Fresh Greens" },
    { name: "Warm Amber Glaze", code: "AP-108", color: "#D97706", family: "Sunny Yellows" },
    { name: "Magenta Velvet", code: "AP-703", color: "#9D174D", family: "Luxury Emulsion" },
  ];

  return (
    <section id="explorer" className="py-20 lg:py-28 bg-[#0B1528] text-white relative overflow-hidden">
      {/* Dynamic Ambient Wall Light based on selected shade */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-35 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: selectedShade.color }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00B2E3]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#00B2E3]">
                COLOUR EXPLORER
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white leading-tight">
              Find Your{" "}
              <span className="text-[#E8501E]">Perfect Shade</span>
            </h2>

            <p className="text-base text-slate-300 max-w-lg leading-relaxed">
              Explore thousands of beautiful shades and get inspired for your next project with our interactive architectural colour deck.
            </p>

            {/* Interactive Shade Selector Pills */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Select Shade Sample:
              </div>
              <div className="flex flex-wrap gap-2.5">
                {shadePresets.map((shade) => {
                  const isSelected = selectedShade.code === shade.code;
                  return (
                    <button
                      key={shade.code}
                      onClick={() => setSelectedShade(shade)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-medium transition-all ${
                        isSelected
                          ? "border-[#E8501E] bg-[#E8501E]/15 text-white shadow-glow"
                          : "border-slate-700/80 bg-slate-900/40 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: shade.color }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                      </span>
                      <span>{shade.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Selected Card Info */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg shadow-md transition-colors duration-500"
                  style={{ backgroundColor: selectedShade.color }}
                />
                <div>
                  <div className="text-sm font-bold text-white">{selectedShade.name}</div>
                  <div className="text-xs text-slate-400">{selectedShade.code} • {selectedShade.family}</div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00B2E3] bg-[#00B2E3]/10 px-2.5 py-1 rounded-full border border-[#00B2E3]/20">
                Interior & Exterior
              </span>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#E8501E] hover:bg-[#D04212] text-white text-sm font-semibold rounded-full shadow-lg transition-all transform hover:-translate-y-0.5">
                <span>Start Exploring</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Swatch Fan Stage + Living Room Setting */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60">
              {/* Cozy Living Room Backdrop */}
              <Image
                src="/branding/living_room_hero.png"
                alt="Cozy Living Room Wall Painted with Ankur Paints"
                fill
                className="object-cover object-center"
              />

              {/* Dynamic Wall Color Tint Overlay */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-multiply transition-colors duration-700 pointer-events-none"
                style={{ backgroundColor: selectedShade.color }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-transparent pointer-events-none" />

              {/* Fanned Swatch Fan Floating Visual */}
              <motion.div
                initial={{ rotate: -10, y: 30 }}
                whileInView={{ rotate: 0, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-4 left-6 sm:bottom-8 sm:left-10 w-44 sm:w-64 aspect-square"
              >
                <div className="relative w-full h-full drop-shadow-2xl">
                  <Image
                    src="/branding/swatch_fan.png"
                    alt="Ankur Paints Swatch Deck"
                    fill
                    className="object-contain"
                  />
                  {/* Floating Interactive Plus Button */}
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/80 border border-white/30 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>

              {/* Handwritten Script Label: "Thousands of Shades" */}
              <div className="absolute top-6 right-8 text-right pointer-events-none">
                <span className="font-cursive text-2xl sm:text-3xl text-amber-200/90 drop-shadow-md">
                  Thousands of Shades ↷
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
