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
        background: "var(--background)",
        foreground: "var(--foreground)",
        greenjw: "#2C7C89",
        orangejw: "#FF7D43",
      },
      keyframes: {
        slideInFromLeft: {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        slideOutToLeft: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        slideInFromLeft: "slideInFromLeft 0.3s ease-out forwards",
        slideOutToLeft: "slideOutToLeft 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
