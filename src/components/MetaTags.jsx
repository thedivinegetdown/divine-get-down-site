// src/components/MetaTags.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const DEFAULT_IMAGE = '/divine_logo.png';

/**
 * Production-grade meta tags for SEO + rich previews.
 * Use per route/page for consistent Open Graph + Twitter cards.
 */
export default function MetaTags({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  canonicalBase = 'https://thedivinegetdown.com',
  noIndex = false,
}) {
  const url = `${canonicalBase}${path}`;
  const safeTitle = title?.trim() || 'The Divine Get Down';
  const safeDesc =
    description?.trim() ||
    'A cinematic sanctuary for stillness, Scripture, and sacred rhythm.';

  return (
    <Helmet>
      <title>{safeTitle}</title>

      {/* Primary */}
      <meta name="description" content={safeDesc} />
      <link rel="canonical" href={url} />

      {/* Robots */}
      {noIndex ? <meta name="robots" content="noindex,follow" /> : null}

      {/* Open Graph */}
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${canonicalBase}${image}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDesc} />
      <meta name="twitter:image" content={`${canonicalBase}${image}`} />
    </Helmet>
  );
}

MetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.string,
  canonicalBase: PropTypes.string,
  noIndex: PropTypes.bool,
};
