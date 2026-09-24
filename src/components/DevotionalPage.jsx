import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MetaTags from './MetaTags';
import { getResourceById, getResourcesByIds } from '../content/resourceRegistry';
import { SITE } from '../content/site';
import '../App.css';
import '../pages/DrawNearPage.css';

function RichText({ parts }) {
  return parts.map((part, index) => {
    if (typeof part === 'string') return part;

    if (part.type === 'link') {
      return (
        <a key={`${part.text}-${index}`} href={part.href}>
          {part.text}
        </a>
      );
    }

    if (part.type === 'emphasis') {
      return <em key={`${part.text}-${index}`}>{part.text}</em>;
    }

    if (part.type === 'strong') {
      return <strong key={`${part.text}-${index}`}>{part.text}</strong>;
    }

    return null;
  });
}

RichText.propTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
    ]),
  ).isRequired,
};

function ContentBlock({ block }) {
  switch (block.type) {
    case 'scripture':
      return (
        <blockquote className="draw-near-scripture">
          <p>{block.quote}</p>
          <cite>
            {block.href ? <a href={block.href}>{block.reference}</a> : block.reference}
          </cite>
        </blockquote>
      );
    case 'read':
      return (
        <p className="draw-near-read">
          <strong>
            {block.prefix || 'Read '}
            <a href={block.href}>{block.reference}</a>
            {block.suffix}
          </strong>
        </p>
      );
    case 'prompt':
      return (
        <p className="draw-near-prompt">
          <strong>{block.text}</strong>
        </p>
      );
    case 'richParagraph':
      return (
        <p>
          <RichText parts={block.parts} />
        </p>
      );
    case 'prayerOpening':
    case 'prayerClosing':
      return <p className="draw-near-prayer-marker">{block.text}</p>;
    case 'pause':
      return (
        <p className="draw-near-pause">
          <em>{block.text}</em>
        </p>
      );
    case 'closing':
      return <p className="draw-near-closing">{block.text}</p>;
    default:
      return <p>{block.text}</p>;
  }
}

ContentBlock.propTypes = {
  block: PropTypes.shape({
    href: PropTypes.string,
    parts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    prefix: PropTypes.string,
    quote: PropTypes.string,
    reference: PropTypes.string,
    suffix: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

function RelatedResource({ resource }) {
  const content = (
    <>
      <span>{resource.label}</span>
      <strong>{resource.title}</strong>
    </>
  );

  if (resource.external) {
    return (
      <a href={resource.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <Link to={resource.href}>{content}</Link>;
}

const RELATED_RESOURCE_LABELS = {
  'guided-scroll': 'Guided Scroll',
  'scripture-reflection': 'Scripture Reflection',
  'youtube-short': 'YouTube Short',
};

function toRelatedResource(resource) {
  return {
    id: resource.id,
    title: resource.title,
    href: resource.destination.href,
    external: resource.destination.kind === 'external',
    label: RELATED_RESOURCE_LABELS[resource.type],
  };
}

RelatedResource.propTypes = {
  resource: PropTypes.shape({
    external: PropTypes.bool.isRequired,
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default function DevotionalPage({ content }) {
  const {
    hero,
    introduction,
    integration,
    metadata,
    sections,
    translationNote,
  } = content;
  const devotionalResource = getResourceById(integration.slug);
  const relatedResources = getResourcesByIds(devotionalResource.relatedResourceIds).map(
    toRelatedResource,
  );

  return (
    <div className="App draw-near-page">
      <MetaTags {...metadata} />

      <main className="draw-near-shell" id="main-content" tabIndex={-1}>
        <header className="draw-near-hero">
          <Link className="draw-near-brand" to={SITE.links.home}>
            <picture>
              <source srcSet={SITE.logo.webp} type="image/webp" />
              <img
                src={SITE.logo.png}
                alt={SITE.logo.alt}
                width={SITE.logo.width}
                height={SITE.logo.height}
                loading="eager"
                decoding="async"
              />
            </picture>
            <span>{hero.brand}</span>
          </Link>

          <div className="draw-near-labels" aria-label="Resource details">
            <span>{hero.format}</span>
            <span>{hero.readTime}</span>
          </div>

          <h1>{hero.title}</h1>
          <p className="draw-near-subtitle">{hero.subtitle}</p>
          <p className="draw-near-description">{metadata.description}</p>

          <nav className="draw-near-nav" aria-label="Resource navigation">
            <Link to={SITE.links.start}>Back to Find Your Place to Begin</Link>
            <Link to={SITE.links.home}>Home</Link>
            <Link to="/#watch">Watch</Link>
          </nav>
        </header>

        <article className="draw-near-manuscript">
          <div className="draw-near-introduction">
            {introduction.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <p className="draw-near-translation-note">
              <em>{translationNote}</em>
            </p>
          </div>

          {sections.map((section) => (
            <section
              className={`draw-near-section${
                section.treatment ? ` draw-near-section--${section.treatment}` : ''
              }`}
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-heading`}
            >
              <p className="draw-near-section-number" aria-hidden="true">
                {String(section.number).padStart(2, '0')}
              </p>
              <h2 id={`${section.id}-heading`}>{section.title}</h2>
              <div className="draw-near-section-body">
                {section.blocks.map((block, index) => (
                  <ContentBlock block={block} key={`${section.id}-${block.type}-${index}`} />
                ))}
              </div>
            </section>
          ))}
        </article>

        <aside className="draw-near-related" aria-labelledby="draw-near-related-heading">
          <p className="draw-near-related-kicker">Continue gently</p>
          <h2 id="draw-near-related-heading">Related resources</h2>
          <div className="draw-near-related-list">
            {relatedResources.map((resource) => (
              <RelatedResource key={resource.id} resource={resource} />
            ))}
          </div>
          <Link className="draw-near-return" to={SITE.links.start}>
            Back to Find Your Place to Begin
          </Link>
        </aside>
      </main>
    </div>
  );
}

DevotionalPage.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object.isRequired,
    integration: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired,
    introduction: PropTypes.arrayOf(PropTypes.string).isRequired,
    metadata: PropTypes.object.isRequired,
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
    translationNote: PropTypes.string.isRequired,
  }).isRequired,
};
