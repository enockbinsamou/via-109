import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // Les icônes sont déjà couvertes par globPatterns ; évite de les précacher deux fois.
      includeManifestIcons: false,
      // Critères d'installation de Chrome : nom, icônes 192 et 512 px, start_url, display standalone.
      manifest: {
        id: "/",
        name: "Vía 109",
        short_name: "Vía 109",
        description: "Aprende las señales de tránsito y prepara el examen teórico de conducción en Cuba.",
        lang: "es",
        dir: "ltr",
        // Couleurs de l'application (--primary et --background de src/index.css).
        theme_color: "#1F5875",
        background_color: "#F7F5F3",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        categories: ["education"],
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        // Tout le site est mis en cache à l'installation (panneaux et illustrations compris) :
        // l'application fonctionne entièrement hors ligne, même pour une leçon jamais ouverte.
        globPatterns: ["**/*.{js,css,html,ico,svg,png,jpg,jpeg,webp,json,txt}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: "/index.html",
        navigateFallbackAllowlist: [/^\/(?!api)/],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
