"use client";

import React from "react";
import { X, ShieldCheck, Play } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0F172A] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
          aria-label="Close Video"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center text-center p-6">
          {/* Simulated High-Res Video Showcase Canvas */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#004B87] via-[#050B14] to-black" />

          <div className="relative z-10 space-y-4 max-w-md">
            <div className="w-16 h-16 rounded-full bg-[#E8501E] text-white flex items-center justify-center mx-auto shadow-glow cursor-pointer hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-serif text-white">
                Ankur Paints German Polymer Technology
              </h3>
              <p className="text-xs text-slate-400">
                Witness real-time exterior waterproofing, rain test resistance, and 10-year UV fade simulation.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified German Cross-linking Formulation</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
