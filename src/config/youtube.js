// src/config/youtube.js
// Single source of truth for YouTube + funnel links.
// Update these values and the site will refresh everywhere automatically.

export const YOUTUBE = {
  // Provided by you
  channelUrl: 'https://www.youtube.com/@TheDivineGetDown',
  featuredVideoId: 'rhjTW4JYnUA',

  // Optional (placeholders — replace anytime)
  playlistIds: {
    longform: 'YOUR_LONGFORM_PLAYLIST_ID',
    shorts: 'YOUR_SHORTS_PLAYLIST_ID',
  },

  // For the Shorts grid (6–12). Use YouTube Shorts video IDs.
  // Example short URL: https://youtube.com/shorts/VIDEO_ID
  shortsVideoIds: ['PFk-2MwQ0X8', 'GlVfcBWHy_8', 'SMnaSvh7KZA', 'TYJ6dRF83E4', 'iqFTeh-2tNA', '8hPm7RZhRwA'],

  // Funnel / community actions
  joinCommunityPath: '/community',
  leadMagnetPath: '/stillness',

  // Placeholder until your email capture is wired up (Button should open a link)
  emailCaptureUrl: 'https://example.com/stillness-scroll',
};
