/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        surface: "#0f172a",
      },
      boxShadow: {
        glow: "0 0 20px rgba(139,92,246,0.3), 0 0 40px rgba(6,182,212,0.2)",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #10b981 100%)",
      },
    },
  },
  plugins: [],
};
