# Ankur Paints — Project Handover Document

**Document Version:** 8.1.0  
**Created:** 2026-10-20  
**Last Updated:** 2026-10-21  
**Phases Completed:** Phase 1 (Requirements), Phase 2 (Architecture), Phase 3 (Git & Scaffolding), Phase 4 (UI/UX Design System), Phase 5 (Database Schema & Seed Data), Phase 6 (Authentication & Security), Phase 7 (Product & QR-Code System), Strategic Pivot (`DEC-021`)  
**Current Phase:** International-Grade Web Platform & Capacitor Play Store Export  
**Target Audience:** Future AI assistants (ChatGPT / Antigravity), incoming software engineers, and stakeholders.

---

## 1. Project Purpose & Summary
Ankur Paints is building a production-grade digital operations platform consisting of:
1. An **International-Grade Responsive Web Application** (`web/`) built with Next.js 15, Tailwind CSS, Framer Motion, and GSAP, providing high-converting marketing, interactive color visualizer, and retailer operations.
2. An **Android Mobile Package** compiled directly from the web application via CapacitorJS / Google Trusted Web Activities (TWA) for Google Play Store distribution (`.apk` / `.aab`).
3. A **Central Cloud Backend & Database** on Supabase PostgreSQL (12 tables live on cloud, RLS security, immutable audit ledgers, and atomic stored procedures).

---

## 2. Document Provenance & Verified Current State
- **Architecture Status:** Single unified responsive web platform with Capacitor Play Store export (`DEC-021`).
- **Workspace Location:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`
- **GitHub Repository:** `https://github.com/WhisperingPetX/ankur-paints.git` (Tracked & Synced on `main`)
- **Live Cloud Database:** Supabase project `wpiztkjuojirzsxvzqfv.supabase.co` is online with all 12 tables and official product seed data verified active.
- **Branding Assets:** Preserved in `web/public/branding/` including high-resolution master hero packaging, clean vector logo, 9-bucket lineup, and individual product packaging.

---

## 3. Master Documentation Manifest (The 3 Single Source of Truth Files)

The documentation has been consolidated into **3 lean, authoritative files**:

| Document Name | File Path | Exact Purpose & Responsibilities |
| :--- | :--- | :--- |
| **1. `PROJECT_REQUIREMENTS.md`** | `docs/PROJECT_REQUIREMENTS.md` | **Rules & SOP:** Core business logic, Ankur Paints SOP reconciliation, SKU composite key, static QR per SKU, database-guarded price ceiling ($\text{Selling Price} \le \text{MRP}$), zero negative stock guarantee, and launch cutover rules. |
| **2. `TECHNICAL_ARCHITECTURE.md`** | `docs/TECHNICAL_ARCHITECTURE.md` | **Tech & Database:** System architecture, live Supabase cloud database ERD (12 tables), atomic SQL procedures (`submit_retailer_sale`), RLS security matrix, technology matrix (Next.js 15, Tailwind, Framer Motion, CapacitorJS), and brand color tokens. |
| **3. `PROJECT_HANDOVER.md`** | `docs/PROJECT_HANDOVER.md` | **Master Status & Handover:** Project summary, verified current status, links to live database/repos, and step-by-step guidance for future AI sessions or engineers. |

---

