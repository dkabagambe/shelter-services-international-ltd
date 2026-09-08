import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Static SPA build — no TanStack Start SSR, no Nitro, no server functions.
// This produces a pure client-side bundle suitable for CPanel / shared hosting.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Split vendor libraries into their own chunk so they can be cached
        // separately from app code, and split large route chunks.
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@supabase")) return "supabase";
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("recharts")) return "recharts";
            if (
              id.includes("react-dom") ||
              id.includes("react/") ||
              id.includes("react-router") ||
              id.includes("react-query")
            ) return "react-core";
            if (id.includes("@radix-ui")) return "radix-ui";
            return "vendor";
          }
        },
      },
    },
  },
});
