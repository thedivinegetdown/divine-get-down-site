// src/components/youtube/ShortsGrid.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { YOUTUBE_CONTENT } from '../../content/youtube';

function toThumb(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function ShortsGrid({ videos = [] }) {
  const items = Array.isArray(videos)
    ? videos.filter(({ id, title }) => id && title).slice(0, 12)
    : [];
  if (items.length === 0) return null;

  return (
    <div className="shorts-grid" role="list">
      {items.map(({ id, title }) => (
        <a
          key={id}
          className="short-card"
          role="listitem"
          href={`https://www.youtube.com/shorts/${id}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Watch “${title}” on YouTube`}
        >
          <img
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="short-thumb"
            src={toThumb(id)}
            alt={`${title} video thumbnail`}
            width="480"
            height="360"
          />
          <span className="short-badge" aria-hidden="true">
            {YOUTUBE_CONTENT.shortBadge}
          </span>
          <span className="short-title">{title}</span>
        </a>
      ))}
    </div>
  );
}

ShortsGrid.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};


export default React.memo(ShortsGrid);
