import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-orbitron)", "monospace"],
        sans:    ["var(--font-space)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "Menlo", "monospace"],
      },
      boxShadow: {
        "glow-blue":   "0 0 25px rgba(59,130,246,0.3), 0 0 60px rgba(59,130,246,0.1)",
        "glow-violet": "0 0 25px rgba(139,92,246,0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
