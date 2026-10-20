-- ============================================================================
-- STEP 1: TABLES, CONSTRAINTS, RLS & STORED PROCEDURES
-- Copy ALL lines (Ctrl+A -> Ctrl+C) and Run in Supabase SQL Editor
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'retailer', 'warehouse');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE pack_unit AS ENUM ('L', 'KG', 'ML', 'GM');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE stock_transaction_type AS ENUM (
        'DISPATCH_RECEIVED', 'SALE_DEDUCTION', 'RETURN_OUTWARD', 'AUDIT_ADJUSTMENT'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE dispatch_status AS ENUM ('SUBMITTED', 'ACKNOWLEDGED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE incentive_status AS ENUM ('ACCRUED', 'APPROVED', 'PAID', 'REVERSED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 1. Profiles Table
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

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT,
    warranty_years INTEGER DEFAULT 0,
    theme_color TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. SKUs Table
CREATE TABLE IF NOT EXISTS skus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    product_name TEXT NOT NULL,
    shade_code TEXT NOT NULL,
    shade_name TEXT NOT NULL,
    pack_size NUMERIC NOT NULL CHECK (pack_size > 0),
    pack_unit pack_unit NOT NULL DEFAULT 'L',
    mrp NUMERIC NOT NULL CHECK (mrp > 0),
    qr_code_payload TEXT UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_sku_spec UNIQUE (product_id, shade_code, pack_size, pack_unit)
);

-- 4. Retailer Inventory
CREATE TABLE IF NOT EXISTS retailer_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    retailer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    sku_id UUID NOT NULL REFERENCES skus(id) ON DELETE RESTRICT,
    current_stock NUMERIC NOT NULL DEFAULT 0 CONSTRAINT chk_stock_non_negative CHECK (current_stock >= 0),
    last_updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_retailer_sku UNIQUE (retailer_id, sku_id)
);

-- 5. Stock Transactions Ledger
CREATE TABLE IF NOT EXISTS stock_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    retailer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    sku_id UUID NOT NULL REFERENCES skus(id) ON DELETE RESTRICT,
    transaction_type stock_transaction_type NOT NULL,
    quantity_delta NUMERIC NOT NULL,
    balance_after NUMERIC NOT NULL CHECK (balance_after >= 0),
    reference_id UUID,
    notes TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Dispatches
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

-- 7. Dispatch Items
CREATE TABLE IF NOT EXISTS dispatch_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispatch_id UUID NOT NULL REFERENCES dispatches(id) ON DELETE CASCADE,
    sku_id UUID NOT NULL REFERENCES skus(id) ON DELETE RESTRICT,
    quantity NUMERIC NOT NULL CONSTRAINT chk_dispatch_qty_positive CHECK (quantity > 0)
);

-- 8. Sales
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

-- 9. Sale Items
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

-- 10. Incentive Schemes
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

-- 11. Scheme Slabs
CREATE TABLE IF NOT EXISTS scheme_slabs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id UUID NOT NULL REFERENCES incentive_schemes(id) ON DELETE CASCADE,
    target_amount NUMERIC NOT NULL CHECK (target_amount > 0),
    reward_percentage NUMERIC NOT NULL CHECK (reward_percentage >= 0 AND reward_percentage <= 100),
    reward_description TEXT NOT NULL,
    tier_order INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT uq_scheme_slab_target UNIQUE (scheme_id, target_amount)
);

-- 12. Retailer Incentives
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_skus_product_id ON skus(product_id);
CREATE INDEX IF NOT EXISTS idx_skus_qr_payload ON skus(qr_code_payload);
CREATE INDEX IF NOT EXISTS idx_retailer_inv_retailer_sku ON retailer_inventory(retailer_id, sku_id);
CREATE INDEX IF NOT EXISTS idx_stock_tx_retailer_sku ON stock_transactions(retailer_id, sku_id);
CREATE INDEX IF NOT EXISTS idx_sales_retailer ON sales(retailer_id);
CREATE INDEX IF NOT EXISTS idx_sales_idempotency ON sales(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_sale_items_sale ON sale_items(sale_id);

-- Enable RLS
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

-- Helper
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS user_role AS $$
    SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Basic Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id OR get_current_user_role() IN ('admin', 'warehouse'));
CREATE POLICY "Admins have full access to profiles" ON profiles FOR ALL USING (get_current_user_role() = 'admin');

CREATE POLICY "Active products viewable by authenticated users" ON products FOR SELECT TO authenticated USING (is_active = true OR get_current_user_role() = 'admin');
CREATE POLICY "Admins have full write access to products" ON products FOR ALL USING (get_current_user_role() = 'admin');

