import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      name: "SpotAPI",
      fileName: "spot-api",
      entry: resolve(__dirname, "src/main.js"),
    },
    rollupOptions: {
      output: {
        assetFileNames: "spot-api.[ext]",
      },
    },
  },

  server: {
    open: "/dev/index.html",
  },
});
