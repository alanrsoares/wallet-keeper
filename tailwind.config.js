/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
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
