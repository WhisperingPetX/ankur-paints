# Ankur Paints Project Requirements Specification

**Document Version:** 1.4.0  
**Phase:** Phase 1 Complete (Approved) — Transitioning to Phase 2 (Technical Architecture)  
**Last Updated:** 2026-10-20  
**Status:** Requirements Baseline Approved by User — Ready for Technical Architecture & ERD Design

---

## 1. Document Provenance & Discovery Context

> [!IMPORTANT]
> **Source & Provenance Note:**  
> - **SOP Source:** The original five-page Ankur Paints Standard Operating Procedure (SOP) exists, as confirmed by the user. Due to session attachment upload limits, the original document images could not be directly uploaded into the chat conversation. The core operational requirements documented here were extracted and reconciled from a detailed textual transcription of the SOP's operational requirements supplied directly by the user. Antigravity has not independently inspected the original image files.
> - **Stakeholder Decisions Source:** Direct stakeholder answers provided on 2026-10-20 confirming: (1) retailer selling price entry capped at printed MRP with validation blocking; (2) admin target-setting capability from web dashboard (distinguished from unconfirmed incentive formulas); and (3) clean tracking start from January launch with explicit exclusion of historical stock/sales migration.

---

## 2. Project Purpose and Scope

### 2.1 Purpose
The purpose of the Ankur Paints digital platform is to streamline inventory tracking, sales recording, and incentive tracking for paint products manufactured and distributed by Ankur Paints. The platform connects factory/warehouse administration with authorized retail partners via static QR identification, real-time transaction logging, and automated reporting.

### 2.2 Selected Technology Direction
The following technical stack direction has been formally selected by the user for development (`DEC-021`):
- **Unified Modern Web Platform & Retailer Portal:** Next.js 15 + React 19 + TypeScript + Tailwind CSS + Framer Motion (responsive luxury web application serving desktop, tablet, and smartphone form factors).
- **Google Play Store Mobile App Export:** CapacitorJS / Google Trusted Web Activities (TWA) compiling the web platform into an installable Android `.apk` / `.aab` package with native camera access for QR scanning.
- **Backend Infrastructure & Database:** Supabase (PostgreSQL with Row Level Security, ACID Check Constraints, and Google OAuth Auth).
- **Explicit Platform Decisions:**
  - **Zoho Creator will NOT be used.**
  - **Separate React Native / Expo codebase discarded (`DEC-021`)** in favor of a single unified responsive web codebase exportable to Play Store.

### 2.3 Comprehensive Technology Matrix & Role in the Project
The selected technologies and their exact roles are defined below:

| Technology / Library | Version / Scope | Primary Role & Responsibility |
| :--- | :--- | :--- |
| **Next.js 15 (React 19)** | Framework | Core application framework providing App Router, SSR for high-speed landing page rendering, client components for interactive POS, and zero-latency routing. |
| **TypeScript** | Language | End-to-end type safety across database schemas, API responses, cart state, and business logic. Eliminates runtime crashes. |
| **Tailwind CSS** | Styling | Utility-first responsive CSS styling with custom brand tokens (Ankur Cobalt Blue `#004B87`, Paints Vermillion `#E8501E`, glassmorphic backdrops, ambient mesh auroras). |
| **Framer Motion & GSAP** | Animation | International-grade fluid animations, luxury scroll-triggered reveals, smooth product card transitions, and interactive visualizer transitions. |
| **Supabase (PostgreSQL)** | Cloud Database | Live cloud database (`wpiztkjuojirzsxvzqfv.supabase.co`) with 12 relational tables, RLS data isolation, ACID checks (`Selling Price <= MRP`, `Stock >= 0`), and atomic RPC stored procedures. |
| **Supabase Auth & Google OAuth** | Authentication | Frictionless Google One-Tap sign-in and session management for retailers and admins, triggering instant KYC profile initialization. |
| **Html5-Qrcode** | Hardware Scanner | Cross-platform camera-based barcode/QR code reader operating directly in mobile/desktop browsers and Android WebViews. |
| **Canvas Confetti** | Gamification | High-performance celebratory particle effects when retailers hit incentive slabs and complete transactions. |
| **Lucide React** | Icons | Modern, clean vector icon set for crisp interface representation on high-DPI displays. |
| **CapacitorJS / Google TWA** | Android Export | Bridges the responsive web application into a native Android APK/AAB package for Google Play Store distribution with zero codebase duplication. |

