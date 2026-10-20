# Ankur Paints Digital Operations Platform

A production-grade B2B digital operations platform connecting central paint manufacturing and warehouse management with authorized paint retail partners.

---

## 📌 Project Overview

- **Retailer Mobile Application:** Android app (React Native + Expo + TypeScript) enabling authorized retailers to scan static SKU QR codes, assemble customer carts, capture customer details, enter selling prices ($\le$ printed MRP), validate inventory, submit sales atomically, view animated target schemes, and track incentive accruals.
- **Web Admin Dashboard:** Central management portal (React + TypeScript) for managing products/SKUs, bulk importing catalogs and MRP from company Excel sheets, setting target slabs, generating static QR codes, dispatching inventory, monitoring sales, and exporting operational audit reports.
- **Backend & Database:** Supabase (PostgreSQL) with Row Level Security (RLS), atomic ACID stored procedures, and double-entry immutable inventory ledgers.

---

## 🗂️ Project Directory Structure

```
ankur_paints/
├── docs/                      # Architectural specifications & project governance
│   ├── AI_CONTINUITY.md       # AI pair-programming rules & session context protocols
│   ├── DECISIONS_LOG.md       # Architectural Decision Records (ADRs)
│   ├── OPEN_QUESTIONS.md      # Prioritized active blockers & resolved questions
│   ├── PROJECT_HANDOVER.md    # Self-contained session handover document
│   ├── PROJECT_REQUIREMENTS.md# Comprehensive functional and non-functional requirements
│   ├── PROJECT_STATUS.md      # Live project status and next action tracker
│   └── TECHNICAL_ARCHITECTURE.md # System architecture, database ERD, RLS & API specs
├── mobile/                    # Retailer Android Application (React Native + Expo)
│   ├── assets/                # App icons, splash screens, scheme banner graphics
│   └── src/
│       ├── components/        # Reusable UI widgets & animated scheme cards
│       ├── constants/         # Theme colors, typography, layout constants
│       ├── navigation/        # App navigation stacks (Auth, Main, Tabs)
│       ├── screens/           # Dashboard, Scanner, Cart, SalesHistory, Incentives
│       ├── services/          # Supabase client, camera scanner, offline resilience
│       └── types/             # TypeScript database & navigation interfaces
├── web/                       # Administrative Web Dashboard (React + TypeScript)
│   ├── public/                # Static assets and templates
│   └── src/
│       ├── components/        # Layout, Sidebar, MetricsCards, SchemeConfigurator
│       ├── pages/             # Dashboard, Products, Dispatches, Sales, Incentives
│       ├── services/          # Supabase admin client, Excel bulk catalog parser
│       └── types/             # TypeScript schema models
├── supabase/                  # Backend Database & Functions
│   ├── migrations/            # Version-controlled PostgreSQL SQL migrations (Phase 5)
│   ├── seed/                  # Initial seed scripts (master categories, test SKUs)
│   └── functions/             # Supabase Edge Functions (webhooks, batch jobs)
├── .gitignore                 # Standardized ignore rules for secrets, dependencies & builds
└── README.md                  # This file
```

---

## 🚀 15-Phase Roadmap Status

| Phase | Description | Status |
| :---: | :--- | :---: |
| **1** | Requirements Discovery & SOP Analysis | ✅ **Completed & Approved** |
| **2** | Technical Architecture & System Design | ✅ **Completed & Approved** |
| **3** | Development Environment & Git Setup | 🔄 **In Progress (Active)** |
| **4** | UI/UX Design System & Mobile Tokens | ⏳ Scheduled |
| **5** | Database Schema & SQL Migrations | ⏳ Scheduled |
| **6** | Authentication & Row Level Security | ⏳ Scheduled |
| **7** | Product & Static QR-Code System | ⏳ Scheduled |
| **8** | Inventory Ledger & Stock Dispatch | ⏳ Scheduled |
| **9** | Retailer Sales & Cart Engine | ⏳ Scheduled |
| **10** | Dynamic Slab Incentive Engine | ⏳ Scheduled |
| **11** | Admin Web Dashboard & Excel Importer | ⏳ Scheduled |
| **12** | End-to-End Cross-Platform Integration | ⏳ Scheduled |
| **13** | Automated Testing & Bug Fixes | ⏳ Scheduled |
| **14** | Security, Load & Recovery Testing | ⏳ Scheduled |
| **15** | Production Launch & Operations Handover | ⏳ Scheduled |

---

## 🔒 Security & Data Integrity Principles

- **No Negative Stock:** Database triggers strictly reject any transaction exceeding available physical inventory.
- **MRP Enforcement:** All sales enforce $\text{Selling Price} \le \text{MRP}$ via client validation and database check constraints.
- **Tenant Isolation:** PostgreSQL Row Level Security (RLS) ensures complete data separation between retail outlets.
- **Immutable Ledger:** Stock movements are recorded as append-only transactions in `stock_transactions`.
