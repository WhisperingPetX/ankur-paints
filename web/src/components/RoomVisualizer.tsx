"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Check, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";

interface RoomVisualizerProps {
  onAddToCart?: (item: any) => void;
}

export const RoomVisualizer: React.FC<RoomVisualizerProps> = ({ onAddToCart }) => {
  const shades = [
    {
      code: "SH-101",
      name: "Royal Peacock Indigo",
      hex: "#1E3A8A",
      recommendedProduct: "Epic Coat Luxury Exterior Emulsion",
      warranty: "5 Years",
      sheen: "Silky Eggshell",
      bucketImg: "/branding/bucket_5.png",
      mrp: "₹4,200",
      description: "A commanding, regal deep indigo designed for statement facade walls and luxury living spaces.",
    },
    {
      code: "SH-204",
      name: "Velvet Magenta Royale",
      hex: "#BE185D",
      recommendedProduct: "Rang Ritu Interior Emulsion",
      warranty: "7 Years",
      sheen: "High Washable Sheen",
      bucketImg: "/branding/bucket_2.png",
      mrp: "₹3,850",
      description: "Rich, velvety floral warmth that elevates interior bedrooms and executive lounges with stain-proof durability.",
    },
    {
      code: "SH-305",
      name: "Mediterranean Sea Teal",
      hex: "#0F766E",
      recommendedProduct: "Gleam Coat Exterior Emulsion",
      warranty: "3 Years",
      sheen: "Weather-Guard Matt",
      bucketImg: "/branding/bucket_3.png",
      mrp: "₹2,950",
      description: "A cooling, coastal ocean teal with anti-algae silicone polymers resistant to heavy tropical rainfall.",
    },
    {
      code: "SH-412",
      name: "Crimson Rust & Rose",
      hex: "#991B1B",
      recommendedProduct: "Rose Gold Luxury Emulsion",
      warranty: "2 Years",
      sheen: "Rich Satin",
      bucketImg: "/branding/bucket_4.png",
      mrp: "₹3,900",
      description: "A timeless, warm rustic terracotta red that infuses courtyards and dining spaces with earthy sophistication.",
    },
    {
      code: "SH-508",
      name: "Imperial Ochre Gold",
      hex: "#D97706",
      recommendedProduct: "Colour Crest Exterior Emulsion",
      warranty: "2 Years",
      sheen: "Subtle Radiance",
      bucketImg: "/branding/bucket_1.png",
      mrp: "₹2,800",
      description: "Radiant golden amber with high solar UV reflectance to maintain cooler interior wall temperatures.",
    },
    {
      code: "SH-615",
      name: "Emerald Forest Green",
      hex: "#166534",
      recommendedProduct: "Acrylic Distemper & Primer",
      warranty: "Washable",
      sheen: "Smooth Matt",
      bucketImg: "/branding/bucket_7.png",
      mrp: "₹1,450",
      description: "Fresh botanical green providing high breathability and long-lasting freshness for interior hallways.",
    },
  ];

  const [activeShade, setActiveShade] = useState(shades[0]);

  return (
    <section id="visualizer" className="py-20 lg:py-28 bg-[#070E1A] text-white relative overflow-hidden">
      <div id="explorer" className="absolute -top-20" />
      {/* Background Lighting Bloom */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] opacity-25 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: activeShade.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-bold uppercase tracking-[0.2em] text-[#00B2E3]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Colour Lab</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white">
            Architectural <span className="text-[#E8501E]">Room Visualizer</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience real-time room shade rendering. Select any signature Ankur formulation to preview live wall aesthetics and recommended packaging specifications.
          </p>
        </div>

        {/* 2-Column Visualizer Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B1528] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          
          {/* Left Column: Interactive 3D Wall Preview Stage */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
              
              {/* Dynamic Wall Color Morph Layer */}
              <div
                className="absolute inset-0 transition-colors duration-700 ease-in-out"
                style={{ backgroundColor: activeShade.hex }}
              />

              {/* Architectural Living Room Interior Overlay (Multiply blend to cast shadows/furniture) */}
              <div className="absolute inset-0 mix-blend-multiply opacity-85 pointer-events-none">
                <Image
                  src="/branding/living_room_hero.png"
                  alt="Modern Architectural Room"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floor Shadow & Ambient Light Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

              {/* Live Shade Badge Over Wall */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeShade.hex }} />
                <span>{activeShade.name} ({activeShade.code})</span>
              </div>

              {/* Active Recommended Bucket Floating Card in Corner */}
              <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 flex items-center gap-3 shadow-xl max-w-xs">
                <div className="relative w-12 h-14 shrink-0">
                  <Image
                    src={activeShade.bucketImg}
                    alt={activeShade.recommendedProduct}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-white leading-tight line-clamp-1">{activeShade.recommendedProduct}</div>
                  <div className="text-[11px] text-[#00B2E3] font-semibold">{activeShade.warranty} Warranty</div>
                  <div className="text-[11px] text-slate-300 font-bold">{activeShade.mrp} / 20L</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Palette Selector & Product Match Details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Shade Selection Chips */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Choose Signature Shade:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {shades.map((s) => {
                  const isSelected = activeShade.code === s.code;
                  return (
                    <button
                      key={s.code}
                      onClick={() => setActiveShade(s)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                        isSelected
                          ? "border-[#E8501E] bg-[#E8501E]/15 text-white shadow-[0_0_12px_rgba(232,80,30,0.4)]"
                          : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shadow-md shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: s.hex }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                      </span>
                      <span className="truncate">{s.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Shade Specifications Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">{activeShade.name}</h3>
                  <p className="text-xs text-[#00B2E3] font-semibold">{activeShade.code} • {activeShade.sheen}</p>
                </div>
                <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-xs font-bold">
                  {activeShade.warranty}
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {activeShade.description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Coverage</span>
                  <span className="font-semibold text-slate-200">120 - 140 sq.ft / L</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Washability</span>
                  <span className="font-semibold text-slate-200">Class 1 Scrub Proof</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => onAddToCart?.(activeShade)}
              className="w-full py-3.5 bg-[#E8501E] hover:bg-[#D04212] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(232,80,30,0.4)] transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add {activeShade.recommendedProduct.split(" ")[0]} to Order ({activeShade.mrp})</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
