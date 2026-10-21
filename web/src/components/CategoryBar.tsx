"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export const CategoryBar: React.FC = () => {
  const categories = [
    {
      title: "Exterior Emulsions",
      subtitle: "Sun, Rain & Algae Defense",
      desc: "High weather-shield durability with solar reflection technology.",
      bucketImg: "/branding/bucket_5.png",
      tag: "Epic Coat & Gleam Coat",
      href: "#products",
      accent: "from-blue-600 to-indigo-800",
    },
    {
      title: "Interior Emulsions",
      subtitle: "Luxury Sheen & Washable Walls",
      desc: "Silky finish that repels common household stains and marks.",
      bucketImg: "/branding/bucket_2.png",
      tag: "Rang Ritu & Rose Gold",
      href: "#products",
      accent: "from-pink-600 to-rose-800",
    },
    {
      title: "Waterproofing",
      subtitle: "Zero Dampness 10-Yr Membrane",
      desc: "Heavy-duty elastomeric protection against terrace seepage.",
      bucketImg: "/branding/bucket_6.png",
      tag: "Damp Proof 10-Year",
      href: "#products",
      accent: "from-teal-600 to-cyan-800",
    },
    {
      title: "Primers & Undercoats",
      subtitle: "Deep Porosity Sealing",
      desc: "Superior bonding basecoat ensuring true topcoat color fidelity.",
      bucketImg: "/branding/bucket_8.png",
      tag: "Acrylic Primer Interior & Exterior",
      href: "#products",
      accent: "from-amber-600 to-orange-700",
    },
    {
      title: "Putty & Distemper",
      subtitle: "Smooth Wall Foundation",
      desc: "Micro-fine white acrylic putty delivering flawless glass smoothness.",
      bucketImg: "/branding/bucket_9.png",
      tag: "White Wall Putty 40KG",
      href: "#products",
      accent: "from-slate-600 to-slate-800",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Indigo Style: Clean Center Aligned) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#004B87] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Architectural Range</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore by <span className="text-[#004B87]">Product Category</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From exterior weather shields and washable interior walls to heavy-duty terrace waterproofing, discover precision coatings for every surface.
          </p>
        </div>

        {/* 5-Column Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={cat.href}
              className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-[#004B87] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
            >
              {/* Top info */}
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8501E] block">
                  {cat.subtitle}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#004B87] transition-colors leading-tight">
                  {cat.title}
                </h3>
              </div>

              {/* Bucket Visual Center */}
              <div className="relative aspect-square w-full my-4 flex items-center justify-center">
                <div className="relative w-32 h-36 transform group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={cat.bucketImg}
                    alt={cat.title}
                    fill
                    className="object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* Bottom footer with link */}
              <div className="pt-3 border-t border-slate-100 text-left">
                <p className="text-[11px] text-slate-500 line-clamp-2 mb-2">
                  {cat.desc}
                </p>
                <div className="flex items-center justify-between text-xs font-bold text-[#004B87] group-hover:text-[#E8501E] transition-colors">
                  <span>View Products</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
