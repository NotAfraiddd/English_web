/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(81, 166, 221, 0.70)',
        primary_black: '#615A5A',
        primary_black_opacity: 'rgba(97, 90, 90, 0.5)',
        table_header: '#ECECEC',
        table_border: 'rgba(217, 217, 217, 0.6)',
        text_back: '#D9D9D9',
      },
    },
  },
  plugins: [],
};
