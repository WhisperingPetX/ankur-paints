-- ============================================================================
-- Ankur Paints Digital Operations Platform — Official Seed Data
-- Target Database: PostgreSQL 15+ (Supabase)
-- Populates: Calibrated Brand Product Lines, Real Market SKUs & MRPs,
--            Static QR Payloads, Diwali Dhamaka Gamified Incentive Slabs,
--            and Local Demo Retailer Inventory.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. BRAND PRODUCTS (Official Ankur Paints & Inks Packaging Lineup)
-- ----------------------------------------------------------------------------

INSERT INTO products (id, name, category, description, warranty_years, theme_color, is_active)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'Epic Coat', 'Exterior Emulsion', 'Flagship ultra-durable exterior paint with silicone additives and anti-algal shield.', 5, '#312E81', true),
    ('a0000000-0000-0000-0000-000000000002', 'Rang Ritu', 'Interior Emulsion', 'Luxury rich sheen interior paint offering superior stain resistance and washability.', 7, '#BE185D', true),
    ('a0000000-0000-0000-0000-000000000003', 'Gleam Coat', 'Exterior Emulsion', 'High-performance exterior weather-guard paint with brilliant sheen finish.', 3, '#0F766E', true),
    ('a0000000-0000-0000-0000-000000000004', 'Rose Gold', 'Exterior Emulsion', 'Premium weather-proof exterior coating with enhanced color retention.', 2, '#991B1B', true),
    ('a0000000-0000-0000-0000-000000000005', 'Colour Crest', 'Exterior Emulsion', 'Economical exterior emulsion for long-lasting vibrant outdoor facades.', 2, '#9A3412', true),
    ('a0000000-0000-0000-0000-000000000006', 'Damp Proof', 'Waterproofing', 'Elastomeric thick waterproofing membrane for roofs, terraces, and exterior vertical walls.', 10, '#854D0E', true),
    ('a0000000-0000-0000-0000-000000000007', 'Acrylic Distemper', 'Interior Distemper', 'Washable, smooth matte finish distemper for cost-effective interior beauty.', 0, '#166534', true),
    ('a0000000-0000-0000-0000-000000000008', 'Premium Wall Primer', 'Undercoat & Primer', 'Deep-penetrating acrylic primer providing high bonding adhesion for topcoats.', 0, '#065F46', true),
    ('a0000000-0000-0000-0000-000000000009', 'Acrylic Wall Putty', 'Surface Preparation', 'White cement-based polymer modified putty for silky smooth pinhole-free walls.', 0, '#A16207', true)
ON CONFLICT (name) DO UPDATE SET
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    warranty_years = EXCLUDED.warranty_years,
    theme_color = EXCLUDED.theme_color;

-- ----------------------------------------------------------------------------
-- 2. OFFICIAL SKUs (Product + Shade + Pack Size = Static QR Payload)
-- ----------------------------------------------------------------------------

