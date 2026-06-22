import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core — always needed first, long-cached
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          ) return "vendor-react";

          // Router — stable, rarely changes
          if (
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/@remix-run/")
          ) return "vendor-router";

          // Lenis smooth-scroll — large standalone lib
          if (id.includes("node_modules/lenis")) return "vendor-lenis";

          // Radix UI primitives — big, stable
          if (id.includes("node_modules/@radix-ui/")) return "vendor-radix";

          // TanStack React Query
          if (id.includes("node_modules/@tanstack/")) return "vendor-tanstack";

          // Supabase — only loaded on contact-form routes
          if (id.includes("node_modules/@supabase/") || id.includes("node_modules/supabase")) return "vendor-supabase";

          // Lucide icons tree-shaken at build time but grouped for caching
          if (id.includes("node_modules/lucide-react")) return "vendor-icons";
        },
      },
    },
  },
}));
