"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";

interface HeroRoyaleProps {
  onOpenGoogleAuth: () => void;
  currentUser: { name: string; email: string } | null;
}

export const HeroRoyale: React.FC<HeroRoyaleProps> = ({
  onOpenGoogleAuth,
  currentUser,
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-24 bg-black overflow-hidden">
      
      {/* Ambient Radial Spotlight Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] lg:w-[950px] h-[550px] sm:h-[750px] lg:h-[950px] rounded-full bg-gradient-to-tr from-[#004B87]/30 via-[#E8501E]/15 to-[#FFD100]/10 blur-[150px] pointer-events-none" />

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto space-y-8 z-10 flex flex-col items-center">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD100]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-200">
            ANKUR ROYALE • GERMAN CROSSLINKING EMULSION
          </span>
        </div>

        {/* Display Typography (Apple Style: Bold, Clean, Majestic) */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
            Unrivaled Splendor.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Engineered for timeless living.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            10-Year Weather Shield. Hairline crack bridging up to 2.2mm. Certified zero VOC family safety.
          </p>
        </div>

        {/* Centerpiece 3D Bucket Image (Generated Bespoke 4K Packshot) */}
        <div className="relative w-full max-w-lg pt-4 pb-2 flex flex-col items-center group">
          
          <div className="relative aspect-square w-72 sm:w-96 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/10 group-hover:border-white/20 transition-all duration-500 animate-float">
            <Image
              src="/branding/generated/ankur_3d_royale_bucket.jpg"
              alt="Ankur Paints Royale Luxury Emulsion 3D Packshot"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Glossy Obsidian Floor Reflection */}
          <div className="relative -mt-6 w-64 sm:w-80 h-10 bg-gradient-to-b from-white/15 via-white/5 to-transparent rounded-[100%] blur-[2px]" />

          {/* Price & Packaging Pill */}
          <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-medium text-slate-200 shadow-xl">
            <span className="font-bold text-white">₹4,200</span>
            <span className="text-slate-500">•</span>
            <span>20L Master Packaging</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-semibold">10-Yr Guarantee</span>
          </div>

        </div>

        {/* Action CTAs (Sign in with Google + Explore Spaces) */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          
          {/* Primary Google Login Button */}
          {!currentUser ? (
            <button
              onClick={onOpenGoogleAuth}
              className="group flex items-center gap-3 px-7 py-4 rounded-full bg-white text-slate-950 hover:bg-slate-100 text-sm font-bold shadow-[0_8px_30px_rgba(255,255,255,0.25)] transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              {/* Official Google 'G' SVG */}
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
            href="#spaces"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 backdrop-blur-md transition-all shadow-sm"
          >
            <span>Explore Living Spaces</span>
            <ArrowRight className="w-4 h-4" />
          </a>

        </div>

      </div>

    </section>
  );
};
