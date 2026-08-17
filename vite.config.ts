import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
  build: {
    outDir: 'dist',

    // Hashed bundles go to /build, leaving /assets for the images copied out of
    // public/. Keeping them apart is what lets the CDN cache bundles for a year as
    // immutable while serving photos with a short TTL — speaker portraits get
    // swapped as names are confirmed and must not be pinned in caches.
    assetsDir: 'build',

    rollupOptions: {
      output: {
        // three is the only heavy dependency; splitting it keeps the initial
        // payload small and lets it cache independently of app changes.
        manualChunks: { three: ['three'] },
      },
    },
  },
})