### 2.3 Scope Boundaries & External System Relationships
- **Tally Billing Workflow Independence:** Tally billing continues unchanged within Ankur Paints' existing accounting operations. There is **no Tally integration** and no Zoho Creator integration. The new platform operates independently of the Tally billing system; no Tally connectors, synchronization scripts, or middleware will be developed.
- **Consumer Direct-to-Consumer (D2C) E-commerce:** Excluded. The platform is strictly designed for B2B retailer sales logging.
- **Direct Digital Payment Processing:** Excluded. No consumer-facing payment gateways or retail checkout payment gateways are in scope.
- **Automated Bank Payout Disbursements:** Direct bank transfers or automated payout processing for retailer incentives are unconfirmed; the system tracks and audits incentive accruals and payout status only.

---

## 3. Reconciled Functional Requirements

### 3.1 Product & SKU Architecture
- **[REQ-SKU-01] SKU Definition:** A Stock Keeping Unit (SKU) is formally defined by the composite key:  
  $$\text{SKU} = \text{Product} + \text{Shade} + \text{Pack Size}$$
- **[REQ-QR-01] Static QR Code per SKU:** There is **one static QR code per SKU**. The identical QR code is applied to all physical cans/buckets of that specific SKU. There is **no per-unit serialization** (individual cans do not have unique serial numbers or GUIDs).
- **[REQ-PRD-01] Catalog Entry & Bulk Import:** The Admin web dashboard must support:
  1. Individual SKU creation and editing.
  2. Bulk catalog import from Excel spreadsheets (`.xlsx` / `.csv`).
- **[REQ-PRD-02] Master Catalog & Printed MRP Ingestion:** Each SKU has an authoritative printed Maximum Retail Price (MRP). Ankur Paints management will provide the company master Excel sheet containing the complete SKU catalog, shade codes, container pack sizes, and MRP columns. The web admin bulk catalog importer will ingest this file directly into the database (`DEC-015`).

### 3.2 Inventory Tracking & Launch Scope
- **[REQ-TRK-01] Clean Launch Tracking Start (No Historical Migration):**
  - Historical stock and prior sales from before the app's launch **do not need to be imported or counted**. No opening-stock migration tool or historical data load will be built.
  - Tracking begins fresh from the agreed launch in January.  
    *(Note: The exact calendar year and go-live date in January require formal confirmation).*
  - From go-live onward, the platform tracks only app-recorded stock dispatches, app-recorded retail sales, and the resulting live stock balances.
- **[REQ-DSP-01] QR Dispatch Scanning:** When warehouse/admin dispatches stock to a retailer:
  - Scanning a SKU QR code for the first time adds the SKU to the dispatch cart with quantity = 1.
  - Repeated scans of the same QR code increment the line quantity by 1.
  - Manual numeric quantity adjustment on the dispatch cart line is permitted.
- **[REQ-DSP-02] Retailer Stock Increment:** Submitting the dispatch transaction immediately increases the selected retailer's available stock balance in the system.

### 3.3 Retailer Sales Workflow (Web & Android App)
- **[REQ-SAL-01] Multi-SKU Cart Scanning:** Retailers can scan multiple different SKU QR codes within a single customer sales transaction.
- **[REQ-SAL-02] Customer Information Capture:** The mobile app must capture the end-customer's **Customer Name** and **Customer Mobile Number** once per sale transaction.
- **[REQ-SAL-03] Strict Stock Validation & Blocking:** Prior to sale submission, the platform must validate that the retailer has sufficient available stock for all line items. **Sales exceeding available retailer stock must be strictly blocked** (negative inventory balances are strictly prohibited).
- **[REQ-SAL-04] Retailer Selling Price Entry & MRP Ceiling Validation:**
  - The retailer manually enters the actual selling price for each line item during a sale.
  - The entered selling price may equal or be lower than the SKU's printed MRP, but **must never exceed MRP** ($\text{Selling Price} \le \text{MRP}$).
  - The mobile app must validate the entered selling price against the SKU's MRP and **strictly block the sale if the selling price exceeds MRP**.
