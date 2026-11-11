// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://stahlmann.ch',
  // Static output for Hostpoint (upload dist/)
  vite: {
    plugins: [tailwindcss()]
  }
});