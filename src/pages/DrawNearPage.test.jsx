import React from 'react';
import fs from 'fs';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { DRAW_NEAR_CONTENT } from '../content/drawNear';
import DrawNearPage from './DrawNearPage';

function renderDrawNear() {
  const helmetContext = {};
  const previousCanUseDOM = HelmetProvider.canUseDOM;
  HelmetProvider.canUseDOM = false;
  let markup;

  try {
    markup = renderToStaticMarkup(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location="/draw-near">
          <DrawNearPage />
        </StaticRouter>
      </HelmetProvider>,
    );
  } finally {
    HelmetProvider.canUseDOM = previousCanUseDOM;
  }
  const container = document.createElement('div');
  container.innerHTML = markup;

  return { container, helmet: helmetContext.helmet, markup };
}

function normalizeManuscript(text) {
  return text
    .replace(/\r/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[\x60*]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function blockText(block) {
  if (block.type === 'scripture') return `${block.quote} — ${block.reference}`;
  if (block.type === 'read') return `Read ${block.reference}${block.suffix}`;
  if (block.type === 'richParagraph') {
    return block.parts.map((part) => (typeof part === 'string' ? part : part.text)).join('');
  }
  return block.text;
}

test('renders all nine canonical sections in order with one h1', () => {
  const { container } = renderDrawNear();
  const sectionHeadings = [...container.querySelectorAll('.draw-near-section > h2')].map(
    (heading) => heading.textContent,
  );

  expect(container.querySelectorAll('h1')).toHaveLength(1);
  expect(container.querySelector('h1').textContent).toBe('Draw Near');
  expect(sectionHeadings).toEqual(DRAW_NEAR_CONTENT.sections.map(({ title }) => title));
  expect(container.querySelectorAll('.draw-near-section')).toHaveLength(9);
  expect(container.querySelectorAll('h3')).toHaveLength(0);
});

test('matches the complete canonical manuscript word for word', () => {
  const canonical = fs
    .readFileSync(
      path.join(process.cwd(), 'docs', 'content', 'DRAW_NEAR_CANONICAL.md'),
      'utf8',
    )
    .split('## Integration metadata')[0];
  const represented = [
    DRAW_NEAR_CONTENT.hero.title,
    DRAW_NEAR_CONTENT.hero.subtitle,
    ...DRAW_NEAR_CONTENT.introduction,
    DRAW_NEAR_CONTENT.translationNote,
    ...DRAW_NEAR_CONTENT.sections.flatMap((section) => [
      `${section.number}. ${section.title}`,
      ...section.blocks.map(blockText),
    ]),
  ].join('\n\n');

  expect(normalizeManuscript(represented)).toBe(normalizeManuscript(canonical));
});

test('preserves representative canonical text, prayer, Scripture, and conclusion', () => {
  const { container } = renderDrawNear();
  const text = container.textContent;

  expect(text).toContain(
    'There are times when you sit down to pray and discover how crowded your attention has become.',
  );
  expect(text).toContain('Draw near to God, and he will draw near to you.');
  expect(text).toContain('Lord Jesus Christ,');
  expect(text).toContain('I place this day before you.');
  expect(text).toContain('Amen.');
  expect(text).toContain(
    'Come to him with your weariness. Learn from him. Remain in his love.',
  );

  const scriptureLinks = [
    ...container.querySelectorAll('a[href^="https://ebible.org/engwebp/"]'),
  ];
  expect(scriptureLinks.length).toBeGreaterThanOrEqual(8);
  expect(container.querySelectorAll('blockquote')).toHaveLength(3);
});

test('contains only the approved related resources and no commercial CTA', () => {
  const { container } = renderDrawNear();
  const relatedTitles = [...container.querySelectorAll('.draw-near-related-list strong')].map(
    (item) => item.textContent,
  );

  expect(relatedTitles).toEqual(
    DRAW_NEAR_CONTENT.relatedResources.map(({ title }) => title),
  );
  ['Reset Experience', 'Donate', 'Membership', 'Buy now', 'Email address'].forEach(
    (prohibitedText) => expect(container.textContent).not.toContain(prohibitedText),
  );
});

test('publishes indexable self-canonical social metadata', () => {
  const { helmet } = renderDrawNear();
  const links = helmet.link.toString();
  const metas = helmet.meta.toString();

  expect(helmet.title.toString()).toContain(DRAW_NEAR_CONTENT.metadata.title);
  expect(links).toContain(
    'href="https://thedivinegetdown.com/draw-near"',
  );
  expect(metas).toContain('property="og:url"');
  expect(metas).toContain('content="https://thedivinegetdown.com/draw-near"');
  expect(metas).toContain('name="twitter:title"');
  expect(metas).not.toContain('name="robots"');
});
