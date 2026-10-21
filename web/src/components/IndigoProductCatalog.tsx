"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, ShieldCheck, Check, Sparkles, Filter, Award } from "lucide-react";

interface IndigoProductCatalogProps {
  onAddToCart?: (productName: string, size: string, price: number) => void;
}

export const IndigoProductCatalog: React.FC<IndigoProductCatalogProps> = ({ onAddToCart }) => {
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
    { id: "exterior", label: "Exterior Emulsions" },
    { id: "interior", label: "Interior Emulsions" },
    { id: "waterproofing", label: "Waterproofing" },
    { id: "undercoat", label: "Primers & Putties" },
  ];

  const products = [
    {
      id: "epic",
      name: "Epic Coat Luxury Exterior Emulsion",
      shortName: "Epic Coat",
      category: "exterior",
      warranty: "10-Year Warranty",
      sheen: "High Weather Sheen",
      bucketImg: "/branding/bucket_5.png",
      basePrice20L: 4200,
      basePrice10L: 2250,
      basePrice4L: 980,
      basePrice1L: 270,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Flagship exterior emulsion fortified with German cross-linking polymers for crack resistance and solar cooling.",
      coverage: "120 - 140 sq.ft / L (2 Coats)",
    },
    {
      id: "rang",
      name: "Rang Ritu Washable Interior Emulsion",
      shortName: "Rang Ritu",
      category: "interior",
      warranty: "7-Year Warranty",
      sheen: "Silky Velvet Sheen",
      bucketImg: "/branding/bucket_2.png",
      basePrice20L: 3850,
      basePrice10L: 2050,
      basePrice4L: 890,
      basePrice1L: 245,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Signature washable interior emulsion with anti-fungal defense and effortless stain erasability.",
      coverage: "140 - 160 sq.ft / L (2 Coats)",
    },
    {
      id: "gleam",
      name: "Gleam Coat Exterior Emulsion",
      shortName: "Gleam Coat",
      category: "exterior",
      warranty: "5-Year Warranty",
      sheen: "Weather-Guard Matt",
      bucketImg: "/branding/bucket_3.png",
      basePrice20L: 2950,
      basePrice10L: 1600,
      basePrice4L: 690,
      basePrice1L: 195,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "All-season weather protective emulsion with anti-algae silicone additives that wash away dirt with rain.",
      coverage: "110 - 130 sq.ft / L (2 Coats)",
    },
    {
      id: "rose",
      name: "Rose Gold Luxury Emulsion",
      shortName: "Rose Gold",
      category: "interior",
      warranty: "5-Year Warranty",
      sheen: "Rich Satin Sheen",
      bucketImg: "/branding/bucket_4.png",
      basePrice20L: 3900,
      basePrice10L: 2100,
      basePrice4L: 910,
      basePrice1L: 250,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Premium architectural coating delivering high UV color retention, warm aesthetics, and velvety smooth touch.",
      coverage: "130 - 150 sq.ft / L (2 Coats)",
    },
    {
      id: "crest",
      name: "Colour Crest Exterior Emulsion",
      shortName: "Colour Crest",
      category: "exterior",
      warranty: "3-Year Warranty",
      sheen: "Warm Radiance Matt",
      bucketImg: "/branding/bucket_1.png",
      basePrice20L: 2800,
      basePrice10L: 1520,
      basePrice4L: 650,
      basePrice1L: 180,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Economical high-coverage exterior finish designed for expansive residential facades and boundary walls.",
      coverage: "100 - 120 sq.ft / L (2 Coats)",
    },
    {
      id: "damp",
      name: "Damp Proof Advanced Waterproofing",
      shortName: "Damp Proof",
      category: "waterproofing",
      warranty: "10-Year Seepage Proof",
      sheen: "Elastomeric Membrane",
      bucketImg: "/branding/bucket_6.png",
      basePrice20L: 5100,
      basePrice10L: 2750,
      basePrice4L: 1190,
      basePrice1L: 320,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Heavy-duty elastomeric waterproofing membrane bridging cracks up to 2.2mm with 10-year seepage assurance.",
      coverage: "30 - 35 sq.ft / L (Complete System)",
    },
    {
      id: "distemper",
      name: "Acrylic Distemper (Washable)",
      shortName: "Acrylic Distemper",
      category: "interior",
      warranty: "Washable Matt",
      sheen: "Soft Velvet White",
      bucketImg: "/branding/bucket_7.png",
      basePrice20L: 1450,
      basePrice10L: 780,
      basePrice4L: 340,
      basePrice1L: 110,
      sizes: ["2KG", "5KG", "10KG", "20KG"],
      description: "High-whiteness water-based acrylic distemper delivering clean breathable coverage for ceilings and interior walls.",
      coverage: "90 - 110 sq.ft / KG (2 Coats)",
    },
    {
      id: "primer",
      name: "Acrylic Primer Interior & Exterior",
      shortName: "Acrylic Primer",
      category: "undercoat",
      warranty: "Deep Sealer",
      sheen: "Penetrating Base",
      bucketImg: "/branding/bucket_8.png",
      basePrice20L: 2200,
      basePrice10L: 1180,
      basePrice4L: 520,
      basePrice1L: 150,
      sizes: ["1L", "4L", "10L", "20L"],
      description: "Deep penetrating undercoat sealing surface porosity and guaranteeing high adhesion and true color fidelity.",
      coverage: "180 - 210 sq.ft / L (1 Coat)",
    },
    {
      id: "putty",
      name: "Acrylic Smooth Wall Putty",
      shortName: "Wall Putty",
      category: "undercoat",
      warranty: "Micro-Fine Base",
      sheen: "Flawless White",
      bucketImg: "/branding/bucket_9.png",
      basePrice20L: 1150,
      basePrice10L: 620,
      basePrice4L: 280,
      basePrice1L: 90,
      sizes: ["5KG", "20KG", "40KG"],
      description: "Micro-fine white cementitious acrylic putty providing an impeccably smooth, crack-resistant canvas for emulsions.",
      coverage: "15 - 18 sq.ft / KG (2 Coats)",
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

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedPackSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <section id="products" className="py-20 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#004B87] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Architectural Formulations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The 9 Official <span className="text-[#004B87]">Paints Collections</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every bucket manufactured by Ankur Paints conforms to rigorous German polymer crosslinking standards. Select pack sizes to explore authoritative printed MRPs.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === c.id
                  ? "bg-[#004B87] text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 9 Product Cards Grid (Indigo Style White Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const currentSize = selectedPackSizes[p.id] || p.sizes[p.sizes.length - 1];
            const currentPrice = getPriceForSize(p, currentSize);

            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#004B87] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Badge Strip */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-[#004B87] border border-blue-100">
                      {p.warranty}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {p.sheen}
                    </span>
                  </div>

                  {/* Packaging Visual Center */}
                  <div className="relative aspect-[4/3] w-full flex items-center justify-center my-2">
                    <div className="relative w-44 h-52 transform group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={p.bucketImg}
                        alt={p.name}
                        fill
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Product Title & Info */}
                  <div className="space-y-2 text-left pt-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#004B87] transition-colors leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                    <div className="text-[11px] font-semibold text-slate-600 pt-1">
                      Coverage: <span className="text-slate-800">{p.coverage}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Pack Size Selector & MRP */}
                <div className="pt-5 mt-4 border-t border-slate-100 space-y-4">
                  
                  {/* Pack Size Pills */}
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Select Pack Size:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {p.sizes.map((size) => {
                        const isSelected = currentSize === size;
                        return (
                          <button
                            key={size}
                            onClick={() => handleSizeChange(p.id, size)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              isSelected
                                ? "bg-[#004B87] text-white shadow-sm"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price & Add to Order */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Printed MRP</span>
                      <span className="text-xl font-extrabold text-[#004B87]">
                        ₹{currentPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart?.(p.name, currentSize, currentPrice)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E8501E] hover:bg-[#D04212] text-white text-xs font-bold rounded-xl shadow-md transition-all transform active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Order</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
