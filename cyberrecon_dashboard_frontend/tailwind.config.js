/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Use Tailwind default palettes via semantic tokens
      colors: {
        // Core brand accents (Material/Ant style balance)
        primary: {
          DEFAULT: '#6366f1', // indigo-500
          fg: '#eef2ff', // indigo-50
        },
        success: {
          DEFAULT: '#10b981', // emerald-500
          fg: '#ecfdf5', // emerald-50
        },
        warning: {
          DEFAULT: '#f59e0b', // amber-500
          fg: '#fffbeb', // amber-50
        },
        // Surfaces and content (light/dark harmonized)
        surface: {
          // dark mode surfaces
          0: '#0b0f17', // base background (≈ slate-950 custom)
          1: '#0f172a', // slate-900
          2: '#111827', // gray-900 as card base
          // light mode surfaces
          light0: '#f9fafb', // gray-50
          light1: '#ffffff', // white
          light2: '#f3f4f6', // gray-100
        },
        content: {
          DEFAULT: '#e5e7eb', // gray-200/300 for dark body text
          soft: '#9ca3af', // gray-400
          muted: '#6b7280', // gray-500
          // light mode
          light: '#111827', // gray-900
          lightSoft: '#374151', // gray-700
          lightMuted: '#6b7280', // gray-500
        },
        line: {
          DEFAULT: '#1f2937', // gray-800
          light: '#e5e7eb', // gray-200
        },
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0, 0, 0, 0.45)',
        glow: '0 0 0 1px rgba(99, 102, 241, 0.15), 0 8px 30px rgba(99, 102, 241, 0.15)',
        ring: '0 0 0 3px rgba(99, 102, 241, 0.35)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideIn: 'slideIn 0.5s ease-out',
        pulseSoft: 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateX(-8px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
    },
  },
  plugins: [],
}