## 4. Current Phase and Exact Next Action
- **Current Phase:** Indigo Paints-Style Architecture Redesign Live on `http://localhost:3000`.
- **Verified State:**
  - Complete frontend transformation adopting **Indigo Paints** (`indigopaints.com`) clean, high-impact aesthetic, section layout, tools, and visual hierarchy while preserving the Ankur Paints branding, live Supabase backend, and 3 core docs:
    1. **Top Header Strip (`TopHeaderStrip.tsx`):** Toll-free customer care (`1800-266-1999`), quick links for Dealer Locator, Paint Calculator, Digital Shade Card, and Retailer B2B Zone.
    2. **Main Navigation (`IndigoNavbar.tsx`):** Crisp white sticky navigation with pure vector SVG brand logo, interactive Products dropdown mega-menu, live search modal, dealer KYC trigger, and reactive cart icon badge.
    3. **High-Impact Hero Carousel (`IndigoHeroCarousel.tsx`):** 3 dynamic animated slides for Exterior (Epic Coat 10-Yr Weather Defense), Interior (Rang Ritu Silky Washable), and Waterproofing (Damp Proof 10-Yr Seepage Proof) with authentic 3D packaging cutouts and dual CTAs.
    4. **Category Strip (`CategoryBar.tsx`):** 5-card quick navigation across Exterior, Interior, Waterproofing, Primers & Undercoats, and Putties & Distempers.
    5. **Interactive 3D Colour Visualizer (`IndigoVisualizer.tsx`):** Multi-room preview (Living Room, Master Bedroom, Exterior Villa) with real-time dynamic wall shade morphing, curated 2-tone architectural combinations, matching Ankur buckets, and instant cart order action.
    6. **Smart Paint Calculator (`PaintCalculator.tsx`):** Interactive sq.ft & BHK configuration estimator calculating exact litres of Primer, Emulsion, and Putty needed + approximate budget.
    7. **The 9 Official Master Collections (`IndigoProductCatalog.tsx`):** Clean white cards with category filter tabs, interactive pack size toggles (`1L`, `4L`, `10L`, `20L` / `KG`), coverage indices, and authoritative printed MRP calculation.
    8. **Innovations in Paints (`InnovationsSection.tsx`):** 4 science pillars showcasing German acrylic crosslinking polymers (2.2mm crack bridging), solar heat reflectance (5°C cooling), ultra-low VOC (<15g/L), and silicone water beading.
    9. **Retailer POS & Diwali Dhamaka Terminal (`DealerTerminal.tsx`):** Gamified B2B operations simulator with barcode QR scanner (`ANKUR_EPIC_101_20L`), strict database guard ($\text{Selling Price} \le \text{MRP}$), milestone progress meter, and Green Tick invoice receipt with confetti.
    10. **Dealer Locator (`DealerLocator.tsx`):** Search by city (Delhi NCR, Jaipur, Lucknow, Chandigarh, Mumbai, Indore) or pincode with store details, addresses, and direction links.
    11. **Inspiration & Painting Advice Feed (`InspirationBlog.tsx`):** 3 editorial decor articles on exterior combinations, monsoon waterproofing, and sheen guides.
    12. **Corporate Navy Footer (`IndigoFooter.tsx`):** Multi-column footer with newsletter subscription, corporate address, customer support, and quick links.
    13. **Order Cart Drawer (`CartDrawer.tsx`):** Slide-over drawer with item quantity adjustment, price calculation, and dealer estimate forwarding.
    14. **Retailer Store KYC Modal (`StoreAuthModal.tsx`):** Google One-Tap authentication and GSTIN onboarding.
  - Production build (`next build`) passed with zero errors (`Compiled successfully in 10.7s`).
  - Next.js 15 production server running in daemon mode on `http://localhost:3000` (HTTP 200 verified).
  - All changes staged, committed, and pushed to GitHub repository `origin/main`.
- **Exact Next Action:**
  > **Review with user, gather feedback on visual aesthetics and user flows, and proceed to Supabase live data hooks and Capacitor Android build.**

---

## 5. INSTRUCTIONS FOR THE NEXT CHATGPT

When a user begins a new conversation with you to continue this project:

1. **Read the handover and status documentation provided by the user:** Immediately review `docs/PROJECT_HANDOVER.md`, `docs/PROJECT_REQUIREMENTS.md`, and `docs/TECHNICAL_ARCHITECTURE.md` before taking any action.
2. **Inspect the actual available project files before assuming anything:** Check the physical directory (`C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`) and verify Git status. Never rely purely on conversation memory or assume files exist without checking.
3. **Continue from the latest verified state rather than restarting completed work:** Phases 1 through 7 are fully completed. The cloud database is live with 12 tables and 9 official products.
4. **Make one small, verifiable step at a time:** Do not jump ahead across multiple phases. Produce complete, working code, test thoroughly, update the handover document, and wait for verification.
