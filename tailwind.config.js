/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/ui/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Nunito Sans'", "sans-serif"],
        display: ["Tourney", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};
