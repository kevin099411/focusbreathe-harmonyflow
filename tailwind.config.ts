import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0EA5E9",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FFDEE2",
          foreground: "#1A1A1A",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#D3E4FD",
          foreground: "#334155",
        },
        accent: {
          DEFAULT: "#D946EF",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        wind: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1.1)",
          },
          "50%": {
            transform: "translate(-1%, 1%) scale(1.15)",
          },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 15px #0EA5E9, 0 0 30px #0EA5E9, 0 0 45px #0EA5E9",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 20px #0EA5E9, 0 0 40px #0EA5E9, 0 0 60px #0EA5E9",
            transform: "scale(1.05)",
          },
        },
      },
      animation: {
        breathe: "breathe 4s ease-in-out infinite",
        wind: "wind 15s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;