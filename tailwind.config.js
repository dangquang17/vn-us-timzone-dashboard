/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        mist: "#f7f5ef",
        sunrise: "#f97316",
        skyglass: "#dbeafe",
        ember: "#fb7185",
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Bricolage Grotesque'", "'Space Grotesk'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        panel: "0 24px 60px rgba(8, 17, 31, 0.14)",
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(249, 115, 22, 0.24), transparent 28%), radial-gradient(circle at 85% 20%, rgba(251, 113, 133, 0.18), transparent 24%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.16), transparent 32%)",
      },
    },
  },
  plugins: [],
};
