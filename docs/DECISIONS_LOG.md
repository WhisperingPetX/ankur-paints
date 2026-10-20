# Ankur Paints — Architectural & Business Decisions Log (ADR)

**Phase:** Phase 1 — Requirements Discovery & SOP Analysis  
**Last Updated:** 2026-10-20  
**Rule:** Never convert a recommendation or proposal into an approved decision without explicit authorization.

---

## Decision Status Legend
- **CONFIRMED:** Formally validated by explicit client/stakeholder decision or official SOP transcription.
- **PROPOSED:** Technical or architectural proposal recommended by the engineering team, awaiting review.
- **UNRESOLVED:** Under active discussion or blocked by missing business input.

---

## 1. Product Scope & Strategic Direction

### DEC-001: Phased 15-Stage Engineering Lifecycle
- **Date:** 2026-10-20
- **Category:** Project Management & Governance
- **Status:** CONFIRMED
- **Decision:** The project will be executed strictly along a sequential 15-phase roadmap. No subsequent phase will be commenced without formal review, verification, and sign-off of the current phase.
- **Evidence & Rationale:** Explicitly mandated in client project charter to maintain engineering discipline and prevent architectural regressions.
- **Impact on Future Work:** Phase 2 (Technical Architecture) remains blocked until Phase 1 requirements reconciliation is fully signed off.

### DEC-002: Dual Platform Deliverables (Mobile & Web)
- **Date:** 2026-10-20
- **Category:** System Scope
- **Status:** CONFIRMED
- **Decision:** The platform will consist of an Android mobile application targeted at retailers and a responsive web-based administration dashboard targeted at Ankur Paints management.
- **Evidence & Rationale:** Core operational model confirmed by client brief and SOP transcription.
- **Impact on Future Work:** Drives technology selection and dual-surface design in Phase 2.

### DEC-003: Independence of Tally Billing & No Tally Integration
- **Date:** 2026-10-20
- **Category:** External Systems / Accounting
- **Status:** CONFIRMED (Via Client Direction & SOP Transcription)
- **Decision:** Tally billing continues unchanged within Ankur Paints' existing accounting operations. The new system will operate completely independently; **no Tally integration will be built**, and no Zoho Creator integration will be used.
- **Evidence & Rationale:** Confirmed by user: existing Tally billing workflow remains independent, and Zoho Creator is discarded.
- **Impact on Future Work:** No connectors, background sync daemons, or middleware will be developed for Tally. Standard SKU codes and HSN attributes will be stored for audit consistency only.

---

## 2. Technology Stack Decisions (Confirmed by User)

### DEC-004: Mobile Application Framework — React Native + Expo + TypeScript
- **Date:** 2026-10-20
- **Category:** Mobile Technology
- **Status:** CONFIRMED (User Decision)
- **Decision:** The retailer Android application will be built using React Native with Expo (Managed Workflow) and TypeScript.
- **Evidence & Rationale:** Formally selected by user as the target technical direction. Enables rapid Android development, strong typing, low-latency camera access for QR scanning, and clean maintainability.
- **Impact on Future Work:** Will govern mobile tooling, folder structure, and build configuration starting in Phase 3. No code or scaffolding in Phase 1.

### DEC-005: Backend & Database — Supabase (PostgreSQL)
- **Date:** 2026-10-20
- **Category:** Backend Infrastructure
- **Status:** CONFIRMED (User Decision)
- **Decision:** The backend and database infrastructure will be hosted on Supabase, leveraging managed PostgreSQL, Row Level Security (RLS) for tenant isolation, Supabase Auth, and Edge Functions.
- **Evidence & Rationale:** Formally selected by user. PostgreSQL provides transactional ACID guarantees essential for inventory ledgers, stock validation, and incentive accounting.
- **Impact on Future Work:** Phase 2 will author PostgreSQL relational schemas and RLS security matrices. No database will be provisioned in Phase 1.

### DEC-006: Web Admin Dashboard Direction
- **Date:** 2026-10-20
- **Category:** Web Frontend
- **Status:** CONFIRMED (User Decision)
- **Decision:** Ankur Paints management portal will be a Web Admin Dashboard. Specific web framework and UI library will be detailed during Phase 2 Architecture planning.
- **Evidence & Rationale:** Selected by user to support catalog management, bulk Excel imports, dispatch logging, and reporting.
- **Impact on Future Work:** Framework evaluation and component architecture in Phase 2.

