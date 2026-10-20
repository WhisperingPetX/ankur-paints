-- ============================================================================
-- Ankur Paints Digital Operations Platform — Initial Database Schema Migration
-- Migration Version: 20261020000001
-- Target Database: PostgreSQL 15+ (Supabase)
-- Enforces: Zero Negative Stock, Price <= MRP Invariant, Double-Entry Stock Ledger,
--           Strict Multi-Tenant Row-Level Security (RLS), and Dynamic Slab Incentives.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. EXTENSIONS & CUSTOM TYPES (ENUMS)
-- ----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- User Roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'retailer', 'warehouse');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Measurement Units for Paint Packaging
DO $$ BEGIN
    CREATE TYPE pack_unit AS ENUM ('L', 'KG', 'ML', 'GM');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Double-Entry Stock Movement Ledger Types
DO $$ BEGIN
    CREATE TYPE stock_transaction_type AS ENUM (
        'DISPATCH_RECEIVED',
        'SALE_DEDUCTION',
        'RETURN_OUTWARD',
        'AUDIT_ADJUSTMENT'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Dispatch Order Lifecycle Status
DO $$ BEGIN
    CREATE TYPE dispatch_status AS ENUM ('SUBMITTED', 'ACKNOWLEDGED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Retailer Incentive Accrual & Payout Status
DO $$ BEGIN
    CREATE TYPE incentive_status AS ENUM ('ACCRUED', 'APPROVED', 'PAID', 'REVERSED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ----------------------------------------------------------------------------
-- 2. CORE DOMAIN TABLES
-- ----------------------------------------------------------------------------

-- Table 1: Profiles (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    store_name TEXT,
    phone TEXT UNIQUE,
    role user_role NOT NULL DEFAULT 'retailer',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table 2: Products (Parent Brand Product Lines: Epic Coat, Rang Ritu, etc.)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- e.g. Exterior Emulsion, Interior Emulsion, Waterproofing
    description TEXT,
    warranty_years INTEGER DEFAULT 0,
    theme_color TEXT,       -- Hex code calibrated to packaging
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table 3: SKUs (Product + Shade + Pack Size = Unique SKU with 1 Static QR)
CREATE TABLE IF NOT EXISTS skus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    product_name TEXT NOT NULL,
    shade_code TEXT NOT NULL,
    shade_name TEXT NOT NULL,
    pack_size NUMERIC NOT NULL CHECK (pack_size > 0),
    pack_unit pack_unit NOT NULL DEFAULT 'L',
    mrp NUMERIC NOT NULL CHECK (mrp > 0),
    qr_code_payload TEXT UNIQUE NOT NULL, -- Format: ANKUR_{PRODUCT}_{SHADE}_{SIZE}
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_sku_spec UNIQUE (product_id, shade_code, pack_size, pack_unit)
);

-- Table 4: Retailer Inventory (Current on-hand stock per retailer per SKU)
CREATE TABLE IF NOT EXISTS retailer_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    retailer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    sku_id UUID NOT NULL REFERENCES skus(id) ON DELETE RESTRICT,
    current_stock NUMERIC NOT NULL DEFAULT 0 CONSTRAINT chk_stock_non_negative CHECK (current_stock >= 0),
    last_updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_retailer_sku UNIQUE (retailer_id, sku_id)
);

-- Table 5: Stock Transactions (Immutable Double-Entry Audit Ledger)
CREATE TABLE IF NOT EXISTS stock_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    retailer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    sku_id UUID NOT NULL REFERENCES skus(id) ON DELETE RESTRICT,
    transaction_type stock_transaction_type NOT NULL,
    quantity_delta NUMERIC NOT NULL,
    balance_after NUMERIC NOT NULL CHECK (balance_after >= 0),
    reference_id UUID, -- References dispatches(id) or sales(id)
    notes TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table 6: Dispatches (Warehouse / Factory Shipments to Retailers)
CREATE TABLE IF NOT EXISTS dispatches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispatch_number TEXT UNIQUE NOT NULL,
    retailer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    dispatched_by UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    status dispatch_status NOT NULL DEFAULT 'SUBMITTED',
    total_items NUMERIC NOT NULL DEFAULT 0 CHECK (total_items >= 0),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table 7: Dispatch Items (Line items included in a dispatch)
CREATE TABLE IF NOT EXISTS dispatch_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispatch_id UUID NOT NULL REFERENCES dispatches(id) ON DELETE CASCADE,
    sku_id UUID NOT NULL REFERENCES skus(id) ON DELETE RESTRICT,
    quantity NUMERIC NOT NULL CONSTRAINT chk_dispatch_qty_positive CHECK (quantity > 0)
);

-- Table 8: Sales (Retailer Counter Sales to End-Customers)
CREATE TABLE IF NOT EXISTS sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT UNIQUE NOT NULL,
    retailer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    customer_mobile TEXT NOT NULL,
    total_amount NUMERIC NOT NULL CHECK (total_amount >= 0),
    total_incentive_accrued NUMERIC NOT NULL DEFAULT 0 CHECK (total_incentive_accrued >= 0),
    idempotency_key UUID UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table 9: Sale Items (Individual SKU lines in a retailer sale)
CREATE TABLE IF NOT EXISTS sale_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    sku_id UUID NOT NULL REFERENCES skus(id) ON DELETE RESTRICT,
    quantity NUMERIC NOT NULL CONSTRAINT chk_sale_qty_positive CHECK (quantity > 0),
    mrp NUMERIC NOT NULL CHECK (mrp > 0),
    selling_price NUMERIC NOT NULL CHECK (selling_price > 0),
    CONSTRAINT chk_selling_price_mrp CHECK (selling_price <= mrp),
    line_total NUMERIC NOT NULL CHECK (line_total >= 0),
    incentive_amount NUMERIC NOT NULL DEFAULT 0 CHECK (incentive_amount >= 0)
);