- **[REQ-SAL-05] Stock Decrement & Incentive Calculation:** Upon successful submission of a valid sale:
  1. The retailer's available stock is automatically decremented.
  2. The sale transaction is recorded.
  3. The applicable retailer incentive is calculated and recorded.

### 3.4 Transaction Integrity, Immutability & Audit Trail
- **[REQ-AUD-01] User Attribution & Timestamps:** All stock dispatches and sales submissions must be automatically timestamped and permanently linked to the authenticated user ID who submitted the entry.
- **[REQ-AUD-02] Immutable Submitted Records:** Submitted dispatches and sales entries cannot be directly edited or updated in place. Any required corrections must be executed through explicit new adjustment entries or compensating reversal records.

### 3.5 Administrative Dashboard & Performance Management
- **[REQ-TGT-01] Admin Target & Slab Configuration:** The admin can configure, activate, and modify sales performance targets and discount/incentive slabs from the Web Admin Dashboard (e.g., reaching ₹1,00,000 in qualifying sales unlocks a 10% incentive/discount reward) (`DEC-012`, `DEC-014`).
- **[REQ-UI-01] Gamified Promotional Scheme Display on Mobile:** The retailer Android application will display active incentive schemes, promotional tiers, and real-time target completion in an engaging, animated e-commerce style format (e.g., Flipkart Big Billion Days promotional cards, animated progress meters, milestone unlocked banners) (`DEC-014`).
- **[REQ-REP-01] Core Reporting Views:** The web admin dashboard must provide tabular and filterable reporting covering:
  - Product and category sales volume and trends.
  - Area or regional sales performance.
  - Real-time retailer stock levels.
  - Historical dispatch logs.
  - Accrued retailer incentives and incentive payout status.

---

## 4. Unresolved Business Decisions & Operational Questions

The following operational configurations and business edge-cases remain to be confirmed prior to production deployment:

1. **Initial Scheme Tiers & Payout Cycle [OQ-INC-01]:** While the architecture supports dynamic Admin-configurable slabs (e.g. ₹1 Lakh $\rightarrow$ 10% discount), the initial business values for launch and whether payout reconciliation occurs monthly or quarterly remain to be configured.
2. **Exact Launch Year & Go-Live Date [OQ-LCH-01]:** Tracking starts from the agreed January launch (`REQ-TRK-01`), but the exact calendar year (e.g., January 2027) and specific go-live day require confirmation.
3. **Returns, Damaged Goods & Adjustments [OQ-ADJ-01]:** Rules for handling broken buckets, factory returns, expired stock, and inventory shrinkage.
4. **Offline Scanning & Sync Behavior [OQ-OFF-01]:** Whether the mobile app permits offline scanning when cellular data is unavailable, and how stock validation/fraud prevention behaves without live connectivity.
5. **Customer Data Privacy & Retention [OQ-PRV-01]:** Compliance with Indian DPDPA 2023, customer consent protocols at retail counter, and data retention durations.
6. **Incentive Payout Integration [OQ-PAY-01]:** Whether incentive payouts are settled manually offline (cash/credit note) or will require future payment gateway/banking integration.
7. **QR Counterfeit & Copy Controls [OQ-SEC-01]:** Measures to prevent unauthorized duplication of static QR codes or fraudulent cart submissions.
8. **Retailer Stock Receipt Acknowledgement [OQ-ACK-01]:** Whether retailers must explicitly inspect and "Accept" dispatched stock, or if dispatch automatically makes stock live immediately.
9. **Roles, Permissions & Isolation [OQ-ROL-01]:** Granular permission matrix for admin sub-roles (dispatch officer vs accountant) and multi-region branch isolation.

---

## 5. Non-Functional Requirements (NFRs)