### DEC-007: Explicit Rejection of Zoho Creator
- **Date:** 2026-10-20
- **Category:** Platform Architecture
- **Status:** CONFIRMED (User Decision)
- **Decision:** **Zoho Creator will NOT be used.**
- **Evidence & Rationale:** Explicit user instruction confirming that the platform will not use Zoho Creator, replacing previous preliminary considerations with the custom React Native + Supabase stack.
- **Impact on Future Work:** Permanently removes Zoho proprietary scripting, Deluge language, and Zoho database constraints from project scope.

---

## 3. Domain Logic Decisions (Reconciled from SOP Transcription & Stakeholder Confirmations)

### DEC-008: SKU Definition & Static QR Code Architecture
- **Date:** 2026-10-20
- **Category:** Product & QR Architecture
- **Status:** CONFIRMED (Via Supplied SOP Transcription)
- **Decision:**
  1. A Stock Keeping Unit is defined as: $\text{SKU} = \text{Product} + \text{Shade} + \text{Pack Size}$.
  2. There is **one static QR code per SKU**.
  3. The identical QR code is printed/applied to all physical units of that SKU.
  4. There is **no per-unit serialization** (no unique serial numbers or individual bucket GUIDs).
- **Evidence & Rationale:** Explicitly documented in the supplied SOP transcription.
- **Impact on Future Work:** Resolves `OQ-QR-01`. Drastically simplifies QR generation and database storage volume.

### DEC-009: Inventory Dispatch, Sales Validation & Immutability Rules
- **Date:** 2026-10-20
- **Category:** Inventory & Sales Domain Logic
- **Status:** CONFIRMED (Via Supplied SOP Transcription)
- **Decision:**
  1. **Bulk Product Import:** Admin product setup must support individual SKU entry and bulk catalog import from Excel.
  2. **Dispatch Mechanics:** Scanning a QR adds quantity 1 on the first scan; repeated scans increment the line quantity; manual numeric quantity adjustments are permitted. Submitting dispatch immediately increments the selected retailer's stock balance.
  3. **Retailer Sales:** Retailers can scan multiple SKUs. Available stock must be validated prior to sale. **Sales exceeding available stock must be strictly blocked** (no negative stock). Submitting a valid sale decrements retailer stock, records customer Name and Mobile Number (collected once per sale), and calculates applicable incentives.
  4. **Record Immutability:** Dispatches and sales entries are timestamped and linked to the submitting user ID. Submitted records cannot be edited in place; corrections require new entries or compensating reversals.
- **Evidence & Rationale:** Explicitly detailed in the supplied SOP transcription.
- **Impact on Future Work:** Direct inputs for Phase 2 database state machine, API endpoints, and cart validation logic.

### DEC-011: Retailer Selling Price Entry and Printed MRP Ceiling Validation
- **Date:** 2026-10-20
- **Category:** Pricing & Sales Validation Logic
- **Status:** CONFIRMED (Stakeholder Decision)
- **Decision:**
  1. The retailer manually enters the actual selling price for each line item during a sale.
  2. The selling price may equal or be lower than the product's printed MRP, but **must never exceed MRP** ($\text{Selling Price} \le \text{MRP}$).
  3. The mobile application must validate the entered selling price against the SKU's MRP and **strictly block the sale if the selling price exceeds MRP**.
  4. The source and management workflow for each SKU's MRP still need to be documented.
- **Evidence & Rationale:** Confirmed by stakeholder answers on 2026-10-20. Ensures consumer protection against exceeding MRP while allowing commercial flexibility for retailer discounts.
- **Impact on Future Work:** Dictates mobile cart input fields, error toast/dialog UX, and database check constraints in Phase 2 and 9.

### DEC-012: Admin Target-Setting Capability
- **Date:** 2026-10-20
- **Category:** Administration & Performance Management
- **Status:** CONFIRMED (Stakeholder Decision)
- **Decision:**
  1. The admin can configure and set performance/sales targets from the Web Admin Dashboard.
  2. **Explicit Demarcation:** Setting a target does NOT define the incentive calculation. The incentive formula, target measurement period, eligibility conditions, and payout rules remain unresolved business questions.
- **Evidence & Rationale:** Confirmed by stakeholder answers on 2026-10-20.
- **Impact on Future Work:** Web dashboard scope includes target configuration UI in Phase 11. Backend incentive calculation engine in Phase 10 will link targets to earnings once formula is defined.

### DEC-013: Clean Launch Tracking Start & Exclusion of Historical Stock Migration
- **Date:** 2026-10-20
- **Category:** Inventory Scope & Launch Cutover
- **Status:** CONFIRMED (Stakeholder Decision)
- **Decision:**
  1. Historical stock and prior sales from before the app's launch **do NOT need to be imported or counted**.
  2. Tracking starts clean from the app's agreed launch in January.
  3. The exact launch year and go-live date require formal confirmation.
  4. From go-live onward, the platform tracks only app-recorded stock dispatches, app-recorded retail sales, and the resulting stock balances. No opening-stock migration tool or historical data load will be built.
