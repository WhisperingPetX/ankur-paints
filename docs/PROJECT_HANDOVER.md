# Ankur Paints — Project Handover Document

**Document Version:** 5.0.0  
**Created:** 2026-10-20  
**Last Updated:** 2026-10-20  
**Phases Completed:** Phase 1 (Requirements), Phase 2 (Architecture), Phase 3 (Git & Scaffolding), Phase 4 (UI/UX Design System), Phase 5 (Database Schema & SQL Migrations)  
**Current Phase:** Phase 6 — Authentication & Security  
**Target Audience:** Future AI assistants (ChatGPT / Antigravity), incoming software engineers, and stakeholders.

---

## 1. Project Purpose & Summary
Ankur Paints is building a production-grade digital operational platform consisting of:
1. An **Android mobile application** for authorized paint retailers to scan product QR codes, build customer order carts, enter customer details, enter selling prices ($\le$ printed MRP), validate stock, submit sales, view Flipkart-style animated target schemes, and track incentive earnings.
2. A **Web-based Admin Dashboard** for company management to configure products and SKUs, import catalogs and MRP from company Excel sheets, configure dynamic slab-based incentive schemes, generate static QR codes, dispatch stock to retail partners, monitor live sales, oversee retailer accounts, audit incentive calculations, and view business analytics.
3. A **Central Cloud Backend & Database** providing secure, transactional, and audit-compliant inventory and sales operations.

---

## 2. Document Provenance & Verified Current State
- **Phases 1 to 5 Status:** **COMPLETED & VERIFIED.**
- **Current Active Phase:** **Phase 6 — Authentication & Security.**
- **Workspace Location:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`
- **GitHub Repository:** `https://github.com/WhisperingPetX/ankur-paints.git` (Tracked & Synced on `main`)
- **Database Baseline:** Authored in [supabase/migrations/20261020000001_initial_schema.sql](file:///C:/Users/acer/.gemini/antigravity/scratch/ankur_paints/supabase/migrations/20261020000001_initial_schema.sql) and [supabase/seed/seed.sql](file:///C:/Users/acer/.gemini/antigravity/scratch/ankur_paints/supabase/seed/seed.sql). Enforces zero negative stock, selling price $\le$ MRP ceiling, double-entry stock ledger, multi-tenant RLS, and atomic checkout stored procedure.
- **Design System Baseline:** Authored in [docs/DESIGN_SYSTEM.md](file:///C:/Users/acer/.gemini/antigravity/scratch/ankur_paints/docs/DESIGN_SYSTEM.md) and coded into TypeScript tokens in `mobile/src/constants/`. Follows official Ankur Paints Cobalt Blue & Vermillion Orange branding with Flipkart / Amazon consumer polish.

---

## 3. Important File Paths
- **Project Root Directory:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`
- **Database Migrations:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\supabase\migrations\20261020000001_initial_schema.sql`
- **Database Seed Data:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\supabase\seed\seed.sql`
- **Design System:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\DESIGN_SYSTEM.md`
- **Technical Architecture:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\TECHNICAL_ARCHITECTURE.md`
- **Requirements Specification:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\PROJECT_REQUIREMENTS.md`
- **Decisions Log (ADR):** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\DECISIONS_LOG.md`
- **Mobile Theme Tokens:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\mobile\src\constants/`
- **Current Project Status:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\PROJECT_STATUS.md`

---

## 4. Current Phase and Exact Next Action
- **Current Phase:** Phase 6 — Authentication & Security.
- **Exact Next Action:**
  > **Stage, commit, and push Phase 5 database migration and seed artifacts to GitHub, then proceed to Phase 6 (Authentication & Security: Supabase client setup, environment configuration template, and role-based auth wrappers).**

---

## 5. INSTRUCTIONS FOR THE NEXT CHATGPT

When a user begins a new conversation with you to continue this project:

1. **Read the handover and status documentation provided by the user:** Immediately review `docs/PROJECT_HANDOVER.md`, `docs/PROJECT_STATUS.md`, and `docs/DECISIONS_LOG.md` before taking any action.
2. **Inspect the actual available project files before assuming anything:** Check the physical directory (`C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`) and verify Git status. Never rely purely on conversation memory or assume files exist without checking.
3. **Continue from the latest verified state rather than restarting completed work:** Phases 1 through 5 are fully completed. Follow the active phase declared in `PROJECT_STATUS.md`.
4. **Make one small, verifiable step at a time:** Do not jump ahead across multiple phases. Produce complete, working code, test thoroughly, update the status documents, and wait for verification.
