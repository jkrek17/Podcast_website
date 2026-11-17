# Podcast website

Website for Docs in the Wild, a wilderness medicine podcast. The hosts and
episodes are placeholders until the real bios and feed arrive.

Built with [Astro](https://astro.build) as a fully static site, intended for
Cloudflare hosting.

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # static site in dist/
```

## Where things live

| What | Where |
|---|---|
| Show name, tagline, hosts, links, feed URL | `src/config.ts` |
| Placeholder episodes | `src/data/sample-feed.xml` |
| RSS import | `src/lib/feed.ts` |
| Colours, fonts, layout | `src/styles/global.css` |
| Pages | `src/pages/` |
| Logo and icons | `public/logo-*.webp`, `public/favicon.png`, `public/apple-touch-icon.png`, `public/og-image.jpg` |

## Switching to the real feed

Set `feedUrl` in `src/config.ts` to the podcast host's RSS URL. Episodes are
then read from that feed at build time and the sample feed is ignored. If the
feed cannot be fetched the build fails, so the last published version stays up.
