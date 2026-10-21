"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ShoppingBag, Menu, X, ShieldCheck, ChevronDown, Sparkles, MapPin, Calculator, PhoneCall } from "lucide-react";
import { AnkurLogo } from "./AnkurLogo";

interface IndigoNavbarProps {
  onOpenAuth: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
}

export const IndigoNavbar: React.FC<IndigoNavbarProps> = ({
  onOpenAuth,
  onOpenCart,
  cartCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const productCategories = [
    {
      title: "Exterior Emulsions",
      desc: "Weather-proof defense against rain & heat",
      href: "#products",
      tag: "Epic Coat & Gleam Coat",
      badge: "Up to 10-Yr Guarantee",
    },
    {
      title: "Interior Emulsions",
      desc: "Luxury sheen & high scrub-washable walls",
      href: "#products",
      tag: "Rang Ritu & Rose Gold",
      badge: "Stain Resistant",
    },
    {
      title: "Waterproofing Solutions",
      desc: "Elastomeric crack-bridging membranes",
      href: "#products",
      tag: "Damp Proof 10-Year",
      badge: "Zero Seepage",
    },
    {
      title: "Primers & Putty",
      desc: "Ultra-smooth foundation for emulsions",
      href: "#products",
      tag: "Acrylic Primer & Smooth Putty",
      badge: "High Adhesion",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/90 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo - 100% Vector SVG Precision */}
          <a href="#hero" className="flex items-center gap-3 shrink-0">
            <div className="py-1">
              {/* Responsive SVG Logo on white background */}
              <AnkurLogo className="h-10 sm:h-12 w-auto" />
            </div>
          </a>

          {/* Desktop Navigation Links (Indigo Paints Style) */}
          <nav className="hidden lg:flex items-center gap-7">
            
            {/* Products Mega-Menu Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                onMouseEnter={() => setProductsDropdownOpen(true)}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-[#004B87] py-2 transition-colors"
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? "rotate-180 text-[#004B87]" : ""}`} />
              </button>

              {/* Dropdown Menu Popup */}
              {productsDropdownOpen && (
                <div
                  onMouseLeave={() => setProductsDropdownOpen(false)}
                  className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100 mb-1">
                    Ankur Paints Master Collections
                  </div>
                  {productCategories.map((cat, idx) => (
                    <a
                      key={idx}
                      href={cat.href}
                      onClick={() => setProductsDropdownOpen(false)}
                      className="group block p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#004B87]">
                          {cat.title}
                        </span>
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#004B87]/10 group-hover:text-[#004B87]">
                          {cat.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{cat.desc}</p>
                      <span className="text-[10px] font-medium text-[#E8501E] mt-0.5 block">
                        Featured: {cat.tag}
                      </span>
                    </a>
                  ))}
                  <div className="pt-2 mt-1 border-t border-slate-100 px-3 py-1">
                    <a
                      href="#products"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="text-xs font-bold text-[#004B87] hover:text-[#E8501E] flex items-center justify-between"
                    >
                      <span>View All 9 Collections</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#visualizer"
              className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-[#004B87] transition-colors"
            >
              Colour Visualizer
            </a>

            <a
              href="#calculator"
              className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-[#004B87] transition-colors"
            >
              Paint Calculator
            </a>

            <a
              href="#innovations"
              className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-[#004B87] transition-colors"
            >
              Innovations
            </a>

            <a
              href="#dealer-locator"
              className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-[#004B87] transition-colors"
            >
              Find a Dealer
            </a>

            <a
              href="#retailer-hub"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-orange-50 text-[#E8501E] border border-orange-200 hover:bg-[#E8501E] hover:text-white transition-all shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-[#FFD100]" />
              <span>Diwali Hub</span>
            </a>
          </nav>

          {/* Right Action Icons & Retailer Access */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-600 hover:text-[#004B87] hover:bg-slate-100 rounded-full transition-colors"
              title="Search Paints, Shades & Products"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Retailer B2B Sign In / KYC Trigger */}
            <button
              onClick={onOpenAuth}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#004B87] bg-blue-50 hover:bg-[#004B87] hover:text-white border border-blue-200 shadow-sm transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Dealer KYC</span>
            </button>

            {/* Cart Icon with Live Reactive Counter */}
            <a
              href="#products"
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-700 hover:text-[#004B87] hover:bg-slate-100 rounded-full transition-colors"
              title="View Paint Order"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-extrabold text-white bg-[#E8501E] rounded-full ring-2 ring-white shadow-sm">
                {cartCount}
              </span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#004B87] hover:bg-slate-100 rounded-xl"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-xl">
            <div className="space-y-1">
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Paints & Master Collections (9)
              </a>
              <a
                href="#visualizer"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Colour Visualizer (3D Room)
              </a>
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Paint Calculator (Sq.Ft Estimator)
              </a>
              <a
                href="#innovations"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Innovations (German Polymers)
              </a>
              <a
                href="#dealer-locator"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Find a Dealer
              </a>
              <a
                href="#retailer-hub"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-[#E8501E] bg-orange-50 rounded-lg"
              >
                ⚡ Retailer Diwali Dhamaka & POS
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#004B87] hover:bg-[#003B6B] flex items-center justify-center gap-2 shadow-md"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Retailer Sign-In & KYC Onboarding</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
                <PhoneCall className="w-3.5 h-3.5 text-[#004B87]" />
                <span>Customer Care: 1800-266-1999</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5 text-slate-700">
                <Search className="w-5 h-5 text-[#004B87]" />
                <span className="font-bold text-sm">Search Ankur Paints Products & Shades</span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Epic Coat, Rang Ritu, Waterproofing, Indigo Blue..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#004B87] focus:ring-2 focus:ring-[#004B87]/20 outline-none text-sm text-slate-800"
              autoFocus
            />

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Popular Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Epic Coat Luxury Emulsion",
                  "Rang Ritu Washable",
                  "Damp Proof 10-Yr",
                  "Wall Putty 40KG",
                  "Peacock Royal Indigo",
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href="#products"
                    onClick={() => setSearchOpen(false)}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-[#004B87] hover:text-white text-slate-700 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
