import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Green: Trust, nature, primary actions
        primary: {
          50: "#F1F7F4",
          100: "#E0EEE7",
          200: "#C2DCCF",
          300: "#98C4B0",
          400: "#6AA78E",
          500: "#44896E",
          600: "#2F6E56",
          700: "#255744",
          800: "#1E4436",
          900: "#18372C",
          DEFAULT: "#18372C", // Deep green
        },
        // Lake Blue: Lake Chamo, sky, information, accents
        secondary: {
          50: "#F0F7FB",
          100: "#DFEFF7",
          200: "#BDE0EE",
          300: "#8CC9E2",
          400: "#54ACD2",
          500: "#2F91BD",
          600: "#22749D",
          700: "#1D5D7E",
          800: "#1C4E68",
          900: "#1C4258",
          DEFAULT: "#1D5D7E", // Lake blue
        },
        // Warm Amber: Highlights, notices, warnings
        accent: {
          50: "#FEF9EE",
          100: "#FDF2D7",
          200: "#FBE3AE",
          300: "#F8CE7A",
          400: "#F4B345",
          500: "#EE981E",
          600: "#D37913",
          700: "#AC5812",
          800: "#8B4415",
          900: "#723815",
          DEFAULT: "#D37913", // Warm amber
        },
        // Neutrals: Warm white, Sand, and Charcoal
        sand: {
          50: "#FAF9F5",
          100: "#F4F1EA",
          200: "#E9E3D4",
          300: "#DBD0BA",
          400: "#C8B99B",
          500: "#B4A17F",
        },
        warmWhite: "#FAFAF7",
        charcoal: {
          DEFAULT: "#1F2421",
          light: "#2E3632",
          muted: "#5A6560",
        },
      },
      fontSize: {
        // Minimum body font size 16px as required
        base: ["1rem", { lineHeight: "1.6" }],
        sm: ["0.9375rem", { lineHeight: "1.5" }], // 15px for secondary labels
        xs: ["0.875rem", { lineHeight: "1.4" }],  // 14px for tags
      },
      minHeight: {
        tap: "44px", // Minimum tap target
      },
      minWidth: {
        tap: "44px",
      },
    },
  },
  plugins: [],
};

export default config;