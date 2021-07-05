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
      boxShadow: {
        btn: "0px 6px 0px #b8b8b8",
        active: "0px 3px 0px #1da32c",
        landing: "0px 14px 0px #579ebd",
        landingActive: "0px 6px 0px #579ebd",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