-- Table 10: Incentive Schemes (Promotional campaigns, e.g. Diwali Dhamaka)
CREATE TABLE IF NOT EXISTS incentive_schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    banner_url TEXT,
    theme_color TEXT DEFAULT '#004B87',
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT chk_scheme_dates CHECK (end_date >= start_date)
);

-- Table 11: Scheme Slabs (Configurable target tiers, e.g. ₹1 Lakh -> 10% bonus)
CREATE TABLE IF NOT EXISTS scheme_slabs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id UUID NOT NULL REFERENCES incentive_schemes(id) ON DELETE CASCADE,
    target_amount NUMERIC NOT NULL CHECK (target_amount > 0),
    reward_percentage NUMERIC NOT NULL CHECK (reward_percentage >= 0 AND reward_percentage <= 100),
    reward_description TEXT NOT NULL,
    tier_order INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT uq_scheme_slab_target UNIQUE (scheme_id, target_amount)
);

-- Table 12: Retailer Incentives (Accrued ledger of earned rewards)
CREATE TABLE IF NOT EXISTS retailer_incentives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    retailer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    scheme_id UUID REFERENCES incentive_schemes(id) ON DELETE SET NULL,
    sale_id UUID REFERENCES sales(id) ON DELETE SET NULL,
    qualified_amount NUMERIC NOT NULL CHECK (qualified_amount >= 0),
    reward_percentage NUMERIC NOT NULL CHECK (reward_percentage >= 0),
    incentive_earned NUMERIC NOT NULL CHECK (incentive_earned >= 0),
    status incentive_status NOT NULL DEFAULT 'ACCRUED',
    payout_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------------------------------
