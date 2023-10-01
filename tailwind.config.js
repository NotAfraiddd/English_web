/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(81, 166, 221, 0.70)',
        primary_blue: '#0056D6',
        primary_line: 'rgba(153, 153, 153, 0.60)',
        primary_black: '#615A5A',
        primary_999: '#999',
        primary_black_opacity: 'rgba(97, 90, 90, 0.5)',
        table_header: '#ECECEC',
        table_border: 'rgba(217, 217, 217, 0.6)',
        text_back: '#D9D9D9',
        orange: 'rgba(240, 81, 35, 1)',
        text_green: '#45CD15',
        text_red: '#F00',
      },
    },
  },
  plugins: [],
};
