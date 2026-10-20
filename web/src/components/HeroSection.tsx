"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Award, Palette, Check } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenAuth: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenAuth,
}) => {
  const [activeMood, setActiveMood] = useState({
    name: "Royal Cobalt",
    color: "#004B87",
    glow: "rgba(0, 75, 135, 0.45)",
    tag: "Flagship Exterior Protection",
  });

  const moods = [
    { name: "Royal Cobalt", color: "#004B87", glow: "rgba(0, 75, 135, 0.45)", tag: "Epic Coat 5-Yr Defense" },
    { name: "Velvet Magenta", color: "#BE185D", glow: "rgba(190, 24, 93, 0.4)", tag: "Rang Ritu 7-Yr Sheen" },
    { name: "Golden Amber", color: "#D97706", glow: "rgba(217, 119, 6, 0.4)", tag: "Colour Crest Warmth" },
    { name: "Sea Teal", color: "#0F766E", glow: "rgba(15, 118, 110, 0.4)", tag: "Gleam Coat Exterior" },
    { name: "Ochre Gold", color: "#854D0E", glow: "rgba(133, 77, 14, 0.4)", tag: "Damp Proof 10-Yr Shield" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[640px] lg:min-h-[760px] w-full flex items-center overflow-hidden bg-[#030712] text-white transition-colors duration-1000"
    >
      {/* Dynamic Ambient Stage Aura reacting to selected luxury mood */}
      <div
        className="absolute top-1/4 right-1/4 w-[550px] lg:w-[850px] h-[550px] lg:h-[850px] rounded-full blur-[140px] opacity-40 transition-all duration-1000 pointer-events-none"
        style={{ backgroundColor: activeMood.color }}
      />
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-[#E8501E]/15 blur-[120px] pointer-events-none" />

      {/* Subtle Luxury Architectural Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Prestigious Brand Typography */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-7 text-left"
          >
            {/* Prestige Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4 text-[#FFD100]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-200">
                EST. 1999 • GERMAN POLYMER CROSSLINKING
              </span>
            </div>

            {/* Majestic Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-serif">
              Crafting Spaces of{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E8501E] via-[#FF8A00] to-[#FFD100] drop-shadow-md">
                Royal Splendor
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              From flagship 10-year weather-defense exterior emulsions to velvety stain-resistant interiors, experience architectural coatings engineered for enduring luxury and extreme Indian climates.
            </p>

            {/* Interactive Stage Ambient Mood Controller */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Palette className="w-3.5 h-3.5 text-[#00B2E3]" />
                <span>Ambient Lighting Mood:</span>
                <span className="text-slate-200 font-bold">{activeMood.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {moods.map((m) => {
                  const isSelected = activeMood.name === m.name;
                  return (
                    <button
                      key={m.name}
                      onClick={() => setActiveMood(m)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                        isSelected
                          ? "border-[#E8501E] bg-[#E8501E]/20 text-white shadow-[0_0_12px_rgba(232,80,30,0.5)]"
                          : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-white"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: m.color }}
                      >
                        {isSelected && <Check className="w-2 h-2 text-white stroke-[3]" />}
                      </span>
                      <span>{m.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#E8501E] hover:bg-[#D04212] text-white text-sm font-bold rounded-full shadow-[0_10px_30px_rgba(232,80,30,0.45)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Explore 9 Master Collections</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2.5 px-6 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-sm font-semibold rounded-full border border-slate-700/80 backdrop-blur-md transition-all duration-300 shadow-md"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Retailer B2B Portal</span>
              </button>
            </div>

            {/* Performance Trust Ticker */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FFD100]" />
                <span>Up to 10-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Low VOC & Odorless</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B2E3]" />
                <span>German Cross-linking Formulation</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Virtual Obsidian Mirror Exhibition Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 relative flex flex-col items-center justify-center"
          >
            {/* The 3D Packaging Lineup on Reflective Pedestal */}
            <div className="relative w-full max-w-xl group">
              
              {/* Backlight Glow Behind Lineup */}
              <div
                className="absolute inset-0 -top-10 rounded-full blur-[80px] opacity-50 transition-colors duration-1000 pointer-events-none"
                style={{ backgroundColor: activeMood.glow }}
              />

              {/* Master 9-Bucket Real Packaging Lineup Visual */}
              <div className="relative aspect-[16/10] w-full animate-float">
                <Image
                  src="/branding/ankur_lineup_master.png"
                  alt="Ankur Paints 9-Bucket Master Packaging Lineup"
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                  priority
                />
              </div>

              {/* Glossy Obsidian Pedestal with Mirror Reflection Gradient */}
              <div className="relative -mt-6 w-full h-14 bg-gradient-to-b from-slate-900/60 via-slate-950/80 to-transparent rounded-[100%] blur-[2px] border-t border-white/10" />

              {/* Floating Quality Stamp */}
              <div className="absolute -bottom-4 right-4 sm:right-8 bg-[#0F172A]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/80 shadow-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8501E]/20 text-[#E8501E] flex items-center justify-center font-bold text-xs">
                  ★
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Master Packaging Lineup</div>
                  <div className="text-[10px] text-slate-400">9 Official Products • 100% Genuine</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
