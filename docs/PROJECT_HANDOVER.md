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
- **Current Phase:** Bespoke Apple-Style Royale Platform with Custom 4K Generated Assets Live on `http://localhost:3000`.
- **Verified State:**
  - Zero user-provided/old picture dependency: All imagery was generated fresh via the `image-generator` specialist:
    1. **Bespoke 3D Commercial Can:** `web/public/branding/generated/ankur_3d_royale_bucket.jpg` (Sleek 20L metallic paint bucket in royal cobalt blue with embossed gold foil typography reading *Ankur Paints Royale Luxury Emulsion* on a polished obsidian pedestal).
    2. **Penthouse Living Room:** `web/public/branding/generated/ankur_luxury_penthouse_interior.jpg` (Velvety Royal Indigo accent wall, Italian furniture, warm recessed LED lighting).
    3. **Contemporary Luxury Villa Facade:** `web/public/branding/generated/ankur_contemporary_villa_facade.jpg` (Two-story modern villa with textured weatherproof exterior paint at twilight).
  - Apple-Style Component Structure:
    1. **AppleNavbar (`AppleNavbar.tsx`):** Mathematical vector SVG logo, clean navigation (`Overview`, `Specifications`, `Living Spaces`, `Shades`, `Retailer Portal`), and official multi-colored Google 'G' button.
    2. **HeroRoyale (`HeroRoyale.tsx`):** Centerpiece 3D bucket floating with floor reflection, bold Apple typography (*"Unrivaled Splendor. Engineered for timeless living."*), Google Sign-In, and specs.
    3. **KeynoteMetrics (`KeynoteMetrics.tsx`):** 4 massive typography callouts (`10-Yr`, `2.2mm`, `5°C`, `Zero VOC`).
    4. **ArchitecturalShowcase (`ArchitecturalShowcase.tsx`):** Cinematic dual showcases for Penthouse Interior and Contemporary Villa Facade.
    5. **MinimalShadeStudio (`MinimalShadeStudio.tsx`):** Curated architectural swatches with live lighting shift.
    6. **RetailerHubMinimal (`RetailerHubMinimal.tsx`):** QR camera simulator, price ceiling guard ($\text{Selling Price} \le \text{MRP}$), Diwali Dhamaka meter, and verified invoice with confetti.
    7. **GoogleAuthModal (`GoogleAuthModal.tsx`):** Google OAuth dialog with 1-click login and state persistence.
    8. **AppleFooter (`AppleFooter.tsx`):** Hairline rule, corporate info, and toll-free helpline `1800-266-1999`.
  - Production build (`next build`) compiled in **4.5 seconds** with zero errors.
  - Next.js 15 production server running in daemon mode on `http://localhost:3000` (HTTP 200 verified).
  - Pushed to GitHub repository `origin/main`.
- **Exact Next Action:**
  > **Review with user on http://localhost:3000, gather feedback on the bespoke generated visuals, and proceed to Supabase live data integrations.**

---

## 5. INSTRUCTIONS FOR THE NEXT CHATGPT

When a user begins a new conversation with you to continue this project:

1. **Read the handover and status documentation provided by the user:** Immediately review `docs/PROJECT_HANDOVER.md`, `docs/PROJECT_REQUIREMENTS.md`, and `docs/TECHNICAL_ARCHITECTURE.md` before taking any action.
2. **Inspect the actual available project files before assuming anything:** Check the physical directory (`C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`) and verify Git status. Never rely purely on conversation memory or assume files exist without checking.
3. **Continue from the latest verified state rather than restarting completed work:** Phases 1 through 7 are fully completed. The cloud database is live with 12 tables and 9 official products.
4. **Make one small, verifiable step at a time:** Do not jump ahead across multiple phases. Produce complete, working code, test thoroughly, update the handover document, and wait for verification.
