/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#363853",
        hoverText: "#288ad6",
        tragop: "#f1f1f1",
        btn: "#755731",
        backgroundColor: "#f8fafb",
        borderBtn: "e0e0e0",
      },
    },
  },
  plugins: [],
};
