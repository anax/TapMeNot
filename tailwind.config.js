/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ff88',
        'primary-dark': '#00cc6a',
        dark: {
          DEFAULT: '#1a1a1a',
          lighter: '#2a2a2a',
        }
      },
      animation: {
        'pulse-custom': 'pulse 0.2s ease-in-out',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
        }
      }
    },
  },
  plugins: [],
} 