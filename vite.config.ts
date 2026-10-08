import { defineConfig } from 'vite';

export default defineConfig({
  root: 'app',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
