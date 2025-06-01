import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    build: {
      outDir: "dist", // <- This will match Vercel's default expectation
    },
    plugins: [react()],
  };
});
