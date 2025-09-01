/**
 * Tailwind configuration for CyberRecon Dashboard.
 * Uses CSS variables for color theming and enables dark mode via class or media.
 */
import forms from '@tailwindcss/forms';

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        on: {
          surface: 'rgb(var(--color-on-surface) / <alpha-value>)',
        },
      },
      boxShadow: {
        soft: '0 10px 25px -15px rgba(0,0,0,0.4)',
      },
      borderRadius: {
        xl: '14px',
      },
    },
  },
  plugins: [forms],
};
