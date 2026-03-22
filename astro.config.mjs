import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// TODO: Update `site` and `base` when GitHub username and repo name are known.
// Example: site: 'https://myuser.github.io', base: '/ULTREC'
export default defineConfig({
  site: 'https://example.github.io', // TODO: replace with actual GitHub Pages URL
  base: '/ULTREC',                   // TODO: replace with actual repo name
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  output: 'static',
});
