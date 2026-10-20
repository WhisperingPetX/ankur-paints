# Ankur Paints — Prioritized Open Questions Log

**Phase:** Phase 2 — Technical Architecture & System Design  
**Last Updated:** 2026-10-20  
**Status:** Requirements Phase Approved — Operational Configuration Items Cataloged  
**Rule:** Do not invent answers or make guesses for unresolved operational items.

---

## 1. Remaining Operational & Policy Questions (For Phase 2 & Beyond)

The core domain architecture (SKU QR, stock blocking, selling price $\le$ MRP, clean January start, and dynamic slab-based incentives) is fully confirmed. The following questions represent operational policies to be configured during system development and pre-launch setup:

### 1. [OQ-LCH-01] Exact Launch Year and Go-Live Date in January
- **The Question:** It is confirmed that tracking starts clean from the app's agreed launch in January with no historical stock migration (`DEC-013`). What is the specific calendar year (e.g., January 2027) and the exact go-live day for commencement of tracking?
- **Why it matters:** Defines project delivery timelines, release milestones, and initial ledger cut-over dates.
- **Consequences:** Informs roadmap scheduling and production deployment cutover planning.
- **Who should confirm:** Executive Sponsor / Project Manager.
- **Status:** **OPEN (Planning Dependency)**.

### 2. [OQ-ADJ-01] Returns, Damaged/Lost Stock & Inventory Adjustments
- **The Question:** What is the business procedure when paint is damaged in transit, spoiled, leaked, or returned from a retailer to the factory? How are customer returns to the retailer recorded?
- **Why it matters:** In strict inventory accounting, physical shrinkage or returns cannot simply delete history; they require explicit debit/credit adjustments.
- **Consequences:** Dictates adjustment transaction types (`DAMAGE_WRITE_OFF`, `FACTORY_RETURN`, `STOCK_AUDIT_ADJUSTMENT`, `CUSTOMER_RETURN`) in the inventory ledger.
- **Who should confirm:** Warehouse Manager & Internal Auditor.
- **Status:** **OPEN**.

### 3. [OQ-OFF-01] Offline Scanning & Synchronization Behavior
- **The Question:** Must the retailer mobile app support offline scanning when mobile cellular coverage is unavailable? If yes, how should the app enforce the rule that "sales exceeding available stock are strictly blocked" without real-time database validation?
- **Why it matters:** Offline validation with cached balances introduces risk of concurrent overselling and fraudulent incentive farming across multiple phones.
- **Consequences:** Requires heavy local offline persistence (SQLite/WatermelonDB) with conflict-resolution algorithms vs. a clean, secure online-only architecture with friendly cellular retry handling.
- **Who should confirm:** Technical Architect & Business Sponsor.
- **Status:** **OPEN**.

### 4. [OQ-PRV-01] Customer Data Privacy, Consent & Retention
- **The Question:** Under the Indian Digital Personal Data Protection Act (DPDPA 2023), does Ankur Paints require an explicit customer consent opt-in (checkbox/SMS) when capturing Customer Name and Mobile Number at retail paint counters? How long are customer phone numbers retained?
- **Why it matters:** Regulatory compliance and user privacy liability.
- **Consequences:** Mobile checkout UI design, database retention schedules, and terms-of-service consent text.
- **Who should confirm:** Legal Advisor / Compliance Officer.
- **Status:** **OPEN**.

### 5. [OQ-PAY-01] Actual Incentive Payout Execution / Payment Integration
- **The Question:** How are approved incentives actually disbursed to retailers? Are payouts handled manually outside the system (e.g., credit notes against future paint orders, physical checks, manual NEFT), or will a digital banking/UPI payout gateway be integrated in a later phase?
- **Why it matters:** Clarifies whether "Payout Status" in the dashboard is merely an administrative toggle/ledger entry or requires payment gateway webhook states.
- **Consequences:** Determines whether bank account/UPI fields are needed in retailer KYC profiles and whether payout batch exports are needed.
- **Who should confirm:** Finance / Accounts Head.
- **Status:** **OPEN**.

### 6. [OQ-SEC-01] Static QR Copying & Counterfeit Prevention Controls
- **The Question:** Since QR codes are static per SKU (the same printed QR on every can), what prevents a retailer or rogue party from copying or photographing the QR code and repeatedly scanning fake sales to illegitimately claim incentives?
- **Why it matters:** Static QR codes inherently lack cryptographic single-use security; fraud prevention must rely on procedural or secondary checks (e.g. stock exhaustion, customer verification, rate limiting, location geofencing).
- **Consequences:** Need for rate-limiting algorithms, daily scan thresholds, or customer OTP verification at checkout.
- **Who should confirm:** Management & Security Architect.
- **Status:** **OPEN**.

