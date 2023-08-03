/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./common/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
      fontFamily: {
        roboto: ['"Roboto"', "sans-serif"],
        "roboto-mono": ['"Roboto Mono"', "monospace"],
      },

      gridTemplateColumns: {
        23: "repeat(23, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },

      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },

      colors: {
        dsqgreen: {
          50: "#66F3CD",
          100: "#00EBAB",
          200: "#0B4037",
        },
        dsqblack: {
          100: "#0E1016",
          200: "#0B0C0B",
          300: "#060706",
        },
        dsqgray: {
          50: "#2F3544",
          100: "#888B92",
          200: "#C1C1C3",
          300: "#262829",
        },
        dsqgreenbg: {
          100: "#161616",
          200: "#072520",
        },
      },
      backgroundImage: {
        footerBg: "url('../public/backgrounds/footerBackground.svg')",
        footerMobileBg:
          "url('../public/backgrounds/footerBackgroundMobile.svg')",
        footerMobileNavBg:
          "url('../public/backgrounds/mobileBackgroundNavbar.svg')",
      },
    },
  },
  plugins: [],
}
