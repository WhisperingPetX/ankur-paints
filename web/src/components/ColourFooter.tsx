"use client";

import React from "react";
import { AnkurLogo } from "./AnkurLogo";
import { Facebook, Instagram, Youtube, Linkedin, Phone } from "lucide-react";

export const ColourFooter: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#050B14] border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <AnkurLogo className="h-10 w-auto" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#products" className="hover:text-white transition-colors">Products</a>
            <a href="#why-us" className="hover:text-white transition-colors">Why Ankur</a>
            <a href="#spaces" className="hover:text-white transition-colors">Living Spaces</a>
            <a href="tel:18002661999" className="hover:text-white transition-colors">Toll-Free Helpline</a>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#004B87] text-slate-300 hover:text-white flex items-center justify-center transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#E8501E] text-slate-300 hover:text-white flex items-center justify-center transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Ankur Paints and Inks Private Limited. All rights reserved.
          </div>
          <div>
            Toll-Free Customer Care: <strong className="text-white">1800-266-1999</strong> (Mon-Sat 9 AM - 8 PM)
          </div>
        </div>

      </div>
    </footer>
  );
};
