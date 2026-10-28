export interface Theme {
  id: string;
  label: string;
  description: string;
  /** Background and accent swatches shown in the theme picker. */
  swatch: [string, string];
}

export const themes: Theme[] = [
  { id: 'terminal', label: 'Terminal', description: 'The original dark console', swatch: ['#0a0d10', '#4ade9a'] },
  { id: 'aurora', label: 'Aurora', description: 'Glass cards, drifting glow', swatch: ['#060a11', '#2dd4bf'] },
  { id: 'grid', label: 'Grid', description: 'CRT glow on a grid', swatch: ['#040906', '#82ffbe'] },
  { id: 'ocean', label: 'Ocean', description: 'Deep teal with a tide glow', swatch: ['#040e16', '#40e0b4'] },
  { id: 'forest', label: 'Forest', description: 'Warm, earthy and soft', swatch: ['#0c100c', '#68de96'] },
  { id: 'noir', label: 'Noir', description: 'True black, sharp edges', swatch: ['#000000', '#4ade9a'] },
  { id: 'neon', label: 'Neon', description: 'Mint and magenta night', swatch: ['#090710', '#ec4899'] },
  { id: 'daylight', label: 'Daylight', description: 'Light mode, mint accent', swatch: ['#f6f9f7', '#04784d'] },
];

export const defaultTheme = 'terminal';
