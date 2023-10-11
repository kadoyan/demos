import { defineConfig } from 'vite'

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      external: ['matter-js']
    },
  },
})
