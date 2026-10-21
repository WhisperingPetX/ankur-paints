"use client";

import React from "react";

export const KeynoteMetrics: React.FC = () => {
  return (
    <section id="specifications" className="py-20 border-t border-b border-white/10 bg-[#05070D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center divide-x divide-white/10">
          
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-sans">
              10-Yr
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-300">
              Weather Defense
            </div>
            <p className="text-[11px] text-slate-500">Guaranteed UV & Rain Shield</p>
          </div>

          <div className="space-y-1 pl-4 sm:pl-6">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#00B2E3] tracking-tight font-sans">
              2.2mm
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-300">
              Crack Bridging
            </div>
            <p className="text-[11px] text-slate-500">German Polymer Crosslinking</p>
          </div>

          <div className="space-y-1 pl-4 sm:pl-6">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFD100] tracking-tight font-sans">
              5°C
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-300">
              Surface Cooling
            </div>
            <p className="text-[11px] text-slate-500">Solar Infrared Reflectance</p>
          </div>

          <div className="space-y-1 pl-4 sm:pl-6">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-400 tracking-tight font-sans">
              Zero
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-300">
              Harmful VOCs
            </div>
            <p className="text-[11px] text-slate-500">Safe for Kids & Family</p>
          </div>

        </div>
      </div>
    </section>
  );
};
