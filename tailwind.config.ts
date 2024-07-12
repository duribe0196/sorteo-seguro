import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}, ./src/components/**/*.{js,ts,jsx,tsx,mdx}, ./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
        "modern-orange": {
          extend: "light", // <- inherit default values from light theme
          colors: {
            background: "#ffffff",
            foreground: "#565857",
            primary: {
              DEFAULT: "#F28123",
              foreground: "#C15D0B",
            },
            success: {
              DEFAULT: "#D4DF9E",
              foreground: "#A3B83D",
            },
            secondary: {
              DEFAULT: "#3FA7D6",
              foreground: "#207297",
            },
            default: {
              DEFAULT: "#565857",
              foreground: "#323433",
            },
            overlay: {
              DEFAULT: "#C2C2C2",
              foreground: "#565857",
            },
            focus: "#F28123",
          },
        },
      },
    }),
  ],
};
export default config;
