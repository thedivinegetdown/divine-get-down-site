import { SITE, SITE_URL } from './site';
import { YOUTUBE } from './youtube';

const baseTitle = SITE.name;
const ogImage = `${SITE_URL}/divine_logo.png`;

export const TAB_METADATA = {
  services: {
    path: '/',
    title: `Services | ${baseTitle}`,
    description:
      'Explore the video content, motivational speaking, educational teaching, and collaborations offered through The Divine Get Down.',
    ogTitle: `Services | ${baseTitle}`,
    ogDescription:
      'Faith-based video content, motivational speaking, educational teaching, and spiritual encouragement.',
    ogImage,
  },
  watch: {
    path: '/',
    title: `Watch | ${baseTitle}`,
    description:
      'Watch the featured message, explore playlists, and subscribe for faith-filled videos that bring peace and clarity.',
    ogTitle: `Watch | ${baseTitle}`,
    ogDescription:
      'Watch the featured message, explore playlists, and subscribe for weekly encouragement.',
    ogImage,
    videoId: YOUTUBE.featuredVideoId,
    videoTitle: 'The Light of God That Formed the Universe',
    videoDescription:
      'A Christ-centered message from The Divine Get Down reflecting on the light of God that formed the universe.',
    videoThumbnail: `https://i.ytimg.com/vi/${YOUTUBE.featuredVideoId}/hqdefault.jpg`,
    uploadDate: '2025-12-03',
  },
  shorts: {
    path: '/',
    title: `Shorts | ${baseTitle}`,
    description:
      'Short, scripture-centered encouragement you can watch in under a minute—designed to reset your mind and strengthen your spirit.',
    ogTitle: `Shorts | ${baseTitle}`,
    ogDescription: 'Quick, faith-filled resets you can watch daily.',
    ogImage,
  },
  about: {
    path: '/',
    title: `About | ${baseTitle}`,
    description:
      'About The Divine Get Down and its faith-based media platform, spiritual encouragement, and speaking mission.',
    ogTitle: `About | ${baseTitle}`,
    ogDescription: 'Why this exists and what The Divine Get Down provides.',
    ogImage,
  },
  contact: {
    path: '/',
    title: `Contact | ${baseTitle}`,
    description:
      'Contact The Divine Get Down for speaking engagements, teaching, interviews, collaborations, partnerships, and business inquiries.',
    ogTitle: `Contact | ${baseTitle}`,
    ogDescription: 'Speaking, collaboration, partnership, and business inquiries.',
    ogImage,
  },
  start: {
    path: '/',
    title: `Scroll Vault | ${baseTitle}`,
    description:
      'Enter the Scroll Vault for deeper reflection, stillness, and faith-filled resources from The Divine Get Down.',
    ogTitle: `Scroll Vault | ${baseTitle}`,
    ogDescription: 'A deeper place for reflection, stillness, and sacred encouragement.',
    ogImage,
  },
  welcome: {
    path: '/',
    title: `Christ-Centered Videos, Prayer & Encouragement | ${baseTitle}`,
    description:
      'Find Christ-centered videos, Scripture-rooted prayer, peaceful encouragement, and speaking services from The Divine Get Down.',
    ogTitle: baseTitle,
    ogDescription:
      'Christ-centered videos, Scripture-rooted prayer, peaceful encouragement, and speaking services.',
    ogImage,
  },
};

export function getTabMetadata(tabId) {
  return TAB_METADATA[tabId] || TAB_METADATA.welcome;
}

export const ORGANIZATION_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE_URL,
  email: SITE.contactEmail,
  sameAs: [YOUTUBE.channelUrl],
};

export function createVideoStructuredData(meta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: meta.videoTitle || 'Featured Video',
    description: meta.videoDescription || meta.description,
    thumbnailUrl: meta.videoThumbnail ? [meta.videoThumbnail] : undefined,
    uploadDate: meta.uploadDate,
    embedUrl: meta.videoId ? `https://www.youtube.com/embed/${meta.videoId}` : undefined,
    contentUrl: meta.videoId ? `https://www.youtube.com/watch?v=${meta.videoId}` : undefined,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE_URL,
    },
  };
}
