import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@locales": path.resolve(__dirname, "./src/locales"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@shared": path.resolve(__dirname, "./src/shared"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://kol.kipoha.fun",
        changeOrigin: true,
        secure: false,
        // Если backend руты без префикса /api, добавьте pathRewrite:
        // pathRewrite: { "^/api": "" },
      },
    },
  },
});
