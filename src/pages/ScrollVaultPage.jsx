// src/pages/ScrollVaultPage.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import { getPublicLibraryResources } from '../content/resourceRegistry';
import { SCROLL_VAULT_CONTENT } from '../content/scrollVault';
import { SITE } from '../content/site';
import '../App.css';
import './ScrollVaultPage.css';

const RESOURCE_TYPE_LABELS = {
  'scripture-reflection': 'Scripture reflection',
  'guided-scroll': 'Guided visual Scroll',
  'youtube-video': 'Featured video',
  'youtube-short': 'Short encouragement',
};

const libraryResources = getPublicLibraryResources();

const resourceSections = [
  {
    id: 'reflections',
    className: 'library-grid library-grid--flagships',
    resources: libraryResources.filter(({ type }) => type === 'scripture-reflection'),
  },
  {
    id: 'stillness',
    className: 'library-grid library-grid--feature',
    resources: libraryResources.filter(({ type }) => type === 'guided-scroll'),
  },
  {
    id: 'watch',
    className: 'library-grid library-grid--feature',
    resources: libraryResources.filter(({ type }) => type === 'youtube-video'),
  },
  {
    id: 'shorts',
    className: 'library-grid library-grid--shorts',
    resources: libraryResources.filter(({ type }) => type === 'youtube-short'),
  },
];

function ScrollVaultPage() {
  return (
    <div className="App">
      <MetaTags {...SCROLL_VAULT_CONTENT.metadata} />

      <main className="library-shell" id="main-content" tabIndex={-1}>
        <div className="library-frame">
          <nav className="library-return" aria-label="Resource library navigation">
            <Link to={SITE.links.home}>{SITE.labels.backToSanctuary}</Link>
          </nav>

          <header className="library-hero">
            <p className="library-eyebrow">{SCROLL_VAULT_CONTENT.eyebrow}</p>
            <h1>{SCROLL_VAULT_CONTENT.title}</h1>
            <p className="library-hero__subtitle">{SCROLL_VAULT_CONTENT.subtitle}</p>
            <p className="library-hero__introduction">
              {SCROLL_VAULT_CONTENT.introduction}
            </p>
          </header>

          {resourceSections.map(({ id, className, resources }) => {
            const section = SCROLL_VAULT_CONTENT.sections[id];

            return (
              <section className="library-section" aria-labelledby={`library-${id}`} key={id}>
                <div className="library-section__heading">
                  <h2 id={`library-${id}`}>{section.title}</h2>
                  <p>{section.description}</p>
                </div>

                <div className={className}>
                  {resources.map((resource) => (
                    <ResourceEntry resource={resource} key={resource.id} />
                  ))}
                </div>
              </section>
            );
          })}

          <aside className="library-start" aria-labelledby="library-start-heading">
            <div>
              <h2 id="library-start-heading">{SCROLL_VAULT_CONTENT.startPrompt}</h2>
              <p>{SCROLL_VAULT_CONTENT.startDescription}</p>
            </div>
            <Link className="primary-cta" to={SITE.links.start}>
              {SCROLL_VAULT_CONTENT.startButton}
            </Link>
          </aside>

          <footer className="library-footer">
            <Link to={SITE.links.home}>{SCROLL_VAULT_CONTENT.homeButton}</Link>
          </footer>
        </div>
      </main>
    </div>
  );
}

function ResourceEntry({ resource }) {
  const typeLabel = RESOURCE_TYPE_LABELS[resource.type];
  const isExternal = resource.destination.kind === 'external';
  const linkText = resource.type === 'scripture-reflection'
    ? `Read ${resource.title}`
    : resource.type === 'guided-scroll'
      ? `Open ${resource.title}`
      : `Watch ${resource.title} on YouTube`;

  const linkClassName = resource.type === 'scripture-reflection'
    ? 'library-entry__link library-entry__link--primary'
    : 'library-entry__link';

  const destinationLink = isExternal ? (
    <a
      className={linkClassName}
      href={resource.destination.href}
      target="_blank"
      rel="noreferrer"
    >
      {linkText}
    </a>
  ) : (
    <Link className={linkClassName} to={resource.destination.href}>
      {linkText}
    </Link>
  );

  return (
    <article
      className={`library-entry library-entry--${resource.type}`}
      data-resource-id={resource.id}
    >
      <p className="library-entry__type">{typeLabel}</p>
      <h3>{resource.title}</h3>
      <p className="library-entry__description">{resource.description}</p>
      {destinationLink}
    </article>
  );
}

ResourceEntry.propTypes = {
  resource: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    destination: PropTypes.shape({
      kind: PropTypes.oneOf(['internal', 'external']).isRequired,
      href: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ScrollVaultPage;
