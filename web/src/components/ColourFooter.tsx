"use client";

import React from "react";
import { AnkurLogo } from "./AnkurLogo";
import { Facebook, Instagram, Youtube, Linkedin, Phone } from "lucide-react";

export const ColourFooter: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#040914] border-t border-slate-800/80 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Tier: Brand Identity, Quick Nav, Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80 items-center">
          
          {/* Logo & Brief */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <AnkurLogo className="h-10 w-auto" variant="light" />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Ankur Paints & Inks Private Limited — engineering premium architectural coatings and high-performance industrial paints for homes, offices, and dream spaces.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="lg:col-span-5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-300">
            <a href="#hero" className="hover:text-[#FFD100] transition-colors">Home</a>
            <a href="#products" className="hover:text-[#FFD100] transition-colors">Products</a>
            <a href="#why-us" className="hover:text-[#FFD100] transition-colors">Why Ankur</a>
            <a href="#spaces" className="hover:text-[#FFD100] transition-colors">Living Spaces</a>
            <a href="#colors" className="hover:text-[#FFD100] transition-colors">Our Colours</a>
            <a href="tel:18002661999" className="hover:text-[#FFD100] transition-colors">Helpline</a>
          </nav>

          {/* Social Icons & Helpline Pill */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-3">
            <div className="flex items-center gap-2.5">
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-[#004B87] text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500 hover:bg-[#E8501E] text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-red-500 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-sky-500 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <a
              href="tel:18002661999"
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700/70 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E8501E]" />
              <span>1800-266-1999</span>
            </a>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            <span className="text-slate-300 font-semibold">© 2026 Ankur Paints and Inks Private Limited.</span> All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms & Conditions</span>
            <span>•</span>
            <span>ISO 9001:2015 Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
