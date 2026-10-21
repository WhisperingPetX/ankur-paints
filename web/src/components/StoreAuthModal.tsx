"use client";

import React, { useState } from "react";
import { X, ShieldCheck, CheckCircle2, ArrowRight, Store, Phone, User, FileText } from "lucide-react";
import confetti from "canvas-confetti";
import { AnkurLogo } from "./AnkurLogo";

interface StoreAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin?: (storeData: any) => void;
}

export const StoreAuthModal: React.FC<StoreAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
}) => {
  const [step, setStep] = useState<"login" | "kyc" | "success">("login");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Rajesh Gupta",
    storeName: "Gupta Paints & Sanitary Mart",
    phone: "9876543210",
    gstin: "07AAAAA0000A1Z5",
  });

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate instantaneous Google OAuth token exchange
    setTimeout(() => {
      setLoading(false);
      setStep("kyc");
    }, 700);
  };

  const handleCompleteKYC = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#004B87", "#E8501E", "#FFD100", "#00A859"],
      });
      if (onSuccessLogin) {
        onSuccessLogin(formData);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0F172A] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="h-10 w-auto flex justify-center">
            <AnkurLogo className="h-10 w-auto" variant="light" />
          </div>
          <p className="text-xs text-slate-400">
            Official B2B Retailer & Distributor Portal
          </p>
        </div>

        {/* Step 1: Login / Google One-Tap */}
        {step === "login" && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold font-serif">Welcome Partner</h3>
              <p className="text-xs text-slate-400">
                Sign in with your Google account to access POS Barcode Scanner, instant billing, and Diwali incentive schemes.
              </p>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? "Connecting to Supabase..." : "Sign in with Google"}</span>
            </button>

            <div className="flex items-center gap-2 justify-center text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct 256-bit Supabase OAuth Encryption</span>
            </div>
          </div>
        )}

        {/* Step 2: Store KYC Onboarding */}
        {step === "kyc" && (
          <form onSubmit={handleCompleteKYC} className="space-y-4">
            <div className="text-left space-y-1">
              <h3 className="text-lg font-bold font-serif">Quick Store KYC</h3>
              <p className="text-xs text-slate-400">
                Please verify your store information for invoice headers and incentive credit notes.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Retailer Name</label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-[#E8501E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Store / Outlet Name</label>
                <div className="relative flex items-center">
                  <Store className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-[#E8501E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Mobile Number (WhatsApp Enabled)</label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-[#E8501E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">GSTIN (Optional)</label>
                <div className="relative flex items-center">
                  <FileText className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-[#E8501E]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#E8501E] hover:bg-[#D04212] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>{loading ? "Verifying KYC..." : "Confirm & Activate Terminal"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 3: Success State */}
        {step === "success" && (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-serif text-white">Store KYC Verified!</h3>
              <p className="text-sm font-semibold text-[#00B2E3]">{formData.storeName}</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Your store is live on Supabase with 10% Diwali Bonus slab active.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Launch Retailer Terminal
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
