import { XMLParser } from 'fast-xml-parser';
import sanitizeHtml from 'sanitize-html';
import sampleFeed from '../data/sample-feed.xml?raw';
import { site } from '../config';

export interface Episode {
  slug: string;
  title: string;
  number: number | null;
  date: Date;
  duration: string | null;
  summary: string;
  notesHtml: string;
  audioUrl: string | null;
  audioType: string | null;
  image: string | null;
}

const text = (v: unknown): string =>
  v == null ? '' : typeof v === 'object' ? String((v as Record<string, unknown>)['#text'] ?? '') : String(v);

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);

/** Feeds give duration as seconds ("2710") or as "MM:SS" / "HH:MM:SS". */
function formatDuration(raw: string): string | null {
  if (!raw) return null;
  const parts = raw.split(':').map(Number);
  if (parts.some(Number.isNaN)) return null;
  const seconds = parts.reduce((total, p) => total * 60 + p, 0);
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h ? `${h} hr ${m} min` : `${m} min`;
}

async function loadXml(): Promise<string> {
  if (!site.feedUrl) return sampleFeed;
  // A failed fetch fails the build, so the last good deployment stays live.
  const res = await fetch(site.feedUrl);
  if (!res.ok) throw new Error(`Feed request failed: ${res.status} ${site.feedUrl}`);
  return res.text();
}

async function load(): Promise<Episode[]> {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
  const channel = parser.parse(await loadXml())?.rss?.channel;
  if (!channel) throw new Error('Feed has no <channel>');
  const items = [channel.item ?? []].flat();
  const used = new Set<string>();

  const episodes = items.map((item: any): Episode => {
    const title = text(item.title).trim();
    const number = Number(text(item['itunes:episode'])) || null;
    const rawNotes = text(item['content:encoded']) || text(item.description);
    const summary = sanitizeHtml(text(item['itunes:summary']) || text(item.description) || rawNotes, {
      allowedTags: [],
      allowedAttributes: {},
    })
      .replace(/\s+/g, ' ')
      .trim();

    let slug = slugify(title) || slugify(text(item.guid)) || 'episode';
    if (number) slug = `${number}-${slug}`;
    while (used.has(slug)) slug += '-2';
    used.add(slug);

    return {
      slug,
      title,
      number,
      date: new Date(text(item.pubDate)),
      duration: formatDuration(text(item['itunes:duration'])),
      summary: summary.length > 220 ? summary.slice(0, 217).trimEnd() + '…' : summary,
      notesHtml: sanitizeHtml(rawNotes),
      audioUrl: item.enclosure?.['@_url'] ?? null,
      audioType: item.enclosure?.['@_type'] ?? null,
      image: item['itunes:image']?.['@_href'] ?? null,
    };
  });

  return episodes.sort((a, b) => b.date.getTime() - a.date.getTime());
}

let cache: Promise<Episode[]> | undefined;
export const getEpisodes = () => (cache ??= load());

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
