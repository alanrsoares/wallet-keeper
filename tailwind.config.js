/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cursiva: ["Architects Daughter", "cursive"],
        sans: ["'Nunito Sans'", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
