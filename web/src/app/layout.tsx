import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ankur Paints — Colour Your World | Premium Paints & Inks",
  description: "Transform your spaces with premium quality paints that bring life, beauty and lasting protection to your walls. Up to 10 years warranty with German polymer technology.",
  keywords: ["Ankur Paints", "Exterior Emulsion", "Epic Coat", "Rang Ritu", "Damp Proof", "Wall Putty", "Luxury Paints India"],
  icons: {
    icon: "/branding/ankur_logo_master.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-[#050B14] text-slate-100 min-h-screen selection:bg-[#E8501E] selection:text-white">
        {children}
      </body>
    </html>
  );
}
