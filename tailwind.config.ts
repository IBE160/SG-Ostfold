import type { Config } from "tailwindcss";

const config = {
  // Tailwind v4 dark mode, matches <html class="dark">
  darkMode: ["class", ".dark"],

  // Scan these folders for class names
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
        // Core semantic colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "primary-accent": "hsl(var(--primary-accent))",

        // Custom theme colors from mockup
        "background-light": "hsl(var(--background-light-mockup))",
        "background-dark": "hsl(var(--background-dark-mockup))",
        "content-dark": "hsl(var(--content-dark-mockup))",
        "border-dark": "hsl(var(--border-dark-mockup))",
        "text-primary-dark": "hsl(var(--text-primary-dark-mockup))",
        "text-secondary-dark": "hsl(var(--text-secondary-dark-mockup))",
        // Existing core semantic colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        success: "hsl(var(--success))", // Added from mockup
        error: "hsl(var(--error))",     // Added from mockup
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [],
} satisfies Config;

export default config;
