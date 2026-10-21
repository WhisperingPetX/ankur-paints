"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface GoogleUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: GoogleUser) => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  if (!isOpen) return null;

  const accounts: GoogleUser[] = [
    {
      name: "Rajesh Gupta",
      email: "rajesh.gupta@hardwaremart.in",
      role: "Authorized Retail Dealer (Delhi NCR)",
      avatar: "R",
    },
    {
      name: "Er. Vikram Malhotra",
      email: "vikram.architects@gmail.com",
      role: "Chief Architectural Consultant",
      avatar: "V",
    },
    {
      name: "Priya Sharma",
      email: "priya.sharma.homes@gmail.com",
      role: "Verified Homeowner",
      avatar: "P",
    },
  ];

  const handleSelect = (user: GoogleUser) => {
    setSelectedAccount(user.email);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#4285F4", "#34A853", "#FBBC05", "#EA4335"],
      });
      onSuccess(user);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google Header */}
        <div className="flex flex-col items-center text-center space-y-2 pb-5 border-b border-slate-100">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>

          <div>
            <h3 className="text-base font-bold text-slate-900">Sign in with Google</h3>
            <p className="text-xs text-slate-500">to continue to Ankur Paints & Inks</p>
          </div>
        </div>

        {/* Account Selector */}
        <div className="py-4 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-1">
            Choose an account
          </span>

          {accounts.map((acc) => {
            const isSelected = selectedAccount === acc.email;
            return (
              <button
                key={acc.email}
                onClick={() => handleSelect(acc)}
                disabled={loading}
                className="w-full p-3 rounded-2xl border border-slate-200/90 hover:border-[#4285F4] hover:bg-blue-50/40 flex items-center gap-3.5 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-full bg-[#004B87] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  {acc.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#4285F4] truncate">
                    {acc.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{acc.email}</div>
                  <div className="text-[10px] text-[#E8501E] font-semibold mt-0.5">{acc.role}</div>
                </div>
                {isSelected && loading && (
                  <div className="w-4 h-4 border-2 border-[#4285F4] border-t-transparent rounded-full animate-spin shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Google Privacy Note */}
        <div className="pt-2 text-center text-[10px] text-slate-400 leading-relaxed border-t border-slate-100">
          To continue, Google will share your name, email address, and language preference with Ankur Paints.
        </div>

      </div>
    </div>
  );
};