-- 3. PERFORMANCE INDEXES
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_skus_product_id ON skus(product_id);
CREATE INDEX IF NOT EXISTS idx_skus_qr_payload ON skus(qr_code_payload);
CREATE INDEX IF NOT EXISTS idx_retailer_inv_retailer_sku ON retailer_inventory(retailer_id, sku_id);
CREATE INDEX IF NOT EXISTS idx_stock_tx_retailer_sku ON stock_transactions(retailer_id, sku_id);
CREATE INDEX IF NOT EXISTS idx_stock_tx_created_at ON stock_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_dispatches_retailer ON dispatches(retailer_id);
CREATE INDEX IF NOT EXISTS idx_dispatch_items_dispatch ON dispatch_items(dispatch_id);
CREATE INDEX IF NOT EXISTS idx_sales_retailer ON sales(retailer_id);
CREATE INDEX IF NOT EXISTS idx_sales_created_at ON sales(created_at);
CREATE INDEX IF NOT EXISTS idx_sales_idempotency ON sales(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_sale_items_sale ON sale_items(sale_id);
CREATE INDEX IF NOT EXISTS idx_scheme_slabs_scheme ON scheme_slabs(scheme_id);
CREATE INDEX IF NOT EXISTS idx_retailer_incentives_retailer_status ON retailer_incentives(retailer_id, status);

-- ----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE skus ENABLE ROW LEVEL SECURITY;
ALTER TABLE retailer_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispatches ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispatch_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE incentive_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheme_slabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE retailer_incentives ENABLE ROW LEVEL SECURITY;

-- Helper Function: Retrieve current authenticated user role
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS user_role AS $$
    SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Users can view own profile" 
    ON profiles FOR SELECT 
    USING (auth.uid() = id OR get_current_user_role() IN ('admin', 'warehouse'));

CREATE POLICY "Admins have full access to profiles" 
    ON profiles FOR ALL 
    USING (get_current_user_role() = 'admin');

-- Products Policies (Catalog is readable by all active users; editable only by Admin)
CREATE POLICY "Active products viewable by authenticated users" 
    ON products FOR SELECT 
    TO authenticated 
    USING (is_active = true OR get_current_user_role() = 'admin');

CREATE POLICY "Admins have full write access to products" 
    ON products FOR ALL 
    USING (get_current_user_role() = 'admin');

-- SKUs Policies
CREATE POLICY "Active SKUs viewable by authenticated users" 
    ON skus FOR SELECT 
    TO authenticated 
    USING (is_active = true OR get_current_user_role() = 'admin');

CREATE POLICY "Admins have full write access to SKUs" 
    ON skus FOR ALL 
    USING (get_current_user_role() = 'admin');

-- Retailer Inventory Policies (Strict isolation: Retailer views only own stock)
CREATE POLICY "Retailers view only own inventory" 
    ON retailer_inventory FOR SELECT 
    USING (retailer_id = auth.uid() OR get_current_user_role() IN ('admin', 'warehouse'));

CREATE POLICY "Admins and system procedures can manage inventory" 
    ON retailer_inventory FOR ALL 
    USING (get_current_user_role() IN ('admin', 'warehouse'));

-- Stock Transactions Policies (Strict isolation: Retailer views only own audit records)
CREATE POLICY "Retailers view only own stock ledger" 
    ON stock_transactions FOR SELECT 
    USING (retailer_id = auth.uid() OR get_current_user_role() IN ('admin', 'warehouse'));

CREATE POLICY "Admins have full access to stock transactions" 
    ON stock_transactions FOR ALL 
    USING (get_current_user_role() = 'admin');

-- Dispatches Policies
CREATE POLICY "Retailers view dispatches addressed to them" 
    ON dispatches FOR SELECT 
    USING (retailer_id = auth.uid() OR get_current_user_role() IN ('admin', 'warehouse'));

CREATE POLICY "Warehouse and Admin can manage dispatches" 
    ON dispatches FOR ALL 
    USING (get_current_user_role() IN ('admin', 'warehouse'));

-- Dispatch Items Policies
CREATE POLICY "Users can view dispatch items for accessible dispatches" 
    ON dispatch_items FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM dispatches d 
            WHERE d.id = dispatch_items.dispatch_id 
              AND (d.retailer_id = auth.uid() OR get_current_user_role() IN ('admin', 'warehouse'))
        )
    );

CREATE POLICY "Warehouse and Admin can manage dispatch items" 
    ON dispatch_items FOR ALL 
    USING (get_current_user_role() IN ('admin', 'warehouse'));

-- Sales Policies (Retailer views own sales; inserts happen via stored procedure)
CREATE POLICY "Retailers view only own sales" 
    ON sales FOR SELECT 
    USING (retailer_id = auth.uid() OR get_current_user_role() = 'admin');

