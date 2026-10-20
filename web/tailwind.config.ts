import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ankur: {
          blue: "#004B87",
          "blue-dark": "#0B132B",
          "blue-midnight": "#050B14",
          orange: "#E8501E",
          "orange-hover": "#D04212",
          cyan: "#00B2E3",
          green: "#00A859",
          yellow: "#FFD100",
          red: "#ED1C24",
          surface: "rgba(15, 23, 42, 0.75)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        cursive: ["var(--font-dancing)", "cursive"],
      },
      boxShadow: {
        luxury: "0 20px 50px -10px rgba(0, 75, 135, 0.3)",
        glow: "0 0 30px rgba(232, 80, 30, 0.35)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
