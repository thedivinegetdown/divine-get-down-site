// src/utils/analytics.js
const ANALYTICS_ENABLED = process.env.REACT_APP_ANALYTICS_ENABLED === 'true';

export const ANALYTICS_EVENTS = Object.freeze({
  PAGE_VIEW: 'page_view',
  WATCH_VIDEO: 'watch_video',
  OPEN_SCROLL: 'open_scroll',
  OPEN_RESET_COMPANION: 'open_reset_companion',
  BEGIN_CHECKOUT: 'begin_checkout',
  CONTACT_CLICK: 'contact_click',
  YOUTUBE_CLICK: 'youtube_click',
});

const ALLOWED_EVENT_NAMES = new Set(Object.values(ANALYTICS_EVENTS));

/**
 * Sends an allowlisted event only when a separately approved adapter exists.
 * This module never loads a provider, writes storage, or sets cookies.
 */
export function trackEvent(eventName, properties = {}) {
  if (!ANALYTICS_ENABLED || typeof window === 'undefined') return false;
  if (!ALLOWED_EVENT_NAMES.has(eventName)) return false;

  const track = window.tdgAnalytics?.track;
  if (typeof track !== 'function') return false;

  try {
    track(eventName, { event_version: 1, ...properties });
    return true;
  } catch {
    return false;
  }
}

export function trackPageView(pathname) {
  if (typeof pathname !== 'string' || !pathname.startsWith('/')) return false;

  return trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, { path: pathname });
}
