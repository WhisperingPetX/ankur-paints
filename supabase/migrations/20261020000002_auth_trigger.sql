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
