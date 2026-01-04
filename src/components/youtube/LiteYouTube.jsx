// src/components/youtube/LiteYouTube.jsx
import React from 'react';
import PropTypes from 'prop-types';

// Lightweight YouTube embeds.
// Install: npm i lite-youtube-embed
import 'lite-youtube-embed';
import 'lite-youtube-embed/src/lite-yt-embed.css';

export default function LiteYouTube({ videoId, title }) {
  if (!videoId) return null;

  // "lite-youtube" is a web component registered by the package above.
  return (
    <div className="yt-lite-wrap">
      <lite-youtube videoid={videoId} playlabel={title || 'Play'} />
    </div>
  );
}

LiteYouTube.propTypes = {
  videoId: PropTypes.string,
  title: PropTypes.string,
};
