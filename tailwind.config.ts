import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linen: "#F5F1EA",
        porcelain: "#F0E7DE",
        khaki: "#D7C9B8",
        oat: "#D8C7B4",
        camel: "#B2967D",
        blush: "#C8A89B",
        taupe: "#A58E80",
        cocoa: "#7D5A44",
        mocha: "#8A6D60",
        espresso: "#4A342A",
        truffle: "#5E4A42",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-work-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "soft-radial":
          "radial-gradient(120% 120% at 50% 0%, #F5F1EA 0%, #F0E7DE 60%, #E9DACB 100%)",
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(74, 52, 42, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
