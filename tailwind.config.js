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
        brush: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(549px)' },
        },
        mpush: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(21px)' },
        },
        mbrush: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(549px)' },
        },
      },
      animation: {
        push: 'push .5s ease-in-out',
        brush: 'brush .5s ease-in-out',
        mpush: 'mpush .5s ease-in-out',
        mbrush: 'mbrush .5s ease-in-out',
      }
    },
  },
  plugins: [],
};
