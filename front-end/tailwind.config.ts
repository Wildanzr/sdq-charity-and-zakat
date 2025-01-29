import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        ubuntu: ["var(--font-ubuntu)"],
        spaceGrotesk: ["var(--font-spaceGrotesk)"],
        manrope: ["var(--font-manrope)"],
      },
      colors: {
        primary: {
          100: "#042317",
          90: "#063a27",
          80: "#09573a",
          70: "#0d744e",
          60: "#109161",
          base: "#13ae75",
          50: "#3abb8c",
          40: "#62c9a3",
          30: "#89d6ba",
          20: "#b0e4d1",
          10: "#d0efe3",
        },
        brand: {
          100: "#1b3013",
          90: "#2d4f20",
          80: "#437730",
          70: "#599f40",
          60: "#70c650",
          base: "#86ee60",
          50: "#9af17a",
          40: "#aef495",
          30: "#c2f6af",
          20: "#d7f9ca",
          10: "#e7fcdf",
        },
        neutral: {
          100: "#303030",
          90: "#515151",
          80: "#797979",
          70: "#a1a1a1",
          60: "#cacaca",
          base: "#f2f2f2",
          50: "#f4f4f4",
          40: "#f6f6f6",
          30: "#f8f8f8",
          20: "#fbfbfb",
          10: "#fcfcfc",
        },
        secondary: {
          100: "#091614",
          90: "#0f2522",
          80: "#173732",
          70: "#1f4943",
          60: "#265c54",
          base: "#2e6e65",
          50: "#51867f",
          40: "#749e98",
          30: "#96b6b2",
          20: "#b9cfcc",
          10: "#d5e2e0",
        },
        tertiary: {
          100: "#31312f",
          90: "#51524f",
          80: "#7a7b76",
          70: "#a3a59e",
          60: "#cbcec5",
          base: "#f4f7ed",
          50: "#f6f8f0",
          40: "#f8faf3",
          30: "#f9fbf6",
          20: "#fbfcf9",
          10: "#fdfdfb",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "meteor-stars": "url('/images/meteor-bg.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
