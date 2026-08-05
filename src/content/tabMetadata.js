import { SITE, SITE_URL } from './site';
import { YOUTUBE } from './youtube';

const baseTitle = SITE.name;
const ogImage = `${SITE_URL}/divine_logo.png`;

export const TAB_METADATA = {
  services: {
    path: '/#services',
    title: `Services | ${baseTitle}`,
    description:
      'Explore the video content, motivational speaking, educational teaching, and collaborations offered through The Divine Get Down.',
    ogTitle: `Services | ${baseTitle}`,
    ogDescription:
      'Faith-based video content, motivational speaking, educational teaching, and spiritual encouragement.',
    ogImage,
  },
  watch: {
    path: '/#watch',
    title: `Watch | ${baseTitle}`,
    description:
      'Watch the featured message, explore playlists, and subscribe for faith-filled videos that bring peace and clarity.',
    ogTitle: `Watch | ${baseTitle}`,
    ogDescription:
      'Watch the featured message, explore playlists, and subscribe for weekly encouragement.',
    ogImage,
    videoId: YOUTUBE.featuredVideoId,
    videoTitle: 'The Divine Get Down — Featured Video',
    videoDescription:
      'A featured message from The Divine Get Down — faith-filled encouragement designed to bring stillness and strength.',
    uploadDate: '2025-01-01',
  },
  shorts: {
    path: '/#shorts',
    title: `Shorts | ${baseTitle}`,
    description:
      'Short, scripture-centered encouragement you can watch in under a minute—designed to reset your mind and strengthen your spirit.',
    ogTitle: `Shorts | ${baseTitle}`,
    ogDescription: 'Quick, faith-filled resets you can watch daily.',
    ogImage,
  },
  about: {
    path: '/#about',
    title: `About | ${baseTitle}`,
    description:
      'About The Divine Get Down and its faith-based media platform, spiritual encouragement, and speaking mission.',
    ogTitle: `About | ${baseTitle}`,
    ogDescription: 'Why this exists and what The Divine Get Down provides.',
    ogImage,
  },
  contact: {
    path: '/#contact',
    title: `Contact | ${baseTitle}`,
    description:
      'Contact The Divine Get Down for speaking engagements, teaching, interviews, collaborations, partnerships, and business inquiries.',
    ogTitle: `Contact | ${baseTitle}`,
    ogDescription: 'Speaking, collaboration, partnership, and business inquiries.',
    ogImage,
  },
  start: {
    path: '/#start',
    title: `Scroll Vault | ${baseTitle}`,
    description:
      'Enter the Scroll Vault for deeper reflection, stillness, and faith-filled resources from The Divine Get Down.',
    ogTitle: `Scroll Vault | ${baseTitle}`,
    ogDescription: 'A deeper place for reflection, stillness, and sacred encouragement.',
    ogImage,
  },
  welcome: {
    path: '/',
    title: `${baseTitle} | Faith-Based Videos, Teaching & Speaking`,
    description:
      'The Divine Get Down offers faith-based video content, motivational speaking, educational teaching, and spiritual encouragement.',
    ogTitle: baseTitle,
    ogDescription:
      'Faith-based video content, motivational speaking, educational teaching, and spiritual encouragement.',
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
    thumbnailUrl: meta.ogImage ? [meta.ogImage] : undefined,
    uploadDate: meta.uploadDate || '2025-01-01',
    embedUrl: meta.videoId ? `https://www.youtube.com/embed/${meta.videoId}` : undefined,
    contentUrl: meta.videoId ? `https://www.youtube.com/watch?v=${meta.videoId}` : undefined,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE_URL,
    },
  };
}
