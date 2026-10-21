"use client";

import React, { useState } from "react";
import { ColourNavbar } from "@/components/ColourNavbar";
import { ColourHero } from "@/components/ColourHero";
import { CansLineupStrip } from "@/components/CansLineupStrip";
import { WhyAnkurSection } from "@/components/WhyAnkurSection";
import { PaintRangeSection } from "@/components/PaintRangeSection";
import { ApprovedSpacesShowcase } from "@/components/ApprovedSpacesShowcase";
import { ColourfulSplashBanner } from "@/components/ColourfulSplashBanner";
import { ColourFooter } from "@/components/ColourFooter";
import { GoogleAuthModal } from "@/components/GoogleAuthModal";

export default function Home() {
  const [googleAuthOpen, setGoogleAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  return (
    <main className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-[#E8501E] selection:text-white">
      {/* 1. Header with Vector SVG Ankur Logo & Google Login */}
      <ColourNavbar
        onOpenGoogleAuth={() => setGoogleAuthOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* 2. Master Hero: Official Ankur Paints Master Lineup Banner */}
      <ColourHero />

      {/* 3. 4 Trust & Quality Pillars Strip */}
      <CansLineupStrip />

      {/* 4. "Why Ankur Paints? More Than Just Paint — It's a Feeling" + 4 Badges */}
      <WhyAnkurSection />

      {/* 5. "Explore Our Paint Range" with 4 Category Visual Cards */}
      <PaintRangeSection />

      {/* 6. Approved Spaces Showcase: Penthouse Interior & Contemporary Villa */}
      <ApprovedSpacesShowcase />

      {/* 7. Full-Color Rainbow Splash Wave Banner: "LET'S COLOUR YOUR WORLD" */}
      <ColourfulSplashBanner onOpenGoogleAuth={() => setGoogleAuthOpen(true)} />

      {/* 8. Dark Luxury Footer */}
      <ColourFooter />

      {/* 9. Interactive Google OAuth Account Chooser Modal with Confetti */}
      <GoogleAuthModal
        isOpen={googleAuthOpen}
        onClose={() => setGoogleAuthOpen(false)}
        onSuccess={(user) => setCurrentUser(user)}
      />
    </main>
  );
}