CREATE POLICY "Active SKUs viewable by authenticated users" ON skus FOR SELECT TO authenticated USING (is_active = true OR get_current_user_role() = 'admin');
CREATE POLICY "Admins have full write access to SKUs" ON skus FOR ALL USING (get_current_user_role() = 'admin');

CREATE POLICY "Retailers view only own inventory" ON retailer_inventory FOR SELECT USING (retailer_id = auth.uid() OR get_current_user_role() IN ('admin', 'warehouse'));
CREATE POLICY "Admins and system procedures can manage inventory" ON retailer_inventory FOR ALL USING (get_current_user_role() IN ('admin', 'warehouse'));

CREATE POLICY "Retailers view only own stock ledger" ON stock_transactions FOR SELECT USING (retailer_id = auth.uid() OR get_current_user_role() IN ('admin', 'warehouse'));
CREATE POLICY "Admins have full access to stock transactions" ON stock_transactions FOR ALL USING (get_current_user_role() = 'admin');

CREATE POLICY "Retailers view dispatches addressed to them" ON dispatches FOR SELECT USING (retailer_id = auth.uid() OR get_current_user_role() IN ('admin', 'warehouse'));
CREATE POLICY "Warehouse and Admin can manage dispatches" ON dispatches FOR ALL USING (get_current_user_role() IN ('admin', 'warehouse'));

CREATE POLICY "Users can view dispatch items for accessible dispatches" ON dispatch_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM dispatches d WHERE d.id = dispatch_items.dispatch_id AND (d.retailer_id = auth.uid() OR get_current_user_role() IN ('admin', 'warehouse')))
);
CREATE POLICY "Warehouse and Admin can manage dispatch items" ON dispatch_items FOR ALL USING (get_current_user_role() IN ('admin', 'warehouse'));

CREATE POLICY "Retailers view only own sales" ON sales FOR SELECT USING (retailer_id = auth.uid() OR get_current_user_role() = 'admin');
CREATE POLICY "Retailers can insert own sales" ON sales FOR INSERT WITH CHECK (retailer_id = auth.uid() OR get_current_user_role() = 'admin');

CREATE POLICY "Users view sale items for accessible sales" ON sale_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM sales s WHERE s.id = sale_items.sale_id AND (s.retailer_id = auth.uid() OR get_current_user_role() = 'admin'))
);
CREATE POLICY "Users can insert sale items for own sales" ON sale_items FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM sales s WHERE s.id = sale_items.sale_id AND (s.retailer_id = auth.uid() OR get_current_user_role() = 'admin'))
);

CREATE POLICY "Authenticated users can view active incentive schemes" ON incentive_schemes FOR SELECT TO authenticated USING (is_active = true OR get_current_user_role() = 'admin');
CREATE POLICY "Admins can manage incentive schemes" ON incentive_schemes FOR ALL USING (get_current_user_role() = 'admin');

CREATE POLICY "Authenticated users can view scheme slabs" ON scheme_slabs FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM incentive_schemes sc WHERE sc.id = scheme_slabs.scheme_id AND (sc.is_active = true OR get_current_user_role() = 'admin'))
);
CREATE POLICY "Admins can manage scheme slabs" ON scheme_slabs FOR ALL USING (get_current_user_role() = 'admin');

CREATE POLICY "Retailers view only own incentive accruals" ON retailer_incentives FOR SELECT USING (retailer_id = auth.uid() OR get_current_user_role() = 'admin');
CREATE POLICY "Admins can manage retailer incentives" ON retailer_incentives FOR ALL USING (get_current_user_role() = 'admin');

