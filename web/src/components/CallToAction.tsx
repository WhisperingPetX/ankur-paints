"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface CallToActionProps {
  onShopClick?: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onShopClick }) => {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16 bg-gradient-to-r from-[#003865] via-[#004B87] to-[#E8501E] text-white">
      {/* Decorative ambient highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Transform Your Space?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl font-normal">
            Get started with Ankur Paints today and bring your vision to life.
          </p>
        </div>

        <button
          onClick={onShopClick}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#E8501E] hover:bg-[#D04212] text-white text-sm font-bold rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.25)] border border-white/20 transition-all transform hover:scale-105 active:scale-100"
        >
          <span>Shop Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
