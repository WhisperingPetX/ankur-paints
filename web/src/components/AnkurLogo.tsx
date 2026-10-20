import React from "react";

interface AnkurLogoProps {
  className?: string;
}

export const AnkurLogo: React.FC<AnkurLogoProps> = ({ className = "h-11 w-auto" }) => {
  return (
    <svg
      viewBox="0 0 340 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Dynamic 5-Color Rainbow Paintbrush Sweep Arc */}
      <path
        d="M 55 18 C 95 6, 175 4, 255 12 C 295 16, 315 22, 335 30"
        stroke="url(#rainbow-cyan)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M 65 14 C 110 3, 190 2, 270 9 C 300 12, 320 17, 330 24"
        stroke="url(#rainbow-green)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M 80 10 C 130 1, 210 2, 280 7 C 305 9, 322 13, 328 18"
        stroke="url(#rainbow-yellow)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 100 7 C 150 0, 225 2, 285 6 C 305 8, 318 11, 324 15"
        stroke="url(#rainbow-orange)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 125 5 C 170 0, 235 2, 290 5 C 306 7, 314 9, 318 12"
        stroke="url(#rainbow-red)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Gradients for Rainbow Stroke */}
      <defs>
        <linearGradient id="rainbow-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00B2E3" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
        <linearGradient id="rainbow-green" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00A859" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="rainbow-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD100" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="rainbow-orange" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F37021" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <linearGradient id="rainbow-red" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ED1C24" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      {/* Main Brand Typography: "Ankur" (Pure Crisp White) */}
      <text
        x="20"
        y="58"
        fill="#FFFFFF"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontWeight="800"
        fontSize="44"
        letterSpacing="-1px"
      >
        Ankur
      </text>

      {/* Stylized Paint Drop Accent inside "A" */}
      <circle cx="34" cy="38" r="4.5" fill="#00B2E3" />

      {/* Main Brand Typography: "Paints" (Vibrant Vermillion Orange) */}
      <text
        x="158"
        y="58"
        fill="#E8501E"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontWeight="800"
        fontSize="44"
        letterSpacing="-0.5px"
      >
        Paints
      </text>

      {/* Tagline Subtext: "AND INKS PRIVATE LIMITED" */}
      <text
        x="22"
        y="75"
        fill="#94A3B8"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontWeight="700"
        fontSize="9.5"
        letterSpacing="3.8px"
      >
        AND INKS PRIVATE LIMITED
      </text>
    </svg>
  );
};
