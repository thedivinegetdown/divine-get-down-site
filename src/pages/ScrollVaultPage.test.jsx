import React from 'react';
import fs from 'fs';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import TabContent from '../components/TabContent';
import { HOME_CONTENT } from '../content/home';
import { HOME_TABS } from '../content/navigation';
import {
  RESOURCE_REGISTRY,
  getPublicLibraryResources,
  getResourceById,
} from '../content/resourceRegistry';
import { SCROLL_VAULT_CONTENT } from '../content/scrollVault';
import { SITE } from '../content/site';
import { START_CONTENT } from '../content/start';
import { YOUTUBE, YOUTUBE_CONTENT, YOUTUBE_SHORTS } from '../content/youtube';
import ScrollVaultPage from './ScrollVaultPage';

function renderRoute(element, location) {
  const helmetContext = {};
  const previousCanUseDOM = HelmetProvider.canUseDOM;
  HelmetProvider.canUseDOM = false;
  let markup;

  try {
    markup = renderToStaticMarkup(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={location}>{element}</StaticRouter>
      </HelmetProvider>,
    );
  } finally {
    HelmetProvider.canUseDOM = previousCanUseDOM;
  }

  const container = document.createElement('div');
  container.innerHTML = markup;

  return { container, helmet: helmetContext.helmet, markup };
}

test('renders the complete approved public library from registry facts and destinations', () => {
  const { container } = renderRoute(<ScrollVaultPage />, SITE.links.scrollVault);
  const publicResources = getPublicLibraryResources();
  const renderedEntries = [...container.querySelectorAll('[data-resource-id]')];

  expect(publicResources).toHaveLength(11);
  expect(publicResources.filter(({ status }) => status === 'ready')).toHaveLength(10);
  expect(publicResources.filter(({ status }) => status === 'limited')).toHaveLength(1);
  expect(renderedEntries.map((entry) => entry.dataset.resourceId)).toEqual(
    publicResources.map(({ id }) => id),
  );

  publicResources.forEach((resource) => {
    const entry = container.querySelector(`[data-resource-id="${resource.id}"]`);

    expect(entry.querySelector('h3').textContent).toBe(resource.title);
    expect(entry.textContent).toContain(resource.description);
    expect(entry.querySelector('a').getAttribute('href')).toBe(resource.destination.href);
  });

  expect(
    renderedEntries.every((entry) => {
      const resource = getResourceById(entry.dataset.resourceId);
      return resource.access === 'free' && ['ready', 'limited'].includes(resource.status);
    }),
  ).toBe(true);

  RESOURCE_REGISTRY.filter(
    ({ access, status }) =>
      access === 'test-only' || access === 'unpublished' || ['draft', 'test-only'].includes(status),
  ).forEach(({ title }) => expect(container.textContent).not.toContain(title));
});

test('keeps the curated hierarchy, one h1, and valid heading progression', () => {
  const { container } = renderRoute(<ScrollVaultPage />, SITE.links.scrollVault);
  const headings = [...container.querySelectorAll('h1, h2, h3')];
  const headingLevels = headings.map(({ tagName }) => Number(tagName.slice(1)));

  expect(container.querySelectorAll('main')).toHaveLength(1);
  expect(container.querySelector('main').getAttribute('tabindex')).toBe('-1');
  expect(container.querySelectorAll('h1')).toHaveLength(1);
  expect(container.querySelector('h1').textContent).toBe('Resource Library');
  expect([...container.querySelectorAll('h2')].map(({ textContent }) => textContent)).toEqual([
    SCROLL_VAULT_CONTENT.sections.reflections.title,
    SCROLL_VAULT_CONTENT.sections.stillness.title,
    SCROLL_VAULT_CONTENT.sections.watch.title,
    SCROLL_VAULT_CONTENT.sections.shorts.title,
    SCROLL_VAULT_CONTENT.startPrompt,
  ]);
  expect(
    headingLevels.slice(1).every((level, index) => level - headingLevels[index] <= 1),
  ).toBe(true);
  expect(
    [...container.querySelectorAll('a')].every(({ textContent }) => textContent.trim().length > 0),
  ).toBe(true);
});

