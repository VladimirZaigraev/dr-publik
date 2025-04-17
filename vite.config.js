import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: 'https://vladimirzaigraev.github.io/dr-publik/',
  plugins: [react(), svgr()],
});
