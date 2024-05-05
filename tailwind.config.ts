import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", "system-ui", "sans-serif"],
        racing: ["racing-sans", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