- **Evidence & Rationale:** Confirmed by stakeholder answers on 2026-10-20. Avoids the high operational burden and inaccuracy of surveying physical shelf inventory across independent retail stores prior to launch.
- **Impact on Future Work:** Eliminates opening-stock migration tools from Phase 5 and 8. Inventory balances will be initialized purely through verified app dispatches starting at launch.

### DEC-014: Admin-Configurable Slab-Based Incentive Engine & Gamified Retailer UI
- **Date:** 2026-10-20
- **Category:** Incentive Architecture & Mobile UI/UX
- **Status:** CONFIRMED (User Decision)
- **Decision:**
  1. Incentive calculations will be governed by an Admin-configurable, slab-based rule engine (e.g., reaching ₹1,00,000 in sales unlocks a 10% incentive/discount, configured dynamically by Admin from the Web Dashboard without hardcoding in application code).
  2. The Retailer mobile application will display active incentive schemes, promotional tiers, and real-time target progress in an engaging, animated e-commerce style format (e.g., Flipkart Big Billion Days banner promotions, dynamic progress bars, unlocked tier celebrations).
- **Evidence & Rationale:** Confirmed by user on 2026-10-20. Empowers management to launch seasonal schemes dynamically while creating high retailer motivation.
- **Impact on Future Work:** Drives database modeling for dynamic slabs (`incentive_schemes`, `scheme_slabs`), mobile design tokens in Phase 4, and reactive incentive ledger triggers in Phase 10.

### DEC-015: Master Company Excel Sheet for Catalog & MRP Ingestion
- **Date:** 2026-10-20
- **Category:** Product & Catalog Management
- **Status:** CONFIRMED (User Decision)
- **Decision:** Ankur Paints management will provide the authoritative master Excel sheet containing all products, shades, pack sizes, and printed MRP columns. The Web Admin Dashboard bulk catalog importer will be engineered to parse and ingest this format.
- **Evidence & Rationale:** Confirmed by user on 2026-10-20. Resolves the source of MRP data.
- **Impact on Future Work:** Informs Phase 5 database schema (`skus.mrp` column) and Phase 7/11 Excel parsing logic.

### DEC-016: Formal Sign-off of Phase 1 & Advancement to Phase 2
- **Date:** 2026-10-20
- **Category:** Project Management & Governance
- **Status:** CONFIRMED (User Authorization)
- **Decision:** Phase 1 (Requirements Discovery, SOP Analysis & Project Continuity Foundation) is formally completed and signed off. The project officially advances to **Phase 2: Technical Architecture & System Design**.
- **Evidence & Rationale:** User reviewed requirements and authorized transition on 2026-10-20.
- **Impact on Future Work:** Commences authoring of `docs/TECHNICAL_ARCHITECTURE.md` (System Architecture, Supabase Database ERD, RLS matrices, State Machines, API Specifications).

### DEC-017: GitHub Remote Repository Linked & Synced
- **Date:** 2026-10-20
- **Category:** DevOps & Version Control
- **Status:** CONFIRMED
- **Decision:** Project repository is linked to official GitHub remote: `https://github.com/WhisperingPetX/ankur-paints.git`. Branch `main` is published and tracked.
- **Evidence & Rationale:** Verified successful git push on 2026-10-20.
- **Impact on Future Work:** Continuous cloud backup and version control for all subsequent phases.

### DEC-018: Executable Database Migrations & Seed Data Authored (Phase 5)
- **Date:** 2026-10-20
- **Category:** Database Architecture & Migrations
- **Status:** CONFIRMED
- **Decision:**
  1. Author executable Supabase PostgreSQL migrations in `supabase/migrations/20261020000001_initial_schema.sql` implementing all 12 core tables: `profiles`, `products`, `skus`, `retailer_inventory`, `stock_transactions`, `dispatches`, `dispatch_items`, `sales`, `sale_items`, `incentive_schemes`, `scheme_slabs`, `retailer_incentives`.
  2. Implement strict invariant database constraints: `chk_selling_price_mrp` (`selling_price <= mrp`), `chk_stock_non_negative` (`current_stock >= 0`), and `uq_sales_idempotency` (`idempotency_key`).
  3. Implement Row Level Security (RLS) policies guaranteeing total retailer data isolation.
  4. Implement atomic stored procedures: `submit_retailer_sale` (concurrency-locked stock decrement, double-entry audit ledger, dynamic incentive slab accrual) and `submit_dispatch` (warehouse stock increment).
  5. Author official brand catalog seed data in `supabase/seed/seed.sql` populating the 9 verified Ankur Paints product lines, realistic SKU MRPs, deterministic QR payloads (`ANKUR_{PROD}_{SHADE}_{SIZE}`), and Diwali Dhamaka promotional target slabs.
