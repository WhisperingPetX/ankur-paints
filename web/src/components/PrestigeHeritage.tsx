"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Award, Building2, Users, CheckCircle2 } from "lucide-react";

export const PrestigeHeritage: React.FC = () => {
  const [activeReview, setActiveReview] = useState(0);

  const reviews = [
    {
      name: "Priya Sharma",
      role: "Homeowner",
      city: "Jaipur, Rajasthan",
      quote:
        "We painted our entire villa with Epic Coat and Rang Ritu. Even after 2 intense desert summers and heavy monsoons, the walls look brand new with vibrant color saturation. Outstanding quality!",
      rating: 5,
      productUsed: "Epic Coat & Rang Ritu",
    },
    {
      name: "Rajesh Aggarwal",
      role: "Authorized Retail Dealer",
      city: "Pitampura, New Delhi",
      quote:
        "I have been retailing Ankur Paints for over 8 years. The barcode QR scanning, immediate invoice settlement, and Diwali Dhamaka milestone bonuses make it the most profitable brand for dealers.",
      rating: 5,
      productUsed: "Full 9-Bucket Dealer Portfolio",
    },
    {
      name: "Er. Vikram Malhotra",
      role: "Chief Architectural Contractor",
      city: "Mohali, Punjab",
      quote:
        "The Damp Proof 10-Year elastomeric membrane solved persistent ground moisture issues on our commercial projects. The German crosslinking formulation is genuine and scientifically proven.",
      rating: 5,
      productUsed: "Damp Proof 10-Yr Membrane",
    },
  ];

  const current = reviews[activeReview];

  const handlePrev = () => {
    setActiveReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#070E1A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Master Metric Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="bg-[#0B1528] rounded-3xl p-6 sm:p-8 border border-slate-800 text-center space-y-2 hover:border-[#004B87] transition-all">
            <div className="text-3xl sm:text-5xl font-extrabold text-[#E8501E] font-serif">10+</div>
            <div className="text-sm font-bold text-white">Master Formulations</div>
            <p className="text-xs text-slate-400">Exterior, Interior, Waterproofing</p>
          </div>

          <div className="bg-[#0B1528] rounded-3xl p-6 sm:p-8 border border-slate-800 text-center space-y-2 hover:border-[#004B87] transition-all">
            <div className="text-3xl sm:text-5xl font-extrabold text-[#00B2E3] font-serif">5M+</div>
            <div className="text-sm font-bold text-white">Happy Living Spaces</div>
            <p className="text-xs text-slate-400">Trusted across Indian states</p>
          </div>

          <div className="bg-[#0B1528] rounded-3xl p-6 sm:p-8 border border-slate-800 text-center space-y-2 hover:border-[#004B87] transition-all">
            <div className="text-3xl sm:text-5xl font-extrabold text-[#FFD100] font-serif">25+</div>
            <div className="text-sm font-bold text-white">Years of Heritage</div>
            <p className="text-xs text-slate-400">Manufacturing excellence since 1999</p>
          </div>

          <div className="bg-[#0B1528] rounded-3xl p-6 sm:p-8 border border-slate-800 text-center space-y-2 hover:border-[#004B87] transition-all">
            <div className="text-3xl sm:text-5xl font-extrabold text-emerald-400 font-serif">1,200+</div>
            <div className="text-sm font-bold text-white">Authorized Dealers</div>
            <p className="text-xs text-slate-400">Connected via Real-time POS</p>
          </div>
        </div>

        {/* Testimonials Showcase */}
        <div className="bg-[#0B1528] rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E8501E] uppercase tracking-widest">
                <Users className="w-4 h-4" />
                <span>Verified Client Experiences</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
                Voices of <span className="text-[#00E5FF]">Trust & Prestige</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                From prestigious private residences and architectural developers to our network of 1,200+ retail partners, hear how Ankur Paints transforms spaces with royal durability.
              </p>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 pt-4">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-slate-900 border border-slate-700 hover:bg-[#004B87] text-white transition-all"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-slate-900 border border-slate-700 hover:bg-[#004B87] text-white transition-all"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-500 pl-3">
                  0{activeReview + 1} / 0{reviews.length}
                </span>
              </div>
            </div>

            {/* Right Column: Active Testimonial Card */}
            <div className="lg:col-span-7 bg-[#0F172A] rounded-2xl p-6 sm:p-8 border border-slate-700/80 space-y-6 text-left">
              <Quote className="w-10 h-10 text-[#004B87]/50" />
              
              <p className="text-base sm:text-lg text-slate-200 font-normal italic leading-relaxed">
                "{current.quote}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-white">{current.name}</h4>
                  <p className="text-xs text-[#00B2E3] font-medium">{current.role} • {current.city}</p>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
