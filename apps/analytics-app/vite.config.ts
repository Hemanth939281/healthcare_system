import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  federation({
    name: "analyticsApp",
    filename: "remoteEntry.js",
    exposes: {
      "./Analytics": "./src/Root.tsx",
    },
    shared: {
      react: { singleton: true, requiredVersion: "^19.0.0" },
      "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
      "recharts": { singleton: true }
    }
  } as any),
  ],
  server: {
    port: 5004
  },
  build: {
    target: "esnext",
    cssCodeSplit: false,
    minify: false,
    modulePreload: false,
  }
})
