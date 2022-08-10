import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port:4000,
    host: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/cfg-scss";`,
      },
    },
  },
})
