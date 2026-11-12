// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // SITE_URL is set by deploy.sh so staging builds point canonical/OG/sitemap at the staging domain
  site: process.env.SITE_URL ?? 'https://stahlmann.ch',

  // Static output for Hostpoint (upload dist/)
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
