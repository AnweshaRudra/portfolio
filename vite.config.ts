import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 750,
    rolldownOptions: {
      output: {
        manualChunks(rawId) {
          const id = rawId.replace(/\\/g, '/')
          if (!id.includes('node_modules')) return
          if (id.includes('/node_modules/three/')) {
            return 'vendor-three'
          }
          if (id.includes('/@react-three/')) {
            return 'vendor-r3f'
          }
          if (id.includes('/gsap/') || id.includes('/motion/') || id.includes('/framer-motion/')) {
            return 'vendor-motion'
          }
          if (id.includes('/react-dom/') || id.includes('/react/')) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
