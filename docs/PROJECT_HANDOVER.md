# Ankur Paints — Project Handover Document

**Document Version:** 3.0.0  
**Created:** 2026-10-20  
**Last Updated:** 2026-10-20  
**Phases Completed:** Phase 1 (Requirements) & Phase 2 (Technical Architecture)  
**Current Phase:** Phase 3 — Development Environment & Git Setup  
**Target Audience:** Future AI assistants (ChatGPT / Antigravity), incoming software engineers, and stakeholders.

---

## 1. Project Purpose & Summary
Ankur Paints is building a production-grade digital operational platform consisting of:
1. An **Android mobile application** for authorized paint retailers to scan product QR codes, build customer order carts, enter customer details, enter selling prices ($\le$ printed MRP), validate stock, submit sales, view Flipkart-style animated target schemes, and track incentive earnings.
2. A **Web-based Admin Dashboard** for company management to configure products and SKUs, import catalogs and MRP from company Excel sheets, configure dynamic slab-based incentive schemes, generate static QR codes, dispatch stock to retail partners, monitor live sales, oversee retailer accounts, audit incentive calculations, and view business analytics.
3. A **Central Cloud Backend & Database** providing secure, transactional, and audit-compliant inventory and sales operations.

---

## 2. Document Provenance & Verified Current State
- **Phase 1 Status:** **COMPLETED & FORMALLY APPROVED (`DEC-016`).**
- **Phase 2 Status:** **COMPLETED & APPROVED (`TECHNICAL_ARCHITECTURE.md`).**
- **Current Active Phase:** **Phase 3 — Development Environment & Git Setup.**
- **Workspace Location:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`
- **GitHub Repository:** `https://github.com/WhisperingPetX/ankur-paints.git` (Tracked & Synced on `main`)
- **Git Repository Status:** Initialized on branch `main` with `.gitignore`, root `README.md`, and modular directory scaffolding (`mobile/`, `web/`, `supabase/`, `docs/`).
- **Confirmed Key Technical Decisions:**
  - Retailer Mobile: React Native + Expo + TypeScript (`DEC-004`).
  - Web Admin Dashboard: React + TypeScript (`DEC-006`).
  - Backend & Database: Supabase / PostgreSQL (`DEC-005`).
  - Zoho Creator rejected (`DEC-007`).
  - Tally billing remains independent, no integration (`DEC-003`).
  - Static QR per SKU, no unit-level serialization (`DEC-008`).
  - Selling price entered by retailer, must be $\le$ printed MRP (`DEC-011`).
  - Clean January launch cutover; historical stock excluded (`DEC-013`).
  - Dynamic slab-based incentives with gamified animated mobile UI (`DEC-014`).
  - Master company Excel sheet for catalog and printed MRP (`DEC-015`).

---

## 3. Important File Paths
All relevant documentation and assets are located inside the project repository root:
- **Project Root Directory:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`
- **Root README:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\README.md`
- **Git Ignore:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\.gitignore`
- **Technical Architecture (Phase 2):** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\TECHNICAL_ARCHITECTURE.md`
- **Requirements Specification:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\PROJECT_REQUIREMENTS.md`
- **Prioritized Open Questions:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\OPEN_QUESTIONS.md`
- **Decisions Log (ADR):** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\DECISIONS_LOG.md`
- **Current Project Status:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\PROJECT_STATUS.md`
- **AI Continuity Protocol:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\AI_CONTINUITY.md`
- **This Handover File:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\docs\PROJECT_HANDOVER.md`
- **Mobile Scaffolding:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\mobile/`
- **Web Scaffolding:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\web/`
- **Supabase Scaffolding:** `C:\Users\acer\.gemini\antigravity\scratch\ankur_paints\supabase/`

---

## 4. Current Phase and Exact Next Action
- **Current Phase:** Phase 3 — Development Environment & Git Setup.
- **Exact Next Action:**
  > **Complete Phase 3 initial Git commit, verify clean Git status, and proceed to Phase 4: UI/UX Design System & Mobile Tokens.**

---

## 5. INSTRUCTIONS FOR THE NEXT CHATGPT

When a user begins a new conversation with you to continue this project:

1. **Read the handover and status documentation provided by the user:** Immediately review `docs/PROJECT_HANDOVER.md`, `docs/PROJECT_STATUS.md`, and `docs/DECISIONS_LOG.md` before taking any action.
2. **Inspect the actual available project files before assuming anything:** Check the physical directory (`C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`) and verify Git status. Never rely purely on conversation memory or assume files exist without checking.
3. **Continue from the latest verified state rather than restarting completed work:** Phases 1 and 2 are fully completed and documented. Follow the active phase declared in `PROJECT_STATUS.md`.
4. **Never assume access to previous conversations or inaccessible files:** You have no ambient memory of past chat sessions. If an SOP, diagram, or secret is referenced in earlier chats but not saved to the workspace, ask the user to provide it.
5. **Make one small, verifiable step at a time:** Do not jump ahead across multiple phases. Produce complete, working code, test thoroughly, update the status documents, and wait for verification.
