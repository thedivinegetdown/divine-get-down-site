// src/components/youtube/ShortsGrid.jsx
import React from 'react';
import PropTypes from 'prop-types';

function toThumb(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export default function ShortsGrid({ videoIds = [] }) {
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
            className="short-thumb"
            src={toThumb(id)}
            alt="YouTube Short thumbnail"
            width="480"
            height="360"
            loading="lazy"
            decoding="async"
          />
          <span className="short-badge" aria-hidden="true">
            Short
          </span>
        </a>
      ))}
    </div>
  );
}

ShortsGrid.propTypes = {
  videoIds: PropTypes.arrayOf(PropTypes.string),
};
