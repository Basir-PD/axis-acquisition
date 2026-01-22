import type { Config } from 'tailwindcss'
const {
  default: flattenColorPalette,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      screens: {
        xxl: '1920px',
        xxxl: '2560px',
        '4k': '3840px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient':
          'linear-gradient(135deg, #f8faf8 0%, #e8f0e8 50%, #f5f0eb 100%)',
        'hero-gradient-dark':
          'linear-gradient(135deg, #1a1f1a 0%, #0f1a14 50%, #1a1816 100%)',
        'sage-gradient':
          'linear-gradient(135deg, #87a878 0%, #6b8f5e 100%)',
        'warm-gradient':
          'linear-gradient(135deg, #d4c4b0 0%, #c4b49a 100%)',
        'wellness-mesh':
          'radial-gradient(at 40% 20%, hsla(120, 28%, 89%, 0.6) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(35, 30%, 90%, 0.5) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(200, 25%, 90%, 0.4) 0px, transparent 50%)',
        'wellness-mesh-dark':
          'radial-gradient(at 40% 20%, hsla(120, 28%, 15%, 0.6) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(35, 30%, 12%, 0.5) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(200, 25%, 15%, 0.4) 0px, transparent 50%)',
      },
      colors: {
        // Sage Green - Primary brand color
        sage: {
          50: '#f4f7f4',
          100: '#e6ede5',
          200: '#cddacc',
          300: '#a8bfa6',
          400: '#7d9c79',
          500: '#5d7f59',
          600: '#4a6647',
          700: '#3d523b',
          800: '#334432',
          900: '#2b392b',
          950: '#151d15',
        },
        // Warm Stone - Secondary color
        stone: {
          50: '#faf9f7',
          100: '#f3f1ed',
          200: '#e5e1d8',
          300: '#d4cdbf',
          400: '#c0b5a2',
          500: '#a99a82',
          600: '#9a8971',
          700: '#80715e',
          800: '#695d4f',
          900: '#574e42',
          950: '#2e2922',
        },
        // Soft Blue - Accent for trust/medical
        sky: {
          50: '#f5f9fc',
          100: '#e9f2f8',
          200: '#cee3ef',
          300: '#a3cce2',
          400: '#71afd0',
          500: '#4f94bc',
          600: '#3c79a0',
          700: '#326282',
          800: '#2d536c',
          900: '#29465a',
          950: '#1c2e3c',
        },
        // Cream - Background warmth
        cream: {
          50: '#fdfcfa',
          100: '#faf8f4',
          200: '#f5f0e8',
          300: '#ede5d8',
          400: '#e2d5c2',
          500: '#d4c2a8',
          600: '#c2a988',
          700: '#a68d6d',
          800: '#87735a',
          900: '#6e5f4b',
          950: '#3a3127',
        },
        // Legacy support
        primary: {
          DEFAULT: '#5d7f59',
          50: '#f4f7f4',
          100: '#e6ede5',
          200: '#cddacc',
          300: '#a8bfa6',
          400: '#7d9c79',
          500: '#5d7f59',
          600: '#4a6647',
          700: '#3d523b',
          800: '#334432',
          900: '#2b392b',
          950: '#151d15',
        },
        secondary: '#d4cdbf',
        muted: 'var(--neutral-600)',
        'muted-dark': 'var(--neutral-300)',
        'glass-light': 'rgba(255, 255, 255, 0.8)',
        'glass-dark': 'rgba(0, 0, 0, 0.4)',
      },
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        marquee: 'marquee var(--marquee-duration) linear infinite',
        'fade-in': 'fade-in 0.5s linear forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
      },
      borderColor: {
        'glass-light': 'rgba(255, 255, 255, 0.2)',
        'glass-dark': 'rgba(0, 0, 0, 0.2)',
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
        wellness: `0 4px 6px -1px rgba(93, 127, 89, 0.1), 0 2px 4px -2px rgba(93, 127, 89, 0.1)`,
        'wellness-lg': `0 10px 15px -3px rgba(93, 127, 89, 0.1), 0 4px 6px -4px rgba(93, 127, 89, 0.1)`,
        'wellness-xl': `0 20px 25px -5px rgba(93, 127, 89, 0.1), 0 8px 10px -6px rgba(93, 127, 89, 0.1)`,
        organic: `0 4px 20px rgba(93, 127, 89, 0.15)`,
        'organic-hover': `0 8px 30px rgba(93, 127, 89, 0.2)`,
        card: `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`,
        'card-hover': `0 10px 40px rgba(0,0,0,0.08)`,
        'glass-light': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'glass-dark': '0 4px 6px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        marquee: {
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        shimmer: {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
        'pulse-soft': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.7',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        breathe: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.02)',
          },
        },
        'slide-up': {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-down': {
          from: {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors, require('@tailwindcss/typography')],
}

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme('colors'))
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  )

  addBase({
    ':root': newVars,
  })
}

export default config
