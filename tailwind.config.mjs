/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      // Palette is driven by CSS variables (see src/styles/global.css) so the
      // theme switcher can swap it at runtime. Values are space-separated RGB
      // channels so Tailwind opacity modifiers like `border-mint/40` still work.
      colors: {
        bg: {
          DEFAULT: 'rgb(var(--c-bg) / <alpha-value>)',
          soft: 'rgb(var(--c-bg-soft) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--c-surface) / <alpha-value>)',
          raised: 'rgb(var(--c-surface-raised) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--c-border) / <alpha-value>)',
          soft: 'rgb(var(--c-border-soft) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          muted: 'rgb(var(--c-ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--c-ink-faint) / <alpha-value>)',
        },
        mint: {
          DEFAULT: 'rgb(var(--c-mint) / <alpha-value>)',
          dim: 'rgb(var(--c-mint-dim) / <alpha-value>)',
          bright: 'rgb(var(--c-mint-bright) / <alpha-value>)',
        },
        amber: {
          DEFAULT: 'rgb(var(--c-amber) / <alpha-value>)',
          dim: 'rgb(var(--c-amber-dim) / <alpha-value>)',
        },
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.7' }],
      },
      maxWidth: {
        prose: '42rem',
        content: '72rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        fadeUp: '.5s ease-out forwards fadeUp',
      },
    },
  },
  plugins: [],
};
