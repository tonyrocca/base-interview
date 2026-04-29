import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          // Greens
          green: "#77a45a",
          "green-dark": "#1e4d2b",
          "green-deep": "#102a17",
          "green-mid": "#b2dd79",
          "green-light": "#d6f0b4",

          // Greys
          ink: "#292826",
          "ink-2": "#1e4d2b",
          grey: "#54524f",
          muted: "#7f7d7a",
          line: "#d8d7d5",
          cream: "#f0eeeb",
          "cream-2": "#e7e4de",
          bg: "#f7f6f3",
        },
      },
      fontFamily: {
        sans: [
          "PP Neue Montreal",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        display: [
          "ClarendonWide",
          "Times New Roman",
          "Georgia",
          "serif",
        ],
      },
      fontSize: {
        // Mirrors Base's heading scale (PP Neue Montreal bold, 120% line-height)
        "h-xxl": ["3.5rem", { lineHeight: "1.2", fontWeight: "700" }], // 56px
        "h-xl": ["3rem", { lineHeight: "1.1", fontWeight: "700" }],     // 48px (hero)
        "h-l": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],    // 40px
        "h-m": ["2rem", { lineHeight: "1.2", fontWeight: "700" }],      // 32px
        "h-s": ["1.5rem", { lineHeight: "1.2", fontWeight: "700" }],    // 24px
        "h-xs": ["1rem", { lineHeight: "1.2", fontWeight: "700" }],
        "body-xl": ["1.125rem", { lineHeight: "1.4", fontWeight: "500" }], // 18px
        "body-l": ["1rem", { lineHeight: "1.4", fontWeight: "500" }],      // 16px
        "body-m": ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }],  // 14px
        "body-s": ["0.75rem", { lineHeight: "1.5", fontWeight: "500" }],   // 12px
      },
      borderRadius: {
        btn: "6px",
        card: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
