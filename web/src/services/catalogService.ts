import { supabase } from './supabase';
import type { Product, Sku } from '../types/database';
import type { ParsedSKURow } from './excelImporter';

/**
 * Ankur Paints Digital Operations Platform — Web Catalog Management Service
 */

export interface ProductWithStats extends Product {
  sku_count?: number;
}

export async function fetchProducts(): Promise<ProductWithStats[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, skus(count)')
    .order('name');

  if (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  return (products || []).map((p: any) => ({
    ...p,
    sku_count: p.skus?.[0]?.count || 0,
  }));
}

export async function fetchSKUs(productId?: string): Promise<Sku[]> {
  let query = supabase
    .from('skus')
    .select('*')
    .order('product_name')
    .order('pack_size', { ascending: false });

  if (productId) {
    query = query.eq('product_id', productId);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(`Failed to fetch SKUs: ${error.message}`);
  }

  return (data as Sku[]) || [];
}

/**
 * Ingest validated Excel/CSV rows into Supabase products and skus tables
 */
export async function ingestCatalogBatch(rows: ParsedSKURow[]): Promise<{
  productsCreated: number;
  skusUpserted: number;
}> {
  if (rows.length === 0) {
    return { productsCreated: 0, skusUpserted: 0 };
  }

  // 1. Fetch existing products to map IDs
  const { data: existingProducts, error: prodErr } = await supabase
    .from('products')
    .select('id, name');

  if (prodErr) {
    throw new Error(`Error fetching existing products: ${prodErr.message}`);
  }

  const productMap = new Map<string, string>();
  (existingProducts || []).forEach((p) => {
    productMap.set(p.name.trim().toLowerCase(), p.id);
  });

  // 2. Identify missing products and auto-create them
  let productsCreated = 0;
  const uniqueNewProducts = new Map<string, string>(); // name -> category

  for (const row of rows) {
    const key = row.productName.trim().toLowerCase();
    if (!productMap.has(key) && !uniqueNewProducts.has(key)) {
      uniqueNewProducts.set(key, row.category);
    }
  }

  if (uniqueNewProducts.size > 0) {
    const toInsert = Array.from(uniqueNewProducts.entries()).map(([nameLower, category]) => {
      // Find original casing
      const origName = rows.find((r) => r.productName.trim().toLowerCase() === nameLower)!.productName;
      return {
        name: origName,
        category: category || 'General Coatings',
        is_active: true,
      };
    });

    const { data: created, error: createErr } = await supabase
      .from('products')
      .insert(toInsert)
      .select('id, name');

    if (createErr) {
      throw new Error(`Failed to create missing products: ${createErr.message}`);
    }

    (created || []).forEach((p) => {
      productMap.set(p.name.trim().toLowerCase(), p.id);
      productsCreated++;
    });
  }

  // 3. Prepare SKU records with foreign keys
  const skuPayloads = rows.map((r) => {
    const productId = productMap.get(r.productName.trim().toLowerCase());
    if (!productId) {
      throw new Error(`Product ID resolution failed for: ${r.productName}`);
    }

    return {
      product_id: productId,
      product_name: r.productName,
      shade_code: r.shadeCode,
      shade_name: r.shadeName,
      pack_size: r.packSize,
      pack_unit: r.packUnit,
      mrp: r.mrp,
      qr_code_payload: r.qrPayload,
      is_active: true,
    };
  });

  // 4. Batch Upsert to skus table on conflict (qr_code_payload)
  const { data: upserted, error: skuErr } = await supabase
    .from('skus')
    .upsert(skuPayloads, {
      onConflict: 'qr_code_payload',
      ignoreDuplicates: false,
    })
    .select('id');

  if (skuErr) {
    throw new Error(`Failed to batch upsert SKUs: ${skuErr.message}`);
  }

  return {
    productsCreated,
    skusUpserted: upserted?.length || skuPayloads.length,
  };
}
