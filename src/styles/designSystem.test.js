import fs from 'fs';
import path from 'path';

const readStyle = (fileName) => fs.readFileSync(path.join(__dirname, fileName), 'utf8');

describe('design system foundation', () => {
  const tokens = readStyle('tokens.css');
  const primitives = readStyle('primitives.css');

  test.each([
    'color-page-background',
    'color-panel-background',
    'color-text-primary',
    'color-text-muted',
    'color-accent-gold',
    'color-accent-amber',
    'color-focus',
    'font-family-sans',
    'font-size-body',
    'line-height-body',
    'space-4',
    'radius-card',
    'radius-control',
    'shadow-card',
    'focus-outline',
    'duration-fast',
    'duration-standard',
    'duration-slow',
    'content-width-wide',
    'breakpoint-mobile',
  ])('defines the %s token', (tokenName) => {
    expect(tokens).toContain(`--${tokenName}:`);
  });

  test.each([
    '.primary-cta',
    '.secondary-cta',
    '.text-link',
    '.card',
    '.panel',
    '.page-shell',
    '.section-container',
    '.form-field',
    '.form-label',
    '.form-input',
    '.form-textarea',
    '.form-select',
    '.helper-text',
    '.error-text',
    '.success-text',
    '.loading-state',
  ])('defines the %s primitive', (className) => {
    expect(primitives).toContain(className);
  });

  test('keeps focus and reduced-motion behavior centralized', () => {
    const appStyles = fs.readFileSync(path.join(__dirname, '..', 'App.css'), 'utf8');
    const indexStyles = fs.readFileSync(path.join(__dirname, '..', 'index.css'), 'utf8');

    expect(primitives).toContain(':focus-visible');
    expect(primitives).toContain('@media (prefers-reduced-motion: reduce)');
    expect(appStyles).not.toMatch(/(^|\n):root\s*\{/);
    expect(indexStyles).not.toContain('@media (prefers-reduced-motion: reduce)');
  });

  test('allows pinned links to shrink at narrow viewport widths', () => {
    const appStyles = fs.readFileSync(path.join(__dirname, '..', 'App.css'), 'utf8');

    expect(appStyles).toMatch(
      /\.pinned-links\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s
    );
    expect(appStyles).toMatch(/\.pinned-link\s*>\s*span:last-child\s*\{[^}]*overflow-wrap:\s*anywhere/s);
});
});
