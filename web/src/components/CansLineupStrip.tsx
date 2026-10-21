"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Leaf, Sparkles, Building2 } from "lucide-react";

export const CansLineupStrip: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Long Lasting Protection",
      color: "text-[#004B87]",
    },
    {
      icon: Leaf,
      title: "Low VOC & Eco Friendly",
      color: "text-emerald-600",
    },
    {
      icon: Sparkles,
      title: "Rich & Vibrant Colours",
      color: "text-[#E8501E]",
    },
    {
      icon: Building2,
      title: "For Homes, Offices & Industries",
      color: "text-[#D97706]",
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-slate-100 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Full-Width Cans Lineup on Reflective Pedestal with Paint Splashes */}
        <div className="relative aspect-[16/6] w-full max-w-5xl mx-auto flex items-center justify-center">
          <Image
            src="/branding/ankur_lineup_master.png"
            alt="Ankur Paints Master Product Packaging Lineup"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* 4 Feature Pillars with Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-center gap-3 text-left p-3 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100 ${p.color} shrink-0 shadow-sm`}>
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  {p.title}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
