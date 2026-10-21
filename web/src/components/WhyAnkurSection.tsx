"use client";

import React from "react";
import Image from "next/image";
import { Palette, ShieldCheck, Heart, Award } from "lucide-react";

export const WhyAnkurSection: React.FC = () => {
  const badges = [
    {
      icon: Palette,
      title: "Wide Range of Colours",
      color: "bg-[#E8501E] text-white",
      ring: "ring-orange-100",
    },
    {
      icon: ShieldCheck,
      title: "Superior Coverage",
      color: "bg-[#004B87] text-white",
      ring: "ring-blue-100",
    },
    {
      icon: Heart,
      title: "Safe for Your Family",
      color: "bg-emerald-600 text-white",
      ring: "ring-emerald-100",
    },
    {
      icon: Award,
      title: "Premium Quality",
      color: "bg-purple-600 text-white",
      ring: "ring-purple-100",
    },
  ];

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-white text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Stylized Room Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
              <Image
                src="/branding/vibrant_colourful_dining_room.jpg"
                alt="More Than Just Paint - Ankur Paints"
                fill
                quality={100}
                unoptimized={true}
                className="object-cover group-hover:scale-105 transition-transform duration-700 [image-rendering:-webkit-optimize-contrast]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Decorative Corner Glow */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-[#E8501E]/10 blur-3xl pointer-events-none" />
          </div>

          {/* Right Column: Editorial Copy & 4 Badges */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Header + Rainbow Brush Row (Matching User Reference) */}
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                {/* Section Tag */}
                <div className="text-xs font-bold uppercase tracking-wider text-[#E8501E] flex items-center gap-2 mb-2">
                  <span className="w-6 h-[2px] bg-[#E8501E]" />
                  <span>WHY ANKUR PAINTS?</span>
                </div>

                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  More Than Just Paint — <br />
                  <span className="text-[#004B87]">It’s a Feeling</span>
                </h2>
              </div>

              {/* Rainbow Paintbrush Graphic (From Reference) */}
              <div className="relative w-40 sm:w-48 lg:w-56 aspect-[971/560] shrink-0 sm:-mt-6">
                <Image
                  src="/branding/rainbow_brush_stroke.png"
                  alt="Ankur Paints Rainbow Paintbrush"
                  fill
                  quality={100}
                  unoptimized={true}
                  priority
                  className="object-contain [image-rendering:-webkit-optimize-contrast]"
                />
              </div>
            </div>

            {/* Body */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              At <strong>Ankur Paints</strong>, we believe a fresh coat of paint can bring new life to any space. Our formulations are engineered for durability, beauty, and performance — because your walls deserve the best.
            </p>

            {/* 4 Feature Circular Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {badges.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center space-y-2.5">
                    <div className={`w-14 h-14 rounded-full ${b.color} flex items-center justify-center shadow-lg ring-4 ${b.ring} transition-transform hover:scale-110 duration-200`}>
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-snug">
                      {b.title}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
