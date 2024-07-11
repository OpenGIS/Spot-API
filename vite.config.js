import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
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
});
