import { SITE } from './site';

export const APP_METADATA = {
  title: 'The Divine Get Down | Faith-Based Videos & Speaking Services',
  description:
    'The Divine Get Down provides non-downloadable faith-based videos, motivational and educational speaking services, and spiritual encouragement.',
  websiteStructuredData: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.canonicalUrl,
    description:
      'Faith-based platform offering non-downloadable videos in the field of religion, motivational speaking services, educational speaking services, and spiritual encouragement.',
  },
};
