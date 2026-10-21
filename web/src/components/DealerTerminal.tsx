"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, TrendingUp, Receipt, ArrowRight, X, Printer } from "lucide-react";
import confetti from "canvas-confetti";

export const DealerTerminal: React.FC = () => {
  const [salesAchieved, setSalesAchieved] = useState(75000);
  const targetGoal = 100000;
  const [sellingPrice, setSellingPrice] = useState(3850);
  const mrp = 4200;
  const [scannedItem, setScannedItem] = useState<any>({
    skuCode: "ANKUR_EPIC_101_20L",
    name: "Epic Coat Luxury Exterior Emulsion 20L",
    shade: "Royal Peacock Indigo (SH-101)",
    mrp: 4200,
    qty: 1,
  });
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  const priceExceedsMRP = sellingPrice > mrp;

  const handleSimulateScan = () => {
    setScannedItem({
      skuCode: "ANKUR_EPIC_101_20L",
      name: "Epic Coat Luxury Exterior Emulsion 20L",
      shade: "Royal Peacock Indigo (SH-101)",
      mrp: 4200,
      qty: scannedItem ? scannedItem.qty + 1 : 1,
    });
  };

  const handleCompleteSale = () => {
    if (priceExceedsMRP) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#004B87", "#E8501E", "#FFD100", "#10B981"],
    });

    setSalesAchieved((prev) => Math.min(prev + sellingPrice, targetGoal));
    setReceiptModalOpen(true);
  };

  const progressPct = Math.min(100, Math.round((salesAchieved / targetGoal) * 100));

  return (
    <section id="retailer-hub" className="py-20 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-[#E8501E] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Partner & Dealer Operations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Retailer Point-of-Sale & <span className="text-[#004B87]">Diwali Dhamaka Hub</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Live operations terminal for 1,200+ Ankur stockists: Instant camera barcode QR scanning, strict price-ceiling compliance (Selling Price &le; MRP), and real-time festive reward accruals.
          </p>
        </div>

        {/* 2-Column POS Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Diwali Dhamaka Milestone Tracker */}
          <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E8501E] to-[#FFD100] text-slate-950 flex items-center justify-center font-bold shadow-md">
                  ⚡
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Diwali Festive Dhamaka 2026</h3>
                  <p className="text-xs text-slate-500">Gupta Paints & Hardware Mart (Delhi NCR)</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">
                Active Tier 2
              </span>
            </div>

            {/* Target Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Achieved: ₹{salesAchieved.toLocaleString("en-IN")}</span>
                <span className="text-slate-900 font-bold">Target: ₹{targetGoal.toLocaleString("en-IN")}</span>
              </div>

              {/* Progress Track */}
              <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#004B87] via-[#00B2E3] to-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Current Progress: <strong className="text-slate-800">{progressPct}%</strong></span>
                <span className="text-[#E8501E] font-bold">
                  {targetGoal - salesAchieved > 0
                    ? `₹${(targetGoal - salesAchieved).toLocaleString("en-IN")} to unlock Gold Coin!`
                    : "🎉 Target Achieved!"}
                </span>
              </div>
            </div>

            {/* Diwali Incentive Milestone Tiers */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white border border-emerald-200 shadow-sm text-center space-y-1">
                <span className="text-xs font-extrabold text-emerald-600">✓ Tier 1 (₹50k)</span>
                <p className="text-[11px] text-slate-700 font-semibold">₹2,500 Cash Rebate</p>
                <span className="text-[10px] text-emerald-600 font-bold uppercase">Unlocked</span>
              </div>

              <div className="p-3 rounded-2xl bg-white border-2 border-[#004B87] shadow-md text-center space-y-1 relative">
                <span className="absolute -top-2.5 right-2 px-1.5 py-0.2 bg-[#004B87] text-white text-[8px] font-bold rounded-full">
                  CURRENT
                </span>
                <span className="text-xs font-extrabold text-[#004B87]">Tier 2 (₹1.0L)</span>
                <p className="text-[11px] text-slate-800 font-semibold">Smart TV 43" / Gold</p>
                <span className="text-[10px] text-[#004B87] font-bold uppercase">In Progress</span>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center space-y-1 opacity-70">
                <span className="text-xs font-bold text-slate-400">Tier 3 (₹2.5L)</span>
                <p className="text-[11px] text-slate-600">Royal Enfield Bike</p>
                <span className="text-[10px] text-slate-400 uppercase">Locked</span>
              </div>
            </div>

            {/* SOP Rule Invariant Notice */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-[#004B87] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0 text-[#004B87] mt-0.5" />
              <p className="leading-relaxed">
                <strong>Ankur Paints Dealer SOP Guarantee:</strong> Immediate credit note generation on verified QR customer sales. No invoice clawbacks or hidden deductions.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive POS Checkout & Price Ceiling Simulator */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 text-left">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#004B87]" />
                <h3 className="font-bold text-base text-slate-900">QR Scanner & Billing POS</h3>
              </div>
              <button
                onClick={handleSimulateScan}
                className="px-3 py-1.5 bg-blue-50 hover:bg-[#004B87] text-[#004B87] hover:text-white rounded-xl text-xs font-bold transition-all border border-blue-200"
              >
                + Scan QR Barcode
              </button>
            </div>

            {/* Scanned SKU Information */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500">{scannedItem.skuCode}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Stock: 14 Buckets
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{scannedItem.name}</h4>
              <p className="text-xs text-slate-500">{scannedItem.shade}</p>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                <span className="text-slate-500 font-medium">Printed MRP Ceiling:</span>
                <span className="font-extrabold text-slate-900">₹{mrp.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Retailer Selling Price Input (with Strict Validation Rule) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <label className="text-slate-700">Enter Customer Selling Price (₹):</label>
                <span className="text-[11px] text-slate-500">Max Allowed: ₹{mrp}</span>
              </div>
              
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className={`w-full pl-8 pr-4 py-3 rounded-xl border text-sm font-bold outline-none transition-all ${
                    priceExceedsMRP
                      ? "border-red-500 text-red-600 bg-red-50 ring-2 ring-red-200"
                      : "border-slate-300 text-slate-900 focus:border-[#004B87] focus:ring-2 focus:ring-[#004B87]/20"
                  }`}
                />
              </div>

              {/* Price Violation Guard Alert */}
              {priceExceedsMRP ? (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>
                    <strong>Price Ceiling Violation:</strong> Selling Price (₹{sellingPrice}) cannot exceed printed MRP (₹{mrp}). Transaction blocked by Supabase check constraint.
                  </span>
                </motion.div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Compliant with Consumer Protection Rules (₹{mrp - sellingPrice} discount to customer)</span>
                </div>
              )}
            </div>

            {/* Complete Sale Button */}
            <button
              onClick={handleCompleteSale}
              disabled={priceExceedsMRP}
              className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                priceExceedsMRP
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 active:scale-98"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Sale & Issue Tax Invoice (₹{sellingPrice.toLocaleString("en-IN")})</span>
            </button>

          </div>

        </div>

      </div>

      {/* Tax Invoice Modal with Green Tick & Confetti */}
      <AnimatePresence>
        {receiptModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 text-slate-800 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Sale Confirmed</h4>
                    <span className="text-[10px] text-slate-400">Invoice #ANK-2026-9812</span>
                  </div>
                </div>
                <button
                  onClick={() => setReceiptModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Product:</span>
                  <strong className="text-slate-800">{scannedItem.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shade:</span>
                  <span className="text-slate-700">{scannedItem.shade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Printed MRP:</span>
                  <span className="text-slate-700">₹{mrp}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold border-t border-slate-200 pt-1.5">
                  <span>Net Amount Paid:</span>
                  <span className="text-sm">₹{sellingPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-xs text-[#E8501E] flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>+ ₹{sellingPrice} added to your Diwali Festive Dhamaka meter!</span>
              </div>

              <button
                onClick={() => setReceiptModalOpen(false)}
                className="w-full py-3 bg-[#004B87] hover:bg-[#003B6B] text-white text-xs font-bold rounded-xl transition-all"
              >
                Close & Next Transaction
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
