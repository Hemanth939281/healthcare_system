import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "authApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Auth": "./src/App.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        "react-router-dom": { singleton: true },
      }
    } as any),
  ],
  server: {
    port: 5001,
  },
  build: {
    target: "esnext",
    cssCodeSplit: false,
    minify: false,
    modulePreload: false,
  },
});