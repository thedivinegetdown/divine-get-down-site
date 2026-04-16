// src/config/youtube.js
export const YOUTUBE = {
  channelUrl: 'https://www.youtube.com/@TheDivineGetDown',
  featuredVideoId: 'rhjTW4JYnUA',   // ← your actual featured video ID

  // Real Shorts video IDs (add 6–12 actual ones)
  shorts: [
    'PFk-2MwQ0X8',
    'GlVfcBWHy_8',
    'SMnaSvh7KZA',
    'TYJ6dRF83E4',
    'iqFTeh-2tNA',
    '8hPm7RZhRwA'
  ],

  // Working email capture / Scroll Vault link (point to your live form or page)
  emailCaptureUrl: 'https://thedivinegetdown.com/stillness',   // or your actual Netlify form URL

  // Optional playlists (replace if you have real ones)
  playlistIds: {
    longform: '',   // leave empty or add real ID
    shorts: ''
  },
};
