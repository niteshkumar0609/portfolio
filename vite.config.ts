import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import pages from './src/site-pages.json'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        ...Object.fromEntries(pages.map(page => [page.id, fileURLToPath(new URL(page.id === 'home' ? './index.html' : `./${page.id}/index.html`, import.meta.url))])),
        notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
      },
    },
  },
})