### 7. [OQ-ACK-01] Retailer Stock Receipt Acknowledgement
- **The Question:** Does a stock dispatch immediately credit the retailer's live available stock upon Admin submission, or must the retailer inspect the physical delivery and explicitly "Acknowledge / Accept" the dispatch on their mobile app?
- **Why it matters:** Protects against stock discrepancies between what the factory shipped and what the retailer actually received.
- **Consequences:** Dictates whether the dispatch status lifecycle includes `DISPATCHED` $\rightarrow$ `RECEIVED` or transitions immediately to `ACTIVE_STOCK`.
- **Who should confirm:** Supply Chain / Sales Head.
- **Status:** **OPEN**.

### 8. [OQ-ROL-01] Granular User Roles, Permissions & Retailer Data Isolation
- **The Question:** What are the exact administrative sub-roles (e.g., Super Admin, Dispatch Clerk, Regional Sales Manager, Auditor) and their specific permissions? Are Regional Sales Managers restricted to viewing data for their assigned geographic territory?
- **Why it matters:** Database Row Level Security (RLS) policies and dashboard navigation guards depend directly on the role taxonomy.
- **Consequences:** Role schema definition in Supabase Auth metadata and RLS policies on sales/dispatch tables.
- **Who should confirm:** Management / HR.
- **Status:** **OPEN**.

---

## 2. Questions Formally Resolved by Stakeholder Decisions & SOP

| ID | Topic | Resolution Details | Evidence / Source |
| :--- | :--- | :--- | :--- |
| **OQ-INC-01** | Incentive Calculation & Targets | **RESOLVED:** Admin configures targets and incentive/discount slabs dynamically from the Web Dashboard (e.g., ₹1 Lakh sales $\rightarrow$ 10% discount). Retailer app displays active schemes in an engaging, animated e-commerce style format (`DEC-012`, `DEC-014`). Initial default values to be set in dashboard by Admin. | Stakeholder Decision (2026-10-20) |
| **OQ-MRP-01** | Source of SKU MRP | **RESOLVED:** Ankur Paints management will provide the company master Excel catalog containing all SKUs, shades, packaging sizes, and printed MRP columns. Web admin bulk catalog importer will ingest this file (`DEC-015`). | Stakeholder Decision (2026-10-20) |
| **OQ-PRC-01** | Retailer Selling Price & MRP Ceiling | **RESOLVED:** Retailer manually enters selling price for each line item ($\text{Selling Price} \le \text{MRP}$). The app validates and strictly blocks sales if price > MRP (`DEC-011`). | Stakeholder Decision (2026-10-20) |
| **OQ-STK-01** | Initial Stock & Tracking Start | **RESOLVED:** Historical stock and sales from before launch are **excluded from migration**. Tracking starts clean from January launch (`DEC-013`). | Stakeholder Decision (2026-10-20) |
| **OQ-QR-01** | QR Serialization Depth | **RESOLVED:** One static QR code per SKU ($\text{Product} + \text{Shade} + \text{Pack Size}$). No per-unit serialization (`DEC-008`). | Supplied SOP Transcription |
| **OQ-QR-03** | QR Code Printing & Catalog Setup | **RESOLVED:** Admin sets up products individually or imports the catalog in bulk from Excel. Static QR codes are generated per SKU. | Supplied SOP Transcription |
| **OQ-SAL-01** | Customer Data Fields | **RESOLVED:** Customer Name and Customer Mobile Number must be collected once per sale transaction (`REQ-SAL-02`). | Supplied SOP Transcription |
| **OQ-INV-01** | Dispatch Mechanics & Sales Blocking | **RESOLVED:** Dispatch scanning adds qty 1 on first scan, increments on repeat scans, and allows manual edit. Dispatch increases retailer stock. Sales validate stock and **strictly block sales exceeding stock** (no negative stock) (`DEC-009`). | Supplied SOP Transcription |
| **OQ-TXN-01** | Record Immutability & Reversals | **RESOLVED:** Dispatches and sales entries are timestamped and linked to user IDs. Submitted records cannot be edited in place; corrections require new entries or compensating reversals (`DEC-009`). | Supplied SOP Transcription |
| **OQ-INT-01** | Tally & Zoho Integration | **RESOLVED:** Tally billing continues unchanged and independently; **no Tally integration will be built**. **Zoho Creator will NOT be used**. Stack is custom React Native + Supabase (`DEC-003`, `DEC-007`). | Explicit User Decision & SOP Transcription |
| **OQ-REP-01** | Core Reporting Scope | **RESOLVED:** Web admin dashboard must report on product/category sales, area/regional performance, retailer stock levels, dispatch history, and accrued incentives / payout status (`REQ-REP-01`). | Supplied SOP Transcription |
