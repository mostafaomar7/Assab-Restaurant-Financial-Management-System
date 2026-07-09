import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { mockupPreviewPlugin } from "./mockupPreviewPlugin";

const rawPort = process.env.PORT || "3000";
const port = Number(rawPort);
const basePath = process.env.BASE_PATH || "/";

// Read API_PROXY_TARGET from .env (empty prefix loads non-VITE_ keys too).
const env = loadEnv(
  process.env.NODE_ENV || "development",
  path.resolve(import.meta.dirname),
  "",
);
const proxyTarget =
  env.API_PROXY_TARGET || "https://ivory-snail-183262.hostingersite.com";
// Same-origin /api + /broadcasting are proxied to the backend so the browser
// never makes a cross-origin call in dev (no CORS needed). `changeOrigin`
// rewrites the Host header — required for the shared-hosting vhost to match.
const proxy = {
  "/api": { target: proxyTarget, changeOrigin: true, secure: true },
  "/broadcasting": { target: proxyTarget, changeOrigin: true, secure: true },
};

export default defineConfig({
  base: basePath,
  plugins: [
    mockupPreviewPlugin(),
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    proxy,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  // Limit esbuild worker concurrency to avoid the "service is no longer running"
  // crash on the very large ASABPrototype.tsx (~13.5k lines).
  esbuild: {
    target: "es2020",
    legalComments: "none",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
});
