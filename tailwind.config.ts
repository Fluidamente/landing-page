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
      screens: {
        // Igual que STAGE_QUERY en src/lib/site.ts
        stage: {
          raw: "(min-width: 1024px) and (min-height: 940px), (min-width: 1280px) and (min-height: 890px), (min-width: 1440px) and (min-height: 840px)",
        },
      },
      colors: {
        // Marca Fluidamente
        primary: {
          light: "#82ABA5",
          DEFAULT: "#247E7F",
          dark: "#1A5E66",
        },
        secondary: "#3B4B62",
        tertiary: "#97D1DB",
        white: "#FFFFFF",
        // Roles del rediseño
        deep: "#1A5E66",
        teal: "#247E7F",
        sage: "#82ABA5",
        aqua: "#97D1DB",
        slate: "#3B4B62",
        ground: "#F2F6F4",
        ink: "#142530",
      },
      fontSize: {
        small: ["var(--step-small)", { lineHeight: "1.45" }],
        body: ["var(--step-body)", { lineHeight: "1.55" }],
        lead: ["var(--step-lead)", { lineHeight: "1.35" }],
        head: [
          "var(--step-head)",
          { lineHeight: "1", letterSpacing: "-0.04em" },
        ],
        display: [
          "var(--step-display)",
          { lineHeight: "0.88", letterSpacing: "-0.05em" },
        ],
      },
      spacing: {
        margin: "var(--margin)",
        section: "var(--section)",
      },
    },
    fontFamily: {
      sans: ["var(--font-schibsted)", "system-ui", "sans-serif"],
      // Alias heredados: todo el sitio usa una sola familia
      raleway: ["var(--font-schibsted)", "system-ui", "sans-serif"],
      poppins: ["var(--font-schibsted)", "system-ui", "sans-serif"],
      chillax: ["var(--font-schibsted)", "system-ui", "sans-serif"],
    },
  },
  plugins: [nextui()],
};
export default config;
