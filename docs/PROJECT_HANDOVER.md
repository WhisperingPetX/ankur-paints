# Ankur Paints — Project Handover Document

**Document Version:** 7.0.0  
**Created:** 2026-10-20  
**Last Updated:** 2026-10-20  
**Phases Completed:** Phase 1 (Requirements), Phase 2 (Architecture), Phase 3 (Git & Scaffolding), Phase 4 (UI/UX Design System), Phase 5 (Database Schema & Seed Data), Phase 6 (Authentication & Security), Phase 7 (Product & QR-Code System)  
**Current Phase:** Phase 8 — Inventory and Stock Dispatch  
**Target Audience:** Future AI assistants (ChatGPT / Antigravity), incoming software engineers, and stakeholders.

---

## 1. Project Purpose & Summary
Ankur Paints is building a production-grade digital operational platform consisting of:
1. An **Android mobile application** for authorized paint retailers to scan product QR codes, build customer order carts, enter customer details, enter selling prices ($\le$ printed MRP), validate stock, submit sales, view Flipkart-style animated target schemes, and track incentive earnings.
2. A **Web-based Admin Dashboard** for company management to configure products and SKUs, import catalogs and MRP from company Excel sheets, configure dynamic slab-based incentive schemes, generate static QR codes, dispatch stock to retail partners, monitor live sales, oversee retailer accounts, audit incentive calculations, and view business analytics.
3. A **Central Cloud Backend & Database** providing secure, transactional, and audit-compliant inventory and sales operations.

---

## 2. Document Provenance & Verified Current State
- **Phases 1 to 7 Status:** **COMPLETED & VERIFIED.**
- **Current Active Phase:** **Phase 8 — Inventory and Stock Dispatch.**
- **Workspace Location:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`
- **GitHub Repository:** `https://github.com/WhisperingPetX/ankur-paints.git` (Tracked & Synced on `main`)
- **Live Cloud Database:** Supabase project `wpiztkjuojirzsxvzqfv.supabase.co` is online with all 12 tables and official product seed data verified active.
- **Product & QR Baseline:** Deterministic QR payload formatting (`ANKUR_{PROD}_{SHADE}_{SIZE}`), vector SVG label generation, bulk spreadsheet importer, and factory sticker sheet layouts authored in Phase 7.
- **Authentication & Security Baseline:** Auth trigger, TypeScript DB types, Supabase client services, React Context Auth providers (`mobile/src/contexts/AuthContext.tsx` and `web/src/contexts/AuthContext.tsx`), and branded `LoginScreen.tsx` authored in Phase 6.

---

## 3. Important File Paths
- **Project Root Directory:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`
- **Catalog Management Page (Web):** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\web\src\pages\CatalogManagement.tsx`
- **Excel Importer Engine (Web):** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\web\src\services\excelImporter.ts`
- **QR Code & Label Generator (Web):** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\web\src\services\qrGenerator.ts`
- **Printable Sticker Sheet (Web):** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\web\src\components\PrintableQRSheet.tsx`
- **Mobile QR Lookup Service:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\mobile\src\services\catalogService.ts`
- **Mobile Login Screen:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\mobile\src\screens\LoginScreen.tsx`
- **Database Migrations:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\supabase\migrations/`
- **Current Project Status:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\PROJECT_STATUS.md`

---

## 4. Current Phase and Exact Next Action
- **Current Phase:** Phase 8 — Inventory and Stock Dispatch.
- **Exact Next Action:**
  > **Stage, commit, and push Phase 7 catalog and QR code artifacts to GitHub, then proceed to Phase 8 (Inventory and Stock Dispatch: Factory dispatch scanning engine, retailer stock increment, and immutable dispatch audit ledger).**

---

## 5. INSTRUCTIONS FOR THE NEXT CHATGPT

When a user begins a new conversation with you to continue this project:

1. **Read the handover and status documentation provided by the user:** Immediately review `docs/PROJECT_HANDOVER.md`, `docs/PROJECT_STATUS.md`, and `docs/DECISIONS_LOG.md` before taking any action.
2. **Inspect the actual available project files before assuming anything:** Check the physical directory (`C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`) and verify Git status. Never rely purely on conversation memory or assume files exist without checking.
3. **Continue from the latest verified state rather than restarting completed work:** Phases 1 through 7 are fully completed. Follow the active phase declared in `PROJECT_STATUS.md`.
4. **Make one small, verifiable step at a time:** Do not jump ahead across multiple phases. Produce complete, working code, test thoroughly, update the status documents, and wait for verification.
