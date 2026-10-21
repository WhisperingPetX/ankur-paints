"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";

export const InspirationBlog: React.FC = () => {
  const articles = [
    {
      title: "Top 5 Exterior Colour Combinations for Modern Indian Homes in 2026",
      category: "Exterior Trends",
      readTime: "4 Min Read",
      date: "Oct 2026",
      desc: "From earthy terracotta warm trims to deep peacock indigos, discover architectural palettes engineered to withstand high solar UV exposure.",
      img: "/branding/modern_villa.png",
      tag: "Colour Trends",
    },
    {
      title: "Monsoon Proofing: How to Seal Terrace & Wall Seepage Permanently",
      category: "Waterproofing Guide",
      readTime: "5 Min Read",
      date: "Oct 2026",
      desc: "Understanding how elastomeric crosslinking membranes bridge micro-cracks up to 2.2mm and stop hydrostatic ground moisture.",
      img: "/branding/house_hero.png",
      tag: "Protection",
    },
    {
      title: "The Ultimate Sheen Guide: Silky Satin vs Washable Matt for Living Rooms",
      category: "Interior Decor",
      readTime: "3 Min Read",
      date: "Oct 2026",
      desc: "Why velvet sheen interior emulsions make everyday stain removal effortless without dulling the underlying pigment brilliance.",
      img: "/branding/living_room_hero.png",
      tag: "Home Makeover",
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#004B87] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Decor Ideas & Painting Advice</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Inspiration for <span className="text-[#004B87]">Every Living Space</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Expert painting guides, seasonal decor ideas, and technical waterproofing tips curated by Ankur Paints architectural specialists.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item, idx) => (
            <article
              key={idx}
              className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Image Banner */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#004B87] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {item.tag}
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6 text-left space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#004B87] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="p-6 pt-0 text-left border-t border-slate-200/60 mt-2">
                <a
                  href="#products"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004B87] group-hover:text-[#E8501E] transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
