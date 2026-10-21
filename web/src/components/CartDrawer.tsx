"use client";

import React from "react";
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  qty: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckoutClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#004B87", "#E8501E", "#FFD100", "#10B981"],
    });
    onCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 text-slate-800 text-left">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#004B87]" />
              <h3 className="font-bold text-base text-slate-900">Your Paint Order</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[#004B87] font-bold">
                {items.reduce((acc, i) => acc + i.qty, 0)} Items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-600">Your order list is empty.</p>
                <p className="text-xs text-slate-400">Browse our 9 master collections to select pack sizes and add paints.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.name}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                      <span>Pack: <strong>{item.size}</strong></span>
                      <span>•</span>
                      <span className="text-[#004B87] font-bold">₹{item.price.toLocaleString("en-IN")} each</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-bold text-slate-800">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & Order CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>GST & Delivery:</span>
                  <span className="text-emerald-600 font-bold">Included</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Estimated Total:</span>
                  <span className="text-[#004B87] text-lg">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-[#E8501E] hover:bg-[#D04212] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Send Estimate to Nearest Dealer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Genuine Ankur Paints Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
