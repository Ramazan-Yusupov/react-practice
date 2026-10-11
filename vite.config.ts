import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const dirname = import.meta.dirname;

export default defineConfig(() => {
  return {
    server: {
      proxy: {
        '/api': process.env.PATH ?? '',
      },
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(dirname, './src'),
      },
    },
  };
});
