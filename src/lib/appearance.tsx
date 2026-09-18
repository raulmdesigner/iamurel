import { createContext, useContext } from 'react';
import type { AppearanceSettings } from '../types';
import { defaultAppearance } from './mockData';
export const AppearanceContext = createContext<AppearanceSettings>(defaultAppearance);
export const useAppearance = () => useContext(AppearanceContext);
export function applyAppearance(appearance: AppearanceSettings) {
  const style = document.documentElement.style;
  style.setProperty('--color-action', appearance.action_color);
  style.setProperty('--color-action-hover', appearance.action_color);
  style.setProperty('--color-text', appearance.primary_color);
  style.setProperty('--color-bg', { cream: '#F7F4EE', neutral_white: '#FBFBFA', pure_minimal: '#FFFFFF' }[appearance.bg_tone]);
  style.setProperty('--font-display', {
    editorial: '"Playfair Display", Georgia, serif',
    contemporary: '"Outfit", "Plus Jakarta Sans", sans-serif',
    grotesk: '"Space Grotesk", monospace, sans-serif'
  }[appearance.font_pairing] || '"Outfit", sans-serif');
  document.documentElement.dataset.iamurelBorders = appearance.border_style;
  document.documentElement.dataset.iamurelMotion = appearance.motion_level;
}
