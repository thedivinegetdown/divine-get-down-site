import React from 'react';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { TAKE_HEART_CONTENT } from '../content/takeHeart';
import TakeHeartPage from './TakeHeartPage';

const CANONICAL_SHA256 = '5f9cd50f00688a5ed7616facb0041e696be7c9909ec76796c3d7f4150f1b94be';

function renderTakeHeart() {
  const helmetContext = {};
  const previousCanUseDOM = HelmetProvider.canUseDOM;
  HelmetProvider.canUseDOM = false;
  let markup;

  try {
    markup = renderToStaticMarkup(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location="/take-heart">
          <TakeHeartPage />
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

test('keeps the approved canonical source immutable and equivalent after normalization', () => {
  const canonicalFile = fs.readFileSync(
    path.join(process.cwd(), 'docs', 'content', 'TAKE_HEART_CANONICAL.md'),
    'utf8',
  );
  const canonicalHash = crypto.createHash('sha256').update(canonicalFile).digest('hex');
  const canonical = canonicalFile
    .split('# B. Complete canonical manuscript')[1]
    .split('# C. Scripture audit')[0];
  const represented = [
    TAKE_HEART_CONTENT.hero.title,
    TAKE_HEART_CONTENT.hero.subtitle,
    ...TAKE_HEART_CONTENT.introduction,
    TAKE_HEART_CONTENT.translationNote,
    ...TAKE_HEART_CONTENT.sections.flatMap((section) => [
      section.title,
      ...section.blocks.map(blockText),
    ]),
  ].join('\n\n');

  expect(canonicalHash).toBe(CANONICAL_SHA256);
  expect(TAKE_HEART_CONTENT.review.canonicalSha256).toBe(CANONICAL_SHA256);
  expect(normalizeManuscript(represented)).toBe(normalizeManuscript(canonical));
});

test('renders all eight sections in canonical order with a valid heading hierarchy', () => {
  const { container } = renderTakeHeart();
  const sections = [...container.querySelectorAll('.draw-near-section')];

  expect(container.querySelectorAll('main')).toHaveLength(1);
  expect(container.querySelector('main').getAttribute('tabindex')).toBe('-1');
  expect(container.querySelectorAll('h1')).toHaveLength(1);
  expect(container.querySelector('h1').textContent).toBe('Take Heart');
  expect(sections).toHaveLength(8);
  expect(sections.map((section) => section.querySelector(':scope > h2').textContent)).toEqual(
    TAKE_HEART_CONTENT.sections.map(({ title }) => title),
  );
  expect(container.querySelectorAll('article h3')).toHaveLength(0);
});

test('preserves Scripture, reflection, prayer, faithful action, and the Christ-centered closing', () => {
  const { container } = renderTakeHeart();
  const text = container.textContent;
  const scriptureLinks = [
    ...container.querySelectorAll('a[href^="https://ebible.org/eng-web/"]'),
  ];

  expect(container.querySelectorAll('blockquote')).toHaveLength(5);
  expect(scriptureLinks).toHaveLength(11);
  expect(text).toContain('In the world you have trouble; but cheer up! I have overcome the world.');
  expect(text).toContain('Reflect: Where have I made being strong a condition of being faithful?');
  expect(text).toContain('Holy Spirit, help me in the weakness I cannot put into words.');
  expect(text).toContain('Through Jesus Christ our Lord,');
  expect(text).toContain('Amen.');
  expect(text).toContain(
    'ask a trusted fellow Christian to pray with you about the specific place where you are growing weary.',
  );
  expect(text).toContain(
    'Take heart in him. Bring him the weariness that remains. Receive the help he gives through his Word and his people.',
  );
});

test('uses only the approved related resources and contains no commercial CTA', () => {
  const { container } = renderTakeHeart();
  const relatedTitles = [...container.querySelectorAll('.draw-near-related-list strong')].map(
    (item) => item.textContent,
  );

  expect(relatedTitles).toEqual([
    'Be Still: When Your Mind Won’t Be Quiet',
    'Draw Near: Returning Your Heart to Jesus',
  ]);
  ['Reset Experience', 'Donate', 'Membership', 'Buy now', 'Email address'].forEach(
    (prohibitedText) => expect(container.textContent).not.toContain(prohibitedText),
  );
});

test('publishes indexable self-canonical Open Graph and Twitter metadata', () => {
  const { helmet } = renderTakeHeart();
  const links = helmet.link.toString();
  const metas = helmet.meta.toString();

  expect(helmet.title.toString()).toContain(TAKE_HEART_CONTENT.metadata.title);
  expect(links).toContain('href="https://thedivinegetdown.com/take-heart"');
  expect(metas).toContain('property="og:url"');
  expect(metas).toContain('content="https://thedivinegetdown.com/take-heart"');
  expect(metas).toContain('name="twitter:title"');
  expect(metas).not.toContain('name="robots"');
});
