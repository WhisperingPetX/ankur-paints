/**
 * Ankur Paints Design System — Spacing, Elevation, and Animation Tokens
 */

export const Spacing = {
  // Base 4px/8px Spacing Grid
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  hero: 32,
  huge: 48,

  // Border Radii (Modern smooth corners)
  radius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999, // Pill buttons, circular badges
  },

  // Elevation & Drop Shadows
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    cardSubtle: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    cardElevated: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 14,
      elevation: 5,
    },
    festiveGlow: {
      shadowColor: '#F59E0B',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 8,
    },
    actionButtonGlow: {
      shadowColor: '#FF5722',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 6,
    },
  },

  // Animation Durations & Springs (Flipkart-style snappy micro-interactions)
  animation: {
    snappy: { duration: 150 },
    standard: { duration: 250 },
    festiveCardBounce: { duration: 400 },
    bannerCarouselIntervalMs: 4000,
  },
} as const;
