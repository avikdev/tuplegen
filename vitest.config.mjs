import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.mjs";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["tests/**/*.{test,spec}.?(c|m)[jt]s"],
    },
  }),
);
