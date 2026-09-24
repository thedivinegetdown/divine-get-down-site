import { BE_STILL_CONTENT } from './beStill';
import { DRAW_NEAR_CONTENT } from './drawNear';
import { SITE } from './site';
import { STILLNESS_SCROLL_CONTENT } from './stillnessScroll';
import { TAKE_HEART_CONTENT } from './takeHeart';
import { TAB_METADATA } from './tabMetadata';
import { YOUTUBE, YOUTUBE_CONTENT, YOUTUBE_SHORTS } from './youtube';

export const RESOURCE_ACCESS_VALUES = ['free', 'paid', 'test-only', 'unpublished'];
export const RESOURCE_STATUS_VALUES = ['ready', 'limited', 'draft', 'test-only'];

const PUBLIC_LIBRARY_TYPES = new Set([
  'scripture-reflection',
  'guided-scroll',
  'youtube-video',
  'youtube-short',
]);

const internalDestination = (href) => ({ kind: 'internal', href });
const externalDestination = (href) => ({ kind: 'external', href });
const youtubeShortUrl = (id) => `https://www.youtube.com/shorts/${id}`;

const devotionalResource = (content, destination, relatedResourceIds) => ({
  id: content.integration.slug,
  slug: content.integration.slug,
  title: content.integration.fullTitle,
  description: content.integration.description,
  type: 'scripture-reflection',
  pathwayIds: [
    content.integration.pathway === 'Find Peace in God’s Presence'
      ? 'peace'
      : content.integration.pathway === 'Receive Scripture-Centered Encouragement'
        ? 'encouragement'
        : 'draw-near',
  ],
  topics: content.integration.topics,
  scriptureReferences: content.integration.scriptureReferences,
  duration: content.integration.estimatedReadingTime,
  access: 'free',
  destination: internalDestination(destination),
  relatedResourceIds,
  indexable: true,
  status: 'ready',
  ctaLabel: content.integration.primaryCta,
});

const shortResource = (short, description, pathwayId) => ({
  id: short.id,
  slug: null,
  title: short.title,
  description,
  type: 'youtube-short',
  pathwayIds: [pathwayId],
  topics: [],
  scriptureReferences: [],
  duration: null,
  access: 'free',
  destination: externalDestination(youtubeShortUrl(short.id)),
  relatedResourceIds: [],
  indexable: false,
  status: 'ready',
});

export const RESOURCE_REGISTRY = [
  devotionalResource(BE_STILL_CONTENT, SITE.links.beStill, [
    'stillness-scroll',
    'draw-near',
    YOUTUBE_SHORTS.protectionPrayer.id,
  ]),
  devotionalResource(TAKE_HEART_CONTENT, SITE.links.takeHeart, [
    'be-still',
    'draw-near',
  ]),
  devotionalResource(DRAW_NEAR_CONTENT, SITE.links.drawNear, [
    YOUTUBE_SHORTS.seekHim.id,
    YOUTUBE_SHORTS.walkInLove.id,
    'stillness-scroll',
  ]),
  {
    id: 'stillness-scroll',
    slug: 'stillness-scroll',
    title: STILLNESS_SCROLL_CONTENT.resourceName,
    description: 'A free guided prayer, gentle breath, and Scripture for stillness and peace.',
    type: 'guided-scroll',
    pathwayIds: ['peace', 'draw-near'],
    topics: [],
    scriptureReferences: [],
    duration: null,
    access: 'free',
    destination: internalDestination(SITE.links.stillness),
    relatedResourceIds: [],
    indexable: true,
    status: 'limited',
  },
  {
    id: YOUTUBE.featuredVideoId,
    slug: null,
    title: YOUTUBE_CONTENT.featuredVideoTitle,
    description: TAB_METADATA.watch.videoDescription,
    type: 'youtube-video',
    pathwayIds: [],
    topics: [],
    scriptureReferences: [],
    duration: null,
    access: 'free',
    destination: externalDestination(
      `https://www.youtube.com/watch?v=${YOUTUBE.featuredVideoId}`,
    ),
    relatedResourceIds: [],
    indexable: false,
    status: 'ready',
  },
  shortResource(
    YOUTUBE_SHORTS.walkInLove,
    'A Scripture-centered invitation to follow God’s example and walk in love.',
    'draw-near',
  ),
  shortResource(
    YOUTUBE_SHORTS.protectionPrayer,
    'A brief prayer of protection for this generation.',
    'peace',
  ),
  shortResource(
    YOUTUBE_SHORTS.valleyBecoming,
    'A short word of encouragement for seasons that feel like a valley.',
    'encouragement',
  ),
  shortResource(
    YOUTUBE_SHORTS.seekHim,
    'A short reflection on seeking God with your whole heart.',
    'draw-near',
  ),
  shortResource(
    YOUTUBE_SHORTS.partsSeas,
    'A Scripture-centered reminder from Exodus 14:21.',
    'encouragement',
  ),
  shortResource(
    YOUTUBE_SHORTS.loveLikeJesus,
    'A reflection on the patience and kindness that changes everything.',
    'draw-near',
  ),
];

const resourcesById = new Map(RESOURCE_REGISTRY.map((resource) => [resource.id, resource]));

export function getResourceById(id) {
  const resource = resourcesById.get(id);

  if (!resource) throw new Error(`Unknown resource id: ${id}`);
  return resource;
}

export function getResourcesByIds(ids) {
  return ids.map(getResourceById);
}

export function getPublicLibraryResources() {
  return RESOURCE_REGISTRY.filter(
    ({ access, status, type }) =>
      access === 'free' &&
      ['ready', 'limited'].includes(status) &&
      PUBLIC_LIBRARY_TYPES.has(type),
  );
}
