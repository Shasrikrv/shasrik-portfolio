import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-orbitron)", "monospace"],
        sans: ["var(--font-space)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Menlo", "monospace"],
      },
      colors: {
        "game-bg": "#020409",
        "game-card": "#080d1a",
      },
      boxShadow: {
        "glow-cyan": "0 0 25px rgba(34,211,238,0.25), 0 0 60px rgba(34,211,238,0.1)",
        "glow-purple": "0 0 25px rgba(167,139,250,0.25)",
        "glow-btn": "0 0 20px rgba(34,211,238,0.2)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
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
