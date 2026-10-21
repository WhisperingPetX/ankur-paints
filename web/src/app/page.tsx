"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AppleNavbar } from "@/components/AppleNavbar";
import { GoogleAuthModal } from "@/components/GoogleAuthModal";
import { ShieldCheck, Sparkles, Check, ArrowRight, Award, Droplets, Sun, Leaf } from "lucide-react";

export default function Home() {
  const [googleAuthOpen, setGoogleAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    avatar: string;
    role?: string;
  } | null>(null);

  // Apple Color Dots Palette
  const shades = [
    {
      id: "indigo",
      name: "Royal Peacock Indigo",
      code: "SH-101",
      hex: "#1E3A8A",
      glowColor: "rgba(30, 58, 138, 0.45)",
      productName: "Epic Coat Luxury Exterior Emulsion",
      bucketImg: "/branding/bucket_5.png",
      tagline: "10-Year Ultimate Weather Shield",
      mrp: "₹4,200",
      size: "20L Master Packaging",
    },
    {
      id: "magenta",
      name: "Velvet Magenta Royale",
      code: "SH-204",
      hex: "#BE185D",
      glowColor: "rgba(190, 24, 93, 0.45)",
      productName: "Rang Ritu Washable Luxury Emulsion",
      bucketImg: "/branding/bucket_2.png",
      tagline: "7-Year Velvet Sheen & Stain Resistance",
      mrp: "₹3,850",
      size: "20L Master Packaging",
    },
    {
      id: "teal",
      name: "Mediterranean Sea Teal",
      code: "SH-305",
      hex: "#0F766E",
      glowColor: "rgba(15, 118, 110, 0.45)",
      productName: "Gleam Coat Exterior Emulsion",
      bucketImg: "/branding/bucket_3.png",
      tagline: "All-Season Silicone Anti-Algae Defense",
      mrp: "₹2,950",
      size: "20L Master Packaging",
    },
    {
      id: "ochre",
      name: "Imperial Ochre Gold",
      code: "SH-508",
      hex: "#D97706",
      glowColor: "rgba(217, 119, 6, 0.45)",
      productName: "Colour Crest Exterior Emulsion",
      bucketImg: "/branding/bucket_1.png",
      tagline: "Solar Reflective Heat-Bouncing Pigments",
      mrp: "₹2,800",
      size: "20L Master Packaging",
    },
  ];

  const [activeShade, setActiveShade] = useState(shades[0]);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col selection:bg-[#E8501E] selection:text-white relative overflow-hidden">
      
      {/* 1. Minimalist Apple-Style Navbar */}
      <AppleNavbar
        onOpenGoogleAuth={() => setGoogleAuthOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. Hero Stage — Apple Pro Style Minimal Showcase */}
      <section id="hero" className="relative min-h-[85vh] lg:min-h-[92vh] w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 lg:py-16">
        
        {/* Atmospheric Backlight Halo (reacts softly to active shade) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] lg:w-[850px] h-[480px] sm:h-[650px] lg:h-[850px] rounded-full blur-[140px] opacity-40 transition-colors duration-1000 pointer-events-none"
          style={{ backgroundColor: activeShade.glowColor }}
        />

        <div className="relative max-w-4xl mx-auto space-y-6 z-10 flex flex-col items-center">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD100]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-200">
              GERMAN CROSSLINKING POLYMERS • EST. 1999
            </span>
          </div>

          {/* Majestic Apple Display Typography */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
              Epic Coat.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400">
                Defies every season.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              10-Year Weather Shield. Hairline crack bridging up to 2.2mm. Certified zero VOC family safety.
            </p>
          </div>

          {/* Interactive Shade Selector (Apple Color Dots) */}
          <div className="flex flex-col items-center gap-2.5 pt-2">
            <div className="flex items-center gap-3">
              {shades.map((s) => {
                const isSelected = activeShade.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveShade(s)}
                    className={`relative p-1 rounded-full transition-all duration-300 ${
                      isSelected
                        ? "ring-2 ring-white scale-110"
                        : "opacity-60 hover:opacity-100 hover:scale-105"
                    }`}
                    title={s.name}
                  >
                    <span
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full block shadow-md border border-white/20"
                      style={{ backgroundColor: s.hex }}
                    />
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeShade.hex }} />
              <span>{activeShade.name}</span>
              <span className="text-slate-500 font-mono">({activeShade.code})</span>
            </div>
          </div>

          {/* Centerpiece 3D Bucket with Gloss Floor Reflection */}
          <div className="relative w-full max-w-sm sm:max-w-md pt-4 pb-2 flex flex-col items-center group">
            
            {/* 3D Floating Bucket Packaging */}
            <div className="relative aspect-square w-72 sm:w-80 animate-float transition-all duration-500">
              <Image
                src={activeShade.bucketImg}
                alt={activeShade.productName}
                fill
                className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
                priority
              />
            </div>

            {/* Glossy Obsidian Floor Reflection */}
            <div className="relative -mt-6 w-64 sm:w-80 h-10 bg-gradient-to-b from-white/15 via-white/5 to-transparent rounded-[100%] blur-[2px]" />

            {/* Price & Packaging Pill */}
            <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-medium text-slate-200 shadow-xl">
              <span className="font-bold text-white">{activeShade.mrp}</span>
              <span className="text-slate-500">•</span>
              <span>{activeShade.size}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-semibold">In Stock</span>
            </div>

          </div>

          {/* Action CTAs (Sign In with Google + Explore Specs) */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            
            {/* Primary Google Login Button */}
            {!currentUser ? (
              <button
                onClick={() => setGoogleAuthOpen(true)}
                className="group flex items-center gap-3 px-7 py-4 rounded-full bg-white text-slate-950 hover:bg-slate-100 text-sm font-bold shadow-[0_8px_30px_rgba(255,255,255,0.25)] transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                {/* Official Google SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>
            ) : (
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Signed in as {currentUser.name}</span>
              </div>
            )}

            {/* Secondary CTA */}
            <a
              href="#specifications"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 backdrop-blur-md transition-all shadow-sm"
            >
              <span>Explore Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </a>

          </div>

        </div>

      </section>

      {/* 3. Apple Keynote Technical Specs Strip */}
      <section id="specifications" className="py-20 border-t border-b border-white/10 bg-[#05070D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center divide-x divide-white/10">
            
            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                10-Yr
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-300">
                Weather Defense
              </div>
              <p className="text-[11px] text-slate-500">Guaranteed UV & Rain Shield</p>
            </div>

            <div className="space-y-1 pl-4 sm:pl-6">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#00B2E3] tracking-tight">
                2.2mm
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-300">
                Crack Bridging
              </div>
              <p className="text-[11px] text-slate-500">German Polymer Crosslinking</p>
            </div>

            <div className="space-y-1 pl-4 sm:pl-6">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFD100] tracking-tight">
                5°C
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-300">
                Surface Cooling
              </div>
              <p className="text-[11px] text-slate-500">Solar Infrared Reflectance</p>
            </div>

            <div className="space-y-1 pl-4 sm:pl-6">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-400 tracking-tight">
                Zero
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-300">
                Harmful VOCs
              </div>
              <p className="text-[11px] text-slate-500">Safe for Kids & Family</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. German Polymer Science Spotlight */}
      <section id="technology" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8501E]">
            THE CHEMISTRY OF PERFECTION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Engineered to endure.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Standard paints form rigid brittle films that fracture under extreme Indian climate changes. Ankur Paints utilizes imported German crosslinking acrylics that flex with wall expansion while reflecting harmful infrared sun rays.
          </p>
        </div>

        {/* 3 Focused Feature Pillars (Apple Pro Card Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-4 hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-[#00B2E3] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Crosslinked Matrix</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interlocking polymer strands bridge hairline cracks up to 2.2mm, preventing water seepage into interior masonry.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-4 hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-[#FFD100] flex items-center justify-center font-bold">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Solar Heat Reflectance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Total Solar Reflectance (TSR) pigments bounce back up to 85% of infrared rays, reducing wall surface heat by up to 5°C.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-4 hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Zero VOC & Odorless</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Virtually odorless formulation free from heavy metals and formaldehyde, enriched with silver-ion anti-fungal defense.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Apple-Style Minimal Footer */}
      <footer className="py-12 border-t border-white/10 bg-black text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-slate-300">
              Ankur Paints and Inks Private Limited
            </div>
            <div>
              Est. 1999 • Toll-Free Customer Care: <strong className="text-white">1800-266-1999</strong>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="#hero" className="hover:text-white transition-colors">Overview</a>
            <a href="#specifications" className="hover:text-white transition-colors">Specifications</a>
            <a href="#technology" className="hover:text-white transition-colors">Science</a>
            <button
              onClick={() => setGoogleAuthOpen(true)}
              className="text-white hover:text-[#E8501E] font-semibold transition-colors"
            >
              Sign In With Google
            </button>
          </div>
        </div>
      </footer>

      {/* Google Sign In Modal */}
      <GoogleAuthModal
        isOpen={googleAuthOpen}
        onClose={() => setGoogleAuthOpen(false)}
        onSuccess={(user) => setCurrentUser(user)}
      />

    </main>
  );
}
