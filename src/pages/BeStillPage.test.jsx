import React from 'react';
import fs from 'fs';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { BE_STILL_CONTENT } from '../content/beStill';
import BeStillPage from './BeStillPage';

function renderBeStill() {
  const helmetContext = {};
  const previousCanUseDOM = HelmetProvider.canUseDOM;
  HelmetProvider.canUseDOM = false;
  let markup;

  try {
    markup = renderToStaticMarkup(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location="/be-still">
          <BeStillPage />
        </StaticRouter>
      </HelmetProvider>,
    );
  } finally {
    HelmetProvider.canUseDOM = previousCanUseDOM;
  }

  const container = document.createElement('div');
  container.innerHTML = markup;
  return { container, helmet: helmetContext.helmet };
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
  if (block.type === 'read') {
    return `${block.prefix || 'Read '}${block.reference}${block.suffix}`;
  }
  if (block.type === 'richParagraph') {
    return block.parts.map((part) => (typeof part === 'string' ? part : part.text)).join('');
  }
  return block.text;
}

test('records the passed Biblical Content Gate and verified direct WEB quotations', () => {
  expect(BE_STILL_CONTENT.review).toEqual({
    biblicalContentGate: 'pass',
    reviewedReferences: [
      'Psalm 46',
      'Romans 5:1–11',
      '1 Peter 5:5–11',
      'Philippians 1:12–14',
      'Philippians 4:1–9',
    ],
  });
  expect(
    BE_STILL_CONTENT.sections.flatMap(({ blocks }) =>
      blocks.filter(({ type }) => type === 'scripture').map(({ quote }) => quote),
    ),
  ).toEqual([
    '“Be still, and know that I am God. I will be exalted among the nations. I will be exalted on the earth.”',
    '“casting all your worries on him, because he cares for you.”',
    '“And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.”',
  ]);
});

test('matches the complete canonical manuscript word for word after Markdown normalization', () => {
  const canonicalFile = fs.readFileSync(
    path.join(process.cwd(), 'docs', 'content', 'BE_STILL_CANONICAL.md'),
    'utf8',
  );
  const opening = canonicalFile.indexOf('Some concerns become louder when the room grows quiet.');
  const audit = canonicalFile.indexOf('## Scripture audit');
  const canonical = [
    '# Be Still',
    '## When Your Mind Won’t Be Quiet',
    canonicalFile.slice(opening, audit),
  ].join('\n\n');
  const represented = [
    BE_STILL_CONTENT.hero.title,
    BE_STILL_CONTENT.hero.subtitle,
    ...BE_STILL_CONTENT.introduction,
    BE_STILL_CONTENT.translationNote,
    ...BE_STILL_CONTENT.sections.flatMap((section) => [
      section.title,
      ...section.blocks.map(blockText),
    ]),
  ].join('\n\n');

  expect(normalizeManuscript(represented)).toBe(normalizeManuscript(canonical));
});

test('renders all eight sections in canonical order with a valid heading hierarchy', () => {
  const { container } = renderBeStill();
  const sections = [...container.querySelectorAll('.draw-near-section')];

  expect(container.querySelectorAll('main')).toHaveLength(1);
  expect(container.querySelectorAll('h1')).toHaveLength(1);
  expect(container.querySelector('h1').textContent).toBe('Be Still');
  expect(sections).toHaveLength(8);
  expect(sections.map((section) => section.querySelector(':scope > h2').textContent)).toEqual(
    BE_STILL_CONTENT.sections.map(({ title }) => title),
  );
  expect(container.querySelectorAll('article h3')).toHaveLength(0);
});

test('keeps Scripture explicit, prayer complete, and commercial CTAs absent', () => {
  const { container } = renderBeStill();
  const scriptureLinks = [
    ...container.querySelectorAll('a[href^="https://ebible.org/engwebp/"]'),
  ];

  expect(scriptureLinks).toHaveLength(10);
  expect(container.querySelectorAll('blockquote')).toHaveLength(3);
  expect(container.textContent).toContain('I entrust myself and those I love to you.');
  expect(container.textContent).toContain('In Jesus’ name,');
  expect(container.textContent).toContain('Amen.');
  expect(container.textContent).toContain(
    'You can rest while there is still something to pray about.',
  );
  ['Reset Experience', 'Donate', 'Membership', 'Buy now', 'Email address'].forEach(
    (prohibitedText) => expect(container.textContent).not.toContain(prohibitedText),
  );
});

test('publishes indexable self-canonical social metadata', () => {
  const { helmet } = renderBeStill();
  const links = helmet.link.toString();
  const metas = helmet.meta.toString();

  expect(helmet.title.toString()).toContain(BE_STILL_CONTENT.metadata.title);
  expect(links).toContain('href="https://thedivinegetdown.com/be-still"');
  expect(metas).toContain('property="og:url"');
  expect(metas).toContain('content="https://thedivinegetdown.com/be-still"');
  expect(metas).toContain('name="twitter:title"');
  expect(metas).not.toContain('name="robots"');
});
