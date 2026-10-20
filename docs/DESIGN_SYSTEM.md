# Ankur Paints — UI/UX Design System Specification

**Document Version:** 1.1.0  
**Phase:** Phase 4 — UI/UX Design System & Mobile Tokens  
**Date:** 2026-10-20  
**Status:** Calibrated with Official Ankur Paints & Inks Brand Identity  
**Benchmark:** Flipkart / Myntra / Amazon India Tier-1 Consumer E-Commerce Polish

---

## 1. Official Brand Identity & Color Calibration

The visual identity is directly calibrated from the official **Ankur Paints and Inks Private Limited** corporate identity and physical packaging lineup:

### 1.1 Primary Brand Colors
- **Ankur Cobalt Blue (`#004B87`):** The primary brand authority color extracted from the *"Ankur"* wordmark and stylized paint drop "A". Used for top navigation bars, primary headings, and high-trust badges.
- **Paints Vermillion Orange (`#E8501E`):** The signature vibrant energetic accent extracted from the *"Paints"* wordmark. Used for primary call-to-actions, scanner buttons, cart badges, and checkout flows.
- **Paintbrush Spectrum Arc:** The multi-colored spectrum arc above the wordmark provides accent highlights across the app:
  - Cyan: `#00B2E3`
  - Green: `#00A859`
  - Yellow: `#FFD100`
  - Orange: `#F37021`
  - Red: `#ED1C24`

### 1.2 Verified Product Line Themes (From Official Lineup)
The app dynamically themes product cards and category pills according to the real bucket packaging:

| Product Line | Category | Packaging Theme | Warranty |
| :--- | :--- | :--- | :---: |
| **Epic Coat** | Exterior Emulsion (Flagship) | Royal Indigo (`#312E81`) | 5 Years |
| **Rang Ritu** | Interior Emulsion | Vibrant Magenta (`#BE185D`) | 7 Years |
| **Gleam Coat** | Exterior Emulsion | Sea Teal (`#0F766E`) | 3 Years |
| **Rose Gold** | Exterior Emulsion | Crimson Rust (`#991B1B`) | 2 Years |
| **Colour Crest** | Exterior Emulsion | Warm Amber (`#9A3412`) | 2 Years |
| **Damp Proof** | Interior & Exterior Waterproofing | Ochre Gold (`#854D0E`) | 10 Years |
| **Acrylic Distemper** | Washable Distemper | Fresh Leaf Green (`#166534`) | — |
| **Premium Wall Primer**| Undercoat / Primer | Emerald Mint (`#065F46`) | — |
| **Acrylic Wall Putty** | Surface Preparation / Putty | Golden Amber (`#A16207`) | — |

---

## 2. International-Grade Luxury Responsive Web & Retailer Portal Layout Architecture

The platform interface delivers an **Apple-meets-Flipkart luxury aesthetic**: high-trust corporate prestige for public visitors, and frictionless high-speed operations for authorized retailers across desktop, tablet, and mobile screens:

```
┌────────────────────────────────────────────────────────────────────────┐
│  🎨 ANKUR PAINTS   [Products] [Visualizer] [About] [Store Portal] (Login)│  <- Floating Glass Navbar
├────────────────────────────────────────────────────────────────────────┤
│  🌟 HERO LUXURY STAGE (Ambient CSS Mesh Aurora Glow)                   │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────┐  │
│  │ "Transform Spaces with          │  │ [3D Glossy Bucket Lineup]   │  │
│  │  Royal Luxury & German Polymers"│  │  Epic Coat, Rang Ritu,      │  │
│  │  ✓ Up to 10 Yrs Warranty        │  │  Gleam Coat Mirror Stage    │  │
│  │  [Explore Shades] [Store Login] │  │                             │  │
│  └─────────────────────────────────┘  └─────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────┤
│  🛋️ INTERACTIVE ROOM SHADE VISUALIZER                                 │
│  [Royal Indigo] [Vibrant Magenta] [Sea Teal] [Crimson Rust] [Warm Amber]│
│  (Real-time live wall color rendering with sample swatch swatches)      │
├────────────────────────────────────────────────────────────────────────┤
│  📦 9-BUCKET MASTER PACKAGING EXHIBITION                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│
│  │ Epic Coat    │  │ Rang Ritu    │  │ Gleam Coat   │  │ Damp Proof   ││
│  │ 5 Yrs Indigo │  │ 7 Yrs Magenta│  │ 3 Yrs Teal   │  │ 10 Yrs Gold  ││
│  │ MRP: ₹4,200  │  │ MRP: ₹3,850  │  │ MRP: ₹2,950  │  │ MRP: ₹5,100  ││
│  │ [Quick Scan] │  │ [Quick Scan] │  │ [Quick Scan] │  │ [Quick Scan] ││
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘│
├────────────────────────────────────────────────────────────────────────┤
│  🏆 RETAILER GAMIFIED OPERATIONS DOCK (Authenticated Portal)            │
│  Achieved: ₹75,000 / ₹1,00,000 (Silver 6% Active)                      │
│  [===========================================>...............] 75%     │
│  🎉 Just ₹25,000 to unlock 10% Gold Tier Festive Dhamaka!              │
│  [📷 Quick Barcode/QR Camera Scan]   [🧾 Generate Customer Bill]       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Flipkart Big Billion Days Gamification Engine

### 3.1 Festive Scheme Cards
- Full-bleed gradient cards with glowing borders (`festiveGlow` shadow).
- Micro-badges: `"LIVE NOW"`, `"7 DAYS LEFT"`, `"10% BONUS"`.
- Admin configurable via Web Dashboard.

### 3.2 Target Progress Meter
- Reactive multi-node progress track:
  - `₹0` $\rightarrow$ `₹25,000 (Bronze 3%)` $\rightarrow$ `₹50,000 (Silver 6%)` $\rightarrow$ `₹1,00,000 (Gold 10%)`.
- Reaching a milestone triggers celebratory golden confetti animation and trophy unlocking.

---

## 4. Point-of-Sale Cart with Selling Price $\le$ MRP Guard

- **Visual Feedback:**
  - $\text{Selling Price} \le \text{MRP}$: Emerald green badge with calculated retailer discount.
  - $\text{Selling Price} > \text{MRP}$: Crimson red glow alert `⚠️ BLOCKED: Selling price cannot exceed MRP!`; checkout CTA is locked.
- **Stock Guard:**
  - `🟢 In Stock (X available)` vs `🔴 Insufficient Stock` (checkout blocked).

---

## 5. Token Reference Files in Codebase

- Brand Colors & Palette: `web/src/constants/colors.ts` and `web/tailwind.config.js`
- Design Tokens & Glassmorphism: `web/src/styles/globals.css`
- Official Packaging & Branding Assets: `web/public/branding/`
  - Master Logo: `web/public/branding/ankur_logo_master.png`
  - 9-Bucket Reflection Lineup: `web/public/branding/ankur_lineup_master.png`
  - Individual Buckets: `web/public/branding/bucket_1.png` through `bucket_9.png`
  - Living Room Backdrop: `web/public/branding/living_room_hero.png`
  - Swatch Fan: `web/public/branding/swatch_fan.png`
- Master Production Landing Page: `web/public/index.html` (Prototype) & Next.js App Router (`web/src/app/page.tsx`)
