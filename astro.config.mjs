import { defineConfig } from 'astro/config';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow, where the site
// lives under /<repo-name>/. On its own domain neither is needed.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  base: process.env.BASE_PATH || '/',
});
