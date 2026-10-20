import React from 'react';
import { getQRCodePNGUrl } from '../services/qrGenerator';
import type { Sku } from '../types/database';

export interface PrintableQRSheetProps {
  skus: Sku[];
  copiesPerSKU?: number;
  onClose?: () => void;
}

export const PrintableQRSheet: React.FC<PrintableQRSheetProps> = ({
  skus,
  copiesPerSKU = 1,
  onClose,
}) => {
  const allLabels: Sku[] = [];
  skus.forEach((sku) => {
    for (let i = 0; i < copiesPerSKU; i++) {
      allLabels.push(sku);
    }
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '24px' }}>
      {/* Non-printed Controls */}
      <div className="no-print" style={{ maxWidth: '960px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, color: '#004B87' }}>Factory QR Sticker Sheet</h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748B', fontSize: '14px' }}>
            Ready to print on standard sticker sheets ({allLabels.length} labels total).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handlePrint}
            style={{
              padding: '10px 20px',
              backgroundColor: '#004B87',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            🖨️ Print Sheet (Ctrl + P)
          </button>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                padding: '10px 16px',
                backgroundColor: '#E2E8F0',
                color: '#334155',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
          )}
        </div>
      </div>

      {/* Printable Sheet Grid (2 columns on A4) */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
      >
        {allLabels.map((sku, index) => (
          <div
            key={`${sku.id}-${index}`}
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #004B87',
              borderRadius: '10px',
              overflow: 'hidden',
              pageBreakInside: 'avoid',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {/* Label Header */}
            <div
              style={{
                backgroundColor: '#004B87',
                padding: '8px 12px',
                color: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontWeight: '900', letterSpacing: '1px', fontSize: '13px' }}>
                ANKUR PAINTS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#FEF08A' }}>
                AUTHENTIC PRODUCT
              </span>
            </div>

            {/* Label Body */}
            <div
              style={{
                padding: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>
                  {sku.product_name}
                </h4>
                <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#475569' }}>
                  Shade: {sku.shade_code} - {sku.shade_name}
                </p>
                <div style={{ display: 'inline-block', backgroundColor: '#F1F5F9', padding: '3px 8px', borderRadius: '4px', fontWeight: '800', color: '#004B87', fontSize: '13px', marginBottom: '8px' }}>
                  {sku.pack_size} {sku.pack_unit}
                </div>
                <div>
                  <span style={{ fontSize: '9px', color: '#64748B', display: 'block' }}>MAXIMUM RETAIL PRICE</span>
                  <span style={{ fontSize: '18px', fontWeight: '900', color: '#E8501E' }}>
                    ₹{sku.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                  <span style={{ fontSize: '8px', color: '#94A3B8', display: 'block' }}>(Incl. of all taxes)</span>
                </div>
              </div>

              {/* QR Code */}
              <div style={{ textAlign: 'center' }}>
                <img
                  src={getQRCodePNGUrl(sku.qr_code_payload, 130)}
                  alt={sku.qr_code_payload}
                  style={{ width: '110px', height: '110px', border: '1px solid #E2E8F0', borderRadius: '6px' }}
                />
                <span style={{ display: 'block', fontSize: '8px', fontWeight: '700', color: '#64748B', marginTop: '3px' }}>
                  {sku.qr_code_payload}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: #FFFFFF !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
