import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#454545",
          dark: "#2D2D2D",
          light: "#6B6B6B",
        },
        ink: "#333333",
        cream: "#F1F1F1",
        bone: "#E8E8E8",
        clay: "#666666",
      },
      fontFamily: {
        display: ['"Inter Tight"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;