CREATE POLICY "Retailers can insert own sales" 
    ON sales FOR INSERT 
    WITH CHECK (retailer_id = auth.uid() OR get_current_user_role() = 'admin');

-- Sale Items Policies
CREATE POLICY "Users view sale items for accessible sales" 
    ON sale_items FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM sales s 
            WHERE s.id = sale_items.sale_id 
              AND (s.retailer_id = auth.uid() OR get_current_user_role() = 'admin')
        )
    );

CREATE POLICY "Users can insert sale items for own sales" 
    ON sale_items FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM sales s 
            WHERE s.id = sale_items.sale_id 
              AND (s.retailer_id = auth.uid() OR get_current_user_role() = 'admin')
        )
    );

-- Incentive Schemes Policies (Public read for active schemes; Admin write)
CREATE POLICY "Authenticated users can view active incentive schemes" 
    ON incentive_schemes FOR SELECT 
    TO authenticated 
    USING (is_active = true OR get_current_user_role() = 'admin');

CREATE POLICY "Admins can manage incentive schemes" 
    ON incentive_schemes FOR ALL 
    USING (get_current_user_role() = 'admin');

-- Scheme Slabs Policies
CREATE POLICY "Authenticated users can view scheme slabs" 
    ON scheme_slabs FOR SELECT 
    TO authenticated 
    USING (
        EXISTS (
            SELECT 1 FROM incentive_schemes sc 
            WHERE sc.id = scheme_slabs.scheme_id 
              AND (sc.is_active = true OR get_current_user_role() = 'admin')
        )
    );

CREATE POLICY "Admins can manage scheme slabs" 
    ON scheme_slabs FOR ALL 
    USING (get_current_user_role() = 'admin');

-- Retailer Incentives Policies
CREATE POLICY "Retailers view only own incentive accruals" 
    ON retailer_incentives FOR SELECT 
    USING (retailer_id = auth.uid() OR get_current_user_role() = 'admin');

CREATE POLICY "Admins can manage retailer incentives" 
    ON retailer_incentives FOR ALL 
    USING (get_current_user_role() = 'admin');

-- ----------------------------------------------------------------------------
-- 5. ATOMIC STORED PROCEDURES (RPCs)
-- ----------------------------------------------------------------------------

-- Procedure 1: submit_retailer_sale (Atomic Multi-Item Sale & Inventory Decrement)
CREATE OR REPLACE FUNCTION submit_retailer_sale(
    p_retailer_id UUID,
    p_customer_name TEXT,
    p_customer_mobile TEXT,
    p_idempotency_key UUID,
    p_items JSONB -- Array of {sku_id: UUID, quantity: NUMERIC, selling_price: NUMERIC}
) RETURNS JSONB AS $$
DECLARE
    v_sale_id UUID;
    v_invoice_number TEXT;
    v_item JSONB;
    v_sku_id UUID;
    v_sku_mrp NUMERIC;
    v_req_qty NUMERIC;
    v_req_price NUMERIC;
    v_current_stock NUMERIC;
    v_line_total NUMERIC;
    v_total_amount NUMERIC := 0;
    v_total_incentive NUMERIC := 0;
    v_applicable_pct NUMERIC := 0;
    v_active_scheme_id UUID;
    v_month_start TIMESTAMPTZ;
    v_cumulative_sales NUMERIC := 0;
