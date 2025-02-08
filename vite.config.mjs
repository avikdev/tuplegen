import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  root: ".",
  build: {
    lib: {
      entry: ["./index.js"],
      fileName: (format, entryName) => `tuplegen-${entryName}.${format}.js`,
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
