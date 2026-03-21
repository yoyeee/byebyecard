/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans TC', 'sans-serif'],
      },
      colors: {
        rage: {
          bg:     'var(--t-bg)',
          card:   'var(--t-card)',
          slot:   'var(--t-slot)',
          filled: 'var(--t-filled)',
          border: 'var(--t-border)',
          accent: 'var(--t-accent)',
          muted:  'var(--t-muted)',
        },
      },
      keyframes: {
        stamp: {
          '0%': { transform: 'scale(2) rotate(-15deg)', opacity: '0' },
          '60%': { transform: 'scale(0.9) rotate(3deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        celebrate: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        stamp: 'stamp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        celebrate: 'celebrate 0.8s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
