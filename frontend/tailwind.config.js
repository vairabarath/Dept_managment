/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        skyBlue: "#C3EBFA",
        lightSkyBlue: "#EDF9FD",
        lightYellow: "#FEFCEB",
        lightPink: "#FFDCF1",
        yellow: "#FAE27C",
        green: "#CBF7B8",
        sandle: "#FEF8DD",
      },
    },
  },
  plugins: [],
};
