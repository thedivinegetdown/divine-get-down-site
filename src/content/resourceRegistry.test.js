import { BE_STILL_CONTENT } from './beStill';
import { DRAW_NEAR_CONTENT } from './drawNear';
import {
  RESOURCE_ACCESS_VALUES,
  RESOURCE_REGISTRY,
  RESOURCE_STATUS_VALUES,
  getResourceById,
} from './resourceRegistry';
import { SITE } from './site';
import { START_CONTENT } from './start';
import { TAKE_HEART_CONTENT } from './takeHeart';
import { YOUTUBE, YOUTUBE_CONTENT, YOUTUBE_SHORTS } from './youtube';

const expectedStartResourceIds = [
  {
    pathwayId: 'peace',
    primaryId: 'be-still',
    secondaryIds: ['stillness-scroll', YOUTUBE_SHORTS.protectionPrayer.id],
  },
  {
    pathwayId: 'encouragement',
    primaryId: 'take-heart',
    secondaryIds: [YOUTUBE_SHORTS.valleyBecoming.id, YOUTUBE_SHORTS.partsSeas.id],
  },
  {
    pathwayId: 'draw-near',
    primaryId: 'draw-near',
    secondaryIds: [
      YOUTUBE_SHORTS.seekHim.id,
      YOUTUBE_SHORTS.loveLikeJesus.id,
      YOUTUBE_SHORTS.walkInLove.id,
      'stillness-scroll',
    ],
  },
];

test('keeps registry identifiers, destinations, and controlled values valid', () => {
  const ids = RESOURCE_REGISTRY.map(({ id }) => id);
  const slugs = RESOURCE_REGISTRY.map(({ slug }) => slug).filter(Boolean);
  const knownInternalDestinations = new Set(Object.values(SITE.links));

  expect(new Set(ids).size).toBe(ids.length);
  expect(new Set(slugs).size).toBe(slugs.length);

  RESOURCE_REGISTRY.forEach((resource) => {
    expect(RESOURCE_ACCESS_VALUES).toContain(resource.access);
    expect(RESOURCE_STATUS_VALUES).toContain(resource.status);
    expect(['internal', 'external']).toContain(resource.destination.kind);

    if (resource.destination.kind === 'internal') {
      expect(knownInternalDestinations).toContain(resource.destination.href);
    } else {
      expect(resource.destination.href).toMatch(/^https:\/\//);
    }
  });
});

test('resolves every related resource id without changing approved relationships', () => {
  RESOURCE_REGISTRY.forEach(({ relatedResourceIds }) => {
    relatedResourceIds.forEach((relatedId) => {
      expect(getResourceById(relatedId).id).toBe(relatedId);
    });
  });

  expect(getResourceById('be-still').relatedResourceIds).toEqual([
    'stillness-scroll',
    'draw-near',
    YOUTUBE_SHORTS.protectionPrayer.id,
  ]);
  expect(getResourceById('take-heart').relatedResourceIds).toEqual([
    'be-still',
    'draw-near',
  ]);
  expect(getResourceById('draw-near').relatedResourceIds).toEqual([
    YOUTUBE_SHORTS.seekHim.id,
    YOUTUBE_SHORTS.walkInLove.id,
    'stillness-scroll',
  ]);
});

test('preserves start pathway membership, order, destinations, and devotional primaries', () => {
  expect(
    START_CONTENT.pathways.map(({ id, primary, secondary }) => ({
      pathwayId: id,
      primaryId: primary.id,
      secondaryIds: secondary.map(({ id: resourceId }) => resourceId),
    })),
  ).toEqual(expectedStartResourceIds);

  [
    [BE_STILL_CONTENT, SITE.links.beStill],
    [TAKE_HEART_CONTENT, SITE.links.takeHeart],
    [DRAW_NEAR_CONTENT, SITE.links.drawNear],
  ].forEach(([content, route]) => {
    const resource = getResourceById(content.integration.slug);
    expect(resource.title).toBe(content.integration.fullTitle);
    expect(resource.description).toBe(content.integration.description);
    expect(resource.destination).toEqual({ kind: 'internal', href: route });
    expect(content.metadata.path).toBe(route);
  });
});

test('keeps draft and test-only resources out of start', () => {
  const startResourceIds = START_CONTENT.pathways.flatMap(({ primary, secondary }) => [
    primary.id,
    ...secondary.map(({ id }) => id),
  ]);

  startResourceIds.forEach((id) => {
    expect(['ready', 'limited']).toContain(getResourceById(id).status);
  });
});

test('preserves approved video ids and titles without fabricating unavailable facts', () => {
  const expectedVideos = [
    { id: YOUTUBE.featuredVideoId, title: YOUTUBE_CONTENT.featuredVideoTitle },
    ...YOUTUBE.shorts,
  ];

  expectedVideos.forEach(({ id, title }) => {
    const resource = getResourceById(id);
    expect(resource.title).toBe(title);
    expect(resource.duration).toBeNull();
    expect(resource.scriptureReferences).toEqual([]);
    expect(resource).not.toHaveProperty('transcript');
    expect(resource).not.toHaveProperty('captions');
  });
});

test('represents Stillness as free and limited without exposing dormant content', () => {
  expect(getResourceById('stillness-scroll')).toMatchObject({
    access: 'free',
    status: 'limited',
    destination: { kind: 'internal', href: SITE.links.stillness },
    duration: null,
    scriptureReferences: [],
    topics: [],
  });
  expect(RESOURCE_REGISTRY.some(({ id }) => id.toLowerCase().includes('prayerbook'))).toBe(false);
  expect(RESOURCE_REGISTRY.some(({ title }) => title.includes('Morning Reset'))).toBe(false);
});
