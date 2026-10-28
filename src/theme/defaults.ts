import type { ThemeDefaults } from '@/core';

/** The template's own accent and surfaces; the store's branding overrides the accent. */
export const themeDefaults: ThemeDefaults = {
  brand: '#0E5A5C',
  brand2: '#F4A04B',
  surface: '#F2F4F5',
  // Raised cards are the lightest reading surface in dark mode.
  darkSurface: '#293F42',
  displayFont: '"Baloo 2", "Noto Sans", -apple-system, "Segoe UI", Roboto, sans-serif',
  bundledFonts: ['Baloo 2', 'Nunito Sans'],
  displayFallback: '-apple-system, "Segoe UI", Roboto, sans-serif',
};
