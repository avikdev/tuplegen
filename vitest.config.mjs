import { defineConfig, mergeConfig } from "vitest/config";
import { fileURLToPath, URL } from "url";
import viteConfig from "./vite.config.mjs";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["tests/**/*.{test,spec}.?(c|m)[jt]s"],
    },
    resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
  })
);
