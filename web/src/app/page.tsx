"use client";

import React, { useState } from "react";
import { TopHeaderStrip } from "@/components/TopHeaderStrip";
import { IndigoNavbar } from "@/components/IndigoNavbar";
import { IndigoHeroCarousel } from "@/components/IndigoHeroCarousel";
import { CategoryBar } from "@/components/CategoryBar";
import { IndigoVisualizer } from "@/components/IndigoVisualizer";
import { PaintCalculator } from "@/components/PaintCalculator";
import { IndigoProductCatalog } from "@/components/IndigoProductCatalog";
import { InnovationsSection } from "@/components/InnovationsSection";
import { DealerTerminal } from "@/components/DealerTerminal";
import { DealerLocator } from "@/components/DealerLocator";
import { InspirationBlog } from "@/components/InspirationBlog";
import { IndigoFooter } from "@/components/IndigoFooter";
import { StoreAuthModal } from "@/components/StoreAuthModal";
import { CartDrawer, CartItem } from "@/components/CartDrawer";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "epic-20l",
      name: "Epic Coat Luxury Exterior Emulsion",
      size: "20L",
      price: 4200,
      qty: 1,
    },
  ]);

  const handleAddToCart = (productName?: string, size?: string, price?: number) => {
    const name = productName || "Epic Coat Luxury Exterior Emulsion";
    const packSize = size || "20L";
    const itemPrice = price || 4200;
    const itemId = `${name}-${packSize}`.toLowerCase().replace(/\s+/g, "-");

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: itemId, name, size: packSize, price: itemPrice, qty: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setCartOpen(false);
    // Smooth scroll to dealer locator so user can connect with a store
    const dealerSection = document.getElementById("dealer-locator");
    if (dealerSection) {
      dealerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.qty, 0);

  return (
    <main className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-[#004B87] selection:text-white">
      {/* 1. Top Announcement & Utility Strip (Helpline, Dealer Locator, Calculator) */}
      <TopHeaderStrip onOpenAuth={() => setAuthModalOpen(true)} />

      {/* 2. Main White Sticky Header & Mega-Menu Navigation */}
      <IndigoNavbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        cartCount={totalCartCount}
      />

      {/* 3. Indigo Paints-Style High-Impact Hero Carousel (3 Animated Slides) */}
      <IndigoHeroCarousel />

      {/* 4. Category Strip (Exterior, Interior, Waterproofing, Primers, Putty) */}
      <CategoryBar />

      {/* 5. Interactive 3D Colour Visualizer (Live Room Wall Morphing) */}
      <IndigoVisualizer onAddToCart={() => handleAddToCart("Epic Coat Luxury Exterior Emulsion", "20L", 4200)} />

      {/* 6. Smart Paint Calculator (Square Feet & Litres Estimator) */}
      <PaintCalculator onAddToCart={() => handleAddToCart("Rang Ritu Washable Luxury Emulsion", "20L", 3850)} />

      {/* 7. The 9 Official Master Collections (Pack Size Toggle & Printed MRP) */}
      <IndigoProductCatalog onAddToCart={(name, size, price) => handleAddToCart(name, size, price)} />

      {/* 8. Innovations in Paints (German Polymer Science & 2.2mm Crack Bridging) */}
      <InnovationsSection />

      {/* 9. Retailer B2B POS & Diwali Dhamaka Hub (QR Scanner, Selling Price <= MRP, Confetti) */}
      <DealerTerminal />

      {/* 10. Find an Authorized Dealer / Store Locator (City & Pincode Search) */}
      <DealerLocator />

      {/* 11. Inspiration & Painting Advice Blog Feed */}
      <InspirationBlog />

      {/* 12. Corporate Navy Blue Footer with Newsletter & Support */}
      <IndigoFooter />

      {/* Retailer Google One-Tap & Store KYC Modal */}
      <StoreAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Interactive Cart Order Slide-Over Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </main>
  );
}
