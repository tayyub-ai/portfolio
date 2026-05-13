import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.tayyubyaqoob.com';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.endsWith('/systems') &&
        !page.endsWith('/products') &&
        !page.endsWith('/research') &&
        !page.endsWith('/receipts'),
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
