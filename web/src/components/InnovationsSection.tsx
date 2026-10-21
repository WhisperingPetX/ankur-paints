"use client";

import React from "react";
import { Shield, Sun, Leaf, Droplets, Award, CheckCircle2, ArrowRight } from "lucide-react";

export const InnovationsSection: React.FC = () => {
  const innovations = [
    {
      icon: Shield,
      title: "German Crosslinking Polymers",
      subtitle: "Anti-Crack Matrix",
      description:
        "Engineered with ultra-flexible acrylic polymer crosslinking that stretches up to 2.2mm over hairline plaster cracks, preventing moisture penetration during seasonal expansions.",
      metric: "Up to 2.2mm Crack Bridging",
      tag: "Epic Coat & Damp Proof",
    },
    {
      icon: Sun,
      title: "Solar Heat Reflectance (TSR)",
      subtitle: "5°C Cooler Wall Surfaces",
      description:
        "Specialized reflective pigments bounce back infrared radiation, keeping exterior facade walls significantly cooler and decreasing indoor cooling electricity loads.",
      metric: "Up to 5°C Temperature Drop",
      tag: "Colour Crest & Epic Coat",
    },
    {
      icon: Leaf,
      title: "Ultra-Low VOC & Anti-Microbial",
      subtitle: "Family & Child Safe",
      description:
        "Virtually odorless formulation free of harmful formaldehyde and heavy metals. Enriched with silver-ion biocides that inhibit black mold and fungal blooms.",
      metric: "< 15g / L VOC Safe Standard",
      tag: "Rang Ritu Interior",
    },
    {
      icon: Droplets,
      title: "Silicone Hydrophobic Shield",
      subtitle: "Water Beading Self-Cleaning",
      description:
        "Pure silicone nano-additives create a high water contact angle. Monsoonal raindrops bead up and roll off, naturally washing away accumulated dust particles.",
      metric: "100% Water Repellent",
      tag: "Gleam Coat Exterior",
    },
  ];

  return (
    <section id="innovations" className="py-20 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#004B87] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Industrial Science & Heritage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Innovations in <span className="text-[#004B87]">Paints & Polymers</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every formulation at Ankur Paints represents 25+ years of chemical synthesis precision, combining imported high-purity titanium dioxide with advanced German acrylic emulsions.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {innovations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-[#004B87] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#004B87] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#004B87] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-bold text-[#E8501E] uppercase tracking-wider block">
                      {item.subtitle}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed text-left">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-left space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.metric}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Applied in: {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
