import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

let container;
let root;
let originalScrollTo;

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
});

beforeEach(async () => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  originalScrollTo = window.scrollTo;
  window.scrollTo = jest.fn();

  await act(async () => {
    root.render(
      <MemoryRouter
        initialEntries={['/start']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ScrollToTop />
        <Routes>
          <Route
            path="/start"
            element={(
              <>
                <Link to="/be-still">Open Be Still</Link>
                <main id="main-content" data-page="start" tabIndex={-1} />
              </>
            )}
          />
          <Route
            path="/be-still"
            element={<main id="main-content" data-page="be-still" tabIndex={-1} />}
          />
        </Routes>
      </MemoryRouter>,
    );
  });
});

afterEach(async () => {
  await act(async () => root.unmount());
  window.scrollTo = originalScrollTo;
  container.remove();
});

afterAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

test('moves focus to the incoming main after a route change', async () => {
  await act(async () => container.querySelector('a').click());
  await act(async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 10));
  });

  expect(document.activeElement).toBe(container.querySelector('[data-page="be-still"]'));
});
