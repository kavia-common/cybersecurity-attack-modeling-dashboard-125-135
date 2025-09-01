/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#10b981',
        accent: '#f59e0b',
        bg: {
          DEFAULT: '#0b0f17',
          soft: '#0f1726',
          card: '#12192a',
        },
        text: {
          DEFAULT: '#e5e7eb',
          soft: '#9ca3af',
          muted: '#6b7280',
        },
        border: '#1f2937'
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0, 0, 0, 0.45)',
        glow: '0 0 0 1px rgba(99, 102, 241, 0.15), 0 8px 30px rgba(99, 102, 241, 0.15)'
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideIn: 'slideIn 0.5s ease-out',
        pulseSoft: 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateX(-8px)' },
          to: { opacity: 1, transform: 'translateX(0)' }
        },
        pulseSoft: {
          '0%,100%': { opacity: 0.6 },
          '50%': { opacity: 1 }
        }
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px'
      }
    },
  },
  plugins: [],
}
