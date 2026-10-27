import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import process from "node:process";
const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  // Pages uses the repository subpath; native builds keep their own asset base.
  base: mode === "pages" ? loadEnv(mode, process.cwd(), "VITE_").VITE_BASE_PATH || "/TallyRep/" : "./",

  // Fixed ports match tauri.conf.json; TAURI_DEV_HOST supports mobile dev.
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
