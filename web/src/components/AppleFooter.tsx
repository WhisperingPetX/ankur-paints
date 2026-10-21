"use client";

import React from "react";
import { Phone, ShieldCheck } from "lucide-react";

interface AppleFooterProps {
  onOpenGoogleAuth: () => void;
}

export const AppleFooter: React.FC<AppleFooterProps> = ({ onOpenGoogleAuth }) => {
  return (
    <footer className="py-14 border-t border-white/10 bg-black text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-slate-200">
              Ankur Paints and Inks Private Limited
            </div>
            <div className="text-[11px] text-slate-400">
              Manufacturing Architectural Formulations, Water-Repellent Polymers & Primers Since 1999.
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Phone className="w-3.5 h-3.5 text-[#FFD100]" />
            <span className="text-[11px]">Toll-Free Customer Care:</span>
            <a href="tel:18002661999" className="font-bold text-white hover:text-[#FFD100] transition-colors">
              1800-266-1999
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Ankur Paints and Inks Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-white transition-colors">Overview</a>
            <a href="#specifications" className="hover:text-white transition-colors">Specifications</a>
            <a href="#spaces" className="hover:text-white transition-colors">Living Spaces</a>
            <a href="#shades" className="hover:text-white transition-colors">Curated Shades</a>
            <a href="#dealers" className="hover:text-white transition-colors">Retailer POS</a>
            <button
              onClick={onOpenGoogleAuth}
              className="text-white hover:text-[#E8501E] font-semibold transition-colors"
            >
              Sign in with Google
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
