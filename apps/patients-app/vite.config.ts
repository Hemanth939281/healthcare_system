import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  federation({
    name: "patientsApp",
    filename: "remoteEntry.js",
    exposes: {
      "./Patients": "./src/Root.tsx",
      "./PatientDetails": "./src/features/PatientDetails.tsx",
    },
    shared: {
      react: { singleton: true, requiredVersion: "^18.0.0" },
      "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
      "react-redux": { singleton: true },
      "redux": { singleton: true },
      "react-router-dom": { singleton: true },
    }
  } as any),
  ],
  server: {
    port: 5003
  },
  build: {
    target: "esnext",
    cssCodeSplit: false,
    minify: false,
    modulePreload: false,
  }
})
