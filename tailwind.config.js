module.exports = {
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair-display)", "serif"],
        greatvibes: ["var(--font-great-vibes)", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
