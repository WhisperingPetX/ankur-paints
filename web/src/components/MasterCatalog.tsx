"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, ShieldCheck, Check, Sparkles } from "lucide-react";

interface MasterCatalogProps {
  onAddToCart?: (product: any, size: string, price: number) => void;
}

export const MasterCatalog: React.FC<MasterCatalogProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPackSizes, setSelectedPackSizes] = useState<Record<string, string>>({
    epic: "20L",
    rang: "20L",
    gleam: "20L",
    rose: "20L",
    crest: "20L",
    damp: "20L",
    distemper: "20KG",
    primer: "20L",
    putty: "40KG",
  });

  const categories = [
    { id: "all", label: "All Collections (9)" },
    { id: "exterior", label: "Exterior Luxury" },
    { id: "interior", label: "Interior Elegance" },
    { id: "waterproofing", label: "Waterproofing" },
    { id: "undercoat", label: "Primers & Putty" },
  ];

  const products = [
    {
      id: "epic",
      name: "Epic Coat Luxury Exterior Emulsion",
      shortName: "Epic Coat",
      category: "exterior",
      themeColor: "#312E81",
      warranty: "5 Years",
      sheen: "High Weather Sheen",
      bucketImg: "/branding/bucket_5.png",
      basePrice20L: 4200,
      basePrice10L: 2250,
      basePrice4L: 980,
      basePrice1L: 270,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Flagship exterior emulsion fortified with German cross-linking polymers for crack resistance.",
    },
    {
      id: "rang",
      name: "Rang Ritu Interior Emulsion",
      shortName: "Rang Ritu",
      category: "interior",
      themeColor: "#BE185D",
      warranty: "7 Years",
      sheen: "Velvety Eggshell",
      bucketImg: "/branding/bucket_2.png",
      basePrice20L: 3850,
      basePrice10L: 2050,
      basePrice4L: 890,
      basePrice1L: 245,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Signature washable interior emulsion with anti-fungal defense and rich color brilliance.",
    },
    {
      id: "gleam",
      name: "Gleam Coat Exterior Emulsion",
      shortName: "Gleam Coat",
      category: "exterior",
      themeColor: "#0F766E",
      warranty: "3 Years",
      sheen: "Weather Matt",
      bucketImg: "/branding/bucket_3.png",
      basePrice20L: 2950,
      basePrice10L: 1600,
      basePrice4L: 690,
      basePrice1L: 195,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "All-season weather protective emulsion with anti-algae silicone additives.",
    },
    {
      id: "rose",
      name: "Rose Gold Luxury Emulsion",
      shortName: "Rose Gold",
      category: "exterior",
      themeColor: "#991B1B",
      warranty: "2 Years",
      sheen: "Rich Satin",
      bucketImg: "/branding/bucket_4.png",
      basePrice20L: 3900,
      basePrice10L: 2100,
      basePrice4L: 910,
      basePrice1L: 250,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Premium architectural coating delivering high UV resistance and thermal stability.",
    },
    {
      id: "crest",
      name: "Colour Crest Exterior Emulsion",
      shortName: "Colour Crest",
      category: "exterior",
      themeColor: "#9A3412",
      warranty: "2 Years",
      sheen: "Warm Matt",
      bucketImg: "/branding/bucket_1.png",
      basePrice20L: 2800,
      basePrice10L: 1520,
      basePrice4L: 650,
      basePrice1L: 180,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Economical high-coverage exterior finish designed for expansive residential facades.",
    },
    {
      id: "damp",
      name: "Damp Proof Advanced Waterproofing",
      shortName: "Damp Proof",
      category: "waterproofing",
      themeColor: "#854D0E",
      warranty: "10 Years",
      sheen: "Elastomeric Membrane",
      bucketImg: "/branding/bucket_6.png",
      basePrice20L: 5100,
      basePrice10L: 2750,
      basePrice4L: 1190,
      basePrice1L: 320,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Heavy-duty elastomeric waterproofing membrane bridging cracks up to 2mm with 10-year assurance.",
    },
    {
      id: "distemper",
      name: "Acrylic Distemper (Washable)",
      shortName: "Acrylic Distemper",
      category: "interior",
      themeColor: "#166534",
      warranty: "Washable",
      sheen: "Super Smooth",
      bucketImg: "/branding/bucket_7.png",
      basePrice20L: 1450,
      basePrice10L: 800,
      basePrice4L: 350,
      basePrice1L: 110,
      sizes: ["5KG", "10KG", "20KG"],
      description: "Eco-friendly, water-thinnable interior distemper with superior opacity and brightness.",
    },
    {
      id: "primer",
      name: "Premium Exterior & Interior Primer",
      shortName: "Wall Primer",
      category: "undercoat",
      themeColor: "#065F46",
      warranty: "High Adhesion",
      sheen: "Sealing Base",
      bucketImg: "/branding/bucket_8.png",
      basePrice20L: 2150,
      basePrice10L: 1180,
      basePrice4L: 520,
      basePrice1L: 150,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Deep penetrating undercoat sealing surface porosity and guaranteeing true topcoat color fidelity.",
    },
    {
      id: "putty",
      name: "Acrylic Smooth Wall Putty",
      shortName: "Wall Putty",
      category: "undercoat",
      themeColor: "#A16207",
      warranty: "Crack Resisting",
      sheen: "Velvet White",
      bucketImg: "/branding/bucket_9.png",
      basePrice20L: 1150,
      basePrice10L: 620,
      basePrice4L: 280,
      basePrice1L: 90,
      sizes: ["5KG", "20KG", "40KG"],
      description: "Micro-fine white cementitious acrylic putty providing an impeccably smooth finish for emulsions.",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const getPriceForSize = (product: any, size: string) => {
    if (size.includes("20") || size.includes("40")) return product.basePrice20L;
    if (size.includes("10")) return product.basePrice10L;
    if (size.includes("4") || size.includes("5")) return product.basePrice4L;
    return product.basePrice1L;
  };

  return (
    <section id="collections" className="py-20 lg:py-28 bg-[#030712] text-white relative">
      <div id="products" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-bold uppercase tracking-[0.2em] text-[#00B2E3]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Product Formulations</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white">
            The 9 Official <span className="text-[#E8501E]">Master Collections</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every bucket manufactured by Ankur Paints conforms to rigorous German polymer crosslinking standards. Select pack sizes and explore authoritative printed MRPs.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeCategory === c.id
                  ? "bg-[#E8501E] text-white shadow-[0_0_15px_rgba(232,80,30,0.4)]"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 9 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p, idx) => {
            const currentSize = selectedPackSizes[p.id] || p.sizes[p.sizes.length - 1];
            const currentPrice = getPriceForSize(p, currentSize);

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-[#0B1528] rounded-3xl p-6 border border-slate-800 hover:border-slate-700 shadow-xl flex flex-col justify-between group transition-all"
              >
                <div>
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                      style={{ backgroundColor: `${p.themeColor}33`, color: "#00E5FF", border: `1px solid ${p.themeColor}88` }}
                    >
                      {p.sheen}
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-bold">
                      {p.warranty} Warranty
                    </span>
                  </div>

                  {/* High-Resolution Bucket Visual on Clean Pedestal */}
                  <div className="relative aspect-[4/3] w-full flex items-center justify-center py-4 bg-slate-950/40 rounded-2xl mb-5 overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20 blur-2xl pointer-events-none"
                      style={{ backgroundColor: p.themeColor }}
                    />
                    <div className="relative h-44 w-36 transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={p.bucketImg}
                        alt={p.name}
                        fill
                        className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  </div>

                  {/* Product Title & Description */}
                  <div className="space-y-2 mb-4 text-left">
                    <h3 className="text-lg font-bold text-white font-serif group-hover:text-[#E8501E] transition-colors leading-snug">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Order Bar: Pack Sizes & Add Button */}
                <div className="pt-4 border-t border-slate-800/80 space-y-4">
                  {/* Size Selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Pack Size:</span>
                    <div className="flex items-center gap-1.5">
                      {p.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedPackSizes({ ...selectedPackSizes, [p.id]: s })}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            currentSize === s
                              ? "bg-white text-slate-900 shadow-sm"
                              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-700/60"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Add to Order Button */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Printed MRP</span>
                      <span className="text-lg font-extrabold text-white">₹{currentPrice.toLocaleString("en-IN")}</span>
                    </div>

                    <button
                      onClick={() => onAddToCart?.(p, currentSize, currentPrice)}
                      className="px-4 py-2.5 bg-[#E8501E] hover:bg-[#D04212] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
