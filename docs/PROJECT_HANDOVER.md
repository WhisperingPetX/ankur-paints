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

## 3. Master Documentation Manifest (All Files in `docs/` and Their Purpose)

| Document Name | Path | Exact Purpose & Content |
| :--- | :--- | :--- |
| **`PROJECT_HANDOVER.md`** | `docs/PROJECT_HANDOVER.md` | Primary entry point for any incoming AI or engineer. Summarizes verified project state, repository paths, live database links, and strict instructions for continuity. |
| **`PROJECT_STATUS.md`** | `docs/PROJECT_STATUS.md` | Real-time task tracker. Records completed milestones, verified commands/screenshots, current phase, and the single precise next action. |
| **`DECISIONS_LOG.md`** | `docs/DECISIONS_LOG.md` | Immutable architectural record. Logs every major engineering choice (DEC-001 through DEC-021) with rationale and impact, preventing regression or re-debating closed topics. |
| **`PROJECT_REQUIREMENTS.md`** | `docs/PROJECT_REQUIREMENTS.md` | Functional & business requirements baseline. Reconciles the Ankur Paints SOP, SKU definitions, static QR rules, price ceilings ($\text{Selling Price} \le \text{MRP}$), and zero negative stock rules. |
| **`TECHNICAL_ARCHITECTURE.md`** | `docs/TECHNICAL_ARCHITECTURE.md` | Complete technical system design. Details system component diagrams, Supabase PostgreSQL ERD (12 tables), atomic SQL procedures, RLS policies, and technology matrices. |
| **`DESIGN_SYSTEM.md`** | `docs/DESIGN_SYSTEM.md` | Visual design language specification. Calibrated directly from official Ankur Paints packaging (Cobalt Blue `#004B87`, Vermillion `#E8501E`, 5-color spectrum arc), glassmorphic layout, and ambient auroras. |
| **`AI_CONTINUITY.md`** | `docs/AI_CONTINUITY.md` | Protocol guidelines for AI assistants. Specifies context boundary constraints, session-start verification sequences, and rules against guessing or hallucinating unverified code. |
| **`OPEN_QUESTIONS.md`** | `docs/OPEN_QUESTIONS.md` | Registry of open operational policies and external dependencies (launch cutover dates, damage write-off accounting, offline policies) awaiting client confirmation. |

---

## 4. Current Phase and Exact Next Action
- **Current Phase:** Building the modern Next.js 15 + Tailwind CSS web application with integrated Google One-Tap Sign-In, Store KYC, and QR scanner.
- **Exact Next Action:**
  > **Implement production Next.js 15 pages and components inside `web/`, wire Supabase client services, and configure CapacitorJS for one-click Android APK export.**

---

## 5. INSTRUCTIONS FOR THE NEXT CHATGPT

When a user begins a new conversation with you to continue this project:

1. **Read the handover and status documentation provided by the user:** Immediately review `docs/PROJECT_HANDOVER.md`, `docs/PROJECT_STATUS.md`, and `docs/DECISIONS_LOG.md` before taking any action.
2. **Inspect the actual available project files before assuming anything:** Check the physical directory (`C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`) and verify Git status. Never rely purely on conversation memory or assume files exist without checking.
3. **Continue from the latest verified state rather than restarting completed work:** Phases 1 through 7 are fully completed. Follow the active phase declared in `PROJECT_STATUS.md`.
4. **Make one small, verifiable step at a time:** Do not jump ahead across multiple phases. Produce complete, working code, test thoroughly, update the status documents, and wait for verification.