- **Evidence & Rationale:** Fulfills Phase 2 technical design and stakeholder requirements.
- **Impact on Future Work:** Unlocks Phase 6 (Authentication & Security) and client-side Supabase client configuration.

### DEC-019: Authentication & Security Architecture Implemented (Phase 6)
- **Date:** 2026-10-20
- **Category:** Authentication & Application Security
- **Status:** CONFIRMED
- **Decision:**
  1. Author automatic user profile creation trigger `supabase/migrations/20261020000002_auth_trigger.sql` linking `auth.users` with `public.profiles`.
  2. Provide standardized environment variable templates (`.env.example`, `mobile/.env.example`, `web/.env.example`).
  3. Define full TypeScript domain database definitions for Supabase JS v2 client (`mobile/src/types/database.ts` and `web/src/types/database.ts`).
  4. Configure Supabase client services (`mobile/src/services/supabase.ts` and `web/src/services/supabase.ts`) with token auto-refresh and resilient session storage adapters.
  5. Build React Context Auth providers (`mobile/src/contexts/AuthContext.tsx` and `web/src/contexts/AuthContext.tsx`) managing active sessions, user roles (`retailer`, `admin`, `warehouse`), and login methods (password and phone OTP).
  6. Author production-grade branded `LoginScreen.tsx` with Flipkart-style promotional banner, tabbed password/OTP authentication, and phone prefix support.
- **Evidence & Rationale:** Implements secure RBAC and session lifecycle for both mobile and web surfaces.
- **Impact on Future Work:** Enables authenticated catalog viewing and QR scanner workflows in Phase 7.

### DEC-020: Product Catalog Master, Bulk Excel Importer & Static QR Engine (Phase 7)
- **Date:** 2026-10-20
- **Category:** Catalog Management & QR Operations
- **Status:** CONFIRMED
- **Decision:**
  1. Implement deterministic QR payload algorithm in `web/src/services/qrGenerator.ts`: `ANKUR_{PRODUCT}_{SHADE}_{SIZE}` (e.g. `ANKUR_EPIC_101_20L`).
  2. Build vector SVG label generator `generatePrintableBucketLabelSVG` with official Ankur Paints Cobalt Blue & Vermillion Orange corporate branding, shade description, printed MRP, and high-density scannable QR.
  3. Build bulk spreadsheet importer `web/src/services/excelImporter.ts` validating required headers (`Product Name`, `Category`, `Shade Code`, `Shade Name`, `Pack Size`, `Pack Unit`, `Printed MRP`), enforcing `mrp > 0`, detecting file-level duplicates, and generating sample CSV templates.
  4. Build catalog services (`web/src/services/catalogService.ts` and `mobile/src/services/catalogService.ts`) for batch upserting SKUs and resolving static QR payloads under 300ms.
  5. Author Admin Web page `CatalogManagement.tsx` for catalog overview, search/filtering, bulk modal ingestion, and single label printing.
  6. Author factory sticker sheet component `PrintableQRSheet.tsx` for printing bulk labels on standard A4 adhesive paper.
- **Evidence & Rationale:** Implements core company catalog ingestion and static QR generation workflows mandated in Phase 1 & 2.
- **Impact on Future Work:** Unlocks Phase 8 (Inventory and Stock Dispatch scanning).

---

## 4. Unresolved Architectural & Business Items (Requiring Clarification)

The following items remain open for future operational configuration:

### UNRES-001: Default Initial Target Slabs & Payout Settlement Cycle
- **Category:** Commercial / Incentive Operations
- **Status:** UNRESOLVED (Operational Configuration)
- **Description:** While the architecture is established as a dynamic Admin-configurable slab engine (`DEC-014`), the initial business values for launch (e.g. initial target milestones, discount percentages, and whether payout is monthly or quarterly) will be configured by Admin prior to go-live.

### UNRES-002: Exact Launch Year and Go-Live Date in January
- **Category:** Project Planning & Cutover
- **Status:** UNRESOLVED
- **Description:** Awaiting confirmation of the exact calendar year (e.g. January 2027) and specific calendar day in January for production launch cutover.

### UNRES-003: Offline Operation Policy
- **Category:** Mobile Network Architecture
- **Status:** UNRESOLVED
- **Description:** Awaiting decision on whether offline scanning/checkout is supported, given the strict rule that sales exceeding stock must be blocked.
