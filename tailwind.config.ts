import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          light: "#82ABA5",
          DEFAULT: "#247E7F",
          dark: "#1A5E66",
        },
        secondary: "#3B4B62",
        tertiary: "#97D1DB",
        white: "#FFFFFF",
      },
    },
    fontFamily: {
      raleway: ["var(--font-raleway)"],
      poppins: ["var(--font-poppins)"],
      chillax: ["Chillax", "sans-serif"],
    },
  },
  plugins: [nextui()],
};
export default config;
