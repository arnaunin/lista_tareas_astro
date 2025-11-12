// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://arnaunin.github.io/',
  base: '/lista_tareas_astro/',
  integrations: [react()]
});