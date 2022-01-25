import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    eslintPlugin({
      include: ["./src/**/*.ts", ".src/**/*.tsx"],
    }),
  ],
  server: {
    host: "{{host}}",
    port: 4000,
    proxy: {
      "/api": {
        target: "http://{{proxy}}",
        changeOrigin: true,
        // rewrite: (reqPath) => reqPath.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "primary-color": "#4762fe",
        },
      },
    },
  },
}));
