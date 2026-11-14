// Prefixes a site-relative path with the base path the site is served from
// ("/" on its own domain, "/Podcast_website" on GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => (path.startsWith('/') ? base + path : path);
