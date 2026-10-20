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

## 2. Consumer E-Commerce (Flipkart / Myntra Style) Mobile Layout Architecture

The retailer app interface provides the familiar, high-conversion feel of **Flipkart / Myntra / Amazon India**:

```
┌────────────────────────────────────────────────────────┐
│  🎨 Ankur Paints                   [Store: Gupta Paints]│
│  🔍 Search by product, shade code (e.g. SH-104)...     │
├────────────────────────────────────────────────────────┤
│  [CATEGORIES]                                          │
│  (★ All) (🏡 Exterior) (🛋️ Interior) (💧 Damp Proof) ...│
├────────────────────────────────────────────────────────┤
│  🌟 HERO PROMOTIONAL CAROUSEL (Flipkart Style)         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ⚡ DIWALI DHAMAKA SCHEME              [LIVE NOW] │  │
│  │ FLAT 10% EXTRA ON ₹1,00,000 MONTHLY SALES        │  │
│  │ Earn instant rewards on Epic Coat & Rang Ritu    │  │
│  └──────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────┤
│  🏆 LIVE TARGET MILESTONE METER                        │
│  Achieved: ₹75,000 / ₹1,00,000 (Silver 6% Active)      │
│  [===========================>..........] 75%          │
│  🎉 Just ₹25,000 to unlock 10% Gold Tier Bonus!        │
├────────────────────────────────────────────────────────┤
│  📦 RECENT FAST-SELLING BUCKETS                        │
│  ┌─────────────────────────┐  ┌─────────────────────┐  │
│  │ [Epic Coat 20L]         │  │ [Rang Ritu 20L]     │  │
│  │ 5 Yrs Warranty • Indigo │  │ 7 Yrs • Magenta     │  │
│  │ MRP: ₹4,200             │  │ MRP: ₹3,850         │  │
│  │ 🟢 18 in stock          │  │ 🟢 12 in stock      │  │
│  │ [+ Add to Cart]         │  │ [+ Add to Cart]     │  │
│  └─────────────────────────┘  └─────────────────────┘  │
├────────────────────────────────────────────────────────┤
│  [📷 QUICK QR SCAN] (Floating High-Contrast CTA)        │
└────────────────────────────────────────────────────────┘
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

- Brand Colors & Palette: `mobile/src/constants/colors.ts`
- Typography Scale: `mobile/src/constants/typography.ts`
- Spacing & Elevation: `mobile/src/constants/spacing.ts`
- Unified Theme: `mobile/src/constants/theme.ts`
- Component Types: `mobile/src/types/design.ts`
- Brand Asset: `mobile/assets/branding/ankur_paints_lineup.jpg`
