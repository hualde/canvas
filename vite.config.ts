import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'

export default defineConfig({
  plugins: [
    react(),
    envCompatible()
  ],
  // Asegúrate de que Vite cargue las variables de entorno del archivo .env.local
  envPrefix: 'REACT_APP_',
})