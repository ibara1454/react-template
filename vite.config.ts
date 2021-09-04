/* eslint-disable import/no-extraneous-dependencies */
import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [reactRefresh()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },

  build: {
    // Specify the output directory (relative to project root).
    outDir: 'dist',

    // Base public path when served in development or production.
    // base: '/',

    sourcemap: true,
  },
});
