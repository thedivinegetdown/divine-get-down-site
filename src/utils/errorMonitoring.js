// src/utils/errorMonitoring.js
const MONITORING_ENABLED =
  process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_ERROR_MONITORING_ENABLED === 'true';

const RELEASE = sanitizeIdentifier(process.env.REACT_APP_RELEASE, 120);
const DUPLICATE_WINDOW_MS = 2000;
const MAX_RECENT_FINGERPRINTS = 50;
const NOOP = () => {};
const ALLOWED_SOURCES = new Set([
  'manual',
  'react_error_boundary',
  'unhandled_rejection',
  'window_error',
]);

let monitoringActive = false;
let activeTransport = null;
let activeRelease = RELEASE;
let teardownMonitoring = NOOP;
let capturedErrorObjects = new WeakSet();
const recentFingerprints = new Map();

function sanitizeIdentifier(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, maxLength);
}

function stripUrlDetails(value) {
  return value.replace(/https?:\/\/[^\s)"'<>]+/gi, (candidate) => {
    try {
      const parsed = new URL(candidate);
      return `${parsed.origin}${parsed.pathname}`;
    } catch {
      return '[redacted-url]';
    }
  });
}

function sanitizeText(value, maxLength) {
  if (typeof value !== 'string') return '';

  let sanitized = stripUrlDetails(value);

  sanitized = sanitized
    .replace(/\bBearer\s+[a-zA-Z0-9._~-]+/gi, 'Bearer [redacted]')
    .replace(/\b(?:sk|pk)_(?:live|test)_[a-zA-Z0-9_-]+\b/g, '[redacted-key]')
    .replace(/\beyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b/g, '[redacted-token]')
    .replace(/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+/g, '[redacted-email]')
    .replace(/\b(?:\d[ -]*?){12,19}\b/g, '[redacted-number]')
    .replace(
      /\b(password|passwd|token|secret|authorization|cookie|email|name|message|prayer(?:[_ -]?request)?|form(?:[_ -]?(?:data|values?))?)\s*[:=]\s*(?:"[^"]*"|'[^']*'|[^\s,;]+)/gi,
      '$1=[redacted]',
    )
    .replace(/([?&][^=\s&#]+)=([^&#\s]*)/g, '$1=[redacted]')
    .replace(/#[a-zA-Z0-9._~!$&'()*+,;=:@/?%-]+/g, '#[redacted]');

  const trimmed = sanitized.trim();
  return trimmed.length > maxLength ? `${trimmed.slice(0, maxLength)}...` : trimmed;
}

function sanitizePathname(pathname) {
  if (typeof pathname !== 'string' || !pathname.startsWith('/')) return '/';

  try {
    return sanitizeText(decodeURIComponent(pathname), 500) || '/';
  } catch {
    return sanitizeText(pathname, 500) || '/';
  }
}

function getTechnicalContext(context = {}) {
  const safeContext = context && typeof context === 'object' ? context : {};
  const source = ALLOWED_SOURCES.has(safeContext.source) ? safeContext.source : 'manual';
  const technicalContext = { source };

  if (typeof window !== 'undefined') {
    technicalContext.pathname = sanitizePathname(window.location?.pathname);
    technicalContext.userAgent = sanitizeText(window.navigator?.userAgent || '', 500);
    technicalContext.viewport = {
      width: Number.isFinite(window.innerWidth) ? Math.max(0, Math.round(window.innerWidth)) : null,
      height: Number.isFinite(window.innerHeight) ? Math.max(0, Math.round(window.innerHeight)) : null,
    };
  }

  if (activeRelease) technicalContext.release = activeRelease;

  const componentStack = sanitizeText(safeContext.componentStack, 3000);
  if (componentStack) technicalContext.componentStack = componentStack;

  const referenceId = sanitizeIdentifier(safeContext.referenceId, 64);
  if (referenceId) technicalContext.referenceId = referenceId;

  return technicalContext;
}

function normalizeError(error) {
  if (error instanceof Error) {
    return {
      name: sanitizeIdentifier(error.name, 80) || 'Error',
      message: sanitizeText(error.message, 500) || 'Error details unavailable',
      stack: sanitizeText(error.stack, 6000),
    };
  }

  if (typeof error === 'string') {
    return {
      name: 'Error',
      message: sanitizeText(error, 500) || 'Error details unavailable',
      stack: '',
    };
  }

  return {
    name: 'Error',
    message: 'Non-Error exception',
    stack: '',
  };
}

function isDuplicate(originalError, fingerprint) {
  if (originalError instanceof Error) {
    if (capturedErrorObjects.has(originalError)) return true;
    capturedErrorObjects.add(originalError);
  }

  const now = Date.now();
  const lastCapturedAt = recentFingerprints.get(fingerprint);
  recentFingerprints.set(fingerprint, now);

  if (recentFingerprints.size > MAX_RECENT_FINGERPRINTS) {
    const oldestFingerprint = recentFingerprints.keys().next().value;
    recentFingerprints.delete(oldestFingerprint);
  }

  return typeof lastCapturedAt === 'number' && now - lastCapturedAt < DUPLICATE_WINDOW_MS;
}

function deliver(payload) {
  if (!monitoringActive || typeof activeTransport !== 'function') return false;

  try {
    const result = activeTransport(payload);
    if (result && typeof result.catch === 'function') result.catch(NOOP);
    return true;
  } catch {
    return false;
  }
}

export function captureError(error, context = {}) {
  if (!monitoringActive || typeof activeTransport !== 'function') return false;

  const normalizedError = normalizeError(error);
  const technicalContext = getTechnicalContext(context);
  const fingerprint = [
    normalizedError.name,
    normalizedError.message,
    normalizedError.stack,
    technicalContext.source,
    technicalContext.pathname,
  ].join('|');

  if (isDuplicate(error, fingerprint)) return false;

  return deliver({
    eventVersion: 1,
    kind: 'error',
    occurredAt: new Date().toISOString(),
    error: normalizedError,
    context: technicalContext,
  });
}

export function captureMessage(message, context = {}) {
  if (!monitoringActive || typeof activeTransport !== 'function') return false;

  const sanitizedMessage = sanitizeText(message, 500);
  if (!sanitizedMessage) return false;

  const technicalContext = getTechnicalContext(context);
  const fingerprint = ['message', sanitizedMessage, technicalContext.source, technicalContext.pathname].join('|');

  if (isDuplicate(null, fingerprint)) return false;

  return deliver({
    eventVersion: 1,
    kind: 'message',
    occurredAt: new Date().toISOString(),
    message: sanitizedMessage,
    context: technicalContext,
  });
}

export function initErrorMonitoring(options = {}) {
  // CRA replaces this condition at build time, so the test hook is absent from production.
  const testOnlyEnabled = process.env.NODE_ENV === 'test' && options.__testOnlyEnable === true;

  if (
    (!MONITORING_ENABLED && !testOnlyEnabled) ||
    typeof window === 'undefined' ||
    typeof window.addEventListener !== 'function'
  ) {
    return NOOP;
  }

  if (testOnlyEnabled) {
    activeRelease = sanitizeIdentifier(options.__testOnlyRelease, 120);
  }

  const nextTransport = typeof options.transport === 'function' ? options.transport : null;

  if (monitoringActive) {
    if (nextTransport) activeTransport = nextTransport;
    return teardownMonitoring;
  }

  activeTransport = nextTransport;

  const handleWindowError = (event) => {
    if (!(event?.error instanceof Error) && typeof event?.message !== 'string') return;

    const error = event.error instanceof Error
      ? event.error
      : new Error(event.message || 'Uncaught browser error');

    captureError(error, { source: 'window_error' });
  };

  const handleUnhandledRejection = (event) => {
    const reason = event?.reason;
    const error = reason instanceof Error
      ? reason
      : typeof reason === 'string'
        ? new Error(reason)
        : new Error('Unhandled promise rejection');

    captureError(error, { source: 'unhandled_rejection' });
  };

  window.addEventListener('error', handleWindowError);
  window.addEventListener('unhandledrejection', handleUnhandledRejection);
  monitoringActive = true;

  teardownMonitoring = () => {
    if (!monitoringActive) return;

    window.removeEventListener('error', handleWindowError);
    window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    monitoringActive = false;
    activeTransport = null;
    activeRelease = RELEASE;
    capturedErrorObjects = new WeakSet();
    recentFingerprints.clear();
    teardownMonitoring = NOOP;
  };

  return teardownMonitoring;
}
