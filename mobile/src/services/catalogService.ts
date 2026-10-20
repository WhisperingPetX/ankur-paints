import { supabase } from './supabase';
import type { Sku, RetailerInventory } from '../types/database';

/**
 * Ankur Paints Retailer Mobile App — Catalog & QR Lookup Service
 */

export interface ScannedSKUDetail extends Sku {
  category?: string;
  theme_color?: string;
  available_stock?: number;
}

/**
 * Instant static QR lookup for mobile camera scanner
 * Query latency target: < 300ms on 4G
 */
export async function lookupSKUByQR(
  qrPayload: string,
  retailerId?: string
): Promise<{ success: boolean; data?: ScannedSKUDetail; error?: string }> {
  try {
    const cleanPayload = qrPayload.trim();
    if (!cleanPayload) {
      return { success: false, error: 'Empty QR code payload.' };
    }

    // 1. Fetch SKU record with product relation
    const { data: skuRecord, error: skuError } = await supabase
      .from('skus')
      .select('*, products(name, category, theme_color)')
      .eq('qr_code_payload', cleanPayload)
      .eq('is_active', true)
      .single();

    if (skuError || !skuRecord) {
      return {
        success: false,
        error: `Unrecognized or inactive Ankur Paints QR code: ${cleanPayload}`,
      };
    }

    let availableStock = 0;

    // 2. If retailerId provided, fetch current on-hand shop stock
    if (retailerId) {
      const { data: invRecord } = await supabase
        .from('retailer_inventory')
        .select('current_stock')
        .eq('retailer_id', retailerId)
        .eq('sku_id', skuRecord.id)
        .maybeSingle();

      availableStock = invRecord?.current_stock ?? 0;
    }

    const detail: ScannedSKUDetail = {
      ...(skuRecord as Sku),
      category: (skuRecord as any).products?.category || 'Paint',
      theme_color: (skuRecord as any).products?.theme_color || '#004B87',
      available_stock: availableStock,
    };

    return { success: true, data: detail };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error resolving QR code.' };
  }
}

/**
 * Fetch all available products with on-hand inventory for this retailer
 */
export async function fetchRetailerInventoryList(retailerId: string): Promise<RetailerInventory[]> {
  const { data, error } = await supabase
    .from('retailer_inventory')
    .select('*, skus(*)')
    .eq('retailer_id', retailerId)
    .gt('current_stock', 0)
    .order('current_stock', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch retailer inventory: ${error.message}`);
  }

  return (data as RetailerInventory[]) || [];
}
