"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, User, ShoppingBag, Menu, X, ShieldCheck } from "lucide-react";

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
    { name: "Products", href: "#products" },
    { name: "Colour Explorer", href: "#explorer" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative h-10 w-40 sm:h-11 sm:w-44 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/branding/ankur_logo_transparent.png"
              alt="Ankur Paints & Inks"
              fill
              className="object-contain object-left"
              priority
            />
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
                className={`relative text-sm font-medium tracking-wide transition-colors py-2 ${
                  isActive
                    ? "text-[#E8501E] font-semibold"
                    : "text-slate-300 hover:text-white"
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

        {/* Right Action Icons & Retailer Portal */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            title="Search products and shades"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* User / Retailer Auth Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-slate-700/50"
            title="Retailer Sign In / KYC"
            aria-label="Account Login"
          >
            <User className="w-5 h-5 stroke-[1.8] text-slate-300" />
            <span className="hidden lg:inline text-xs font-medium text-slate-300">
              Retailer Login
            </span>
          </button>

          {/* Cart Icon with Badge */}
          <a
            href="#products"
            className="relative p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            title="Shopping Cart"
            aria-label="Cart"
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
              className={`block text-base py-2 transition-colors ${
                activeTab === link.name
                  ? "text-[#E8501E] font-semibold"
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
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#E8501E] hover:bg-[#D04212] text-white font-medium rounded-xl shadow-lg transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              Store Retailer Login / KYC
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