test('removes unsupported paid Vault claims and provides calm Library navigation', () => {
  const { container } = renderRoute(<ScrollVaultPage />, SITE.links.scrollVault);
  const prohibitedClaims = [
    '$11',
    '$19',
    'monthly access',
    'paid membership',
    'audio reflections',
    'daily return',
    'Request Access',
    'Enter the Scroll Vault',
  ];

  prohibitedClaims.forEach((claim) => expect(container.textContent).not.toContain(claim));
  expect(container.querySelector('form[name="scroll-vault-access"]')).toBeNull();
  expect(container.querySelector(`a[href="${SITE.links.start}"]`).textContent).toBe(
    SCROLL_VAULT_CONTENT.startButton,
  );
  expect(container.querySelector(`a[href="${SITE.links.journey}"]`)).toBeNull();
  expect(container.querySelector(`a[href="${SITE.links.community}"]`)).toBeNull();
});

test('corrects the homepage Library destination without changing pathways or media', () => {
  const { container: homeLibrary } = renderRoute(<TabContent activeTab="start" />, '/');

  expect(HOME_TABS.find(({ id }) => id === 'start')).toEqual({
    id: 'start',
    label: 'Resource Library',
  });
  expect(homeLibrary.textContent).toContain(HOME_CONTENT.scrollVault.title);
  expect(homeLibrary.querySelector(`a[href="${SITE.links.scrollVault}"]`)).not.toBeNull();
  expect(homeLibrary.querySelector(`a[href="${SITE.links.start}"]`)).not.toBeNull();
  expect(homeLibrary.querySelector(`a[href="${SITE.links.stillness}"]`)).toBeNull();

  expect(
    START_CONTENT.pathways.map(({ id, primary, secondary }) => ({
      id,
      primary: primary.id,
      secondary: secondary.map(({ id: resourceId }) => resourceId),
    })),
  ).toEqual([
    {
      id: 'peace',
      primary: 'be-still',
      secondary: ['stillness-scroll', YOUTUBE_SHORTS.protectionPrayer.id],
    },
    {
      id: 'encouragement',
      primary: 'take-heart',
      secondary: [YOUTUBE_SHORTS.valleyBecoming.id, YOUTUBE_SHORTS.partsSeas.id],
    },
    {
      id: 'draw-near',
      primary: 'draw-near',
      secondary: [
        YOUTUBE_SHORTS.seekHim.id,
        YOUTUBE_SHORTS.loveLikeJesus.id,
        YOUTUBE_SHORTS.walkInLove.id,
        'stillness-scroll',
      ],
    },
  ]);

  const { container: library } = renderRoute(<ScrollVaultPage />, SITE.links.scrollVault);
  const expectedMedia = [
    {
      id: YOUTUBE.featuredVideoId,
      title: YOUTUBE_CONTENT.featuredVideoTitle,
      href: `https://www.youtube.com/watch?v=${YOUTUBE.featuredVideoId}`,
    },
    ...YOUTUBE.shorts.map(({ id, title }) => ({
      id,
      title,
      href: `https://www.youtube.com/shorts/${id}`,
    })),
  ];

  expectedMedia.forEach(({ id, title, href }) => {
    const entry = library.querySelector(`[data-resource-id="${id}"]`);
    expect(entry.querySelector('h3').textContent).toBe(title);
    expect(entry.querySelector('a').getAttribute('href')).toBe(href);
  });
});

test('publishes indexable self-canonical Library metadata and remains in the sitemap', () => {
  const { helmet } = renderRoute(<ScrollVaultPage />, SITE.links.scrollVault);
  const sitemap = fs.readFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
  const canonicalUrl = `${SITE.canonicalUrl}${SITE.links.scrollVault}`;

  expect(helmet.title.toString()).toContain(SCROLL_VAULT_CONTENT.metadata.title);
  expect(helmet.link.toString()).toContain(`href="${canonicalUrl}"`);
  expect(helmet.meta.toString()).toContain('property="og:url"');
  expect(helmet.meta.toString()).toContain(`content="${canonicalUrl}"`);
  expect(helmet.meta.toString()).toContain('name="twitter:title"');
  expect(helmet.meta.toString()).not.toContain('name="robots"');
  expect(sitemap.match(new RegExp(`<loc>${canonicalUrl}</loc>`, 'g'))).toHaveLength(1);
});
