"use client";

import React, { useState } from "react";
import { Search, User, ShoppingBag, Menu, X, ShieldCheck } from "lucide-react";
import { AnkurLogo } from "./AnkurLogo";

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenSearch?: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenSearch,
  cartCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Collections", href: "#collections" },
    { name: "Room Visualizer", href: "#visualizer" },
    { name: "German Tech", href: "#technology" },
    { name: "Retailer Portal", href: "#retailer-portal" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - 100% Vector SVG Precision */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="transition-transform duration-300 group-hover:scale-105">
            <AnkurLogo className="h-10 sm:h-12 w-auto" />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`relative text-xs uppercase tracking-widest font-semibold transition-colors py-2 ${
                  isActive
                    ? "text-[#E8501E]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E8501E] rounded-full shadow-[0_0_8px_#E8501E]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Icons & Retailer Portal */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* User / Retailer Auth Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 shadow-sm transition-all"
            title="Retailer Sign In / KYC"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Retailer KYC</span>
          </button>

          {/* Cart Icon with Live Counter */}
          <a
            href="#collections"
            className="relative p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            title="Active Order Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#E8501E] rounded-full ring-2 ring-[#050B14]">
              {cartCount}
            </span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-6 py-5 space-y-4 animate-in slide-in-from-top-3 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                setActiveTab(link.name);
                setMobileMenuOpen(false);
              }}
              className={`block text-sm uppercase tracking-wider py-2 font-semibold transition-colors ${
                activeTab === link.name
                  ? "text-[#E8501E]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800/80">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#E8501E] hover:bg-[#D04212] text-white font-semibold rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider"
            >
              <ShieldCheck className="w-4 h-4" />
              Retailer Login & KYC Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
