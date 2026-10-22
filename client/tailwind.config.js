/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-canvas': '#FDF8F1',
        'light-card': '#FFFFFF',
        'light-border': '#2D1B14',
        'dark-canvas': '#0D0D0D',
        'dark-card': '#1A1A1A',
      },
      borderRadius: {
        '4xl': '3rem', // 48px
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'sans-serif'],
        script: ['"Patrick Hand"', 'cursive'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            h1: {
              fontWeight: '900',
              fontSize: '1.75rem',
              marginTop: '1.5rem',
              marginBottom: '1rem',
              borderBottom: `2px solid ${theme('colors.purple.200')}`,
              paddingBottom: '0.5rem',
            },
            h2: {
              fontWeight: '800',
              fontSize: '1.4rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              color: theme('colors.purple.700'),
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
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            'ul > li': {
              paddingLeft: '0.5rem',
            },
            'ol > li': {
              paddingLeft: '0.5rem',
            },
            code: {
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.375rem',
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
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
              padding: '1rem',
              borderRadius: '0.75rem',
              overflow: 'auto',
            },
            strong: {
              fontWeight: '700',
              color: theme('colors.gray.900'),
            },
            blockquote: {
              borderLeftColor: theme('colors.purple.500'),
              backgroundColor: theme('colors.purple.50'),
              padding: '1rem',
              borderRadius: '0 0.5rem 0.5rem 0',
              fontStyle: 'normal',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.200'),
            h1: {
              borderBottomColor: theme('colors.purple.800'),
            },
            h2: {
              color: theme('colors.purple.400'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            strong: {
              color: theme('colors.white'),
            },
            blockquote: {
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
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
