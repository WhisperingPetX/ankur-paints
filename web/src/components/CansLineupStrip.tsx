"use client";

import React from "react";
import { ShieldCheck, Leaf, Sparkles, Building2 } from "lucide-react";

export const CansLineupStrip: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Long Lasting Protection",
      desc: "Up to 10 years weather shield",
      color: "text-[#004B87]",
      bg: "bg-blue-50/80 border-blue-100",
    },
    {
      icon: Leaf,
      title: "Low VOC & Eco Friendly",
      desc: "Safe for kids & indoor air",
      color: "text-emerald-600",
      bg: "bg-emerald-50/80 border-emerald-100",
    },
    {
      icon: Sparkles,
      title: "Rich & Vibrant Colours",
      desc: "High-definition tint retention",
      color: "text-[#E8501E]",
      bg: "bg-orange-50/80 border-orange-100",
    },
    {
      icon: Building2,
      title: "Architectural & Industrial",
      desc: "Homes, villas & dream spaces",
      color: "text-[#D97706]",
      bg: "bg-amber-50/80 border-amber-100",
    },
  ];

  return (
    <section className="bg-slate-50/80 py-8 sm:py-10 border-b border-slate-200/80 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/70 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className={`p-2.5 rounded-xl border ${p.bg} ${p.color} shrink-0`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
