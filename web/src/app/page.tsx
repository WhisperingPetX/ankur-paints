"use client";

import React, { useState } from "react";
import { AppleNavbar } from "@/components/AppleNavbar";
import { HeroRoyale } from "@/components/HeroRoyale";
import { KeynoteMetrics } from "@/components/KeynoteMetrics";
import { ArchitecturalShowcase } from "@/components/ArchitecturalShowcase";
import { MinimalShadeStudio } from "@/components/MinimalShadeStudio";
import { RetailerHubMinimal } from "@/components/RetailerHubMinimal";
import { AppleFooter } from "@/components/AppleFooter";
import { GoogleAuthModal } from "@/components/GoogleAuthModal";

export default function Home() {
  const [googleAuthOpen, setGoogleAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col selection:bg-[#E8501E] selection:text-white">
      {/* 1. Minimal Apple-Style Glass Navbar with Vector SVG Logo & Google Login */}
      <AppleNavbar
        onOpenGoogleAuth={() => setGoogleAuthOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* 2. Hero Stage — The Royale Masterpiece (Bespoke 3D Paint Bucket Packshot) */}
      <HeroRoyale
        onOpenGoogleAuth={() => setGoogleAuthOpen(true)}
        currentUser={currentUser}
      />

      {/* 3. Apple Keynote Technical Specs Strip (10-Yr, 2.2mm, 5°C, Zero VOC) */}
      <KeynoteMetrics />

      {/* 4. Architectural Living Spaces Showcase (Penthouse Interior & Villa Facade) */}
      <ArchitecturalShowcase />

      {/* 5. Minimal Interactive Shade Studio (Signature Pigments & Pairings) */}
      <MinimalShadeStudio />

      {/* 6. B2B Retailer Hub (Barcode QR Simulator, Price Guard, Diwali Dhamaka Meter) */}
      <RetailerHubMinimal />

      {/* 7. Minimalist Apple Dark Footer */}
      <AppleFooter
        onOpenGoogleAuth={() => setGoogleAuthOpen(true)}
      />

      {/* Google OAuth One-Tap Simulation Modal */}
      <GoogleAuthModal
        isOpen={googleAuthOpen}
        onClose={() => setGoogleAuthOpen(false)}
        onSuccess={(user) => setCurrentUser(user)}
      />
    </main>
  );
}
