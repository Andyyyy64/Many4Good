import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/acounting": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/addacounting": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
