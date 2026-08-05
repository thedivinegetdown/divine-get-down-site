const ORIGINAL_ENV = {
  enabled: process.env.REACT_APP_ERROR_MONITORING_ENABLED,
  release: process.env.REACT_APP_RELEASE,
};
const ORIGINAL_FETCH = window.fetch;

let cleanupMonitoring;

function setEnvironmentVariable(name, value) {
  if (typeof value === 'undefined') {
    delete process.env[name];
    return;
  }

  Object.defineProperty(process.env, name, {
    configurable: true,
    enumerable: true,
    value,
    writable: true,
  });
}

function loadMonitoring({ enabled = 'true', release = 'release-123' } = {}) {
  setEnvironmentVariable('REACT_APP_ERROR_MONITORING_ENABLED', enabled);
  setEnvironmentVariable('REACT_APP_RELEASE', release);
  jest.resetModules();
  return require('./errorMonitoring');
}

afterEach(() => {
  if (cleanupMonitoring) cleanupMonitoring();
  cleanupMonitoring = null;
  jest.restoreAllMocks();
  window.fetch = ORIGINAL_FETCH;
  window.history.replaceState({}, '', '/');
  setEnvironmentVariable('REACT_APP_ERROR_MONITORING_ENABLED', ORIGINAL_ENV.enabled);
  setEnvironmentVariable('REACT_APP_RELEASE', ORIGINAL_ENV.release);
  jest.resetModules();
});

test('stays inactive and makes no network request without production configuration', () => {
  const addEventListener = jest.spyOn(window, 'addEventListener');
  const fetchSpy = jest.fn();
  window.fetch = fetchSpy;
  const xhrOpen = jest.spyOn(XMLHttpRequest.prototype, 'open');
  const transport = jest.fn();
  const monitoring = loadMonitoring({ enabled: 'false' });

  cleanupMonitoring = monitoring.initErrorMonitoring({ transport });

  expect(monitoring.captureError(new Error('disabled'))).toBe(false);
  expect(monitoring.captureMessage('disabled')).toBe(false);
  expect(addEventListener).not.toHaveBeenCalledWith('error', expect.any(Function));
  expect(addEventListener).not.toHaveBeenCalledWith('unhandledrejection', expect.any(Function));
  expect(transport).not.toHaveBeenCalled();
  expect(fetchSpy).not.toHaveBeenCalled();
  expect(xhrOpen).not.toHaveBeenCalled();
});

test('does not activate outside production even when the flag is true', () => {
  const addEventListener = jest.spyOn(window, 'addEventListener');
  const monitoring = loadMonitoring({ enabled: 'true' });

  cleanupMonitoring = monitoring.initErrorMonitoring({ transport: jest.fn() });

  expect(addEventListener).not.toHaveBeenCalledWith('error', expect.any(Function));
  expect(monitoring.captureError(new Error('development'))).toBe(false);
});

test('delivers only allowlisted and sanitized technical context', () => {
  window.history.replaceState({}, '', '/community?email=person@example.com#prayer');
  const transport = jest.fn();
  const monitoring = loadMonitoring();
  cleanupMonitoring = monitoring.initErrorMonitoring({
    transport,
    __testOnlyEnable: true,
    __testOnlyRelease: 'release-123',
  });

  const error = new TypeError(
    'Request failed for person@example.com at https://example.com/path?email=person@example.com#contact password=private-value token=private-token 4111 1111 1111 1111',
  );
  error.stack = `${error.name}: ${error.message}\n    at https://example.com/app.js?token=private-token#frame:1:1`;

  expect(
    monitoring.captureError(error, {
      source: 'react_error_boundary',
      componentStack: 'at Contact (https://example.com/app.js?email=person@example.com#contact:2:2)',
      referenceId: 'reference-123',
      formValues: { message: 'private prayer request' },
      email: 'person@example.com',
    }),
  ).toBe(true);

  const payload = transport.mock.calls[0][0];
  const serialized = JSON.stringify(payload);

  expect(payload.kind).toBe('error');
  expect(payload.context.pathname).toBe('/community');
  expect(payload.context.release).toBe('release-123');
  expect(payload.context.referenceId).toBe('reference-123');
  expect(payload.context.viewport).toEqual({
    width: expect.any(Number),
    height: expect.any(Number),
  });
  expect(payload.context.userAgent).toEqual(expect.any(String));
  expect(payload.context).not.toHaveProperty('formValues');
  expect(payload.context).not.toHaveProperty('email');
  expect(serialized).not.toContain('person@example.com');
  expect(serialized).not.toContain('private-value');
  expect(serialized).not.toContain('private-token');
  expect(serialized).not.toContain('4111 1111 1111 1111');
  expect(serialized).not.toContain('?email=');
  expect(serialized).not.toContain('#contact');
  expect(serialized).not.toContain('private prayer request');

  expect(
    monitoring.captureMessage('Failure for person@example.com at /contact?token=private-token#message', {
      source: 'manual',
    }),
  ).toBe(true);
  expect(JSON.stringify(transport.mock.calls[1][0])).not.toContain('person@example.com');
  expect(JSON.stringify(transport.mock.calls[1][0])).not.toContain('private-token');
});

test('captures global errors and rejections once without suppressing browser behavior', () => {
  const listeners = {};
  const addEventListener = jest
    .spyOn(window, 'addEventListener')
    .mockImplementation((eventName, listener) => {
      listeners[eventName] = listener;
    });
  const removeEventListener = jest.spyOn(window, 'removeEventListener').mockImplementation(() => {});
  const transport = jest.fn();
  const monitoring = loadMonitoring();

  cleanupMonitoring = monitoring.initErrorMonitoring({ transport, __testOnlyEnable: true });

  expect(addEventListener).toHaveBeenCalledWith('error', expect.any(Function));
  expect(addEventListener).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));

  const repeatedError = new Error('Repeated technical failure');
  listeners.error({ error: repeatedError, message: repeatedError.message });
  listeners.error({ error: repeatedError, message: repeatedError.message });

  const preventDefault = jest.fn();
  listeners.unhandledrejection({
    reason: { email: 'private@example.com', message: 'private prayer request' },
    preventDefault,
  });

  expect(transport).toHaveBeenCalledTimes(2);
  expect(transport.mock.calls[0][0].context.source).toBe('window_error');
  expect(transport.mock.calls[1][0].context.source).toBe('unhandled_rejection');
  expect(transport.mock.calls[1][0].error.message).toBe('Unhandled promise rejection');
  expect(JSON.stringify(transport.mock.calls[1][0])).not.toContain('private@example.com');
  expect(JSON.stringify(transport.mock.calls[1][0])).not.toContain('private prayer request');
  expect(preventDefault).not.toHaveBeenCalled();

  cleanupMonitoring();
  cleanupMonitoring = null;
  expect(removeEventListener).toHaveBeenCalledWith('error', listeners.error);
  expect(removeEventListener).toHaveBeenCalledWith('unhandledrejection', listeners.unhandledrejection);
});
