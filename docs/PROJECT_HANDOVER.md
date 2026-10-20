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
- **Current Phase:** International-Grade Luxury Web Platform Live on `http://localhost:3000`.
- **Verified State:**
  - True 4K Ultra-HD luxury responsive platform implemented for Ankur Paints:
    1. **Navbar (`Navbar.tsx`):** Sticky glass navigation with pure vector SVG brand logo, section anchors, Retailer KYC trigger, and live reactive cart counter badge.
    2. **Hero Stage (`HeroSection.tsx`):** Majestic virtual exhibition stage with 5-tone interactive ambient lighting mood controller (`Royal Cobalt`, `Velvet Magenta`, `Golden Amber`, `Sea Teal`, `Ochre Gold`), 3D obsidian mirror pedestal with official packaging lineup (`ankur_lineup_master.png`), and dual CTAs.
    3. **German Technology Science (`GermanTechnology.tsx`):** 4 engineering performance pillars detailing German acrylic crosslinking polymers (2.2mm crack bridging), solar heat reflection (5°C cooling), ultra-low VOC (<15g/L), and silicone hydrophobic water beading.
    4. **Architectural Room Visualizer (`RoomVisualizer.tsx`):** Interactive 3D room visualizer with real-time dynamic wall shade morphing, signature formulation pairing, warranty specs, and instant order action.
    5. **Master Collections (`MasterCatalog.tsx`):** All 9 official Ankur Paints formulations with category filter tabs, interactive pack size selection (`1L`, `4L`, `10L`, `20L`), authoritative printed MRP calculation, and cart integration.
    6. **Retailer POS & Incentive Terminal (`RetailerPOSDemo.tsx`):** Gamified B2B operations simulator with Diwali Dhamaka milestone progress bar, simulated barcode QR scanner (`ANKUR_EPIC_101_20L`), strict database guard enforcement ($\text{Selling Price} \le \text{MRP}$), and Green Tick animated invoice receipt with confetti.
    7. **Prestige Heritage (`PrestigeHeritage.tsx`):** 4 master counters (10+ Formulations, 5M+ Living Spaces, 25+ Years Heritage, 1,200+ Dealers) and verified client testimonials.
    8. **Dark Luxury Footer (`Footer.tsx`):** Vector branding, customer support links, legal links, and newsletter subscription.
    9. **Store Auth & KYC Modal (`StoreAuthModal.tsx`):** Google One-Tap authentication and retailer GSTIN onboarding flow with confetti celebration.
  - Production build (`next build`) passed with zero errors (`Compiled successfully in 12.7s`).
  - Next.js 15 production server running in daemon mode on `http://localhost:3000` (HTTP 200 verified).
  - All changes pushed and synced with GitHub repository `origin/main`.
- **Exact Next Action:**
  > **Review with user, gather feedback on visual aesthetics and user flows, and proceed to Supabase live data hooks and Capacitor Android build.**

---

## 5. INSTRUCTIONS FOR THE NEXT CHATGPT

When a user begins a new conversation with you to continue this project:

1. **Read the handover and status documentation provided by the user:** Immediately review `docs/PROJECT_HANDOVER.md`, `docs/PROJECT_REQUIREMENTS.md`, and `docs/TECHNICAL_ARCHITECTURE.md` before taking any action.
2. **Inspect the actual available project files before assuming anything:** Check the physical directory (`C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`) and verify Git status. Never rely purely on conversation memory or assume files exist without checking.
3. **Continue from the latest verified state rather than restarting completed work:** Phases 1 through 7 are fully completed. The cloud database is live with 12 tables and 9 official products.
4. **Make one small, verifiable step at a time:** Do not jump ahead across multiple phases. Produce complete, working code, test thoroughly, update the handover document, and wait for verification.
