/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        TK: {
          background: '#131921',
          default: '#131921',
        },
      },
      keyframes: {
        push: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(2rem)' },
        },
        mpush: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(21px)' },
        },
        brush: {
          '0%, 50%, 100%': { transform: 'translateX(0)' },
          '75%': { transform: 'translateX(549px)' },
        },
        mbrush: {
          '0%, 50%, 100%': { transform: 'translateX(0)' },
          '75%': { transform: 'translateX(549px)' },
        },
        paste: {
          '0%': { transform: 'scale(0) translateX(0)', opacity: 1 },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'translateX(549px)', opacity: 1 },
          '76%': { opacity: 0 },
          '100%': { transform: 'scale(0) translateX(0)', opacity: 0 },
        },
        bubble: {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        push: 'push .5s ease-in-out',
        mpush: 'mpush .5s ease-in-out',
        paste: 'paste .5s ease-in-out forwards',
        brush: 'brush .5s ease-in-out',
        mbrush: 'mbrush .5s ease-in-out ',
        bubble: 'bubble .5s ease-in-out ',
      }
    },
  },
  plugins: [],
};
