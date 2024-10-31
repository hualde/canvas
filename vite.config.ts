import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Carga las variables de entorno de .env.local
dotenv.config({ path: '.env.local' })

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  }
})