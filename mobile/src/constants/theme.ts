/**
 * Ankur Paints Design System — Unified Theme
 */

import { Colors, Palette } from './colors';
import { Typography } from './typography';
import { Spacing } from './spacing';

export const Theme = {
  colors: Colors,
  palette: Palette,
  typography: Typography,
  spacing: Spacing,
} as const;

export type AppTheme = typeof Theme;
export default Theme;
