/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        primary: "#0080F6",
        secondary: "#5E5E5E",
        tertiary: {
          "grey-700": "#757575",
          "grey-40": "#EFEFEF",
          "grey-50": "#FAFAFA",
          "grey-300": "#9D9D9D",
        },
      },
      boxShadow: {
        new: "0 4px 50.5px 0 rgba(0,0,0,0.25)",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};
