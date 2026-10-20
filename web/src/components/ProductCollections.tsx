"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProductCollectionsProps {
  onSelectProduct?: (productName: string) => void;
}

export const ProductCollections: React.FC<ProductCollectionsProps> = ({
  onSelectProduct,
}) => {
  const products = [
    {
      id: "acrylic",
      name: "Acrylic Emulsion",
      description: "Smooth finish, rich colours, long life.",
      image: "/branding/card_acrylic.png",
      tag: "Interior",
      mrp: "₹2,450",
    },
    {
      id: "colour-create",
      name: "Colour Create",
      description: "Express your style with stunning shades.",
      image: "/branding/card_colour_create.png",
      tag: "Creative",
      mrp: "₹2,800",
    },
    {
      id: "clean-coat",
      name: "Clean Coat",
      description: "Easy to clean, always fresh.",
      image: "/branding/card_clean_coat.png",
      tag: "Washable",
      mrp: "₹3,150",
    },
    {
      id: "rose-gold",
      name: "Rose Gold",
      description: "Luxury finish for premium spaces.",
      image: "/branding/card_rose_gold.png",
      tag: "Luxury Exterior",
      mrp: "₹3,900",
    },
    {
      id: "epic-coat",
      name: "Epic Coat",
      description: "Ultimate protection for exteriors.",
      image: "/branding/card_epic_coat.png",
      tag: "Flagship 5 Yrs",
      mrp: "₹4,200",
    },
  ];

  return (
    <section id="products" className="py-16 lg:py-24 bg-[#F8FAFC] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#004B87]">
              OUR PRODUCTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif text-[#0F172A]">
              Premium <span className="text-[#E8501E]">Paint Collections</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl">
              From elegant interiors to strong exteriors, we have the perfect paint for every surface and every dream.
            </p>
          </div>

          <a
            href="#products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#004B87] hover:text-[#E8501E] transition-colors self-start md:self-end"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#E8501E]" />
          </a>
        </div>

        {/* 5-Card Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-6">
          {products.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Product Visual Card with Room + Bucket */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-slate-800 shadow-sm">
                  {item.tag}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-[#004B87] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => onSelectProduct?.(item.name)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8501E] hover:text-[#D04212] transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <span className="text-[11px] font-semibold text-slate-400">
                    MRP {item.mrp}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
