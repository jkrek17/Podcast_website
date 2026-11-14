// Everything about the show that does NOT come from the RSS feed lives here.
// All values below are placeholders until the real branding arrives.

export const site = {
  name: 'Beyond the Trailhead',
  isPlaceholder: true,
  tagline: 'Wilderness medicine for people who go far from help.',
  description:
    'Practical conversations about preventing, recognising and managing medical problems in the backcountry, for guides, outdoor leaders, clinicians and anyone who wanders past the end of the road.',

  // Set this to the podcast host's RSS feed URL. While it is empty,
  // the site builds from src/data/sample-feed.xml instead.
  feedUrl: '',

  email: 'hello@example.com',

  platforms: [
    { name: 'Apple Podcasts', url: '#' },
    { name: 'Spotify', url: '#' },
    { name: 'YouTube', url: '#' },
    { name: 'RSS feed', url: '#' },
  ],

  socials: [
    { name: 'Instagram', url: '#' },
    { name: 'Facebook', url: '#' },
  ],

  hosts: [
    {
      name: 'Host One',
      role: 'Co-host · placeholder',
      short: 'A short one-line introduction goes here.',
      bio: 'A longer biography goes here: clinical background, time spent in the field, and what drew them to wilderness medicine. Two or three sentences is plenty.',
    },
    {
      name: 'Host Two',
      role: 'Co-host · placeholder',
      short: 'A short one-line introduction goes here.',
      bio: 'A longer biography goes here: guiding or rescue experience, favourite places to travel, and what they hope listeners take from the show.',
    },
  ],

  disclaimer:
    'This podcast is for education only. It is not medical advice and is no substitute for hands-on training or professional care.',
};
