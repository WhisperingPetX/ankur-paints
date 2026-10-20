import React, { useState, useEffect } from 'react';
import {
  fetchProducts,
  fetchSKUs,
  ingestCatalogBatch,
  ProductWithStats,
} from '../../services/catalogService';
import {
  validateCatalogRows,
  generateSampleCatalogCSV,
  ImportValidationResult,
} from '../../services/excelImporter';
import {
  generatePrintableBucketLabelSVG,
  getQRCodePNGUrl,
  QRLabelData,
} from '../../services/qrGenerator';
import type { Sku } from '../../types/database';

export const CatalogManagement: React.FC = () => {
  const [products, setProducts] = useState<ProductWithStats[]>([]);
  const [skus, setSkus] = useState<Sku[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLabel, setSelectedLabel] = useState<QRLabelData | null>(null);

  // Bulk Import Modal States
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importResult, setImportResult] = useState<ImportValidationResult | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [importMessage, setImportMessage] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prods, allSkus] = await Promise.all([fetchProducts(), fetchSKUs()]);
      setProducts(prods);
      setSkus(allSkus);
    } catch (err: any) {
      console.error('Error loading catalog data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredSKUs = skus.filter((sku) => {
    const matchesProduct =
      selectedProduct === 'all' || sku.product_id === selectedProduct;
    const matchesSearch =
      sku.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sku.shade_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sku.shade_code.includes(searchTerm) ||
      sku.qr_code_payload.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProduct && matchesSearch;
  });

  const handleDownloadSample = () => {
    const csvContent = generateSampleCatalogCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ankur_paints_catalog_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportMessage(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        setImportMessage('The uploaded file appears to be empty or missing headers.');
        return;
      }

      const headers = lines[0].split(',').map((h) => h.trim());
      const rawRows = lines.slice(1).map((line) => {
        const values = line.split(',').map((v) => v.trim());
        const rowObj: Record<string, any> = {};
        headers.forEach((h, i) => {
          rowObj[h] = values[i] ?? '';
        });
        return rowObj;
      });

      const validation = validateCatalogRows(rawRows);
      setImportResult(validation);
    };

    reader.readAsText(file);
  };

  const handleConfirmImport = async () => {
    if (!importResult || importResult.validRows.length === 0) return;

    setIsUploading(true);
    setImportMessage(null);
    try {
      const res = await ingestCatalogBatch(importResult.validRows);
      setImportMessage(
        `Successfully imported! ${res.skusUpserted} SKUs upserted, ${res.productsCreated} new product lines added.`
      );
      setImportResult(null);
      await loadData();
    } catch (err: any) {
      setImportMessage(`Import failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleViewQR = (sku: Sku) => {
    const parentProd = products.find((p) => p.id === sku.product_id);
    setSelectedLabel({
      productName: sku.product_name,
      category: parentProd?.category || 'Paint',
      shadeCode: sku.shade_code,
      shadeName: sku.shade_name,
      packSize: sku.pack_size,
      packUnit: sku.pack_unit,
      mrp: sku.mrp,
      qrPayload: sku.qr_code_payload,
      themeColor: parentProd?.theme_color || '#004B87',
    });
  };

  const handlePrintLabel = () => {
    if (!selectedLabel) return;
    const svgContent = generatePrintableBucketLabelSVG(selectedLabel);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Ankur Paints Label - ${selectedLabel.qrPayload}</title>
            <style>
              body { margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: #f8fafc; }
              @media print {
                body { background: transparent; }
              }
            </style>
          </head>
          <body>
            ${svgContent}
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1280px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#0F172A' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', color: '#004B87' }}>
            Product Catalog & Static QR Generator
          </h1>
          <p style={{ margin: 0, color: '#64748B', fontSize: '14px' }}>
            Manage Ankur Paints SKU catalog, printed MRP price ceilings, and factory QR sticker sheets.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleDownloadSample}
            style={{
              padding: '10px 16px',
              backgroundColor: '#F1F5F9',
              color: '#004B87',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            📥 Download Sample Excel
          </button>

          <button
            onClick={() => setIsImportModalOpen(true)}
            style={{
              padding: '10px 18px',
              backgroundColor: '#E8501E',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(232, 80, 30, 0.3)',
            }}
          >
            📊 Bulk Upload Catalog (Excel)
          </button>
        </div>
      </div>

      {/* Product Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {products.map((prod) => (
          <div
            key={prod.id}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              borderLeft: `5px solid ${prod.theme_color || '#004B87'}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: '700', color: '#0F172A' }}>
                {prod.name}
              </h3>
              {prod.warranty_years > 0 && (
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#047857', backgroundColor: '#D1FAE5', padding: '2px 8px', borderRadius: '12px' }}>
                  {prod.warranty_years}Y Warranty
                </span>
              )}
            </div>
            <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#64748B' }}>{prod.category}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
              <span>Registered SKUs:</span>
              <span style={{ color: '#004B87' }}>{prod.sku_count || 0} Pack Sizes</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Table Controls */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <input
          type="text"
          placeholder="Search by Product, Shade, or QR Payload..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            border: '1.5px solid #CBD5E1',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        />

        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          style={{
            padding: '10px 14px',
            border: '1.5px solid #CBD5E1',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: '#FFFFFF',
          }}
        >
          <option value="all">All Products ({skus.length} SKUs)</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* SKUs Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#475569' }}>
              <th style={{ padding: '14px 16px' }}>Product</th>
              <th style={{ padding: '14px 16px' }}>Shade</th>
              <th style={{ padding: '14px 16px' }}>Pack Size</th>
              <th style={{ padding: '14px 16px' }}>Printed MRP</th>
              <th style={{ padding: '14px 16px' }}>Static QR Payload</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>
                  Loading catalog...
                </td>
              </tr>
            ) : filteredSKUs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>
                  No SKUs found matching your filters.
                </td>
              </tr>
            ) : (
              filteredSKUs.map((sku) => (
                <tr key={sku.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: '#0F172A' }}>
                    {sku.product_name}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontWeight: '600' }}>{sku.shade_name}</span>{' '}
                    <span style={{ color: '#64748B', fontSize: '12px' }}>({sku.shade_code})</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: '#004B87' }}>
                    {sku.pack_size} {sku.pack_unit}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: '800', color: '#E8501E' }}>
                    ₹{sku.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <code style={{ backgroundColor: '#F1F5F9', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', color: '#0F172A' }}>
                      {sku.qr_code_payload}
                    </code>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleViewQR(sku)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#004B87',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      View & Print QR
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* QR Code Label Modal */}
      {selectedLabel && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#004B87' }}>
                Factory Bucket Label
              </h3>
              <button
                onClick={() => setSelectedLabel(null)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            {/* Label Card Preview */}
            <div style={{ border: `2px solid ${selectedLabel.themeColor}`, borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ backgroundColor: selectedLabel.themeColor, padding: '10px 14px', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '900', letterSpacing: '1px' }}>ANKUR PAINTS</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#FEF08A' }}>{selectedLabel.category}</span>
              </div>
              <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800' }}>{selectedLabel.productName}</h4>
                  <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#475569' }}>
                    Shade: {selectedLabel.shadeCode} - {selectedLabel.shadeName}
                  </p>
                  <span style={{ display: 'inline-block', backgroundColor: '#F1F5F9', padding: '4px 10px', borderRadius: '6px', fontWeight: '800', color: '#004B87', fontSize: '14px', marginBottom: '12px' }}>
                    {selectedLabel.packSize} {selectedLabel.packUnit}
                  </span>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748B', display: 'block' }}>MAXIMUM RETAIL PRICE</span>
                    <span style={{ fontSize: '20px', fontWeight: '900', color: '#E8501E' }}>
                      ₹{selectedLabel.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <img
                    src={getQRCodePNGUrl(selectedLabel.qrPayload, 140)}
                    alt="SKU QR Code"
                    style={{ width: '130px', height: '130px', border: '1px solid #E2E8F0', borderRadius: '8px' }}
                  />
                  <span style={{ display: 'block', fontSize: '9px', fontWeight: '700', color: '#64748B', marginTop: '4px' }}>
                    {selectedLabel.qrPayload}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handlePrintLabel}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#004B87',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                🖨️ Print Label Card
              </button>
              <button
                onClick={() => setSelectedLabel(null)}
                style={{
                  padding: '12px 18px',
                  backgroundColor: '#F1F5F9',
                  color: '#334155',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {isImportModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', maxWidth: '600px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#004B87' }}>
                Bulk Excel Catalog Ingestion
              </h3>
              <button
                onClick={() => {
                  setIsImportModalOpen(false);
                  setImportResult(null);
                  setImportMessage(null);
                }}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748B' }}>
              Upload company master catalog spreadsheet. Generates static QR codes and updates printed MRPs instantly.
            </p>

            {importMessage && (
              <div style={{ padding: '12px', borderRadius: '8px', marginBottom: '16px', backgroundColor: importMessage.includes('Success') ? '#DCFCE7' : '#FEE2E2', color: importMessage.includes('Success') ? '#166534' : '#991B1B', fontSize: '13px', fontWeight: '600' }}>
                {importMessage}
              </div>
            )}

            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              onChange={handleFileUpload}
              style={{
                display: 'block',
                width: '100%',
                padding: '14px',
                border: '2px dashed #CBD5E1',
                borderRadius: '10px',
                marginBottom: '16px',
                cursor: 'pointer',
              }}
            />

            {importResult && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '700' }}>
                  Validation Summary:
                </h4>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ padding: '4px 10px', backgroundColor: '#F1F5F9', borderRadius: '6px', fontSize: '13px' }}>
                    Total: <strong>{importResult.totalRows}</strong>
                  </span>
                  <span style={{ padding: '4px 10px', backgroundColor: '#DCFCE7', color: '#166534', borderRadius: '6px', fontSize: '13px' }}>
                    Valid: <strong>{importResult.validRows.length}</strong>
                  </span>
                  <span style={{ padding: '4px 10px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '6px', fontSize: '13px' }}>
                    Errors: <strong>{importResult.invalidRows.length}</strong>
                  </span>
                </div>

                {importResult.invalidRows.length > 0 && (
                  <div style={{ maxHeight: '140px', overflowY: 'auto', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', fontSize: '12px', color: '#B91C1C' }}>
                    {importResult.invalidRows.map((err, i) => (
                      <div key={i} style={{ marginBottom: '4px' }}>
                        Row {err.rowNumber}: {err.errors.join('; ')}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setIsImportModalOpen(false);
                  setImportResult(null);
                }}
                style={{ padding: '10px 16px', backgroundColor: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmImport}
                disabled={isUploading || !importResult || importResult.validRows.length === 0}
                style={{
                  padding: '10px 20px',
                  backgroundColor: importResult && importResult.validRows.length > 0 ? '#E8501E' : '#CBD5E1',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  cursor: importResult && importResult.validRows.length > 0 ? 'pointer' : 'not-allowed',
                }}
              >
                {isUploading ? 'Uploading...' : 'Confirm & Ingest SKUs'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
