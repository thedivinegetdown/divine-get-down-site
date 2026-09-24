import { SITE } from './site';
import { DRAW_NEAR_CONTENT } from './drawNear';
import { STILLNESS_SCROLL_CONTENT } from './stillnessScroll';
import { YOUTUBE, YOUTUBE_CONTENT, YOUTUBE_SHORTS } from './youtube';

const youtubeVideoUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
const youtubeShortUrl = (id) => `https://www.youtube.com/shorts/${id}`;

const stillnessResource = {
  id: 'stillness-scroll',
  title: STILLNESS_SCROLL_CONTENT.resourceName,
  description: 'A free guided prayer, gentle breath, and Scripture for stillness and peace.',
  format: 'Free guided scroll',
  href: SITE.links.stillness,
  external: false,
};

const shortResource = (short, description) => ({
  id: short.id,
  title: short.title,
  description,
  format: 'Free YouTube Short',
  href: youtubeShortUrl(short.id),
  external: true,
});

export const START_CONTENT = {
  metadata: {
    title: 'Find Your Place to Begin | The Divine Get Down',
    description:
      'Choose a peaceful, Christ-centered place to begin with free Scripture-rooted resources from The Divine Get Down.',
    path: SITE.links.start,
    noIndex: true,
  },
  homeEntry: {
    title: 'Find Your Place to Begin',
    description:
      'Choose a peaceful starting point for prayer, Scripture, or encouragement.',
    button: 'Start Here',
  },
  brandKicker: SITE.name,
  title: 'What do you need right now?',
  introduction:
    'You don’t have to have everything figured out. Choose a place to begin.',
  selectionHeading: 'Choose a place to begin',
  beginHeading: 'Begin here.',
  secondaryHeading: 'Continue if it feels useful',
  chooseAnother: 'Choose another path',
  utilityLinks: [
    { id: 'home', label: 'Home', href: SITE.links.home },
    { id: 'watch', label: 'Watch', href: '/#watch' },
    { id: 'services', label: 'Services', href: '/#services' },
  ],
  pathways: [
    {
      id: 'peace',
      name: 'Find Peace in God’s Presence',
      invitation: 'Begin with a quiet, Scripture-rooted moment of prayer and rest.',
      primary: stillnessResource,
      primaryCta: 'Begin with the Free Stillness Scroll',
      secondary: [
        shortResource(
          YOUTUBE_SHORTS.protectionPrayer,
          'A brief prayer of protection for this generation.',
        ),
      ],
    },
    {
      id: 'encouragement',
      name: 'Receive Scripture-Centered Encouragement',
      invitation: 'Watch a message that points you back to God’s truth and hope.',
      primary: {
        id: YOUTUBE.featuredVideoId,
        title: YOUTUBE_CONTENT.featuredVideoTitle,
        description: 'A Christ-centered featured message from The Divine Get Down.',
        format: 'Free featured video',
        href: youtubeVideoUrl(YOUTUBE.featuredVideoId),
        external: true,
      },
      primaryCta: 'Watch the Featured Message',
      secondary: [
        shortResource(
          YOUTUBE_SHORTS.valleyBecoming,
          'A short word of encouragement for seasons that feel like a valley.',
        ),
        shortResource(
          YOUTUBE_SHORTS.partsSeas,
          'A Scripture-centered reminder from Exodus 14:21.',
        ),
      ],
    },
    {
      id: 'draw-near',
      name: 'Draw Near to Jesus',
      invitation: 'Choose a gentle reflection for seeking Jesus and walking in His love.',
      primary: {
        id: DRAW_NEAR_CONTENT.integration.slug,
        title: DRAW_NEAR_CONTENT.integration.fullTitle,
        description: DRAW_NEAR_CONTENT.integration.description,
        format: 'Free Scripture reflection',
        href: SITE.links.drawNear,
        external: false,
      },
      primaryCta: DRAW_NEAR_CONTENT.integration.primaryCta,
      secondary: [
        shortResource(
          YOUTUBE_SHORTS.seekHim,
          'A short reflection on seeking God with your whole heart.',
        ),
        shortResource(
          YOUTUBE_SHORTS.loveLikeJesus,
          'A reflection on the patience and kindness that changes everything.',
        ),
        shortResource(
          YOUTUBE_SHORTS.walkInLove,
          'A Scripture-centered invitation to follow God’s example and walk in love.',
        ),
        stillnessResource,
      ],
    },
  ],
};
