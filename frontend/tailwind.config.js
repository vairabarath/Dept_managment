/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        skyBlue: "#C3EBFA",
        lightSkyBlue: "#EDF9FD",
        lightPink: "#FFDCF1",
        green: "#CBF7B8",
        sandle: "#FEF8DD",

        // dark
        bgDark: "#1F1F1F",
        bgDark2: "#606368",
        darkGreen: "#03DAC6",
        violet: "#BB86FC",
      },
    },
  },
  plugins: [],
};
