/**
 * Ankur Paints Design System — Typography Tokens
 * Clean, bold, easily readable font hierarchy optimized for high legibility in retail paint stores.
 */

export const Typography = {
  // Font Families (System default fallbacks for clean cross-platform rendering)
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
    extraBold: 'System',
  },

  // Font Sizes
  fontSize: {
    hero: 32,      // Big banner headlines & festive targets
    xxl: 26,       // Section headers, modal titles
    xl: 22,        // Card titles, large currency displays
    lg: 18,        // Subheadings, button text, SKU titles
    base: 15,      // Body text, list items, input fields
    sm: 13,        // Secondary labels, captions, metadata
    xs: 11,        // Badges, micro-labels, helper text
  },

  // Font Weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    heavy: '800',
    black: '900',
  } as const,

  // Line Heights
  lineHeight: {
    hero: 38,
    xxl: 32,
    xl: 28,
    lg: 24,
    base: 20,
    sm: 18,
    xs: 14,
  },

  // Ready-to-use Text Presets
  presets: {
    festiveHeadline: {
      fontSize: 28,
      fontWeight: '800' as const,
      lineHeight: 34,
      letterSpacing: -0.5,
    },
    screenTitle: {
      fontSize: 22,
      fontWeight: '700' as const,
      lineHeight: 28,
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: '600' as const,
      lineHeight: 22,
    },
    priceLarge: {
      fontSize: 24,
      fontWeight: '800' as const,
      lineHeight: 28,
    },
    mrpStrike: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 18,
      textDecorationLine: 'line-through' as const,
    },
    bodyMedium: {
      fontSize: 15,
      fontWeight: '400' as const,
      lineHeight: 21,
    },
    captionBold: {
      fontSize: 12,
      fontWeight: '700' as const,
      lineHeight: 16,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.5,
    },
  },
} as const;
