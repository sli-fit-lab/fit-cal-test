import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/fit-cal-test/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  }
});