### 5.1 Security
- **Data Protection:** TLS 1.3/1.2 for all client-server communications.
- **Database-Level Authorization:** PostgreSQL Row Level Security (RLS) ensuring strict tenant isolation (retailers can never read or alter other retailers' stock, sales, or incentive records).
- **Credential Hygiene:** Zero hardcoded secrets, connection strings, or service role keys in source code or documentation.

### 5.2 Reliability & ACID Integrity
- **Atomic Checkout Transactions:** Sales submissions that simultaneously decrement stock, record sales items, and create incentive ledger entries must execute within an atomic PostgreSQL transaction block.
- **Idempotency Protection:** Double-submission prevention via client-generated request tokens to safeguard against repeated tapping during cellular connection delays.

### 5.3 Performance
- **QR Lookup Responsiveness:** Static SKU QR lookup resolution < 500ms on 4G networks.
- **Cart Interactions:** Instantaneous local UI responsiveness (< 50ms) for quantity adjustments and price validation.

---

## 6. Proposed Project Roadmap (15 Phases)

1. **Phase 1: Requirements and SOP Analysis** *(Completed & Approved)* — Workspace audit, SOP transcription reconciliation, decisions log, open questions catalog, and handover baseline.
2. **Phase 2: Technical Architecture** *(Active)* — System architecture, ERD, API schema, tech stack specification (React Native Expo + Supabase), and state machines.
3. **Phase 3: Development Environment and Git Setup** — Repository setup, linting, formatting, environment variables, and branch policy.
4. **Phase 4: UI/UX Design System** — Design tokens, component library, mobile wireframes, and dashboard layouts.
5. **Phase 5: Database Schema and Migrations** — Supabase/PostgreSQL tables, foreign keys, RLS policies, indices, and audit triggers.
6. **Phase 6: Authentication and Security** — Supabase Auth, role-based access, and session management.
7. **Phase 7: Product and QR-Code System** — SKU catalog master, bulk Excel import, MRP management, and static QR generator (vector/PNG export).
8. **Phase 8: Inventory and Stock Dispatch** — Factory dispatch scanning engine, retailer stock ledger, and dispatch logs.
9. **Phase 9: Retailer Sales and Cart** — Mobile QR scanning, multi-SKU cart, customer name/mobile capture, selling price vs MRP validation, stock validation check, and atomic checkout.
10. **Phase 10: Incentive and Transaction Logic** — Target-setting interface, dynamic slab rule engine, ledger entries, and payout status tracking.
11. **Phase 11: Admin Web Dashboard** — Product management, Excel importer, target/slab management, dispatch management, live sales oversight, and reporting views.
12. **Phase 12: End-to-End Integration** — Comprehensive cross-platform integration between mobile app, admin portal, and Supabase backend.
13. **Phase 13: Testing and Bug Fixes** — Automated unit tests, integration tests, negative stock boundary testing, price-exceeding-MRP blocking tests, and UI bug squashing.
14. **Phase 14: Security, Load and Recovery Testing** — RLS vulnerability assessment, concurrency testing, and backup/restore verification.
15. **Phase 15: Production Launch and Handover** — Production environment provisioning, app release packaging, runbook delivery, and handover.

---

## 7. Document Change History

| Date | Author | Summary of Changes |
| :--- | :--- | :--- |
| 2026-10-20 | Senior Architect | Initial creation of requirements specification baseline for Phase 1. |
| 2026-10-20 | Senior Architect | Phase 1 Documentation Audit: Clarified Tally status and container size examples. |
| 2026-10-20 | Senior Architect | Phase 1 Requirements Reconciliation: Recorded SOP provenance; confirmed React Native + Expo + Supabase; recorded static QR per SKU, SKU definition, Excel import, dispatch increment, retailer stock blocking, customer name/mobile capture, immutable logs, and independent Tally workflow. |
| 2026-10-20 | Senior Architect | Phase 1 Stakeholder Decisions Update: Recorded retailer selling price entry capped at printed MRP with app validation blocking (`REQ-SAL-04`); admin target-setting capability distinguished from unconfirmed incentive formulas (`REQ-TGT-01`); and tracking start from January launch with explicit exclusion of historical stock/sales migration (`REQ-TRK-01`). |
| 2026-10-20 | Senior Architect | Phase 1 Final Approval & Phase 2 Transition: Formally recorded Admin-configurable slab-based incentive engine (`DEC-014`), animated promotional display on mobile app (`REQ-UI-01`), company master Excel sheet for catalog/MRP (`DEC-015`), and user authorization to complete Phase 1 and advance to Phase 2 (`DEC-016`). |
