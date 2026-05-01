import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  federation({
    name: "host",
    remotes: {
      authApp: "http://localhost:5001/assets/remoteEntry.js",
      dashboardApp: "http://localhost:5002/assets/remoteEntry.js",
      patientsApp: "http://localhost:5003/assets/remoteEntry.js",
      analyticsApp: "http://localhost:5004/assets/remoteEntry.js",
    },
    shared: {
    react: { singleton: true, requiredVersion: "^18.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
    "react-redux": { singleton: true },
    "redux": { singleton: true },
    "recharts": { singleton: true },
    "react-router-dom": { singleton: true },
  }} as any),
  ],
  server: {
    port: 5000,
  }
  })