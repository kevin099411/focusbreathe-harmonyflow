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
          DEFAULT: "#0EA5E9", // Ocean blue for better contrast
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FFDEE2", // Soft pink
          foreground: "#1A1A1A",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#D3E4FD", // Soft blue
          foreground: "#334155", // Slate-700 for better readability
        },
        accent: {
          DEFAULT: "#D946EF", // Vibrant magenta for accents
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
      },
      animation: {
        breathe: "breathe 4s ease-in-out infinite",
        wind: "wind 15s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;