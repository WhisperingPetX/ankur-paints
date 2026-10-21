"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnkurLogo } from "./AnkurLogo";

export const ColourfulSplashBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-[#030B1E] py-20 lg:py-28 overflow-hidden text-center text-white">
      
      {/* Background Rainbow Splash Wave (Image 2 Artwork) */}
      <div className="absolute inset-0 opacity-80 mix-blend-screen pointer-events-none">
        <Image
          src="/branding/rainbow_splash_wave.png"
          alt="Ankur Paints Rainbow Paint Splash Wave"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030B1E] via-transparent to-[#030B1E]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 z-10 flex flex-col items-center">
        
        {/* Eyebrow */}
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD100]">
          LET’S COLOUR YOUR WORLD
        </span>

        {/* Crisp Vector Ankur Paints Logo */}
        <div className="py-2">
          <AnkurLogo className="h-14 sm:h-16 w-auto drop-shadow-2xl" />
        </div>

        <p className="text-sm sm:text-base text-slate-200 max-w-lg font-medium leading-relaxed drop-shadow">
          Ready to transform your home with royal brilliance and enduring protection? Connect with our architectural paint experts today.
        </p>

        {/* Get in Touch Button (White Rounded Pill Button) */}
        <div className="pt-2">
          <a
            href="tel:18002661999"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-full text-xs uppercase tracking-wider shadow-xl transition-all transform hover:scale-105"
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
};
