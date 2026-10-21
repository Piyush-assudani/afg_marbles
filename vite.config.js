import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy-policy.html'),
        terms: resolve(__dirname, 'terms-and-conditions.html'),
        sanctums: resolve(__dirname, 'pooja-sanctums.html'),
        fountains: resolve(__dirname, 'palatial-fountains.html'),
        materials: resolve(__dirname, 'materials-guide.html'),
        workshop: resolve(__dirname, 'atelier-workshop.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
