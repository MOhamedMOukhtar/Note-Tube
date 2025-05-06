module.exports = {
  safelist: [
    { pattern: /bg-\[#([0-9a-f]{6})\]/ }, // Allow any hex color
    { pattern: /hover:bg-\[#([0-9a-f]{6})\]/ }, // Allow hover variants
  ],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
      },
    },
  },
};
