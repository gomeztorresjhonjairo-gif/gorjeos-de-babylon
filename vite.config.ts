import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    modulePreload: {
      resolveDependencies(_filename, deps) {
        return deps.filter((dependency) => !dependency.includes('hero-shader'))
      },
    },
    rollupOptions: {
      input: {
        main: 'index.html',
        privacy: 'privacy.html',
        en: 'en/index.html',
      },
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/shaders/')) return 'hero-shader'
          if (id.includes('/node_modules/react') || id.includes('/node_modules/react-dom') || id.includes('/node_modules/scheduler')) return 'react'
        },
      },
    },
  },
})
