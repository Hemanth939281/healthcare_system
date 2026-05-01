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
      shared: ["react", "react-dom"],
    }),
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