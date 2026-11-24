/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        craze: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
          neon: '#a855f7',
          cyan: '#06b6d4',
          lime: '#10b981',
          electric: '#6366f1',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        poppins: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 30px -5px rgba(139, 92, 246, 0.4)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.4)',
        'glow-lime': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
      }
    },
  },
  plugins: [],
}
