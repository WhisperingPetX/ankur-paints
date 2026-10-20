"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Happy Customer",
      location: "Jaipur, Rajasthan",
      quote:
        "Ankur Paints gave my home a beautiful new look. The colours are vibrant and the quality is outstanding. Highly recommended!",
      stars: 5,
    },
    {
      name: "Rajesh Aggarwal",
      role: "Authorized Retail Partner",
      location: "New Delhi",
      quote:
        "The coverage of Epic Coat and Rang Ritu is extraordinary. Customers always return asking specifically for Ankur Paints. The Diwali schemes and instant QR billing are a game changer!",
      stars: 5,
    },
    {
      name: "Vikram Malhotra",
      role: "Architectural Contractor",
      location: "Chandigarh",
      quote:
        "10-Year Damp Proof protection solved groundwater seepage issues permanently on our residential projects. True German polymer quality.",
      stars: 5,
    },
  ];

  const current = testimonials[activeTestimonial];

  const handlePrev = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F1F5F9] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Modern Villa Image & Company Pillars */}
          <div className="lg:col-span-7 space-y-8">
            {/* Modern Villa Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="/branding/modern_villa.png"
                alt="Modern Architectural Villa Painted with Ankur Paints"
                fill
                className="object-cover"
              />
            </div>

            {/* Typography Content */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#004B87]">
                WHY CHOOSE ANKUR PAINTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif text-[#0F172A]">
                More Than Just <span className="text-[#E8501E]">Paint</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                We don't just add colour to your walls, we add value to your life. With cutting-edge German crosslinking technology and unmatched durability, Ankur Paints is your trusted partner in creating beautiful, lasting spaces.
              </p>
            </div>

            {/* 4-Stat Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#E8501E]">10+</div>
                <div className="text-xs text-slate-500 font-medium">Product Ranges</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#E8501E]">5M+</div>
                <div className="text-xs text-slate-500 font-medium">Happy Homes</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#E8501E]">25+</div>
                <div className="text-xs text-slate-500 font-medium">Years of Trust</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#E8501E]">100%</div>
                <div className="text-xs text-slate-500 font-medium">Quality Assured</div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Testimonial Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 flex flex-col justify-between space-y-6">
              
              {/* Decorative Quote Icon */}
              <div className="text-[#004B87]/20">
                <Quote className="w-12 h-12 stroke-[1.5]" />
              </div>

              {/* Quote Body */}
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal italic">
                "{current.quote}"
              </p>

              {/* Author & Rating */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#004B87] to-[#E8501E] text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{current.name}</h4>
                    <p className="text-xs text-slate-500">{current.role} • {current.location}</p>
                    <div className="flex items-center gap-0.5 text-amber-400 mt-1">
                      {[...Array(current.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Next/Prev Navigation Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
