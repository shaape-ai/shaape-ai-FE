/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#EE8543",
        secondary:"#F9C39F"
      },
      fontSize: {
        txs: "10px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        22: "22px",
        24: "24px",
        26: "26px",
        28: "28px",
        30: "30px",
        32: "32px",
        44: "44px",
        48: "48px",
        64: "64px",
      },
      fontFamily: {
        nunitoSans: ["Nunito Sans", "sans-serif"],
        nBlac: ["Nunito Sans Black", "sans-serif"],
        nBold: ["Nunito Sans Bold", "sans-serif"],
        nExtraBold: ["Nunito Sans ExtraBold", "sans-serif"],
        nExtraLight: ["Nunito Sans ExtraLight", "sans-serif"],
        nLight: ["Nunito Sans Light", "sans-serif"],
        nRegular: ["Nunito Sans Regular", "sans-serif"],
        nSemiBold: ["Nunito Sans SemiBold", "sans-serif"],
        nBoldItalic: ["Nunito Sans Bold Italic", "sans-serif"],
        nExtraBoldItalic: ["Nunito Sans ExtraBold Italic", "sans-serif"],
        nExtraLightItalic: ["Nunito Sans ExtraLight Italic", "sans-serif"],
        nItalic: ["Nunito Sans Italic", "sans-serif"],
        nLightItalic: ["Nunito Sans Light Italic", "sans-serif"],
        nRegularItalic: ["Nunito Sans Regular Italic", "sans-serif"],
        nSemiBoldItalic: ["Nunito Sans SemiBold Italic", "sans-serif"],
      }
    },
  },
  plugins: [],
}