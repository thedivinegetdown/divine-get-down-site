// src/utils/analytics.js
/**
 * Optional analytics loader.
 *
 * Usage:
 * - Set REACT_APP_ANALYTICS_PROVIDER=plausible
 * - Set REACT_APP_ANALYTICS_DOMAIN=yourdomain.com
 * This keeps the app privacy-friendly by default (no analytics unless enabled).
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  const provider = (process.env.REACT_APP_ANALYTICS_PROVIDER || '').toLowerCase();
  if (!provider) return;

  if (provider === 'plausible') {
    const domain = process.env.REACT_APP_ANALYTICS_DOMAIN;
    if (!domain) return;

    // Prevent duplicate injection
    if (document.querySelector('script[data-analytics="plausible"]')) return;

    const s = document.createElement('script');
    s.defer = true;
    s.setAttribute('data-domain', domain);
    s.setAttribute('data-analytics', 'plausible');
    s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
  }
}

export function trackPageview() {
  // Plausible exposes window.plausible
  if (typeof window === 'undefined') return;
  const fn = window.plausible;
  if (typeof fn === 'function') {
    fn('pageview');
  }
}
