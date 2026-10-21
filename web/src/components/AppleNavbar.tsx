"use client";

import React from "react";
import { AnkurLogo } from "./AnkurLogo";
import { ShieldCheck, User, LogOut } from "lucide-react";

interface AppleNavbarProps {
  onOpenGoogleAuth: () => void;
  currentUser: { name: string; email: string; avatar: string } | null;
  onLogout: () => void;
}

export const AppleNavbar: React.FC<AppleNavbarProps> = ({
  onOpenGoogleAuth,
  currentUser,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/75 border-b border-white/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo - 100% Vector Precision */}
        <a href="#hero" className="flex items-center gap-2 group">
          <AnkurLogo className="h-9 sm:h-10 w-auto transition-transform group-hover:scale-105" />
        </a>

        {/* Minimal Apple-Style Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-slate-300 tracking-tight">
          <a href="#hero" className="hover:text-white transition-colors">
            Overview
          </a>
          <a href="#specifications" className="hover:text-white transition-colors">
            Specifications
          </a>
          <a href="#spaces" className="hover:text-white transition-colors">
            Living Spaces
          </a>
          <a href="#shades" className="hover:text-white transition-colors">
            Shades
          </a>
          <a href="#dealers" className="hover:text-white transition-colors">
            Retailer Portal
          </a>
        </nav>

        {/* Right Action: Sign In With Google */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full backdrop-blur-md">
              <div className="w-6 h-6 rounded-full bg-[#E8501E] text-white flex items-center justify-center text-xs font-bold">
                {currentUser.name[0]}
              </div>
              <span className="text-xs font-medium text-white hidden sm:inline">
                {currentUser.name.split(" ")[0]}
              </span>
              <button
                onClick={onLogout}
                className="text-slate-400 hover:text-white text-xs"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenGoogleAuth}
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 text-xs font-semibold shadow-[0_4px_14px_rgba(255,255,255,0.2)] transition-all transform hover:scale-105 active:scale-95"
            >
              {/* Official Google 'G' Multi-Color SVG */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
          )}
        </div>

      </div>
    </header>
  );
};
