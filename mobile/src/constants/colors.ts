/**
 * Ankur Paints Design System — Calibrated Official Brand Palette & Tokens
 * Sourced directly from official Ankur Paints & Inks Private Limited branding.
 * Blends official company identity with Flipkart / Myntra consumer-grade e-commerce polish.
 */

export const Palette = {
  // Official Ankur Paints Brand Identity
  ankurBlue: '#004B87',        // The exact rich cobalt blue of "Ankur" wordmark
  ankurBlueDark: '#003366',
  ankurBlueLight: '#0066B2',
  
  paintsOrange: '#E8501E',     // The signature vibrant vermillion orange of "Paints" wordmark
  paintsOrangeLight: '#FF6F3D',
  paintsOrangeDark: '#C43A0C',

  // Paintbrush Multi-Color Spectrum Arc (From official logo)
  brushSpectrum: {
    cyan: '#00B2E3',
    green: '#00A859',
    yellow: '#FFD100',
    orange: '#F37021',
    red: '#ED1C24',
  },

  // Real Product Line Color Identity (Extracted from official bucket lineup)
  productThemes: {
    epicCoat: '#312E81',       // Epic Coat Exterior Emulsion (Deep Royal Indigo)
    rangRitu: '#BE185D',       // Rang Ritu Interior Emulsion (Vibrant Magenta Pink)
    gleamCoat: '#0F766E',      // Gleam Coat Exterior Emulsion (Teal Cyan)
    roseGold: '#991B1B',       // Rose Gold Exterior Emulsion (Rich Crimson)
    dampProof: '#854D0E',      // High Performance Damp Proof (Ochre Gold)
    colourCrest: '#9A3412',    // Colour Crest Exterior Emulsion (Warm Amber Terracotta)
    acrylicDistemper: '#166534', // Acrylic Washable Distemper (Fresh Leaf Green)
    wallPrimer: '#065F46',     // Premium Exterior Wall Primer (Deep Mint Green)
    wallPutty: '#A16207',      // Acrylic Premium Wall Putty (Golden Amber)
  },

  // E-Commerce Incentive & Gamification Tones (Flipkart Big Billion Days Gold)
  goldLight: '#FEF08A',
  gold: '#F59E0B',
  goldDark: '#B45309',
  goldMetallic: '#FFD700',

  // Semantic Status Tones
  successLight: '#DCFCE7',
  success: '#10B981',
  successDark: '#059669',

  warningLight: '#FEF3C7',
  warning: '#F59E0B',
  warningDark: '#B45309',

  errorLight: '#FEE2E2',
  error: '#EF4444',
  errorDark: '#B91C1C',

  // Surfaces & Backgrounds
  white: '#FFFFFF',
  backgroundLight: '#F8FAFC',
  cardBackground: '#FFFFFF',
  surfaceAlt: '#F1F5F9',
  borderLight: '#E2E8F0',
  borderMedium: '#CBD5E1',

  // Typography Text Tones
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',

  // High-Energy E-Commerce Festive Gradients
  festiveGradients: {
    ankurSignature: ['#004B87', '#E8501E'],
    goldDhamaka: ['#FFD700', '#F59E0B', '#E8501E'],
    epicIndigo: ['#1E1B4B', '#312E81', '#4338CA'],
    festivePink: ['#831843', '#BE185D', '#FB7185'],
    tealLuxe: ['#042F2E', '#0F766E', '#14B8A6'],
  },
} as const;

export const Colors = {
  // Brand
  brandBlue: Palette.ankurBlue,
  brandOrange: Palette.paintsOrange,

  // App Surfaces
  screenBg: Palette.backgroundLight,
  cardBg: Palette.cardBackground,
  modalBg: Palette.white,

  // Primary Actions
  btnPrimaryBg: Palette.paintsOrange,
  btnPrimaryText: Palette.white,
  btnSecondaryBg: Palette.surfaceAlt,
  btnSecondaryText: Palette.ankurBlue,
  btnGoldBg: Palette.gold,
  btnGoldText: Palette.ankurBlueDark,

  // Typography
  text: Palette.textPrimary,
  textSub: Palette.textSecondary,
  textMuted: Palette.textMuted,
  textOnPrimary: Palette.white,

  // Business Validation & Alerts
  stockAvailable: Palette.success,
  stockBlocked: Palette.error,
  priceValid: Palette.successDark,
  priceExceeded: Palette.error,

  // Viewfinder
  scannerFrame: Palette.paintsOrange,
  scannerLaser: '#00B2E3',
  scannerOverlay: 'rgba(0, 75, 135, 0.75)',

  // Flipkart Target Card
  targetTrackBg: '#E2E8F0',
  targetProgressFill: Palette.gold,
  targetUnlockedBadge: Palette.success,
};
