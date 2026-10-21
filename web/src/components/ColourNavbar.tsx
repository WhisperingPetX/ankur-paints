"use client";

import React, { useState } from "react";
import { AnkurLogo } from "./AnkurLogo";
import { Search, LogOut, Menu, X, Sparkles } from "lucide-react";

interface ColourNavbarProps {
  onOpenGoogleAuth: () => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
}

export const ColourNavbar: React.FC<ColourNavbarProps> = ({
  onOpenGoogleAuth,
  currentUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Products", href: "#products" },
    { name: "Our Colors", href: "#colors" },
    { name: "About Us", href: "#why-us" },
    { name: "Living Spaces", href: "#spaces" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo - 100% Vector SVG Precision */}
        <a href="#hero" className="flex items-center gap-2 shrink-0">
          <AnkurLogo className="h-10 sm:h-12 w-auto" />
        </a>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`relative text-xs uppercase tracking-wider font-bold transition-colors py-2 ${
                  isActive
                    ? "text-[#E8501E]"
                    : "text-slate-700 hover:text-[#004B87]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E8501E] rounded-full shadow-[0_0_8px_#E8501E]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Search + Login + Sign in with Google */}
        <div className="flex items-center gap-3">
          
          {/* Search Button */}
          <button
            className="p-2 text-slate-600 hover:text-[#004B87] hover:bg-slate-100 rounded-full transition-colors"
            title="Search Products & Shades"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User Logged In State or Login Buttons */}
          {currentUser ? (
            <div className="flex items-center gap-3 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
              <div className="w-6 h-6 rounded-full bg-[#E8501E] text-white flex items-center justify-center text-xs font-bold">
                {currentUser.name[0]}
              </div>
              <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                {currentUser.name.split(" ")[0]}
              </span>
              <button
                onClick={onLogout}
                className="text-slate-400 hover:text-slate-700"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Dark Login Pill Button */}
              <button
                onClick={onOpenGoogleAuth}
                className="px-5 py-2 rounded-full bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all"
              >
                Login
              </button>

              {/* White Google Sign In Button */}
              <button
                onClick={onOpenGoogleAuth}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm text-xs font-bold transition-all transform hover:scale-102"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                <span className="hidden sm:inline">Sign in with Google</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                setActiveTab(link.name);
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGoogleAuth();
              }}
              className="w-full py-2.5 rounded-xl bg-[#0B132B] text-white text-xs font-bold"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
