"use client";

import React from "react";
import { Shield, Sun, Leaf, Droplets, Award, CheckCircle2 } from "lucide-react";

export const GermanTechnology: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "German Crosslinking Polymers",
      subtitle: "10-Year Anti-Crack Matrix",
      description:
        "Engineered with ultra-flexible acrylic polymer cross-linking that bridges hairline plaster cracks up to 2.2mm and withstands extreme temperature swings.",
      metric: "Up to 2.2mm Crack Bridging",
    },
    {
      icon: Sun,
      title: "Solar Heat Reflective Pigments",
      subtitle: "Cooler Living Spaces",
      description:
        "High Total Solar Reflectance (TSR) pigments bounce back up to 85% of infrared radiation, reducing exterior surface wall heat by up to 5°C.",
      metric: "Up to 5°C Surface Cooling",
    },
    {
      icon: Leaf,
      title: "Ultra-Low VOC & Anti-Microbial",
      subtitle: "Certified Family Safe",
      description:
        "Formulated without harmful heavy metals, formaldehyde, or harsh chemical odors. Silver-ion biocides prevent black mold and damp bacterial growth.",
      metric: "< 15g / L Ultra-Low VOC",
    },
    {
      icon: Droplets,
      title: "Silicone Hydrophobic Shield",
      subtitle: "Water Beading Defense",
      description:
        "Pure silicone nano-beading additives create a high contact angle causing monsoon rain to bead and wash away dust particles naturally.",
      metric: "100% Water Repellent",
    },
  ];

  return (
    <section id="technology" className="py-20 lg:py-28 bg-[#070E1A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-bold uppercase tracking-[0.2em] text-[#00B2E3]">
            <Award className="w-3.5 h-3.5" />
            <span>Industrial Science & Heritage</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white">
            German Polymer <span className="text-[#E8501E]">Formulation</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every bucket of Ankur Paints represents 25+ years of chemical engineering precision. We combine high-density titanium dioxide with imported German emulsions for unrivaled durability.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-[#0B1528] rounded-3xl p-6 border border-slate-800 hover:border-[#004B87] shadow-xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#004B87]/20 border border-[#004B87]/40 text-[#00E5FF] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E8501E]/20 group-hover:text-[#E8501E] group-hover:border-[#E8501E]/40 transition-all duration-300">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-bold text-[#E8501E] uppercase tracking-wider block">
                      {f.subtitle}
                    </span>
                    <h3 className="text-base font-bold text-white font-serif leading-tight">
                      {f.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed text-left">
                    {f.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] font-bold text-emerald-400 text-left">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{f.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
