import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://www.altivola.workers.dev',
  vite: { plugins: [tailwindcss()] },
})
