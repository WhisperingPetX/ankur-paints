"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Check, ShoppingBag, Eye, RefreshCw, Palette, Layers } from "lucide-react";

interface IndigoVisualizerProps {
  onAddToCart?: () => void;
}

export const IndigoVisualizer: React.FC<IndigoVisualizerProps> = ({ onAddToCart }) => {
  const [selectedRoom, setSelectedRoom] = useState<"living" | "bedroom" | "exterior">("living");

  const shades = [
    {
      code: "SH-101",
      name: "Royal Peacock Indigo",
      hex: "#1E3A8A",
      tag: "Regal Facade & Living",
      recommendedProduct: "Epic Coat Luxury Exterior Emulsion",
      warranty: "10 Years",
      sheen: "High Weather Sheen",
      bucketImg: "/branding/bucket_5.png",
      mrp: "₹4,200",
      combination: "Pairs with Jasmine Off-White (SH-701)",
    },
    {
      code: "SH-204",
      name: "Velvet Magenta Royale",
      hex: "#BE185D",
      tag: "Master Bedroom Accent",
      recommendedProduct: "Rang Ritu Interior Emulsion",
      warranty: "7 Years",
      sheen: "High Washable Sheen",
      bucketImg: "/branding/bucket_2.png",
      mrp: "₹3,850",
      combination: "Pairs with Silver Cloud Mist (SH-802)",
    },
    {
      code: "SH-305",
      name: "Mediterranean Sea Teal",
      hex: "#0F766E",
      tag: "Contemporary Dining & Patio",
      recommendedProduct: "Gleam Coat Exterior Emulsion",
      warranty: "3 Years",
      sheen: "Weather-Guard Matt",
      bucketImg: "/branding/bucket_3.png",
      mrp: "₹2,950",
      combination: "Pairs with Coastal Sand (SH-504)",
    },
    {
      code: "SH-508",
      name: "Imperial Ochre Gold",
      hex: "#D97706",
      tag: "Warm Architectural Sunburst",
      recommendedProduct: "Colour Crest Exterior Emulsion",
      warranty: "2 Years",
      sheen: "Warm Radiance",
      bucketImg: "/branding/bucket_1.png",
      mrp: "₹2,800",
      combination: "Pairs with Ivory Cream (SH-703)",
    },
    {
      code: "SH-615",
      name: "Emerald Palm Green",
      hex: "#166534",
      tag: "Botanical Serenity Lounge",
      recommendedProduct: "Acrylic Distemper & Primer",
      warranty: "Washable",
      sheen: "Smooth Matt",
      bucketImg: "/branding/bucket_7.png",
      mrp: "₹1,450",
      combination: "Pairs with Pearl Frost (SH-805)",
    },
    {
      code: "SH-412",
      name: "Terracotta Rust & Rose",
      hex: "#991B1B",
      tag: "Heritage Courtyard Finish",
      recommendedProduct: "Rose Gold Luxury Emulsion",
      warranty: "2 Years",
      sheen: "Rich Satin",
      bucketImg: "/branding/bucket_4.png",
      mrp: "₹3,900",
      combination: "Pairs with Desert Dune (SH-502)",
    },
    {
      code: "SH-701",
      name: "Jasmine Off-White",
      hex: "#F8F5EE",
      tag: "Minimalist Airy Hallways",
      recommendedProduct: "Rang Ritu Washable Luxury",
      warranty: "7 Years",
      sheen: "Silky Velvet",
      bucketImg: "/branding/bucket_2.png",
      mrp: "₹3,850",
      combination: "Pairs with Royal Peacock Indigo (SH-101)",
    },
    {
      code: "SH-802",
      name: "Silver Cloud Mist",
      hex: "#94A3B8",
      tag: "Modern Executive Lounge",
      recommendedProduct: "Epic Coat Luxury Emulsion",
      warranty: "10 Years",
      sheen: "Subtle Satin",
      bucketImg: "/branding/bucket_5.png",
      mrp: "₹4,200",
      combination: "Pairs with Velvet Magenta Royale (SH-204)",
    },
  ];

  const [activeShade, setActiveShade] = useState(shades[0]);

  // Room background images
  const roomImages = {
    living: "/branding/living_room_hero.png",
    bedroom: "/branding/hero_buckets_livingroom.png",
    exterior: "/branding/house_hero.png",
  };

  return (
    <section id="visualizer" className="py-20 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Indigo Paints Style) */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#004B87] text-xs font-bold uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5" />
            <span>Interactive Colour Studio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See Colours Come Alive <span className="text-[#004B87]">Before You Paint</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Test trending shades on virtual rooms in real time. Switch between living rooms, bedrooms, and exterior home facades with authentic lighting simulation.
          </p>

          {/* Room Selector Tabs */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {[
              { id: "living", label: "Living Room" },
              { id: "bedroom", label: "Master Bedroom" },
              { id: "exterior", label: "Exterior Villa" },
            ].map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedRoom === room.id
                    ? "bg-[#004B87] text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {room.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Visualizer Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          
          {/* Left Column: Interactive Wall Morphing Canvas */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-300 shadow-2xl bg-slate-900">
              
              {/* Dynamic Wall Color Morph Layer */}
              <div
                className="absolute inset-0 transition-colors duration-700 ease-in-out"
                style={{ backgroundColor: activeShade.hex }}
              />

              {/* Architectural Living Room Interior Overlay (Multiply blend to cast shadows/furniture) */}
              <div className="absolute inset-0 mix-blend-multiply opacity-85 pointer-events-none">
                <Image
                  src={roomImages[selectedRoom]}
                  alt="Virtual Room Wall Preview"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floor Shadow & Ambient Light Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Top Shade Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-lg text-xs font-bold text-slate-900 flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: activeShade.hex }}
                />
                <span>{activeShade.name}</span>
                <span className="text-slate-500 font-medium">({activeShade.code})</span>
              </div>

              {/* Recommended Color Combination Pill */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-[11px] font-semibold flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#FFD100]" />
                <span>{activeShade.combination}</span>
              </div>

            </div>
          </div>

          {/* Right Column: Palette Swatches & Product Match */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Shade Palette Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>Select Shade Palette:</span>
                <span className="text-[#004B87]">{shades.length} Signature Tones</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {shades.map((s) => {
                  const isSelected = activeShade.code === s.code;
                  return (
                    <button
                      key={s.code}
                      onClick={() => setActiveShade(s)}
                      className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "border-[#004B87] bg-white ring-2 ring-[#004B87]/30 shadow-md scale-105"
                          : "border-slate-200 bg-white hover:border-slate-400"
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full shadow-inner mb-1.5 flex items-center justify-center border border-black/10"
                        style={{ backgroundColor: s.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3] drop-shadow-sm" />}
                      </span>
                      <span className="text-[11px] font-bold text-slate-800 truncate w-full">
                        {s.name.split(" ")[0]}
                      </span>
                      <span className="text-[9px] text-slate-500 font-medium">{s.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Shade Specifications & Matched Bucket Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-20 shrink-0">
                  <Image
                    src={activeShade.bucketImg}
                    alt={activeShade.recommendedProduct}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase">
                      {activeShade.warranty}
                    </span>
                    <span className="text-xs text-slate-500">{activeShade.sheen}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {activeShade.recommendedProduct}
                  </h3>
                  <div className="text-sm font-extrabold text-[#004B87]">
                    Printed MRP: {activeShade.mrp} <span className="text-xs text-slate-500 font-normal">/ 20L Bucket</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Recommended Surface</span>
                  <span className="font-semibold text-slate-700">{activeShade.tag}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Washability Index</span>
                  <span className="font-semibold text-slate-700">100% Water Washable</span>
                </div>
              </div>
            </div>

            {/* Action Button: Add to Order */}
            <button
              onClick={onAddToCart}
              className="w-full py-3.5 bg-[#E8501E] hover:bg-[#D04212] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(232,80,30,0.35)] transition-all transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add {activeShade.name.split(" ")[0]} ({activeShade.mrp}) to Order</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
