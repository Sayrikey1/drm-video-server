// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,               // bind to 0.0.0.0
    port: 3000,
    strictPort: true,
    // Allow this host (and you can add more as needed)
    allowedHosts: ['test-frontend.mabi-vids.com', 'drm-hls-site-test.netlify.app', 'drm-video-server.vercel.app']
  },
  preview: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: ['test-frontend.mabi-vids.com', 'drm-hls-site-test.netlify.app', 'drm-video-server.vercel.app']
  }
})
