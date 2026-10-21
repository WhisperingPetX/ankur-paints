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
- **Current Phase:** Super-Minimalist Apple-Style Landing Page Live on `http://localhost:3000`.
- **Verified State:**
  - Complete minimalist pivot executed as explicitly requested by user:
    1. **Zero Clutter Architecture:** Removed all generic category cards, extensive blog lists, and cluttered grids.
    2. **Apple Navbar (`AppleNavbar.tsx`):** Ultra-clean glassmorphic header with mathematical vector SVG Ankur Paints logo, minimal navigation links (`Overview`, `Specifications`, `German Science`, `Retailer Portal`), and prominent `Sign in with Google` action.
    3. **Hero Stage:**
       - Majestic display typography: *"Epic Coat. Defies every season."*
       - 4 Apple color dots (Royal Peacock Indigo, Velvet Magenta, Mediterranean Teal, Imperial Ochre) that smoothly morph the active bucket packaging, ambient backlight halo, and printed MRP.
       - Floating 3D centerpiece paint bucket with authentic soft drop-shadow and obsidian mirror floor reflection.
       - Primary CTA: Sleek `Sign in with Google` button with official multi-colored Google 'G' icon.
    4. **Google Sign-In Modal (`GoogleAuthModal.tsx`):** Interactive Google OAuth account selector (Dealer, Architect, Homeowner) with one-click sign in, state persistence in navbar, and celebratory confetti.
    5. **Apple Keynote Specifications Strip:** 4 bold typography metric highlights (`10-Yr` Weather Defense, `2.2mm` Crack Bridging, `5°C` Surface Cooling, `Zero` VOC).
    6. **German Chemistry Spotlight:** 3 focused minimalist cards highlighting crosslinked polymers, solar heat reflectance, and zero-VOC health safety.
    7. **Minimal Apple Footer:** Clean hairline divider, corporate contact info, and toll-free helpline `1800-266-1999`.
  - Production build (`next build`) compiled successfully in **3.9 seconds** with zero errors.
  - Next.js 15 production server running in daemon mode on `http://localhost:3000` (HTTP 200 verified).
  - All changes committed and pushed to GitHub `origin/main`.
- **Exact Next Action:**
  > **Review with user, gather feedback on Apple-style minimalism, and proceed based on user guidance.**
  > **Review with user, gather feedback on visual aesthetics and user flows, and proceed to Supabase live data hooks and Capacitor Android build.**

---

## 5. INSTRUCTIONS FOR THE NEXT CHATGPT

When a user begins a new conversation with you to continue this project:

1. **Read the handover and status documentation provided by the user:** Immediately review `docs/PROJECT_HANDOVER.md`, `docs/PROJECT_REQUIREMENTS.md`, and `docs/TECHNICAL_ARCHITECTURE.md` before taking any action.
2. **Inspect the actual available project files before assuming anything:** Check the physical directory (`C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`) and verify Git status. Never rely purely on conversation memory or assume files exist without checking.
3. **Continue from the latest verified state rather than restarting completed work:** Phases 1 through 7 are fully completed. The cloud database is live with 12 tables and 9 official products.
4. **Make one small, verifiable step at a time:** Do not jump ahead across multiple phases. Produce complete, working code, test thoroughly, update the handover document, and wait for verification.
