"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import { AnkurLogo } from "./AnkurLogo";

export const IndigoFooter: React.FC = () => {
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
    <footer className="bg-[#002244] text-slate-300 text-xs">
      
      {/* Top Newsletter & Support Strip */}
      <div className="border-b border-white/10 bg-[#001A35] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="text-left space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD100]">
                Stay Inspired With Ankur Paints
              </span>
              <h3 className="text-xl font-bold text-white">
                Subscribe to Seasonal Colour Trends & Expert Advice
              </h3>
              <p className="text-xs text-slate-400">
                Receive quarterly architectural shade combinations and home maintenance guides directly to your inbox.
              </p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs outline-none focus:border-[#FFD100] w-full sm:w-72"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#E8501E] hover:bg-[#D04212] text-white font-bold transition-all shrink-0 shadow-md flex items-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

          {subscribed && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you for subscribing to Ankur Paints design trends!</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="py-1">
              <AnkurLogo className="h-10 w-auto" />
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Ankur Paints and Inks Private Limited — Manufacturing high-performance architectural coatings, water-repellent polymers, primers, and distempers since 1999.
            </p>

            <div className="space-y-2.5 pt-2 text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFD100] shrink-0" />
                <span>Toll-Free: <strong>1800-266-1999</strong> (Mon-Sat 9AM-8PM)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00B2E3] shrink-0" />
                <span>Email: support@ankurpaints.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8501E] shrink-0 mt-0.5" />
                <span>Plot No. 18-A, Industrial Growth Centre, Phase II, New Delhi - 110020</span>
              </div>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Paints & Products
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#products" className="hover:text-white transition-colors">Epic Coat Luxury Emulsion</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Rang Ritu Washable Interior</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Gleam Coat Exterior Matt</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Rose Gold Satin Sheen</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Colour Crest Exterior</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Damp Proof 10-Yr Membrane</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Acrylic Wall Putty & Primer</a></li>
            </ul>
          </div>

          {/* Column 3: Tools & Inspirations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Tools & Inspiration
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#visualizer" className="hover:text-white transition-colors">3D Colour Visualizer</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Paint Quantity Calculator</a></li>
              <li><a href="#visualizer" className="hover:text-white transition-colors">Trending 2-Tone Palettes</a></li>
              <li><a href="#innovations" className="hover:text-white transition-colors">German Polymer Science</a></li>
              <li><a href="#dealer-locator" className="hover:text-white transition-colors">Store & Dealer Locator</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Pack Size & MRP Guide</a></li>
            </ul>
          </div>

          {/* Column 4: Dealer Hub & Partner Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Retailer & Contractor
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#retailer-hub" className="hover:text-white transition-colors">Diwali Dhamaka Incentive Scheme</a></li>
              <li><a href="#retailer-hub" className="hover:text-white transition-colors">Barcode QR POS Simulator</a></li>
              <li><a href="#retailer-hub" className="hover:text-white transition-colors">Dealer GSTIN KYC Onboarding</a></li>
              <li><a href="#retailer-hub" className="hover:text-white transition-colors">Price-Ceiling Compliance Policy</a></li>
              <li><a href="#dealer-locator" className="hover:text-white transition-colors">Apply for New Dealership</a></li>
              <li><a href="tel:18002661999" className="hover:text-white transition-colors">Contractor Helpdesk</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-white/10 bg-[#00172E] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © 2026 Ankur Paints and Inks Private Limited. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#products" className="hover:text-white">Privacy Policy</a>
            <a href="#products" className="hover:text-white">Terms of Sale</a>
            <a href="#products" className="hover:text-white">SOP Compliance</a>
            <a href="#products" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>

    </footer>
  );
};
