import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import TabContent from '../components/TabContent';
import CommunityPage from '../pages/CommunityPage';
import ExperienceAccessPage from '../pages/ExperienceAccessPage';
import JourneyPage from '../pages/JourneyPage';
import NotFoundPage from '../pages/NotFoundPage';
import ResetExperiencePage from '../pages/ResetExperiencePage';
import ScrollVaultPage from '../pages/ScrollVaultPage';
import StillnessScrollPage from '../pages/StillnessScrollPage';
import ThankYouPage from '../pages/ThankYouPage';
import { ABOUT_CONTENT } from './about';
import { COMMUNITY_CONTENT } from './community';
import { CONTACT_CONTENT } from './contact';
import { HOME_CONTENT } from './home';
import { JOURNEY_CONTENT } from './journey';
import { NOT_FOUND_CONTENT } from './notFound';
import { RESET_EXPERIENCE_CONTENT } from './resetExperience';
import { SCROLL_VAULT_CONTENT } from './scrollVault';
import { SERVICES_CONTENT } from './services';
import { STILLNESS_SCROLL_CONTENT } from './stillnessScroll';
import { THANK_YOU_CONTENT } from './thankYou';
import { YOUTUBE } from './youtube';

const originalConsoleError = console.error;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    const isServerRendererFetchPriorityWarning =
      typeof args[0] === 'string' && args[0].includes('fetchPriority');

    if (!isServerRendererFetchPriorityWarning) originalConsoleError(...args);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

function renderRoute(element, location = '/') {
  const markup = renderToStaticMarkup(
    <HelmetProvider>
      <StaticRouter location={location}>{element}</StaticRouter>
    </HelmetProvider>,
  );
  const container = document.createElement('div');
  container.innerHTML = markup;

  return {
    markup,
    text: container.textContent,
  };
}

test.each([
  ['/stillness', <StillnessScrollPage />, STILLNESS_SCROLL_CONTENT.title],
  ['/reset-experience', <ResetExperiencePage />, RESET_EXPERIENCE_CONTENT.title],
  ['/experience-access', <ExperienceAccessPage />, RESET_EXPERIENCE_CONTENT.access.title],
  ['/journey', <JourneyPage />, JOURNEY_CONTENT.title],
  ['/community', <CommunityPage />, COMMUNITY_CONTENT.title],
  ['/vault', <ScrollVaultPage />, SCROLL_VAULT_CONTENT.title],
  ['/thank-you', <ThankYouPage />, THANK_YOU_CONTENT.title],
  ['/missing', <NotFoundPage />, NOT_FOUND_CONTENT.title],
])('renders %s with its canonical content', (location, page, expectedTitle) => {
  const rendered = renderRoute(page, location);

  expect(rendered.text).toContain(expectedTitle);
});

test.each([
  ['welcome', HOME_CONTENT.welcome.title],
  ['services', SERVICES_CONTENT.title],
  ['watch', HOME_CONTENT.watch.title],
  ['shorts', HOME_CONTENT.shorts.title],
  ['about', ABOUT_CONTENT.title],
  ['contact', CONTACT_CONTENT.title],
  ['start', HOME_CONTENT.scrollVault.title],
])('renders the %s homepage tab from structured content', (activeTab, expectedTitle) => {
  const rendered = renderRoute(<TabContent activeTab={activeTab} />);

  expect(rendered.text).toContain(expectedTitle);
});

test('preserves critical links, embeds, and form identifiers', () => {
  const stillness = renderRoute(<StillnessScrollPage />, '/stillness').markup;
  const reset = renderRoute(<ResetExperiencePage />, '/reset-experience').markup;
  const access = renderRoute(<ExperienceAccessPage />, '/experience-access').markup;
  const contact = renderRoute(<TabContent activeTab="contact" />).markup;

  expect(stillness).toContain('href="/stillness-scroll.pdf"');
  expect(reset).toContain('href="/experience-access"');
  expect(access).toContain(`src="https://www.youtube.com/embed/${YOUTUBE.experienceVideoId}"`);
  expect(access).toContain('href="/reset-companion.pdf"');
  expect(contact).toContain('name="contact-inquiry"');
  expect(contact).toContain('data-netlify="true"');
});
