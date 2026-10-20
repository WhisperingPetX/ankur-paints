"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Facebook, Instagram, Youtube, Linkedin, Check } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="bg-[#050B14] text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/60">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative h-12 w-52">
              <Image
                src="/branding/ankur_logo_master.png"
                alt="Ankur Paints & Inks"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-slate-400 font-medium">
              Colouring a brighter tomorrow.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Ankur Paints and Inks Private Limited — Manufacturing high-performance architectural emulsions, water-proofing polymers, primers, and distempers.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-[#E8501E] transition-colors">Home</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#E8501E] transition-colors">Products</a>
              </li>
              <li>
                <a href="#explorer" className="hover:text-[#E8501E] transition-colors">Colour Explorer</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E8501E] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E8501E] transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-[#E8501E] transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#E8501E] transition-colors">Shipping Policy</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#E8501E] transition-colors">Return Policy</a>
              </li>
              <li>
                <a href="#hero" className="hover:text-[#E8501E] transition-colors">Track Order</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E8501E] transition-colors">Help & Assistance</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect With Us & Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Connect With Us
            </h4>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#004B87] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#E8501E] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0077B5] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-slate-400">
                Subscribe to our Newsletter
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-slate-900/90 text-xs text-white placeholder-slate-500 px-4 py-2.5 rounded-lg border border-slate-700/80 focus:outline-none focus:border-[#E8501E] pr-12 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 w-8 h-8 rounded-md bg-[#E8501E] hover:bg-[#D04212] text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Submit Newsletter"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-medium">
                  ✓ Thank you for subscribing to Ankur Paints!
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2025 Ankur Paints. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
