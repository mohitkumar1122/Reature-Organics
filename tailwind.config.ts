import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00843D",
          light: "#E6F3EA",
          dark: "#00642E",
        },
        secondary: {
          DEFAULT: "#8BC61F",
          light: "#EAF6D2",
          dark: "#6FA314",
        },
        darkText: "#1A1A1A",
        lightBg: "#F8FAF7",
      },
    },
  },
  plugins: [],
};
export default config;
