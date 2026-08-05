// src/components/ScrollToTop.jsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures navigation feels crisp:
 * - scrolls to top on route changes
 * - supports deep links (#section) by scrolling to the element id
 * (Tabs are handled separately inside Home.)
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const routeChanged = previousPathname.current !== pathname;
    previousPathname.current = pathname;

    if (!routeChanged || typeof document === 'undefined') return undefined;

    let observer;
    const focusMain = () => {
      const main = document.getElementById('main-content');
      if (!main) return false;

      try {
        main.focus({ preventScroll: true });
      } catch {
        main.focus();
      }

      return true;
    };

    if (focusMain()) return undefined;

    const root = document.getElementById('root');
    if (!root || typeof MutationObserver === 'undefined') return undefined;

    observer = new MutationObserver(() => {
      if (focusMain()) observer.disconnect();
    });
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If we have a hash, try to scroll to that element (deep link support).
    if (hash) {
      const id = hash.replace('#', '');
      const el = typeof document !== 'undefined' ? document.getElementById(id) : null;
      if (el) {
        // Avoid layout shift: wait a tick for route content to mount.
        const t = setTimeout(() => {
          el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }, 0);
        return () => clearTimeout(t);
      }
    }

    // Default: top of page
    if (reduceMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    return undefined;
  }, [pathname, hash]);

  return null;
}
