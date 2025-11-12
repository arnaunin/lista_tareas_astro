import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://arnaunin.github.io/',
  base: './',
  outDir: 'dist',
  integrations: [react()],
});
