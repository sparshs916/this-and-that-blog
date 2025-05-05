import typography from "@tailwindcss/typography";

const config = {
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
  plugins: [typography],
};

export default config;
