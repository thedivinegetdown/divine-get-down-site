import { CONTACT_CONTENT } from './contact';
import { APP_METADATA } from './appMetadata';
import { COMMUNITY_CONTENT } from './community';
import { JOURNEY_CONTENT } from './journey';
import { NOT_FOUND_CONTENT } from './notFound';
import {
  createVideoStructuredData,
  ORGANIZATION_STRUCTURED_DATA,
  TAB_METADATA,
} from './tabMetadata';
import { HOME_TABS } from './navigation';
import { RESET_EXPERIENCE_CONTENT } from './resetExperience';
import { SCROLL_VAULT_CONTENT } from './scrollVault';
import { SITE } from './site';
import { STILLNESS_SCROLL_CONTENT } from './stillnessScroll';
import { THANK_YOU_CONTENT } from './thankYou';
import { YOUTUBE } from './youtube';

test('preserves canonical public navigation and metadata paths', () => {
  expect(HOME_TABS).toEqual([
    { id: 'welcome', label: 'Welcome' },
    { id: 'experience', label: 'Experience' },
    { id: 'watch', label: 'Watch' },
    { id: 'shorts', label: 'Shorts' },
    { id: 'services', label: 'Services' },
    { id: 'start', label: 'Scroll Vault' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]);

  expect(STILLNESS_SCROLL_CONTENT.metadata.path).toBe(SITE.links.stillness);
  expect(RESET_EXPERIENCE_CONTENT.metadata.path).toBe(SITE.links.resetExperience);
  expect(RESET_EXPERIENCE_CONTENT.access.metadata.path).toBe(SITE.links.experienceAccess);
  expect(JOURNEY_CONTENT.metadata.path).toBe(SITE.links.journey);
  expect(COMMUNITY_CONTENT.metadata.path).toBe(SITE.links.community);
  expect(SCROLL_VAULT_CONTENT.metadata.path).toBe(SITE.links.scrollVault);
  expect(THANK_YOU_CONTENT.metadata.path).toBe(SITE.links.thankYou);
  expect(NOT_FOUND_CONTENT.metadata.path).toBe('/404');
  expect(TAB_METADATA.welcome.path).toBe('/');
});

test('preserves media, PDF, and checkout identifiers', () => {
  expect(YOUTUBE).toMatchObject({
    channelUrl: 'https://www.youtube.com/@TheDivineGetDown',
    featuredVideoId: 'rhjTW4JYnUA',
    experienceVideoId: '-2hkUCrCK_0',
    emailCaptureUrl: 'https://thedivinegetdown.com/stillness',
  });
  expect(YOUTUBE.shorts).toEqual([
    'PFk-2MwQ0X8',
    'GlVfcBWHy_8',
    'SMnaSvh7KZA',
    'TYJ6dRF83E4',
    'iqFTeh-2tNA',
    '8hPm7RZhRwA',
  ]);
  expect(STILLNESS_SCROLL_CONTENT.pdfHref).toBe('/stillness-scroll.pdf');
  expect(RESET_EXPERIENCE_CONTENT.access.companionHref).toBe('/reset-companion.pdf');
  expect(RESET_EXPERIENCE_CONTENT.checkoutFallback).toBe(SITE.links.experienceAccess);
});

test('preserves contact workflow identifiers', () => {
  expect(SITE.contactEmail).toBe('thedivinegetdown@gmail.com');
  expect(SITE.contactFormName).toBe('contact-inquiry');
  expect(CONTACT_CONTENT.inquiryTypes.map(({ value }) => value)).toEqual([
    'speaking-engagement',
    'teaching-workshop',
    'interview-media',
    'faith-collaboration',
    'business-partnership',
    'general-inquiry',
  ]);
});

test('preserves canonical website and video structured data', () => {
  expect(APP_METADATA.websiteStructuredData).toMatchObject({
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.canonicalUrl,
  });
  expect(ORGANIZATION_STRUCTURED_DATA).toMatchObject({
    '@type': 'Organization',
    name: SITE.name,
    email: SITE.contactEmail,
    sameAs: [YOUTUBE.channelUrl],
  });
  expect(createVideoStructuredData(TAB_METADATA.watch)).toMatchObject({
    '@type': 'VideoObject',
    name: TAB_METADATA.watch.videoTitle,
    embedUrl: `https://www.youtube.com/embed/${YOUTUBE.featuredVideoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${YOUTUBE.featuredVideoId}`,
  });
});
