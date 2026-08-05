// src/components/youtube/ShortsGrid.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { YOUTUBE_CONTENT } from '../../content/youtube';

function toThumb(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function ShortsGrid({ videoIds = [] }) {
  const ids = Array.isArray(videoIds) ? videoIds.filter(Boolean).slice(0, 12) : [];
  if (ids.length === 0) return null;

  return (
    <div className="shorts-grid" role="list">
      {ids.map((id) => (
        <a
          key={id}
          className="short-card"
          role="listitem"
          href={`https://www.youtube.com/shorts/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="short-thumb"
            src={toThumb(id)}
            alt={YOUTUBE_CONTENT.shortThumbnailAlt}
            width="480"
            height="360"
          />
          <span className="short-badge" aria-hidden="true">
            {YOUTUBE_CONTENT.shortBadge}
          </span>
        </a>
      ))}
    </div>
  );
}

ShortsGrid.propTypes = {
  videoIds: PropTypes.arrayOf(PropTypes.string),
};


export default React.memo(ShortsGrid);
