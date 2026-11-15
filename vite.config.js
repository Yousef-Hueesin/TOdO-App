import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/TOdO-App/",
  plugins: [react()],
  server: {
    port: 5173,
  },
});
