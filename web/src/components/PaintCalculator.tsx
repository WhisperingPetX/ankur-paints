"use client";

import React, { useState } from "react";
import { Calculator, Check, ShoppingBag, Sparkles, Home, Layers, DollarSign } from "lucide-react";

interface PaintCalculatorProps {
  onAddToCart?: () => void;
}

export const PaintCalculator: React.FC<PaintCalculatorProps> = ({ onAddToCart }) => {
  const [carpetArea, setCarpetArea] = useState(1200);
  const [paintType, setPaintType] = useState<"repainting" | "fresh">("repainting");
  const [selectedBHK, setSelectedBHK] = useState("2bhk");

  // Approximate calculations:
  // 1 Litre of Emulsion covers ~130 sq.ft for 2 coats
  // Wall surface area is roughly 3.2x carpet area (walls + ceiling minus doors/windows)
  const wallSurfaceArea = carpetArea * 3.2;
  const emulsionLitres = Math.ceil(wallSurfaceArea / 130);
  const primerLitres = Math.ceil(wallSurfaceArea / 180);
  const puttyKg = paintType === "fresh" ? Math.ceil(wallSurfaceArea / 15) : 0;

  // Approximate cost estimate using Ankur Paints standard MRPs (e.g. ₹210/L for emulsion, ₹140/L for primer, ₹30/KG putty)
  const estimatedCost = Math.round(emulsionLitres * 210 + primerLitres * 140 + puttyKg * 30);

  const handleBHKChange = (bhk: string, area: number) => {
    setSelectedBHK(bhk);
    setCarpetArea(area);
  };

  return (
    <section id="calculator" className="py-20 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#004B87] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-[#004B87]" />
            <span>Smart Project Estimator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Much Paint <span className="text-[#004B87]">Do You Need?</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Eliminate guesswork before purchasing. Calculate the exact quantities of Ankur Wall Primer, Putty, and Luxury Emulsions required for your home.
          </p>
        </div>

        {/* 2-Column Calculator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
          
          {/* Left Column: Interactive Input Controls */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Quick Home Size Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                1. Select House Configuration:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "1bhk", label: "1 BHK", area: 650 },
                  { id: "2bhk", label: "2 BHK", area: 1200 },
                  { id: "3bhk", label: "3 BHK", area: 1850 },
                  { id: "villa", label: "4 BHK / Villa", area: 2800 },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleBHKChange(item.id, item.area)}
                    className={`py-3 px-3 rounded-xl border text-center transition-all ${
                      selectedBHK === item.id
                        ? "border-[#004B87] bg-blue-50/60 text-[#004B87] font-bold shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 font-semibold"
                    }`}
                  >
                    <Home className="w-4 h-4 mx-auto mb-1 opacity-80" />
                    <span className="text-xs block">{item.label}</span>
                    <span className="text-[10px] text-slate-400 block">{item.area} sq.ft</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Carpet Area Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 uppercase tracking-wider">2. Carpet Area (Square Feet):</span>
                <span className="text-base text-[#004B87] font-extrabold">{carpetArea.toLocaleString("en-IN")} sq.ft</span>
              </div>
              <input
                type="range"
                min="300"
                max="5000"
                step="50"
                value={carpetArea}
                onChange={(e) => {
                  setCarpetArea(Number(e.target.value));
                  setSelectedBHK("custom");
                }}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004B87]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>300 sq.ft (Studio)</span>
                <span>2,500 sq.ft</span>
                <span>5,000 sq.ft (Bungalow)</span>
              </div>
            </div>

            {/* Project Nature / Wall Condition */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                3. Wall Condition:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setPaintType("repainting")}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    paintType === "repainting"
                      ? "border-[#004B87] bg-blue-50/60 ring-1 ring-[#004B87]/30"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Repainting Existing Walls</span>
                    {paintType === "repainting" && <Check className="w-4 h-4 text-[#004B87]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Requires 1 Coat Primer + 2 Coats Topcoat Emulsion</p>
                </button>

                <button
                  onClick={() => setPaintType("fresh")}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    paintType === "fresh"
                      ? "border-[#004B87] bg-blue-50/60 ring-1 ring-[#004B87]/30"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Fresh Wall Painting</span>
                    {paintType === "fresh" && <Check className="w-4 h-4 text-[#004B87]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Includes 2 Coats Acrylic Putty + Primer + 2 Coats Emulsion</p>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Results & Material Summary */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#002D5A] to-[#004B87] text-white rounded-2xl p-6 sm:p-7 shadow-xl space-y-6 text-left">
            
            <div className="border-b border-white/15 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD100] block">
                Estimated Paint Requirement
              </span>
              <h3 className="text-xl font-extrabold text-white">
                {carpetArea.toLocaleString("en-IN")} sq.ft Home Package
              </h3>
              <p className="text-xs text-slate-200 mt-0.5">
                Calculated for ~{Math.round(wallSurfaceArea).toLocaleString("en-IN")} sq.ft paintable wall surface
              </p>
            </div>

            {/* Material Requirement Counters */}
            <div className="space-y-3.5">
              
              {/* Emulsion Requirement */}
              <div className="flex items-center justify-between bg-white/10 rounded-xl p-3 border border-white/15">
                <div>
                  <span className="text-xs font-bold text-white block">Topcoat Emulsion</span>
                  <span className="text-[10px] text-slate-300">Epic Coat / Rang Ritu (2 Coats)</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-[#FFD100]">{emulsionLitres} Litres</span>
                  <span className="text-[10px] text-slate-300 block">~{Math.ceil(emulsionLitres / 20)} x 20L Buckets</span>
                </div>
              </div>

              {/* Primer Requirement */}
              <div className="flex items-center justify-between bg-white/10 rounded-xl p-3 border border-white/15">
                <div>
                  <span className="text-xs font-bold text-white block">Acrylic Wall Primer</span>
                  <span className="text-[10px] text-slate-300">Undercoat Sealer</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-white">{primerLitres} Litres</span>
                  <span className="text-[10px] text-slate-300 block">~{Math.ceil(primerLitres / 20)} x 20L Buckets</span>
                </div>
              </div>

              {/* Wall Putty Requirement (if fresh) */}
              {paintType === "fresh" && (
                <div className="flex items-center justify-between bg-white/10 rounded-xl p-3 border border-white/15">
                  <div>
                    <span className="text-xs font-bold text-white block">Acrylic Wall Putty</span>
                    <span className="text-[10px] text-slate-300">Micro-fine Smoothing (2 Coats)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-white">{puttyKg} KG</span>
                    <span className="text-[10px] text-slate-300 block">~{Math.ceil(puttyKg / 40)} x 40KG Bags</span>
                  </div>
                </div>
              )}

            </div>

            {/* Estimated Budget Box */}
            <div className="pt-3 border-t border-white/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-300 block">Estimated Paint Budget</span>
                <span className="text-xs text-slate-200">MRP Inclusive of Taxes</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#FFD100]">
                  ₹{estimatedCost.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-slate-300 block">Approx. Material Cost</span>
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={onAddToCart}
              className="w-full py-3.5 bg-[#E8501E] hover:bg-[#D04212] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Estimated Materials to Order</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
