"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustBadges } from "@/components/TrustBadges";
import { ProductCollections } from "@/components/ProductCollections";
import { ColourExplorer } from "@/components/ColourExplorer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { StoreAuthModal } from "@/components/StoreAuthModal";
import { VideoModal } from "@/components/VideoModal";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleExploreClick = () => {
    const productsElement = document.getElementById("products");
    if (productsElement) {
      productsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectProduct = (productName: string) => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col">
      {/* 1. Sticky Glass Navbar */}
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        cartCount={cartCount}
      />

      {/* 2. Hero Section */}
      <HeroSection
        onExploreClick={handleExploreClick}
        onWatchVideoClick={() => setVideoModalOpen(true)}
      />

      {/* 3. 5-Pillar Trust & Feature Badges */}
      <TrustBadges />

      {/* 4. Our Products - Premium Paint Collections */}
      <ProductCollections onSelectProduct={handleSelectProduct} />

      {/* 5. Colour Explorer - Find Your Perfect Shade */}
      <ColourExplorer />

      {/* 6. Why Choose Ankur Paints & Testimonial */}
      <WhyChooseUs />

      {/* 7. Call To Action Banner */}
      <CallToAction onShopClick={handleExploreClick} />

      {/* 8. Footer */}
      <Footer />

      {/* Interactive Modals */}
      <StoreAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </main>
  );
}
