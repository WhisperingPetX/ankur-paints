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
- **Current Phase:** Official Colorful Master Platform (Matching Master ChatGPT Blueprint) Live on `http://localhost:3000`.
- **Verified State:**
  - Full translation of the user's master ChatGPT landing page mockup and uploaded artwork executed with pixel-perfect precision:
    1. **Colour Navbar (`ColourNavbar.tsx`):** Vector SVG brand logo, links (`Home`, `Products`, `Our Colors`, `About Us`, `Living Spaces`, `Contact`), search action, dark `Login` pill, and white `Sign in with Google` button with official Google 'G' icon.
    2. **Master Hero Section (`ColourHero.tsx`):** Full-bleed modern living room with vibrant paint explosion mural (`hero_splash_living_room.jpg`), bold display headline (*"Colour Your World"*), subtitle, and warm orange CTA pill (*"Explore Our Products →"*).
    3. **Cans Lineup Strip (`CansLineupStrip.tsx`):** Master Ankur product packaging lineup (`ankur_lineup_master.png`) on glossy reflective surface with colorful liquid splashes + 4 trust pillars (*Long Lasting Protection, Low VOC & Eco Friendly, Rich & Vibrant Colours, For Homes, Offices & Industries*).
    4. **Why Ankur Section (`WhyAnkurSection.tsx`):** *"More Than Just Paint — It's a Feeling"* with stylized paint explosion room photo and 4 round feature badges (*Wide Range of Colours, Superior Coverage, Safe for Your Family, Premium Quality*).
    5. **Explore Our Paint Range (`PaintRangeSection.tsx`):** 4 visual category cards (*Interior Emulsion, Exterior Emulsion, Industrial Paints, Speciality Coatings*).
    6. **Approved Spaces Showcase (`ApprovedSpacesShowcase.tsx`):** The user's two approved house designs preserved (*Penthouse Interior: Velvety Depth / Villa Facade: Extreme Climate Armor*).
    7. **Vibrant Paint Splash Banner (`ColourfulSplashBanner.tsx`):** Dark navy banner with rainbow paint wave artwork (`rainbow_splash_wave.png`), *"LET'S COLOUR YOUR WORLD"*, vector logo, and *"Get In Touch →"*.
    8. **Clean Master Footer (`ColourFooter.tsx`):** Vector logo, navigation links, social icons, and toll-free helpline `1800-266-1999`.
    9. **Google OAuth Modal (`GoogleAuthModal.tsx`):** Authentic Google account chooser with 1-click sign in and confetti.
  - Production build (`next build`) compiled successfully in **5.5 seconds** with zero errors.
  - Next.js 15 production server running in daemon mode on `http://localhost:3000` (HTTP 200 verified).
  - Pushed to GitHub repository `origin/main` (`32729d2`).
- **Exact Next Action:**
  > **Review with user on http://localhost:3000 and proceed to live Supabase data hookups.**

---

## 5. INSTRUCTIONS FOR THE NEXT CHATGPT

When a user begins a new conversation with you to continue this project:

1. **Read the handover and status documentation provided by the user:** Immediately review `docs/PROJECT_HANDOVER.md`, `docs/PROJECT_REQUIREMENTS.md`, and `docs/TECHNICAL_ARCHITECTURE.md` before taking any action.
2. **Inspect the actual available project files before assuming anything:** Check the physical directory (`C:\Users\acer\.gemini\antigravity\scratch\ankur_paints`) and verify Git status. Never rely purely on conversation memory or assume files exist without checking.
3. **Continue from the latest verified state rather than restarting completed work:** Phases 1 through 7 are fully completed. The cloud database is live with 12 tables and 9 official products.
4. **Make one small, verifiable step at a time:** Do not jump ahead across multiple phases. Produce complete, working code, test thoroughly, update the handover document, and wait for verification.
