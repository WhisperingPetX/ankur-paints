/**
 * Ankur Paints Design System — Component Type Definitions
 */

export type ButtonVariant = 'primary' | 'secondary' | 'gold' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'gold' | 'neutral';

export interface FestiveSchemeBannerProps {
  id: string;
  title: string;
  subtitle: string;
  badgeText?: string;
  targetAmount: number;
  rewardPercentage: number;
  gradientColors: readonly [string, string, ...string[]];
  onPressScheme?: (schemeId: string) => void;
}

export interface TargetProgressCardProps {
  currentSales: number;
  targetSales: number;
  unlockedPercentage: number;
  tierName: string;
  daysRemaining?: number;
  onViewDetails?: () => void;
}

export interface CartItemCardProps {
  skuId: string;
  productName: string;
  shadeCode: string;
  shadeName: string;
  packSize: number;
  packUnit: string;
  mrp: number;
  sellingPrice: number;
  quantity: number;
  availableStock: number;
  onQuantityChange: (newQty: number) => void;
  onPriceChange: (newPrice: number) => void;
  onRemove: () => void;
}
