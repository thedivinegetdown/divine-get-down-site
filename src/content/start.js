import { SITE } from './site';
import { getResourceById } from './resourceRegistry';
import { YOUTUBE_SHORTS } from './youtube';

const startResource = (id) => {
  const resource = getResourceById(id);
  const formats = {
    'guided-scroll': 'Free guided scroll',
    'scripture-reflection': 'Free Scripture reflection',
    'youtube-short': 'Free YouTube Short',
  };

  return {
    id: resource.id,
    title: resource.title,
    description: resource.description,
    format: formats[resource.type],
    href: resource.destination.href,
    external: resource.destination.kind === 'external',
  };
};

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
      primary: startResource('be-still'),
      primaryCta: getResourceById('be-still').ctaLabel,
      secondary: [
        startResource('stillness-scroll'),
        startResource(YOUTUBE_SHORTS.protectionPrayer.id),
      ],
    },
    {
      id: 'encouragement',
      name: 'Receive Scripture-Centered Encouragement',
      invitation: 'Receive Scripture-rooted hope for the long road of discouragement.',
      primary: startResource('take-heart'),
      primaryCta: getResourceById('take-heart').ctaLabel,
      secondary: [
        startResource(YOUTUBE_SHORTS.valleyBecoming.id),
        startResource(YOUTUBE_SHORTS.partsSeas.id),
      ],
    },
    {
      id: 'draw-near',
      name: 'Draw Near to Jesus',
      invitation: 'Choose a gentle reflection for seeking Jesus and walking in His love.',
      primary: startResource('draw-near'),
      primaryCta: getResourceById('draw-near').ctaLabel,
      secondary: [
        startResource(YOUTUBE_SHORTS.seekHim.id),
        startResource(YOUTUBE_SHORTS.loveLikeJesus.id),
        startResource(YOUTUBE_SHORTS.walkInLove.id),
        startResource('stillness-scroll'),
      ],
    },
  ],
};
