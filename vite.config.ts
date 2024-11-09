import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Carga las variables de entorno de .env.local
dotenv.config({ path: '.env.local' })

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'create-checkout-session': resolve(__dirname, 'src/api/create-checkout-session.ts'),
        'stripe-webhook': resolve(__dirname, 'src/api/stripe-webhook.ts')
      }
    }
  }
})