"use client";

import React, { useState } from "react";
import { QrCode, ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, X } from "lucide-react";
import confetti from "canvas-confetti";

export const RetailerHubMinimal: React.FC = () => {
  const [salesAchieved, setSalesAchieved] = useState(75000);
  const targetGoal = 100000;
  const [sellingPrice, setSellingPrice] = useState(3850);
  const mrp = 4200;
  const [scannedItem, setScannedItem] = useState({
    skuCode: "ANKUR_EPIC_101_20L",
    name: "Epic Coat Luxury Exterior Emulsion 20L",
    shade: "Royal Peacock Indigo (SH-101)",
    mrp: 4200,
  });
  const [receiptOpen, setReceiptOpen] = useState(false);

  const priceExceedsMRP = sellingPrice > mrp;

  const handleCompleteSale = () => {
    if (priceExceedsMRP) return;

    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#004B87", "#E8501E", "#FFD100", "#10B981"],
    });

    setSalesAchieved((prev) => Math.min(prev + sellingPrice, targetGoal));
    setReceiptOpen(true);
  };

  const progressPct = Math.min(100, Math.round((salesAchieved / targetGoal) * 100));

  return (
    <section id="dealers" className="py-24 bg-black text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8501E]">
            AUTHORIZED PARTNER NETWORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Retailer Point-of-Sale & Operations.
          </h2>
          <p className="text-sm text-slate-400">
            Real-time barcode QR scanning, strict price-ceiling protection (Selling Price &le; MRP), and Diwali Dhamaka milestone tracking.
          </p>
        </div>

        {/* 2-Column POS Cards (Apple Dark Glass Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left: Diwali Dhamaka Milestone */}
          <div className="md:col-span-6 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-bold text-base text-white">Diwali Festive Dhamaka 2026</h3>
                <p className="text-xs text-slate-400">Gupta Paints & Hardware (Delhi NCR)</p>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Tier 2 Active
              </span>
            </div>

            {/* Target Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Achieved: ₹{salesAchieved.toLocaleString("en-IN")}</span>
                <span className="text-white font-bold">Goal: ₹{targetGoal.toLocaleString("en-IN")}</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#004B87] to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Progress: <strong className="text-white">{progressPct}%</strong></span>
                <span className="text-[#FFD100] font-semibold">
                  {targetGoal - salesAchieved > 0
                    ? `₹${(targetGoal - salesAchieved).toLocaleString("en-IN")} to unlock Gold Tier`
                    : "🎉 Target Achieved!"}
                </span>
              </div>
            </div>

            {/* Unlocks */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-emerald-400 font-bold block">✓ Tier 1 (₹50k)</span>
                <span className="text-slate-300 text-[11px]">₹2,500 Direct Rebate</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20">
                <span className="text-[#00B2E3] font-bold block">Tier 2 (₹1.0L)</span>
                <span className="text-slate-200 text-[11px]">Smart TV 43" / Gold</span>
              </div>
            </div>
          </div>

          {/* Right: Barcode Scanner & Price Guard */}
          <div className="md:col-span-6 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#00B2E3]" />
                <h3 className="font-bold text-base text-white">QR Camera Checkout</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{scannedItem.skuCode}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1.5">
              <div className="font-bold text-white text-sm">{scannedItem.name}</div>
              <div className="text-slate-400">{scannedItem.shade}</div>
              <div className="flex justify-between text-slate-300 pt-1 border-t border-white/10">
                <span>Printed MRP Ceiling:</span>
                <span className="font-bold text-white">₹{mrp.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Selling Price Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-300">Customer Selling Price (₹):</label>
                <span className="text-slate-500 text-[11px]">Max: ₹{mrp}</span>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className={`w-full pl-8 pr-4 py-3 rounded-2xl bg-white/10 border text-sm font-bold text-white outline-none transition-all ${
                    priceExceedsMRP
                      ? "border-red-500 bg-red-500/10 text-red-300"
                      : "border-white/20 focus:border-white"
                  }`}
                />
              </div>

              {priceExceedsMRP && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Selling Price cannot exceed printed MRP (₹{mrp}).</span>
                </div>
              )}
            </div>

            {/* Complete Sale Button */}
            <button
              onClick={handleCompleteSale}
              disabled={priceExceedsMRP}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                priceExceedsMRP
                  ? "bg-white/10 text-slate-500 cursor-not-allowed"
                  : "bg-white text-slate-950 hover:bg-slate-200 active:scale-98 shadow-lg"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Sale & Issue Tax Invoice (₹{sellingPrice})</span>
            </button>
          </div>

        </div>

      </div>

      {/* Invoice Modal */}
      {receiptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0A0D14] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 text-white text-left shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <h4 className="font-bold text-sm">Invoice Confirmed</h4>
              </div>
              <button onClick={() => setReceiptOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Product:</span>
                <span className="font-bold text-white truncate max-w-[180px]">{scannedItem.name}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold border-t border-white/10 pt-2">
                <span>Amount Paid:</span>
                <span>₹{sellingPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[11px] text-orange-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>+ ₹{sellingPrice} added to your Diwali Dhamaka meter!</span>
            </div>

            <button
              onClick={() => setReceiptOpen(false)}
              className="w-full py-3 bg-white text-slate-950 font-bold rounded-xl text-xs hover:bg-slate-200 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
