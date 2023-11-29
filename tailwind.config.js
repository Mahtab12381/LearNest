/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#5F2DED",
        "primary_light": "#cfc0fa",
        "secondary": "#131640",
        "sec_pink": "#e319c8",
        "sec_orange": "#FFA621"
      },
    },
  },
  plugins: [],
}; 