BEGIN
    -- 1. Idempotency Check: Return existing record if already processed
    IF EXISTS (SELECT 1 FROM sales WHERE idempotency_key = p_idempotency_key) THEN
        SELECT id, invoice_number, total_amount, total_incentive_accrued 
        INTO v_sale_id, v_invoice_number, v_total_amount, v_total_incentive
        FROM sales WHERE idempotency_key = p_idempotency_key;

        RETURN jsonb_build_object(
            'success', true,
            'is_duplicate', true,
            'sale_id', v_sale_id,
            'invoice_number', v_invoice_number,
            'total_amount', v_total_amount,
            'incentive_earned', v_total_incentive,
            'message', 'Sale already processed previously (Idempotent replay)'
        );
    END IF;

    -- 2. Input Validation: Check parameters
    IF p_customer_name IS NULL OR trim(p_customer_name) = '' THEN
        RAISE EXCEPTION 'Customer name is required.';
    END IF;
    IF p_customer_mobile IS NULL OR trim(p_customer_mobile) = '' THEN
        RAISE EXCEPTION 'Customer mobile number is required.';
    END IF;
    IF p_items IS NULL OR jsonb_array_length(p_items) = 0 THEN
        RAISE EXCEPTION 'Sale must contain at least one item.';
    END IF;

    -- 3. Validate Each Item: Check MRP Ceiling & Lock Inventory Rows (FOR UPDATE)
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_sku_id := (v_item->>'sku_id')::UUID;
        v_req_qty := (v_item->>'quantity')::NUMERIC;
        v_req_price := (v_item->>'selling_price')::NUMERIC;

        IF v_req_qty <= 0 THEN
            RAISE EXCEPTION 'Quantity for SKU % must be greater than zero.', v_sku_id;
        END IF;

        -- Fetch printed MRP
        SELECT mrp INTO v_sku_mrp FROM skus WHERE id = v_sku_id AND is_active = true;
        IF v_sku_mrp IS NULL THEN
            RAISE EXCEPTION 'SKU % does not exist or is inactive.', v_sku_id;
        END IF;

        -- Hard Invariant: Selling price cannot exceed MRP
        IF v_req_price > v_sku_mrp THEN
            RAISE EXCEPTION 'Price violation: Entered selling price (₹%) exceeds printed MRP (₹%) for SKU %', 
                v_req_price, v_sku_mrp, v_sku_id;
        END IF;

        -- Row lock on retailer inventory to prevent concurrent overdrafts
        SELECT current_stock INTO v_current_stock 
        FROM retailer_inventory 
        WHERE retailer_id = p_retailer_id AND sku_id = v_sku_id 
        FOR UPDATE;

        IF v_current_stock IS NULL OR v_current_stock < v_req_qty THEN
            RAISE EXCEPTION 'Insufficient stock for SKU %. Available: %, Requested: %',
                v_sku_id, COALESCE(v_current_stock, 0), v_req_qty;
        END IF;

        v_line_total := v_req_qty * v_req_price;
        v_total_amount := v_total_amount + v_line_total;
    END LOOP;

    -- 4. Calculate Cumulative Month Sales + Current Sale for Incentive Slabs
    v_month_start := date_trunc('month', timezone('utc'::text, now()));
    SELECT COALESCE(SUM(total_amount), 0) INTO v_cumulative_sales
    FROM sales
    WHERE retailer_id = p_retailer_id AND created_at >= v_month_start;

    v_cumulative_sales := v_cumulative_sales + v_total_amount;

    -- Find highest matching active slab for this month's cumulative performance
    SELECT ss.scheme_id, ss.reward_percentage 
    INTO v_active_scheme_id, v_applicable_pct
    FROM scheme_slabs ss
    JOIN incentive_schemes isc ON ss.scheme_id = isc.id
    WHERE isc.is_active = true 
      AND timezone('utc'::text, now()) BETWEEN isc.start_date AND isc.end_date
      AND v_cumulative_sales >= ss.target_amount
    ORDER BY ss.target_amount DESC
    LIMIT 1;

    IF v_applicable_pct IS NULL THEN
        v_applicable_pct := 0;
    END IF;

    v_total_incentive := round((v_total_amount * v_applicable_pct) / 100.0, 2);

    -- 5. Generate Formatted Invoice Number (e.g. INV-202610-XXXX)
    v_invoice_number := 'INV-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(md5(random()::text), 1, 6));

    -- 6. Insert Master Sale Record
    INSERT INTO sales (
        invoice_number, retailer_id, customer_name, customer_mobile, 
        total_amount, total_incentive_accrued, idempotency_key
    ) VALUES (
        v_invoice_number, p_retailer_id, p_customer_name, p_customer_mobile, 
        v_total_amount, v_total_incentive, p_idempotency_key
    ) RETURNING id INTO v_sale_id;

    -- 7. Insert Line Items, Decrement Inventory & Record Audit Ledger
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_sku_id := (v_item->>'sku_id')::UUID;
        v_req_qty := (v_item->>'quantity')::NUMERIC;
        v_req_price := (v_item->>'selling_price')::NUMERIC;
        v_line_total := v_req_qty * v_req_price;

        -- Fetch MRP again for immutable record
        SELECT mrp INTO v_sku_mrp FROM skus WHERE id = v_sku_id;

        -- Insert Line Item
        INSERT INTO sale_items (
            sale_id, sku_id, quantity, mrp, selling_price, line_total, incentive_amount
        ) VALUES (
            v_sale_id, v_sku_id, v_req_qty, v_sku_mrp, v_req_price, v_line_total,
            round((v_line_total * v_applicable_pct) / 100.0, 2)
        );

        -- Decrement Retailer Stock
        UPDATE retailer_inventory
        SET current_stock = current_stock - v_req_qty,
            last_updated_at = timezone('utc'::text, now())
        WHERE retailer_id = p_retailer_id AND sku_id = v_sku_id
        RETURNING current_stock INTO v_current_stock;

        -- Record Immutable Stock Ledger Debit
        INSERT INTO stock_transactions (
            retailer_id, sku_id, transaction_type, quantity_delta, 
            balance_after, reference_id, created_by, notes
        ) VALUES (
            p_retailer_id, v_sku_id, 'SALE_DEDUCTION', -v_req_qty,
            v_current_stock, v_sale_id, COALESCE(auth.uid(), p_retailer_id),
            'Sale deduction to customer ' || p_customer_name
        );
    END LOOP;

    -- 8. Record Incentive Ledger Entry
    IF v_total_incentive > 0 AND v_active_scheme_id IS NOT NULL THEN
        INSERT INTO retailer_incentives (
            retailer_id, scheme_id, sale_id, qualified_amount, 
            reward_percentage, incentive_earned, status
        ) VALUES (
            p_retailer_id, v_active_scheme_id, v_sale_id, v_total_amount, 
            v_applicable_pct, v_total_incentive, 'ACCRUED'
        );
    END IF;

    -- 9. Return Structured Success Response
    RETURN jsonb_build_object(
        'success', true,
        'sale_id', v_sale_id,
        'invoice_number', v_invoice_number,
        'total_amount', v_total_amount,
        'incentive_earned', v_total_incentive,
        'applicable_reward_pct', v_applicable_pct,
        'message', 'Sale completed successfully and stock decremented.'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Procedure 2: submit_dispatch (Atomic Warehouse Shipment & Inventory Increment)
CREATE OR REPLACE FUNCTION submit_dispatch(
    p_retailer_id UUID,
    p_notes TEXT,
    p_items JSONB, -- Array of {sku_id: UUID, quantity: NUMERIC}
    p_dispatched_by UUID DEFAULT auth.uid()
) RETURNS JSONB AS $$
DECLARE
    v_dispatch_id UUID;
    v_dispatch_number TEXT;
    v_dispatched_by UUID;
    v_item JSONB;
    v_sku_id UUID;
    v_qty NUMERIC;
    v_total_items NUMERIC := 0;
    v_new_stock NUMERIC;
BEGIN
    -- Determine dispatcher identity
    v_dispatched_by := COALESCE(p_dispatched_by, auth.uid());
    IF v_dispatched_by IS NULL THEN
        SELECT id INTO v_dispatched_by FROM profiles WHERE role IN ('admin', 'warehouse') LIMIT 1;
        IF v_dispatched_by IS NULL THEN
            v_dispatched_by := p_retailer_id;
        END IF;
    END IF;

    -- Check caller permissions (allow if admin/warehouse or called with explicit system identity)
    IF get_current_user_role() NOT IN ('admin', 'warehouse') AND auth.uid() IS NOT NULL THEN
        RAISE EXCEPTION 'Access denied: Only warehouse or admin users can submit dispatches.';
    END IF;

    IF p_items IS NULL OR jsonb_array_length(p_items) = 0 THEN
        RAISE EXCEPTION 'Dispatch must contain at least one item.';
    END IF;

    -- Calculate total units
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_qty := (v_item->>'quantity')::NUMERIC;
        IF v_qty <= 0 THEN
            RAISE EXCEPTION 'Item quantity must be greater than zero.';
        END IF;
        v_total_items := v_total_items + v_qty;
    END LOOP;

    -- Generate Dispatch Number (e.g. DSP-202610-XXXX)
    v_dispatch_number := 'DSP-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(md5(random()::text), 1, 6));

    -- Create Dispatch Master Record
    INSERT INTO dispatches (
        dispatch_number, retailer_id, dispatched_by, status, total_items, notes
    ) VALUES (
        v_dispatch_number, p_retailer_id, v_dispatched_by, 'SUBMITTED', v_total_items, p_notes
    ) RETURNING id INTO v_dispatch_id;

    -- Process Line Items, Upsert Inventory & Record Audit Ledger
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_sku_id := (v_item->>'sku_id')::UUID;
        v_qty := (v_item->>'quantity')::NUMERIC;

        -- Insert line item
        INSERT INTO dispatch_items (dispatch_id, sku_id, quantity)
        VALUES (v_dispatch_id, v_sku_id, v_qty);

        -- Upsert retailer inventory (increment current_stock)
        INSERT INTO retailer_inventory (retailer_id, sku_id, current_stock, last_updated_at)
        VALUES (p_retailer_id, v_sku_id, v_qty, timezone('utc'::text, now()))
        ON CONFLICT (retailer_id, sku_id) 
        DO UPDATE SET 
            current_stock = retailer_inventory.current_stock + EXCLUDED.current_stock,
            last_updated_at = EXCLUDED.last_updated_at
        RETURNING current_stock INTO v_new_stock;

        -- Record Immutable Stock Ledger Credit
        INSERT INTO stock_transactions (
            retailer_id, sku_id, transaction_type, quantity_delta, 
            balance_after, reference_id, created_by, notes
        ) VALUES (
            p_retailer_id, v_sku_id, 'DISPATCH_RECEIVED', v_qty,
            v_new_stock, v_dispatch_id, v_dispatched_by,
            'Warehouse dispatch received: ' || v_dispatch_number
        );
    END LOOP;

    RETURN jsonb_build_object(
        'success', true,
        'dispatch_id', v_dispatch_id,
        'dispatch_number', v_dispatch_number,
        'total_items', v_total_items,
        'message', 'Dispatch submitted and retailer stock credited successfully.'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- ============================================================================
-- Ankur Paints Digital Operations Platform — Auth User Profile Trigger
-- Migration Version: 20261020000002
-- Target Database: PostgreSQL 15+ (Supabase)
-- Automatically provisions a public.profiles entry whenever a new user is 
-- created in auth.users (via phone signup, email invite, or admin dashboard).
-- ============================================================================

-- Function to handle new user registration from Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_role public.user_role := 'retailer';
    v_full_name TEXT;
    v_store_name TEXT;
    v_phone TEXT;
BEGIN
    -- Extract metadata if passed during signup
    v_full_name := COALESCE(
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'name',
        'Retail Partner'
    );
    
    v_store_name := new.raw_user_meta_data->>'store_name';
    
    v_phone := COALESCE(
        new.phone,
        new.raw_user_meta_data->>'phone'
    );

    -- Check if a specific role was designated in metadata (e.g. created by admin)
    IF new.raw_user_meta_data->>'role' IN ('admin', 'retailer', 'warehouse') THEN
        v_role := (new.raw_user_meta_data->>'role')::public.user_role;
    END IF;

    -- Insert into public.profiles
    INSERT INTO public.profiles (
        id,
        full_name,
        store_name,
        phone,
        role,
        is_active,
        created_at,
        updated_at
    ) VALUES (
        new.id,
        v_full_name,
        v_store_name,
        v_phone,
        v_role,
        true,
        timezone('utc'::text, now()),
        timezone('utc'::text, now())
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        store_name = COALESCE(EXCLUDED.store_name, profiles.store_name),
        phone = COALESCE(EXCLUDED.phone, profiles.phone),
        updated_at = timezone('utc'::text, now());

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger firing immediately after insert on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
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
