/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#0B1F33',
          800: '#112B46',
          700: '#1e3a5f',
        },
      },
      keyframes: {
        'marker-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%':      { opacity: '0.9', transform: 'scale(1.4)' },
        },
        'ping-ring': {
          '0%':   { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(3.5)', opacity: '0' },
        },
      },
      animation: {
        'marker-glow': 'marker-glow 2.5s ease-in-out infinite',
        'ping-ring':   'ping-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}
