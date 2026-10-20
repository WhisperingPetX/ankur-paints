# Ankur Paints — UI/UX Design System Specification

**Document Version:** 1.0.0  
**Phase:** Phase 4 — UI/UX Design System & Mobile Tokens  
**Date:** 2026-10-20  
**Status:** Approved Design Baseline  
**Inspiration & Benchmark:** Flipkart / Amazon India Tier-1 Consumer E-Commerce Polish

---

## 1. Design Philosophy: "Consumer-Grade B2B"

Traditional enterprise dealer apps look sterile, grey, and difficult to use. Ankur Paints rejects that paradigm. The retailer Android app is designed with the **vibrant energy, smooth micro-animations, and visual polish of top Indian consumer applications** (Flipkart Big Billion Days / Amazon Great Indian Festival).

### Core Pillars
1. **High Visual Excitement (Festive Motivation):** Use bold metallic gold accents, energetic paint corals, and celebratory progress animations to turn sales logging into a rewarding game.
2. **Glanceable Retail Legibility:** In crowded, brightly lit paint shops, text, numbers, and stock states must be instantly readable at arm's length.
3. **Instant Error Prevention (Zero Friction):** Instant visual cues prevent mistakes before they happen:
   - Green badge: $\text{Selling Price} \le \text{MRP}$ (Valid)
   - Red alert badge: $\text{Selling Price} > \text{MRP}$ (Checkout button dynamically locks)
   - Real-time stock badge: Green for available; Crimson red for insufficient stock.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Brand Identity Colors
- **Royal Midnight Navy (`#0B192C` / `#1E3E62`):** Primary brand authority, headers, dark surfaces, and text contrast.
- **Paint Energy Coral (`#FF5722`):** Primary action buttons, scan trigger CTAs, and interactive highlights.
- **Festive Incentive Gold (`#FFD700` $\rightarrow$ `#FF8C00`):** Target milestones, reward percentages, Big Billion Days style banners.

### 2.2 Functional & Validation Colors
| State | Hex Code | Background Tint | Usage |
| :--- | :--- | :--- | :--- |
| **Success / In-Stock** | `#10B981` | `#DCFCE7` | Available stock counter, valid price confirmation, completed sales |
| **Error / Blocked** | `#EF4444` | `#FEE2E2` | Price exceeding MRP, zero stock blocker, scan failure |
| **Warning / Near Target** | `#F59E0B` | `#FEF3C7` | Stock running low ($\le 3$ cans), approaching target threshold |
| **Surface Neutral** | `#F8FAFC` | `#FFFFFF` | Mobile screen background, card containers, subtle divider borders |

---

## 3. Flipkart Big Billion Days Style Gamification System

### 3.1 Promotional Hero Carousel
- **Component:** `FestiveSchemeBanner`
- **Visual Style:** Full-width swipeable cards with rich festive gradients (Gold Festival, Electric Blue, Ruby Offer), celebratory badges, and dynamic scheme titles configured by Admin.
- **Example Card:**
  ```
  ┌────────────────────────────────────────────────────────┐
  │ 🌟 DIWALI DHAMAKA SCHEME                  [ACTIVE NOW] │
  │                                                        │
  │  FLAT 10% EXTRA DISCOUNT ON ₹1,00,000 SALES           │
  │  Earn instant rewards on all Exterior & Interior Lines │
  │                                                        │
  │  [ Tap to View Slabs & Rewards → ]                    │
  └────────────────────────────────────────────────────────┘
  ```

### 3.2 Reactive Target Progress Meter
- **Component:** `TargetProgressCard`
- **Dynamic Feedback:** A multi-tier animated progress bar displays the retailer's monthly or scheme sales progress in real time.
- **Progress Nodes:**
  - Milestone 1: ₹25,000 (Bronze - 3% Bonus)
  - Milestone 2: ₹50,000 (Silver - 6% Bonus)
  - Milestone 3: ₹1,00,000 (Gold - 10% Bonus)
- **Live Copy:** *"₹78,400 achieved! Just ₹21,600 away from unlocking 10% Gold Bonus!"*
- **Celebration Trigger:** Hitting a target triggers a celebratory gold particle burst (using React Native Reanimated / Canvas Confetti) and unlocks a glowing trophy badge.

---

## 4. Point-of-Sale Cart & Camera Scanner UI

### 4.1 Modern Camera Scanner Overlay
- **Viewfinder:** 280x280dp center target with glowing coral corner brackets (`#FF5722`).
- **Scanning Beam:** Smooth vertical laser scan line with soft gradient glow.
- **Audio & Haptic Feedback:** Successful QR recognition triggers an instant subtle haptic tap (`Haptics.notificationAsync(Success)`) and auto-navigates to the active cart with item count incremented.

### 4.2 Cart Line Item Card
- **Product Title & Shade:** Large bold title with visual shade color swatch pill.
- **Pack Size:** Container badge (e.g. `[ 20 Litre Bucket ]` or `[ 4 Litre Can ]`).
- **Stock Guard:** Real-time stock badge:
  - `🟢 12 in stock` (If stock is sufficient)
  - `🔴 Insufficient stock (Only 2 available)` (Blocks submission)
- **MRP vs. Selling Price Inputs:**
  - Printed MRP: Displayed clearly with strike-through or reference label: `MRP: ₹3,450`.
  - Selling Price Input: Bold numerical text input. If entered price > ₹3,450, input border turns glowing crimson with label: `⚠️ Cannot exceed MRP of ₹3,450`.
- **Quantity Stepper:** Big thumb-friendly `[-]` and `[+]` counter buttons with manual numeric entry.

---

## 5. Web Admin Dashboard Design Language

- **Layout Structure:** Collapsible Royal Navy sidebar with high-contrast active icons, modern breadcrumb navigation, and global search bar.
- **Data Tables:** Dense, filterable data grids (zebra striping, sticky headers, inline status badges, export to Excel/PDF buttons).
- **KPI Summary Cards:** Large numeric statistics (Today's Sales, Dispatches In-Transit, Active Retailers, Accrued Incentives) with micro-trend sparklines.
- **Excel Bulk Catalog Importer:** Drag-and-drop dropzone with animated progress bar, real-time column mapping preview, and instant validation highlighting for invalid MRP or missing shade codes.

---

## 6. Implementation Reference Tokens

All design tokens are implemented and exported in the mobile application directory:
- Colors & Gradients: `mobile/src/constants/colors.ts`
- Typography Scale: `mobile/src/constants/typography.ts`
- Spacing & Elevation: `mobile/src/constants/spacing.ts`
- Unified Theme: `mobile/src/constants/theme.ts`
- TypeScript Interfaces: `mobile/src/types/design.ts`
