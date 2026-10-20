/**
 * Ankur Paints Digital Operations Platform — QR Code Generator & Label Engine
 * Deterministic QR generation format: ANKUR_{PRODUCT_CODE}_{SHADE_CODE}_{PACK_SIZE}{UNIT}
 * Produces crisp SVG vector graphics and printable label cards for factory bucket labeling.
 */

export interface QRLabelData {
  productName: string;
  category: string;
  shadeCode: string;
  shadeName: string;
  packSize: number;
  packUnit: string;
  mrp: number;
  qrPayload: string;
  themeColor?: string;
}

/**
 * Generate standard deterministic QR payload for Ankur Paints SKUs
 */
export function generateQRPayload(
  productName: string,
  shadeCode: string,
  packSize: number,
  packUnit: string
): string {
  const sanitize = (str: string) =>
    str
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '_')
      .replace(/_+/g, '_');

  const prodPart = sanitize(productName);
  const shadePart = sanitize(shadeCode);
  const sizePart = `${packSize}${packUnit.toUpperCase()}`;

  return `ANKUR_${prodPart}_${shadePart}_${sizePart}`;
}

/**
 * Generate a high-contrast, scalable SVG QR Code using QR Server API / Google Charts API fallback
 * or vector SVG path matrix.
 */
export function getQRCodeImageUrl(payload: string, size = 300): string {
  // Encodes URL-safe payload
  const encoded = encodeURIComponent(payload);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&margin=2&format=svg`;
}

export function getQRCodePNGUrl(payload: string, size = 300): string {
  const encoded = encodeURIComponent(payload);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&margin=2&format=png`;
}

/**
 * Generates ready-to-print SVG Label markup for physical paint buckets
 */
export function generatePrintableBucketLabelSVG(label: QRLabelData): string {
  const qrUrl = getQRCodePNGUrl(label.qrPayload, 160);
  const theme = label.themeColor || '#004B87';

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220" style="font-family: system-ui, sans-serif; background: #ffffff; border: 2px solid ${theme}; border-radius: 12px; overflow: hidden;">
  <!-- Header Bar -->
  <rect x="0" y="0" width="340" height="42" fill="${theme}" />
  <text x="14" y="27" font-size="16" font-weight="900" fill="#FFFFFF" letter-spacing="1">ANKUR PAINTS</text>
  <text x="326" y="26" font-size="11" font-weight="700" fill="#FEF08A" text-anchor="end">${label.category.toUpperCase()}</text>

  <!-- Product & Shade Details -->
  <text x="14" y="68" font-size="18" font-weight="800" fill="#0B192C">${label.productName}</text>
  <text x="14" y="88" font-size="13" font-weight="600" fill="#4B5563">Shade: ${label.shadeCode} - ${label.shadeName}</text>
  
  <rect x="14" y="102" width="130" height="32" rx="6" fill="#F1F5F9" />
  <text x="24" y="123" font-size="14" font-weight="800" fill="#004B87">${label.packSize} ${label.packUnit}</text>

  <text x="14" y="160" font-size="11" font-weight="600" fill="#64748B">MAXIMUM RETAIL PRICE</text>
  <text x="14" y="185" font-size="20" font-weight="900" fill="#E8501E">₹${label.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</text>
  <text x="14" y="200" font-size="9" fill="#94A3B8">(Inclusive of all taxes)</text>

  <!-- QR Code Section -->
  <rect x="195" y="52" width="132" height="132" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
  <image href="${qrUrl}" x="201" y="58" width="120" height="120" />
  <text x="261" y="196" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">${label.qrPayload}</text>
</svg>
`.trim();
}
