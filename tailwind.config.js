/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Manrope", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        bgImg: "url(./pexels-josh-sorenson-391522.jpg)",
      },
    },
  },
  plugins: [],
};
