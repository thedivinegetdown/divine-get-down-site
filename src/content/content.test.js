import fs from 'fs';
import path from 'path';
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
    { id: 'PFk-2MwQ0X8', title: 'Follow God’s Example | Walk in Love' },
    { id: 'GlVfcBWHy_8', title: 'A Prayer of Protection for This Generation' },
    { id: 'SMnaSvh7KZA', title: 'This Valley Isn’t Your Ending — It’s Your Becoming' },
    { id: 'TYJ6dRF83E4', title: 'When You Seek Him with All Your Heart' },
    { id: 'iqFTeh-2tNA', title: 'The God Who Parts Seas | Exodus 14:21' },
    {
      id: '8hPm7RZhRwA',
      title: 'Love Like Jesus: The Patience and Kindness That Changes Everything',
    },
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
    name: 'The Light of God That Formed the Universe',
    thumbnailUrl: [`https://i.ytimg.com/vi/${YOUTUBE.featuredVideoId}/hqdefault.jpg`],
    uploadDate: '2025-12-03',
    embedUrl: `https://www.youtube.com/embed/${YOUTUBE.featuredVideoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${YOUTUBE.featuredVideoId}`,
  });
});

test('keeps public route metadata unique and homepage tabs canonical', () => {
  const publicMetadata = [
    TAB_METADATA.welcome,
    STILLNESS_SCROLL_CONTENT.metadata,
    RESET_EXPERIENCE_CONTENT.metadata,
    JOURNEY_CONTENT.metadata,
    COMMUNITY_CONTENT.metadata,
    SCROLL_VAULT_CONTENT.metadata,
  ];
  const titles = publicMetadata.map(({ title }) => title);
  const descriptions = publicMetadata.map(({ description }) => description);

  expect(new Set(titles).size).toBe(titles.length);
  expect(new Set(descriptions).size).toBe(descriptions.length);
  expect(Object.values(TAB_METADATA).every(({ path: tabPath }) => tabPath === '/')).toBe(true);
});

test('keeps robots and sitemap aligned with canonical public routes', () => {
  const publicDirectory = path.join(process.cwd(), 'public');
  const robots = fs.readFileSync(path.join(publicDirectory, 'robots.txt'), 'utf8');
  const sitemap = fs.readFileSync(path.join(publicDirectory, 'sitemap.xml'), 'utf8');
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  expect(robots).toContain('User-agent: *');
  expect(robots).toContain('Allow: /');
  expect(robots).toContain(`Sitemap: ${SITE.canonicalUrl}/sitemap.xml`);
  expect(sitemapUrls).toEqual([
    `${SITE.canonicalUrl}/`,
    `${SITE.canonicalUrl}${SITE.links.stillness}`,
    `${SITE.canonicalUrl}${SITE.links.resetExperience}`,
    `${SITE.canonicalUrl}${SITE.links.journey}`,
    `${SITE.canonicalUrl}${SITE.links.community}`,
    `${SITE.canonicalUrl}${SITE.links.scrollVault}`,
  ]);
  expect(sitemapUrls.every((url) => !url.includes('#'))).toBe(true);
});

test('marks static SEO fallbacks for Helmet reconciliation', () => {
  const indexHtml = fs.readFileSync(
    path.join(process.cwd(), 'public', 'index.html'),
    'utf8',
  );
  const fallbackDocument = document.implementation.createHTMLDocument();
  fallbackDocument.documentElement.innerHTML = indexHtml;
  const helmetManagedSelectors = [
    'head > title',
    'meta[name="description"]',
    'link[rel="canonical"]',
    'meta[property="og:site_name"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:type"]',
    'meta[property="og:url"]',
    'meta[property="og:image"]',
    'meta[property="og:image:alt"]',
    'meta[name="twitter:card"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
    'meta[name="twitter:image"]',
  ];

  helmetManagedSelectors.forEach((selector) => {
    const elements = fallbackDocument.querySelectorAll(selector);
    expect(elements).toHaveLength(1);
    expect(elements[0].getAttribute('data-rh')).toBe('true');
  });
  expect(fallbackDocument.querySelector('meta[name="robots"]')).toBeNull();
  expect(fallbackDocument.querySelector('script[type="application/ld+json"]')).toBeNull();
});
