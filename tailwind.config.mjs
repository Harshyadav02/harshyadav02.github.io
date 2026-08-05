/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0d10',
          soft: '#0d1114',
        },
        surface: {
          DEFAULT: '#11151a',
          raised: '#161b21',
        },
        border: {
          DEFAULT: '#212830',
          soft: '#1a2027',
        },
        ink: {
          DEFAULT: '#e5e9ec',
          muted: '#8d9aa5',
          faint: '#5b6773',
        },
        mint: {
          DEFAULT: '#4ade9a',
          dim: '#2f8f66',
          bright: '#6ef0b3',
        },
        amber: {
          DEFAULT: '#e8a54b',
          dim: '#a97633',
        },
        // Light mode surface tokens
        paper: {
          DEFAULT: '#f7f7f4',
          raised: '#ffffff',
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
