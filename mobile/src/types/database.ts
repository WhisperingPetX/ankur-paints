/**
 * Ankur Paints Digital Operations Platform — Database & Domain TypeScript Definitions
 * Accurately mirrors PostgreSQL 15+ Supabase Schema (v20261020000001 & v20261020000002)
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ----------------------------------------------------------------------------
// Domain Enums
// ----------------------------------------------------------------------------
export type UserRole = 'admin' | 'retailer' | 'warehouse';
export type PackUnit = 'L' | 'KG' | 'ML' | 'GM';
export type StockTransactionType =
  | 'DISPATCH_RECEIVED'
  | 'SALE_DEDUCTION'
  | 'RETURN_OUTWARD'
  | 'AUDIT_ADJUSTMENT';
export type DispatchStatus = 'SUBMITTED' | 'ACKNOWLEDGED';
export type IncentiveStatus = 'ACCRUED' | 'APPROVED' | 'PAID' | 'REVERSED';

// ----------------------------------------------------------------------------
// Model Interfaces
// ----------------------------------------------------------------------------

export interface Profile {
  id: string;
  full_name: string;
  store_name: string | null;
  phone: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string | null;
  warranty_years: number;
  theme_color: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Sku {
  id: string;
  product_id: string;
  product_name: string;
  shade_code: string;
  shade_name: string;
  pack_size: number;
  pack_unit: PackUnit;
  mrp: number;
  qr_code_payload: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RetailerInventory {
  id: string;
  retailer_id: string;
  sku_id: string;
  current_stock: number;
  last_updated_at: string;
  sku?: Sku;
}

export interface StockTransaction {
  id: string;
  retailer_id: string;
  sku_id: string;
  transaction_type: StockTransactionType;
  quantity_delta: number;
  balance_after: number;
  reference_id: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Dispatch {
  id: string;
  dispatch_number: string;
  retailer_id: string;
  dispatched_by: string;
  status: DispatchStatus;
  total_items: number;
  notes: string | null;
  created_at: string;
  items?: DispatchItem[];
}

export interface DispatchItem {
  id: string;
  dispatch_id: string;
  sku_id: string;
  quantity: number;
  sku?: Sku;
}

export interface Sale {
  id: string;
  invoice_number: string;
  retailer_id: string;
  customer_name: string;
  customer_mobile: string;
  total_amount: number;
  total_incentive_accrued: number;
  idempotency_key: string;
  created_at: string;
  items?: SaleItem[];
}

export interface SaleItem {
  id: string;
  sale_id: string;
  sku_id: string;
  quantity: number;
  mrp: number;
  selling_price: number;
  line_total: number;
  incentive_amount: number;
  sku?: Sku;
}

export interface IncentiveScheme {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
  banner_url: string | null;
  theme_color: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  slabs?: SchemeSlab[];
}

export interface SchemeSlab {
  id: string;
  scheme_id: string;
  target_amount: number;
  reward_percentage: number;
  reward_description: string;
  tier_order: number;
}

export interface RetailerIncentive {
  id: string;
  retailer_id: string;
  scheme_id: string | null;
  sale_id: string | null;
  qualified_amount: number;
  reward_percentage: number;
  incentive_earned: number;
  status: IncentiveStatus;
  payout_notes: string | null;
  created_at: string;
}

// ----------------------------------------------------------------------------
// Stored Procedure RPC Contracts
// ----------------------------------------------------------------------------

export interface SubmitSaleItemPayload {
  sku_id: string;
  quantity: number;
  selling_price: number;
}

export interface SubmitRetailerSaleRPCParams {
  p_retailer_id: string;
  p_customer_name: string;
  p_customer_mobile: string;
  p_idempotency_key: string;
  p_items: SubmitSaleItemPayload[];
}

export interface SubmitRetailerSaleRPCResponse {
  success: boolean;
  is_duplicate?: boolean;
  sale_id?: string;
  invoice_number?: string;
  total_amount?: number;
  incentive_earned?: number;
  applicable_reward_pct?: number;
  message?: string;
}

export interface SubmitDispatchItemPayload {
  sku_id: string;
  quantity: number;
}

export interface SubmitDispatchRPCParams {
  p_retailer_id: string;
  p_notes?: string;
  p_items: SubmitDispatchItemPayload[];
  p_dispatched_by?: string;
}

export interface SubmitDispatchRPCResponse {
  success: boolean;
  dispatch_id?: string;
  dispatch_number?: string;
  total_items?: number;
  message?: string;
}

// ----------------------------------------------------------------------------
// Supabase Database Type Structure for Supabase-JS Client
// ----------------------------------------------------------------------------

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Profile>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Product>;
      };
      skus: {
        Row: Sku;
        Insert: Omit<Sku, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Sku>;
      };
      retailer_inventory: {
        Row: RetailerInventory;
        Insert: Omit<RetailerInventory, 'id' | 'last_updated_at'> & {
          id?: string;
          last_updated_at?: string;
        };
        Update: Partial<RetailerInventory>;
      };
      stock_transactions: {
        Row: StockTransaction;
        Insert: Omit<StockTransaction, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<StockTransaction>;
      };
      dispatches: {
        Row: Dispatch;
        Insert: Omit<Dispatch, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Dispatch>;
      };
      dispatch_items: {
        Row: DispatchItem;
        Insert: Omit<DispatchItem, 'id'> & {
          id?: string;
        };
        Update: Partial<DispatchItem>;
      };
      sales: {
        Row: Sale;
        Insert: Omit<Sale, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Sale>;
      };
      sale_items: {
        Row: SaleItem;
        Insert: Omit<SaleItem, 'id'> & {
          id?: string;
        };
        Update: Partial<SaleItem>;
      };
      incentive_schemes: {
        Row: IncentiveScheme;
        Insert: Omit<IncentiveScheme, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<IncentiveScheme>;
      };
      scheme_slabs: {
        Row: SchemeSlab;
        Insert: Omit<SchemeSlab, 'id'> & {
          id?: string;
        };
        Update: Partial<SchemeSlab>;
      };
      retailer_incentives: {
        Row: RetailerIncentive;
        Insert: Omit<RetailerIncentive, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<RetailerIncentive>;
      };
    };
    Functions: {
      submit_retailer_sale: {
        Args: SubmitRetailerSaleRPCParams;
        Returns: SubmitRetailerSaleRPCResponse;
      };
      submit_dispatch: {
        Args: SubmitDispatchRPCParams;
        Returns: SubmitDispatchRPCResponse;
      };
      get_current_user_role: {
        Args: Record<string, never>;
        Returns: UserRole;
      };
    };
    Enums: {
      user_role: UserRole;
      pack_unit: PackUnit;
      stock_transaction_type: StockTransactionType;
      dispatch_status: DispatchStatus;
      incentive_status: IncentiveStatus;
    };
  };
}
