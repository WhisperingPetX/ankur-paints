"use client";

import React from "react";
import { Shield, Leaf, Palette, Layers, Award } from "lucide-react";

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Shield,
      title: "Long Lasting Protection",
      description: "Keeps your walls beautiful for years",
    },
    {
      icon: Leaf,
      title: "Low VOC & Eco Friendly",
      description: "Safe for your family and the environment",
    },
    {
      icon: Palette,
      title: "Rich Colour Range",
      description: "Vibrant shades for every mood",
    },
    {
      icon: Layers,
      title: "Superior Coverage",
      description: "More coverage, less cost",
    },
    {
      icon: Award,
      title: "Trusted Quality",
      description: "Made for Indian climates",
    },
  ];

  return (
    <section className="bg-white text-slate-800 border-b border-slate-100 relative z-20 py-8 lg:py-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start space-y-2 group p-2 rounded-xl transition-all hover:bg-slate-50"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#004B87] group-hover:text-[#E8501E] group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 stroke-[1.7]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#004B87] transition-colors leading-tight">
                  {badge.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
