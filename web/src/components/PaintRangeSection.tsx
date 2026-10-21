"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const PaintRangeSection: React.FC = () => {
  const categories = [
    {
      title: "Interior Emulsion",
      desc: "Smooth finish, vibrant colours, lasting beauty.",
      img: "/branding/hero_splash_living_room.jpg",
      href: "#spaces",
    },
    {
      title: "Exterior Emulsion",
      desc: "Weather resistant, long lasting protection.",
      img: "/branding/generated/ankur_contemporary_villa_facade.jpg",
      href: "#spaces",
    },
    {
      title: "Industrial Paints",
      desc: "Tough on surfaces, strong on performance.",
      img: "/branding/generated/ankur_luxury_penthouse_interior.jpg",
      href: "#spaces",
    },
    {
      title: "Speciality Coatings",
      desc: "For unique surfaces and creative finishes.",
      img: "/branding/hero_splash_living_room.jpg",
      href: "#spaces",
    },
  ];

  return (
    <section id="products" className="py-20 sm:py-28 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-3 max-w-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E8501E] flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#E8501E]" />
              <span>OUR PRODUCTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Paint Range
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              From elegant interiors to strong exteriors, Ankur Paints offers a wide range of high-performance paints for every surface and every style.
            </p>
          </div>

          <div>
            <a
              href="#spaces"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all shrink-0"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4 Visual Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 text-left"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#004B87] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Arrow Action */}
              <div className="p-5 pt-0">
                <a
                  href={cat.href}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#004B87] group-hover:text-white group-hover:border-[#004B87] transition-all"
                  aria-label={`Explore ${cat.title}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