INSERT INTO skus (id, product_id, product_name, shade_code, shade_name, pack_size, pack_unit, mrp, qr_code_payload, is_active)
VALUES
    -- Epic Coat (Exterior Flagship)
    ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Epic Coat', '101', 'Brilliant White', 20, 'L', 9850.00, 'ANKUR_EPIC_101_20L', true),
    ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Epic Coat', '101', 'Brilliant White', 10, 'L', 5100.00, 'ANKUR_EPIC_101_10L', true),
    ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Epic Coat', '101', 'Brilliant White', 4, 'L', 2150.00, 'ANKUR_EPIC_101_4L', true),
    ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Epic Coat', '204', 'Terracotta Red', 20, 'L', 10400.00, 'ANKUR_EPIC_204_20L', true),
    ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Epic Coat', '308', 'Morning Breeze Blue', 20, 'L', 10100.00, 'ANKUR_EPIC_308_20L', true),

    -- Rang Ritu (Interior Luxury)
    ('b0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 'Rang Ritu', '101', 'Pure Pearl White', 20, 'L', 6400.00, 'ANKUR_RITU_101_20L', true),
    ('b0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000002', 'Rang Ritu', '101', 'Pure Pearl White', 10, 'L', 3350.00, 'ANKUR_RITU_101_10L', true),
    ('b0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000002', 'Rang Ritu', '101', 'Pure Pearl White', 4, 'L', 1420.00, 'ANKUR_RITU_101_4L', true),
    ('b0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000002', 'Rang Ritu', '412', 'Golden Daffodil', 20, 'L', 6850.00, 'ANKUR_RITU_412_20L', true),

    -- Damp Proof (Waterproofing)
    ('b0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000006', 'Damp Proof', '001', 'Shield White', 20, 'L', 8200.00, 'ANKUR_DAMP_001_20L', true),
    ('b0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000006', 'Damp Proof', '001', 'Shield White', 10, 'L', 4250.00, 'ANKUR_DAMP_001_10L', true),
    ('b0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000006', 'Damp Proof', '001', 'Shield White', 4, 'L', 1800.00, 'ANKUR_DAMP_001_4L', true),

    -- Gleam Coat (Exterior)
    ('b0000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000003', 'Gleam Coat', '101', 'Pure White', 20, 'L', 5400.00, 'ANKUR_GLEAM_101_20L', true),
    ('b0000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000003', 'Gleam Coat', '101', 'Pure White', 10, 'L', 2850.00, 'ANKUR_GLEAM_101_10L', true),

    -- Wall Primer
    ('b0000000-0000-0000-0000-000000000015', 'a0000000-0000-0000-0000-000000000008', 'Premium Wall Primer', '000', 'White Primer', 20, 'L', 3100.00, 'ANKUR_PRIMER_000_20L', true),
    ('b0000000-0000-0000-0000-000000000016', 'a0000000-0000-0000-0000-000000000008', 'Premium Wall Primer', '000', 'White Primer', 10, 'L', 1650.00, 'ANKUR_PRIMER_000_10L', true),

    -- Acrylic Wall Putty
    ('b0000000-0000-0000-0000-000000000017', 'a0000000-0000-0000-0000-000000000009', 'Acrylic Wall Putty', '000', 'Super White Putty', 20, 'KG', 890.00, 'ANKUR_PUTTY_000_20KG', true)
ON CONFLICT (qr_code_payload) DO UPDATE SET
    mrp = EXCLUDED.mrp,
    product_name = EXCLUDED.product_name,
    shade_name = EXCLUDED.shade_name;

-- ----------------------------------------------------------------------------
-- 3. INCENTIVE PROMOTIONS & TARGET SLABS (Flipkart-Style Gamification)
-- ----------------------------------------------------------------------------

INSERT INTO incentive_schemes (id, title, description, start_date, end_date, is_active, theme_color)
VALUES
    (
        'c0000000-0000-0000-0000-000000000001',
        'Diwali Mahabachat Dhamaka 2026',
        'Sell Ankur Paints products this season and unlock up to 15% extra festive cash cashback on every bucket sold!',
        '2026-01-01 00:00:00+00',
        '2026-12-31 23:59:59+00',
        true,
        '#E8501E'
    ),
    (
        'c0000000-0000-0000-0000-000000000002',
        'Monsoon Waterproofing Special',
        'Extra incentive on Damp Proof 20L buckets to protect homes from seasonal leakage.',
        '2026-06-01 00:00:00+00',
        '2026-09-30 23:59:59+00',
        false,
        '#854D0E'
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    is_active = EXCLUDED.is_active;

-- Target Slabs for "Diwali Mahabachat Dhamaka 2026"
INSERT INTO scheme_slabs (id, scheme_id, target_amount, reward_percentage, reward_description, tier_order)
VALUES
    ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 50000.00, 5.0, 'Silver Tier: 5% Cash Incentive', 1),
    ('d0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 100000.00, 10.0, 'Gold Tier Dhamaka: 10% Cash Incentive', 2),
    ('d0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 250000.00, 15.0, 'Platinum Mega Achiever: 15% Cash Incentive + Trophy', 3)
ON CONFLICT (scheme_id, target_amount) DO UPDATE SET
    reward_percentage = EXCLUDED.reward_percentage,
    reward_description = EXCLUDED.reward_description,
    tier_order = EXCLUDED.tier_order;
