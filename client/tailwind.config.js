/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
