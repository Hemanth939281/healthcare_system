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
      authApp: "https://healthcare-system-auth-app-cadf.vercel.app/assets/remoteEntry.js",
      patientsApp: "https://healthcare-system-patients-app-13bw.vercel.app/assets/remoteEntry.js",
      analyticsApp: "https://healthcare-system-analytics-app-1r8.vercel.app/assets/remoteEntry.js",
      dashboardApp: "http://localhost:5002/assets/remoteEntry.js",
    },
    shared: {
      react: { singleton: true, requiredVersion: "^19.0.0" },
      "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
      "react-redux": { singleton: true },
      "redux": { singleton: true },
      "recharts": { singleton: true },
      "react-router-dom": { singleton: true },
    }
  } as any),
  ],
  server: {
    port: 5000,
  }
})