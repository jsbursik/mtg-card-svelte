import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "mtg-card-svelte",
      fileName: (format) => `mtg-card-svelte.${format}.js`,
    },
    rollupOptions: {
      external: ["svelte"],
      output: {
        globals: {
          svelte: "Svelte",
        },
      },
    },
  },
});
