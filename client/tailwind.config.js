/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '2px',
      DEFAULT: '2px',
      'md': '4px',
      'lg': '6px',
      'full': '9999px',
    },
    extend: {
      colors: {
        'canvas-light': '#F8F9FA',
        'canvas-blueprint': '#1D52B8',
        'ink-primary': '#0A0A0A',
        'border-cad': 'rgba(0, 0, 0, 0.15)',
        'border-cad-blue': 'rgba(255, 255, 255, 0.35)',
        'light-canvas': '#FDF8F1',
        'light-card': '#FFFFFF',
        'light-border': '#2D1B14',
        'dark-canvas': '#0D0D0D',
        'dark-card': '#1A1A1A',
      },
      fontFamily: {
        mono: ['"Courier Prime"', 'Consolas', '"Courier New"', 'monospace'],
        sans: ['"Courier Prime"', 'Consolas', 'monospace'], // Default all text to monospace
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            h1: {
              fontWeight: '700',
              fontSize: '1.75rem',
              marginTop: '1.5rem',
              marginBottom: '1rem',
              borderBottom: `1px solid rgba(0, 0, 0, 0.15)`,
              paddingBottom: '0.5rem',
            },
            h2: {
              fontWeight: '700',
              fontSize: '1.4rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            h3: {
              fontWeight: '700',
              fontSize: '1.15rem',
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
            },
            p: {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
              lineHeight: '1.7',
            },
            code: {
              backgroundColor: '#F8F9FA',
              padding: '0.2rem 0.4rem',
              borderRadius: '2px',
              border: '1px solid rgba(0, 0, 0, 0.15)',
              fontWeight: '500',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#0A0A0A',
              color: '#F8F9FA',
              padding: '1rem',
              borderRadius: '2px',
              overflow: 'auto',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
