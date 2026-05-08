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
        primary: {
          DEFAULT: "#252961",
          light: "#3f45a1",
          dark: "#1a1d45",
        },
        accent: {
          DEFAULT: "#6366f1",
          soft: "#e0e7ff",
        },
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
        }
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      boxShadow: {
        premium: "0 20px 50px rgba(37, 41, 97, 0.05)",
        "premium-hover": "0 30px 60px rgba(37, 41, 97, 0.1)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
