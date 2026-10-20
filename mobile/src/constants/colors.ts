/**
 * Ankur Paints Design System — Color Palette & Tokens
 * Consumer-grade, vibrant theme inspired by top Indian e-commerce apps (Flipkart / Amazon).
 */

export const Palette = {
  // Brand Primaries (Deep Navy & Royal Indigo)
  primaryDark: '#0B192C',
  primary: '#1E3E62',
  primaryLight: '#2D5B88',
  primaryAccent: '#0066FF',

  // Incentive Gold & Trophy (Flipkart Big Billion Days Festive Gold)
  goldLight: '#FDE047',
  gold: '#F59E0B',
  goldDark: '#D97706',
  goldGradientStart: '#FFD700',
  goldGradientEnd: '#FF8C00',

  // Energy & Action (Coral / Paint Orange)
  accentOrange: '#FF5722',
  accentOrangeLight: '#FF8A65',
  accentOrangeDark: '#E64A19',

  // Semantic Status Colors
  successLight: '#DCFCE7',
  success: '#10B981',
  successDark: '#059669',

  warningLight: '#FEF3C7',
  warning: '#F59E0B',
  warningDark: '#B45309',

  errorLight: '#FEE2E2',
  error: '#EF4444',
  errorDark: '#B91C1C',

  infoLight: '#E0F2FE',
  info: '#0284C7',
  infoDark: '#0369A1',

  // Neutral Greys & Backgrounds
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

  // Festive Banners / Gamification Gradients
  festiveGradients: {
    goldFestival: ['#FFD700', '#FF8C00'],
    superSaverNavy: ['#0B192C', '#1E3E62'],
    electricBlue: ['#0052D4', '#4364F7', '#6FB1FC'],
    rubyOffer: ['#EB3349', '#F45C43'],
    emeraldEarn: ['#11998E', '#38EF7D'],
  },
} as const;

export const Colors = {
  // Screen backgrounds
  screenBg: Palette.backgroundLight,
  cardBg: Palette.cardBackground,
  modalBg: Palette.white,

  // Buttons & CTAs
  btnPrimaryBg: Palette.accentOrange,
  btnPrimaryText: Palette.white,
  btnSecondaryBg: Palette.surfaceAlt,
  btnSecondaryText: Palette.primaryDark,
  btnGoldBg: Palette.gold,
  btnGoldText: Palette.primaryDark,

  // Text
  text: Palette.textPrimary,
  textSub: Palette.textSecondary,
  textMuted: Palette.textMuted,
  textOnPrimary: Palette.white,

  // Alerts & Checks
  stockAvailable: Palette.success,
  stockBlocked: Palette.error,
  priceValid: Palette.successDark,
  priceExceeded: Palette.error,

  // Scanner Viewfinder
  scannerFrame: Palette.accentOrange,
  scannerLaser: '#FF0055',
  scannerOverlay: 'rgba(11, 25, 44, 0.75)',

  // Gamified Target Card
  targetTrackBg: '#E2E8F0',
  targetProgressFill: Palette.gold,
  targetUnlockedBadge: Palette.success,
};
