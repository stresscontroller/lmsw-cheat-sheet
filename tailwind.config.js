import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    {
      pattern: /flex-/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /w-/,
      variants: ['sm', 'md', 'lg'],
    },
    { pattern: /font-/ },
    { pattern: /text-/ },
    { pattern: /bg-/ },
    { pattern: /px-/ },
    { pattern: /py-/ },
    {
      pattern: /mt-/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /mb-/,
      variants: ['sm', 'md', 'lg'],
    },
    { pattern: /border-/ },
    {
      pattern: /rounded-tl-[^/]+$/,
      // pattern: /rounded-/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        inter: ['Inter', 'sans-serif'],
        karla: ['Karla', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        courier: ['CourierPrime', 'sans-serif'],
        lora: ['Lora', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          cnavy: {
            foreground: "#000000",
            DEFAULT: "#020035",
          },
          cblue: {
            foreground: "#000000",
            DEFAULT: "#02076F",
          },
          corange: {
            foreground: "#000000",
            DEFAULT: "#FE7E4F",
          },
          cpeach: {
            foreground: "#000000",
            DEFAULT: "#FCDED6",
          },
          primary: {
            foreground: "#000000",
            DEFAULT: "#020035",
          },
          secondary: {
            foreground: "#000000",
            DEFAULT: "#FE7E4F",
          },
        },
      },
      dark: {
        colors: {
          primary: {
            foreground: "#000000",
            DEFAULT: "#43C59E",
          },
          secondary: {
            foreground: "#000000",
            DEFAULT: "#DAEB89",
          },
        },
      },
    },
  })],
}
