"use client";

import React from "react";
import { Phone, MapPin, Calculator, ShieldCheck, Download, Sparkles } from "lucide-react";

interface TopHeaderStripProps {
  onOpenAuth: () => void;
}

export const TopHeaderStrip: React.FC<TopHeaderStripProps> = ({ onOpenAuth }) => {
  return (
    <div className="bg-[#002D5A] text-white text-xs border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
        {/* Left: Toll-free customer care & brand tagline */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#FFD100]" />
            <span className="text-slate-300">Toll-Free Helpline:</span>
            <a
              href="tel:18002661999"
              className="font-bold text-white hover:text-[#FFD100] transition-colors"
            >
              1800-266-1999
            </a>
            <span className="text-slate-400 text-[11px]">(Mon-Sat 9 AM - 8 PM)</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-300">
            <Sparkles className="w-3 h-3 text-[#E8501E]" />
            <span className="text-[11px] font-medium tracking-wide">
              Ankur Paints & Inks Pvt. Ltd. • Colouring a brighter tomorrow
            </span>
          </div>
        </div>

        {/* Right: Quick utility links */}
        <div className="flex items-center gap-5 text-[11px] font-semibold text-slate-200">
          <a
            href="#dealer-locator"
            className="flex items-center gap-1.5 hover:text-[#FFD100] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#00B2E3]" />
            <span>Find a Dealer</span>
          </a>

          <a
            href="#calculator"
            className="flex items-center gap-1.5 hover:text-[#FFD100] transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-[#FFD100]" />
            <span>Paint Calculator</span>
          </a>

          <a
            href="#visualizer"
            className="flex items-center gap-1.5 hover:text-[#FFD100] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Digital Shade Card</span>
          </a>

          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8501E] hover:bg-[#D04212] text-white font-bold transition-all shadow-sm"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Retailer B2B Zone</span>
          </button>
        </div>
      </div>
    </div>
  );
};
