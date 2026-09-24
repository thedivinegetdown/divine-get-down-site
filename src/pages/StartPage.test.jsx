import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import StartPage from './StartPage';
import { START_CONTENT } from '../content/start';

let container;
let root;
let originalRequestAnimationFrame;

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
});

beforeEach(async () => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  originalRequestAnimationFrame = window.requestAnimationFrame;
  window.requestAnimationFrame = (callback) => callback();

  await act(async () => {
    root.render(
      <HelmetProvider>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <StartPage />
        </MemoryRouter>
      </HelmetProvider>,
    );
  });
});

afterEach(async () => {
  await act(async () => root.unmount());
  window.requestAnimationFrame = originalRequestAnimationFrame;
  container.remove();
});

afterAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

test('renders three native keyboard-operable pathway choices', () => {
  const choices = [...container.querySelectorAll('.start-pathway-choice')];

  expect(choices).toHaveLength(3);
  expect(choices.every((choice) => choice.tagName === 'BUTTON')).toBe(true);
  expect(choices.map((choice) => choice.textContent)).toEqual(
    expect.arrayContaining(START_CONTENT.pathways.map(({ name }) => expect.stringContaining(name))),
  );
});

test('reveals the selected pathway and moves focus to its recommendation heading', async () => {
  const peaceChoice = container.querySelector('.start-pathway-choice');
  peaceChoice.focus();

  await act(async () => peaceChoice.click());

  const recommendationHeading = container.querySelector('#start-recommendation-heading');
  expect(recommendationHeading).not.toBeNull();
  expect(document.activeElement).toBe(recommendationHeading);
  expect(container.textContent).toContain(START_CONTENT.pathways[0].primary.title);
  expect(container.textContent).toContain(START_CONTENT.chooseAnother);
});

test('keeps Home, Watch, and Services available before and after selection', async () => {
  const utilityLabels = () =>
    [...container.querySelectorAll('.start-utility-nav a')].map((link) => link.textContent);

  expect(utilityLabels()).toEqual(['Home', 'Watch', 'Services']);

  await act(async () => container.querySelectorAll('.start-pathway-choice')[1].click());

  expect(utilityLabels()).toEqual(['Home', 'Watch', 'Services']);
});
