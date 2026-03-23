import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// TODO: Update `site` and `base` when GitHub username and repo name are known.
// Example: site: 'https://myuser.github.io', base: '/ULTREC'
export default defineConfig({
  site: 'https://www.ultrec.com.mx',
  base: '/',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  output: 'static',
});
