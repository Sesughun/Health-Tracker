/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#f3e8ff',
          200: '#ddd6fe',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
        },
      },
    },
  },
  plugins: [],
};
