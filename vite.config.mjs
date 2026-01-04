import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite production config tuned for Netlify + React Router (SPA)
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
    test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
  },
server: {
    port: 3000,
    strictPort: true,
  },
});
