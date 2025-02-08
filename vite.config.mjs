import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  root: ".",
  build: {
    lib: {
      entry: ["./src/index.js"],
      fileName: (format, entryName) => `tuplegen-${entryName}.${format}.js`,
    },
  }
});
