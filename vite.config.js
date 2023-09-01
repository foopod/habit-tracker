import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Activity Tracker",
        short_name: "Activity Tracker",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#414bb2",
        scope: "/",
        description: "An app to track your habits and build a better you!",
        orientation: "portrait",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icon-512.png",
            size: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