-- Stored Procedure: submit_retailer_sale
CREATE OR REPLACE FUNCTION submit_retailer_sale(
    p_retailer_id UUID,
    p_customer_name TEXT,
    p_customer_mobile TEXT,
    p_idempotency_key UUID,
    p_items JSONB
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

    IF p_customer_name IS NULL OR trim(p_customer_name) = '' THEN
        RAISE EXCEPTION 'Customer name is required.';
    END IF;
    IF p_customer_mobile IS NULL OR trim(p_customer_mobile) = '' THEN
        RAISE EXCEPTION 'Customer mobile number is required.';
    END IF;
    IF p_items IS NULL OR jsonb_array_length(p_items) = 0 THEN
        RAISE EXCEPTION 'Sale must contain at least one item.';
    END IF;

    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_sku_id := (v_item->>'sku_id')::UUID;
        v_req_qty := (v_item->>'quantity')::NUMERIC;
        v_req_price := (v_item->>'selling_price')::NUMERIC;

        IF v_req_qty <= 0 THEN
            RAISE EXCEPTION 'Quantity for SKU % must be greater than zero.', v_sku_id;
        END IF;

        SELECT mrp INTO v_sku_mrp FROM skus WHERE id = v_sku_id AND is_active = true;
        IF v_sku_mrp IS NULL THEN
            RAISE EXCEPTION 'SKU % does not exist or is inactive.', v_sku_id;
        END IF;

        IF v_req_price > v_sku_mrp THEN
            RAISE EXCEPTION 'Price violation: Entered selling price (₹%) exceeds printed MRP (₹%) for SKU %', 
                v_req_price, v_sku_mrp, v_sku_id;
        END IF;

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

    v_month_start := date_trunc('month', timezone('utc'::text, now()));
    SELECT COALESCE(SUM(total_amount), 0) INTO v_cumulative_sales
    FROM sales
    WHERE retailer_id = p_retailer_id AND created_at >= v_month_start;

    v_cumulative_sales := v_cumulative_sales + v_total_amount;

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
    v_invoice_number := 'INV-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(md5(random()::text), 1, 6));

    INSERT INTO sales (
        invoice_number, retailer_id, customer_name, customer_mobile, 
        total_amount, total_incentive_accrued, idempotency_key
    ) VALUES (
        v_invoice_number, p_retailer_id, p_customer_name, p_customer_mobile, 
        v_total_amount, v_total_incentive, p_idempotency_key
    ) RETURNING id INTO v_sale_id;

    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_sku_id := (v_item->>'sku_id')::UUID;
        v_req_qty := (v_item->>'quantity')::NUMERIC;
        v_req_price := (v_item->>'selling_price')::NUMERIC;
        v_line_total := v_req_qty * v_req_price;

        SELECT mrp INTO v_sku_mrp FROM skus WHERE id = v_sku_id;

        INSERT INTO sale_items (
            sale_id, sku_id, quantity, mrp, selling_price, line_total, incentive_amount
        ) VALUES (
            v_sale_id, v_sku_id, v_req_qty, v_sku_mrp, v_req_price, v_line_total,
            round((v_line_total * v_applicable_pct) / 100.0, 2)
        );

        UPDATE retailer_inventory
        SET current_stock = current_stock - v_req_qty,
            last_updated_at = timezone('utc'::text, now())
        WHERE retailer_id = p_retailer_id AND sku_id = v_sku_id
        RETURNING current_stock INTO v_current_stock;

        INSERT INTO stock_transactions (
            retailer_id, sku_id, transaction_type, quantity_delta, 
            balance_after, reference_id, created_by, notes
        ) VALUES (
            p_retailer_id, v_sku_id, 'SALE_DEDUCTION', -v_req_qty,
            v_current_stock, v_sale_id, COALESCE(auth.uid(), p_retailer_id),
            'Sale deduction to customer ' || p_customer_name
        );
    END LOOP;

    IF v_total_incentive > 0 AND v_active_scheme_id IS NOT NULL THEN
        INSERT INTO retailer_incentives (
            retailer_id, scheme_id, sale_id, qualified_amount, 
            reward_percentage, incentive_earned, status
        ) VALUES (
            p_retailer_id, v_active_scheme_id, v_sale_id, v_total_amount, 
            v_applicable_pct, v_total_incentive, 'ACCRUED'
        );
    END IF;

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

-- Auth User Creation Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_role public.user_role := 'retailer';
    v_full_name TEXT;
    v_store_name TEXT;
    v_phone TEXT;
BEGIN
    v_full_name := COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Retail Partner');
    v_store_name := new.raw_user_meta_data->>'store_name';
    v_phone := COALESCE(new.phone, new.raw_user_meta_data->>'phone');

    IF new.raw_user_meta_data->>'role' IN ('admin', 'retailer', 'warehouse') THEN
        v_role := (new.raw_user_meta_data->>'role')::public.user_role;
    END IF;

    INSERT INTO public.profiles (id, full_name, store_name, phone, role, is_active, created_at, updated_at)
    VALUES (new.id, v_full_name, v_store_name, v_phone, v_role, true, timezone('utc'::text, now()), timezone('utc'::text, now()))
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        store_name = COALESCE(EXCLUDED.store_name, profiles.store_name),
        phone = COALESCE(EXCLUDED.phone, profiles.phone),
        updated_at = timezone('utc'::text, now());

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
