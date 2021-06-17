module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        tiny: { max: "320px" },
        mobile: { max: "440px" },
        tablet: { min: "440px", max: "639px" },
        default: { max: "639px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
