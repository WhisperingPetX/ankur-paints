import { generateQRPayload } from './qrGenerator';
import type { PackUnit } from '../types/database';

/**
 * Ankur Paints Digital Operations Platform — Excel / CSV Catalog Importer
 * Parses, validates, and prepares bulk product spreadsheets for Supabase ingestion.
 */

export interface ParsedSKURow {
  productName: string;
  category: string;
  shadeCode: string;
  shadeName: string;
  packSize: number;
  packUnit: PackUnit;
  mrp: number;
  qrPayload: string;
}

export interface RowValidationError {
  rowNumber: number;
  rawRow: Record<string, any>;
  errors: string[];
}

export interface ImportValidationResult {
  totalRows: number;
  validRows: ParsedSKURow[];
  invalidRows: RowValidationError[];
  isValid: boolean;
  uniqueProducts: string[];
}

/**
 * Standardize column header names (handles "Product Name", "product", "PRODUCT_NAME", etc.)
 */
function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Parse raw rows (from SheetJS / XLSX or CSV JSON) into validated SKU catalog records
 */
export function validateCatalogRows(rawRows: Record<string, any>[]): ImportValidationResult {
  const validRows: ParsedSKURow[] = [];
  const invalidRows: RowValidationError[] = [];
  const seenSKUs = new Set<string>();
  const productSet = new Set<string>();

  rawRows.forEach((row, index) => {
    const rowNumber = index + 2; // Accounting for 1-based index and header row
    const errors: string[] = [];

    // Map headers flexibly
    const rowMap: Record<string, any> = {};
    for (const [k, v] of Object.entries(row)) {
      rowMap[normalizeKey(k)] = typeof v === 'string' ? v.trim() : v;
    }

    const productName =
      rowMap['productname'] ||
      rowMap['product'] ||
      rowMap['itemname'] ||
      rowMap['brand'];

    const category =
      rowMap['category'] ||
      rowMap['type'] ||
      rowMap['segment'] ||
      'General Coatings';

    const shadeCode =
      rowMap['shadecode'] ||
      rowMap['code'] ||
      rowMap['colorcode'] ||
      rowMap['shade'];

    const shadeName =
      rowMap['shadename'] ||
      rowMap['color'] ||
      rowMap['name'] ||
      rowMap['description'] ||
      'Standard Shade';

    const packSizeRaw =
      rowMap['packsize'] ||
      rowMap['size'] ||
      rowMap['volume'] ||
      rowMap['quantity'];

    const packUnitRaw =
      rowMap['packunit'] ||
      rowMap['unit'] ||
      rowMap['uom'] ||
      'L';

    const mrpRaw =
      rowMap['mrp'] ||
      rowMap['price'] ||
      rowMap['maximumretailprice'] ||
      rowMap['rate'];

    // Validations
    if (!productName) {
      errors.push('Product Name is required.');
    }
    if (!shadeCode) {
      errors.push('Shade Code is required.');
    }

    const packSize = parseFloat(packSizeRaw);
    if (isNaN(packSize) || packSize <= 0) {
      errors.push(`Invalid pack size: "${packSizeRaw}". Must be a positive number.`);
    }

    let packUnit: PackUnit = 'L';
    const normalizedUnit = String(packUnitRaw).trim().toUpperCase();
    if (['L', 'KG', 'ML', 'GM'].includes(normalizedUnit)) {
      packUnit = normalizedUnit as PackUnit;
    } else {
      errors.push(`Invalid unit: "${packUnitRaw}". Must be one of: L, KG, ML, GM.`);
    }

    const mrp = parseFloat(String(mrpRaw).replace(/[^0-9.]/g, ''));
    if (isNaN(mrp) || mrp <= 0) {
      errors.push(`Invalid printed MRP: "${mrpRaw}". Must be greater than ₹0.`);
    }

    // Duplicate check within file
    const dedupeKey = `${productName}_${shadeCode}_${packSize}_${packUnit}`.toUpperCase();
    if (seenSKUs.has(dedupeKey)) {
      errors.push(`Duplicate SKU entry found in sheet: ${productName} (Shade ${shadeCode}, ${packSize}${packUnit}).`);
    } else {
      seenSKUs.add(dedupeKey);
    }

    if (errors.length > 0) {
      invalidRows.push({
        rowNumber,
        rawRow: row,
        errors,
      });
    } else {
      const qrPayload = generateQRPayload(productName, shadeCode, packSize, packUnit);
      productSet.add(productName);

      validRows.push({
        productName,
        category,
        shadeCode: String(shadeCode),
        shadeName: String(shadeName),
        packSize,
        packUnit,
        mrp,
        qrPayload,
      });
    }
  });

  return {
    totalRows: rawRows.length,
    validRows,
    invalidRows,
    isValid: invalidRows.length === 0 && validRows.length > 0,
    uniqueProducts: Array.from(productSet),
  };
}

/**
 * Generate a downloadable sample CSV template for company management
 */
export function generateSampleCatalogCSV(): string {
  const headers = [
    'Product Name',
    'Category',
    'Shade Code',
    'Shade Name',
    'Pack Size',
    'Pack Unit',
    'Printed MRP',
  ];

  const sampleRows = [
    ['Epic Coat', 'Exterior Emulsion', '101', 'Brilliant White', '20', 'L', '9850.00'],
    ['Epic Coat', 'Exterior Emulsion', '101', 'Brilliant White', '10', 'L', '5100.00'],
    ['Rang Ritu', 'Interior Emulsion', '101', 'Pure Pearl White', '20', 'L', '6400.00'],
    ['Rang Ritu', 'Interior Emulsion', '412', 'Golden Daffodil', '20', 'L', '6850.00'],
    ['Damp Proof', 'Waterproofing', '001', 'Shield White', '20', 'L', '8200.00'],
    ['Acrylic Wall Putty', 'Surface Preparation', '000', 'Super White Putty', '20', 'KG', '890.00'],
  ];

  return [headers.join(','), ...sampleRows.map((r) => r.join(','))].join('\n');
}
