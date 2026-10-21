"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Palette, ShieldCheck, Heart, Award } from "lucide-react";

export const WhyAnkurSection: React.FC = () => {
  const rotatingPhotos = [
    {
      src: "/branding/vibrant_colourful_dining_room.jpg",
      title: "Vibrant Contemporary Dining Room",
      palette: "Warm Amber & Royal Teal",
      objectPosition: "object-center",
    },
    {
      src: "/branding/kitchen_crimson_marble.png",
      title: "Crimson Marble Chef's Kitchen",
      palette: "Deep Carmine & Obsidian",
      objectPosition: "object-center",
    },
    {
      src: "/branding/regal_emerald_palace_lounge.jpg",
      title: "Regal Emerald Palace Lounge",
      palette: "Heritage Green & Warm Gold",
      objectPosition: "object-[center_40%]",
    },
    {
      src: "/branding/spanish_venetian_red_villa.jpg",
      title: "Spanish Venetian Red Hacienda",
      palette: "Rich Terracotta & Olive Greenery",
      objectPosition: "object-center",
    },
    {
      src: "/branding/burgundy_terrace_residence.jpg",
      title: "Burgundy Modern Terrace Villa",
      palette: "Deep Maroon & Contemporary Stone",
      objectPosition: "object-center",
    },
    {
      src: "/branding/contemporary_violet_pavilion.jpg",
      title: "Contemporary Violet Plum Pavilion",
      palette: "Imperial Purple & Botanical Garden",
      objectPosition: "object-center",
    },
    {
      src: "/branding/tropical_terracotta_courtyard.jpg",
      title: "Tropical Terracotta Courtyard",
      palette: "Sunset Ochre & Velvet Plum",
      objectPosition: "object-center",
    },
    {
      src: "/branding/mediterranean_crimson_bougainvillea.png",
      title: "Mediterranean Crimson Courtyard",
      palette: "Rustic Tuscan Red & Bougainvillea",
      objectPosition: "object-center",
    },
    {
      src: "/branding/artistic_creative_mural_studio.jpg",
      title: "Creative Pop-Art Studio Lobby",
      palette: "Electric Multicolour Mural",
      objectPosition: "object-center",
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-rotate photos smoothly every ~1.3 seconds as requested
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % rotatingPhotos.length);
    }, 1300);

    return () => clearInterval(timer);
  }, [rotatingPhotos.length]);

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
          
          {/* Left Column: Auto-Rotating Room Photos with Smooth Luxury Crossfade */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
              
              {rotatingPhotos.map((photo, idx) => {
                const isActive = idx === currentIdx;
                return (
                  <div
                    key={photo.src}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      isActive
                        ? "opacity-100 z-10 scale-100"
                        : "opacity-0 z-0 scale-105 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      quality={100}
                      unoptimized={true}
                      priority={idx <= 1}
                      className={`object-cover ${photo.objectPosition} [image-rendering:-webkit-optimize-contrast]`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                  </div>
                );
              })}

              {/* Dynamic Floating Photo Badge */}
              <div className="absolute bottom-5 left-5 z-20 bg-black/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs text-slate-200 shadow-xl transition-all duration-500 max-w-[70%]">
                <span className="font-extrabold text-white block text-sm truncate">
                  {rotatingPhotos[currentIdx].title}
                </span>
                <span className="text-[11px] text-[#FFD100] font-semibold block truncate">
                  {rotatingPhotos[currentIdx].palette}
                </span>
              </div>

              {/* Interactive Dot Indicators */}
              <div className="absolute bottom-5 right-5 z-20 flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/15">
                {rotatingPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    aria-label={`Show photo ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentIdx ? "w-4 sm:w-5 bg-[#FFD100]" : "w-1.5 bg-white/50 hover:bg-white"
                    }`}
                  />
                ))}
              </div>

            </div>

            {/* Decorative Corner Glow */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-[#E8501E]/10 blur-3xl pointer-events-none" />
          </div>

          {/* Right Column: Editorial Copy & 4 Badges */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Header + Rainbow Brush Row */}
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

              {/* Rainbow Paintbrush Graphic */}
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