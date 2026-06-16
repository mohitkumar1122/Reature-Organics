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
        // Primary - Deep Forest Green (from "Ture" in logo)
        primary: {
          DEFAULT: "#00843D",
          light: "#E6F3EA",
          dark: "#00642E",
          50: "#F0F9F3",
          100: "#E6F3EA",
          200: "#C2E1CC",
          300: "#9DCFAE",
          400: "#54AB72",
          500: "#00843D",
          600: "#007737",
          700: "#00642E",
          800: "#005025",
          900: "#00411E",
        },
        // Secondary - Vibrant Lime Green (from "Rea" in logo)
        secondary: {
          DEFAULT: "#8BC61F",
          light: "#EAF6D2",
          dark: "#6FA314",
          50: "#F5FAEA",
          100: "#EAF6D2",
          200: "#CFE89F",
          300: "#B3DA6C",
          400: "#9FD03E",
          500: "#8BC61F",
          600: "#7DB31C",
          700: "#6FA314",
          800: "#577F10",
          900: "#40600C",
        },
        // Accent - Warm complementary
        accent: {
          DEFAULT: "#D4A017",
          light: "#FDF6E3",
          dark: "#A87D0F",
        },
        // Base colors
        darkText: "#1A1A1A",
        lightBg: "#F8FAF7",
        cream: "#FAF8F3",
        // Semantic colors
        success: "#00843D",
        warning: "#F59E0B",
        danger: "#DC2626",
        info: "#3B82F6",
      },
      // ✨ UPDATED: Now uses CSS variables from layout.tsx (Fraunces + Inter)
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Fraunces", "Georgia", "serif"],
        display: ["var(--font-serif)", "Fraunces", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
      },
      fontSize: {
        "2xs": "0.625rem",
        // ✨ NEW: Premium display sizes for hero sections
        "display-sm": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl": ["5.5rem", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
      },
      // ✨ NEW: Letter-spacing utilities for premium typography
      letterSpacing: {
        tightest: "-0.04em",
        "ultra-tight": "-0.035em",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "100": "25rem",
        "120": "30rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 132, 61, 0.07), 0 10px 20px -2px rgba(0, 132, 61, 0.04)",
        medium: "0 4px 25px -5px rgba(0, 132, 61, 0.1), 0 10px 30px -5px rgba(0, 132, 61, 0.04)",
        large: "0 10px 40px -10px rgba(0, 132, 61, 0.15), 0 20px 50px -10px rgba(0, 132, 61, 0.08)",
        glow: "0 0 30px -5px rgba(139, 198, 31, 0.4)",
        "glow-primary": "0 0 30px -5px rgba(0, 132, 61, 0.4)",
        "glow-secondary": "0 0 30px -5px rgba(139, 198, 31, 0.5)",
        "inner-soft": "inset 0 2px 4px 0 rgba(0, 132, 61, 0.05)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #00843D 0%, #00642E 100%)",
        "gradient-secondary": "linear-gradient(135deg, #8BC61F 0%, #6FA314 100%)",
        "gradient-brand": "linear-gradient(135deg, #8BC61F 0%, #00843D 100%)",
        "gradient-brand-soft": "linear-gradient(135deg, #EAF6D2 0%, #E6F3EA 100%)",
        "gradient-dark": "linear-gradient(180deg, #1A1A1A 0%, #0a1a0c 50%, #050d06 100%)",
        "hero-pattern":
          "radial-gradient(circle at 20% 20%, rgba(139, 198, 31, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 132, 61, 0.1) 0%, transparent 50%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "bounce-soft": "bounceSoft 2s infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      transitionTimingFunction: {
        "smooth-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;