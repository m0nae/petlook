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
        mobileMax: { max: "440px" },
        mobile: { min: "440px" },
        tablet: { min: "440px", max: "639px" },
        default: { max: "639px" },
        1135: { min: "1135px" },
      },
      boxShadow: {
        btn: "0px 6px 0px #b8b8b8",
        active: "0px 3px 0px #1da32c",
        landing: "0px 14px 0px #579ebd",
        landingActive: "0px 6px 0px #579ebd",
        search: "0px 7px 0px #579ebd",
        searchActive: "0px 4px 0px #579ebd",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
