"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, TrendingUp, Receipt, ArrowRight, X } from "lucide-react";
import confetti from "canvas-confetti";

export const RetailerPOSDemo: React.FC = () => {
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

    // Trigger confetti celebration!
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
    <section id="retailer-portal" className="py-20 lg:py-28 bg-[#030712] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-bold uppercase tracking-[0.2em] text-[#00E5FF]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive B2B Operations Terminal</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white">
            Retailer Point-of-Sale & <span className="text-[#E8501E]">Incentive Terminal</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Live simulation of the Ankur Paints Store Portal: Barcode QR camera scanning, strict Selling Price &le; MRP database guard, and real-time Diwali target milestone accruals.
          </p>
        </div>

        {/* 2-Column POS Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Gamified Diwali Dhamaka Target Milestone Meter */}
          <div className="lg:col-span-6 bg-[#0B1528] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E8501E] to-[#FFD100] text-slate-950 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Diwali Festive Dhamaka 2026</h3>
                  <p className="text-xs text-slate-400">Gupta Paints & Hardware Mart</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse">
                Live Scheme
              </span>
            </div>

            {/* Target Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Achieved: ₹{salesAchieved.toLocaleString("en-IN")}</span>
                <span className="text-white font-bold">Target: ₹{targetGoal.toLocaleString("en-IN")}</span>
              </div>

              {/* Multi-Node Progress Track */}
              <div className="relative w-full h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700/80">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#004B87] via-[#E8501E] to-[#FFD100] rounded-full shadow-[0_0_12px_#E8501E]"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Bronze (3%)</span>
                <span className="text-emerald-400 font-bold">★ Active: Silver (6%)</span>
                <span>Gold Tier (10%)</span>
              </div>
            </div>

            {/* Next Milestone Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#004B87]/30 to-[#E8501E]/20 border border-[#004B87]/50 flex items-center gap-3.5">
              <Sparkles className="w-6 h-6 text-[#FFD100] shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Just ₹{(targetGoal - salesAchieved).toLocaleString("en-IN")} to unlock Gold 10% Bonus!</div>
                <div className="text-slate-300">Earn ₹10,000 extra cash reward on achieving ₹1,00,000 monthly sales.</div>
              </div>
            </div>

            {/* Double Entry Ledger Audit Footnote */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              <TrendingUp className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Real-time PostgreSQL ledger sync (`retailer_incentives` table).</span>
            </div>
          </div>

          {/* Right Column: POS Terminal & Barcode Scanner Simulator */}
          <div className="lg:col-span-6 bg-[#0B1528] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-base text-white">Billing Terminal & QR POS</h3>
                <p className="text-xs text-slate-400">Retail Counter Sale Validation</p>
              </div>

              <button
                onClick={handleSimulateScan}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-600 transition-all active:scale-95 shadow-sm"
              >
                <QrCode className="w-4 h-4 text-[#00E5FF]" />
                <span>Simulate Camera Scan</span>
              </button>
            </div>

            {/* Scanned Line Item Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#00B2E3] uppercase bg-[#00B2E3]/15 px-2 py-0.5 rounded">
                    {scannedItem.skuCode}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{scannedItem.name}</h4>
                  <p className="text-xs text-slate-400">{scannedItem.shade} • Qty: {scannedItem.qty}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase block">Printed MRP</span>
                  <span className="text-sm font-bold text-white">₹{mrp}</span>
                </div>
              </div>

              {/* Selling Price Entry with Invariant Check */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    Store Selling Price (₹):
                  </label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className={`w-36 bg-slate-950 border px-3 py-1.5 rounded-lg text-sm font-bold text-white focus:outline-none ${
                      priceExceedsMRP
                        ? "border-red-500 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                        : "border-emerald-500/80 focus:border-emerald-400"
                    }`}
                  />
                </div>

                {/* Real-time Dynamic Validation Guard Badge */}
                <div className="text-xs">
                  {priceExceedsMRP ? (
                    <div className="flex items-center gap-1.5 text-red-400 font-bold bg-red-500/15 px-3 py-1.5 rounded-xl border border-red-500/30">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>BLOCKED: Price &gt; MRP ₹{mrp}!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/15 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>✓ Validated: Price &le; MRP</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bill Summary & Complete Checkout Button */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Estimated Retailer Incentive:</span>
                <span className="text-emerald-400 font-bold">₹{Math.round(sellingPrice * 0.06)} (6% Silver Tier)</span>
              </div>

              <button
                onClick={handleCompleteSale}
                disabled={priceExceedsMRP}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                  priceExceedsMRP
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-[#E8501E] hover:bg-[#D04212] text-white active:scale-98 shadow-[0_8px_25px_rgba(232,80,30,0.4)]"
                }`}
              >
                <Receipt className="w-4 h-4" />
                <span>Generate Official Receipt & Decrement Stock</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Animated Green Tick Official Invoice Modal */}
      <AnimatePresence>
        {receiptModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-white text-center space-y-5"
            >
              <button
                onClick={() => setReceiptModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Animated Green Tick Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.5)]"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold font-serif">Sale Recorded Successfully!</h3>
                <p className="text-xs text-[#00E5FF] font-mono">Invoice #INV-2026-08492</p>
                <p className="text-xs text-slate-400">Gupta Paints & Hardware Mart • Ankur Paints Portal</p>
              </div>

              {/* Receipt Line Items Summary */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">{scannedItem.name}</span>
                  <span className="font-bold text-white">₹{sellingPrice}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Customer Phone:</span>
                  <span className="font-mono text-slate-200">+91 98765 43210</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Stock Balance:</span>
                  <span className="text-emerald-400 font-bold">17 Units Available</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-white">
                  <span>Total Paid:</span>
                  <span className="text-[#E8501E]">₹{sellingPrice}</span>
                </div>
              </div>

              <button
                onClick={() => setReceiptModalOpen(false)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider"
              >
                Done / Next Customer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
