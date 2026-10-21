"use client";

import React from "react";
import { AnkurLogo } from "@/components/AnkurLogo";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="flex justify-center">
          <AnkurLogo className="h-16 w-auto" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Ankur Paints & Inks Private Limited
          </h1>
          <p className="text-sm text-slate-400">
            Clean Base Ready. Waiting for your design direction.
          </p>
        </div>
      </div>
    </main>
  );
}
