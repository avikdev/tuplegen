import { defineConfig } from "vite";


const packageName = "tuplegen";

export default defineConfig({
  root: ".",
  build: {
    lib: {
      name: packageName,
      entry: ["./src/index.js"],
      fileName: (format, entryName) => `${packageName}-${entryName}.${format}.js`,
    },
  }
});
