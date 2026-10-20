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
- **Current Phase:** Building the modern Next.js 15 + Tailwind CSS web application with integrated Google One-Tap Sign-In, Store KYC, and QR scanner.
- **Exact Next Action:**
  > **Implement production Next.js 15 pages and components inside `web/`, wire Supabase client services, and configure CapacitorJS for one-click Android APK export.**

---

## 5. INSTRUCTIONS FOR THE NEXT CHATGPT

When a user begins a new conversation with you to continue this project:

1. **Read the handover and status documentation provided by the user:** Immediately review `docs/PROJECT_HANDOVER.md`, `docs/PROJECT_REQUIREMENTS.md`, and `docs/TECHNICAL_ARCHITECTURE.md` before taking any action.
2. **Inspect the actual available project files before assuming anything:** Check the physical directory (`C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`) and verify Git status. Never rely purely on conversation memory or assume files exist without checking.
3. **Continue from the latest verified state rather than restarting completed work:** Phases 1 through 7 are fully completed. The cloud database is live with 12 tables and 9 official products.
4. **Make one small, verifiable step at a time:** Do not jump ahead across multiple phases. Produce complete, working code, test thoroughly, update the handover document, and wait for verification.
2. **Inspect the actual available project files before assuming anything:** Check the physical directory (`C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`) and verify Git status. Never rely purely on conversation memory or assume files exist without checking.
3. **Continue from the latest verified state rather than restarting completed work:** Phases 1 through 7 are fully completed. Follow the active phase declared in `PROJECT_STATUS.md`.
4. **Make one small, verifiable step at a time:** Do not jump ahead across multiple phases. Produce complete, working code, test thoroughly, update the status documents, and wait for verification.
