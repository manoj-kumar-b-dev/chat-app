import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // Dev server runs at '/' so react-router-dom BrowserRouter works correctly.
  // Production build keeps '/Chat-App/' base for GitHub Pages deployment.
  base: command === 'build' ? '/Chat-App/' : '/',
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
  },
}))

