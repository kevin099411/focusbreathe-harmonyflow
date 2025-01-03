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
          DEFAULT: "#FFB5BE", // Darker pink for primary color
          foreground: "#333333",
        },
        secondary: {
          DEFAULT: "#fec6a1",
          foreground: "#333333",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#E7F0FD",
          foreground: "#666666",
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
        glow: {
          "0%, 100%": { 
            boxShadow: "0 0 15px rgba(155, 135, 245, 0.5), 0 0 30px rgba(126, 105, 171, 0.3)" 
          },
          "50%": { 
            boxShadow: "0 0 25px rgba(155, 135, 245, 0.8), 0 0 40px rgba(126, 105, 171, 0.5)" 
          },
        },
        wind: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1.1)",
          },
          "50%": {
            transform: "translate(-1%, 1%) scale(1.15)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
        wind: "wind 30s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;