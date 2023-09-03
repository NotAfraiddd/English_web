/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(81, 166, 221, 0.70)",
        primary_black :"#615A5A",
      },
    },
  },
  plugins: [],
};
