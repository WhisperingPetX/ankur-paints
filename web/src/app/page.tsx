"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { GermanTechnology } from "@/components/GermanTechnology";
import { RoomVisualizer } from "@/components/RoomVisualizer";
import { MasterCatalog } from "@/components/MasterCatalog";
import { RetailerPOSDemo } from "@/components/RetailerPOSDemo";
import { PrestigeHeritage } from "@/components/PrestigeHeritage";
import { Footer } from "@/components/Footer";
import { StoreAuthModal } from "@/components/StoreAuthModal";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleExploreClick = () => {
    const productsElement = document.getElementById("collections") || document.getElementById("products");
    if (productsElement) {
      productsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-[#E8501E] selection:text-white">
      {/* 1. Sticky Glass Navbar with Vector SVG Logo & Live Cart */}
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        cartCount={cartCount}
      />

      {/* 2. 4K Virtual Exhibition Hero Stage & Ambient Lighting Moods */}
      <HeroSection
        onExploreClick={handleExploreClick}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* 3. German Crosslinking Polymer Science & Engineering Pillars */}
      <GermanTechnology />

      {/* 4. Interactive 3D Architectural Room Shade Visualizer */}
      <RoomVisualizer onAddToCart={handleAddToCart} />

      {/* 5. The 9 Official Master Collections (1L, 4L, 10L, 20L MRP Calculator) */}
      <MasterCatalog onAddToCart={handleAddToCart} />

      {/* 6. Interactive B2B Retailer POS & Diwali Dhamaka Terminal */}
      <RetailerPOSDemo />

      {/* 7. Prestige Heritage Counters & Verified Client Testimonials */}
      <PrestigeHeritage />

      {/* 8. Dark Luxury Footer */}
      <Footer />

      {/* 9. Interactive Retailer Google One-Tap & Store KYC Modal */}
      <StoreAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </main>
  );
}
