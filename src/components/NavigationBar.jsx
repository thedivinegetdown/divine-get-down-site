// src/components/NavigationBar.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * NavigationBar
 * - Horizontal, momentum-feel scrolling
 * - Accessible tablist (ARIA), roving tabindex
 * - Keyboard: ArrowLeft/Right, Home/End, Enter/Space to activate
 * - Pointer drag-to-scroll (desktop + touch)
 * - Auto-centers the active tab when it changes
 */
export default function NavigationBar({ tabs, activeTab, onTabChange, ariaProps = {} }) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const drag = useRef({
    startX: 0,
    scrollLeft: 0,
    dragged: false,
    pointerId: null,
  });

  // Ensure valid active tab (especially after tab list changes)
  useEffect(() => {
    if (!tabs?.length) return;
    const exists = tabs.some((t) => t.id === activeTab);
    if (!exists) onTabChange(tabs[0].id);
  }, [tabs, activeTab, onTabChange]);

  // Center active tab on change
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const btn = container.querySelector(`[data-tab-id="${activeTab}"]`);
    if (!btn) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    centerChild(container, btn, prefersReducedMotion);
  }, [activeTab]);

  // Smooth wheel -> horizontal scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        const prefersReducedMotion =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        el.scrollBy({
          left: e.deltaY,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Pointer drag (mouse + touch)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onPointerDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      // If the user is clicking a tab button, don't start drag.
      // This prevents pointer-capture from interfering with normal click activation.
      if (e.target && e.target.closest && e.target.closest('button[role="tab"]')) return;

      setIsDragging(true);
      drag.current.pointerId = e.pointerId;
      drag.current.startX = e.clientX;
      drag.current.scrollLeft = el.scrollLeft;
      drag.current.dragged = false;

      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      el.classList.add('dragging');
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      if (drag.current.pointerId !== null && e.pointerId !== drag.current.pointerId) return;

      const walk = (e.clientX - drag.current.startX) * 1.2;
      if (Math.abs(walk) > 2) drag.current.dragged = true;
      el.scrollLeft = drag.current.scrollLeft - walk;
    };

    const endDrag = () => {
      setIsDragging(false);
      el.classList.remove('dragging');

      if (drag.current.dragged) {
        el.classList.add('no-click');
        setTimeout(() => el.classList.remove('no-click'), 140);
      }

      drag.current.pointerId = null;
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
    el.addEventListener('lostpointercapture', endDrag);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', endDrag);
      el.removeEventListener('pointercancel', endDrag);
      el.removeEventListener('lostpointercapture', endDrag);
    };
  }, [isDragging]);

  const onKeyDown = (e, idx) => {
    const last = tabs.length - 1;

    switch (e.key) {
      case 'ArrowRight':
      case 'Right': {
        e.preventDefault();
        const next = idx >= last ? 0 : idx + 1;
        focusByIndex(next);
        break;
      }
      case 'ArrowLeft':
      case 'Left': {
        e.preventDefault();
        const prev = idx <= 0 ? last : idx - 1;
        focusByIndex(prev);
        break;
      }
      case 'Home':
        e.preventDefault();
        focusByIndex(0);
        break;
      case 'End':
        e.preventDefault();
        focusByIndex(last);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        activateByIndex(idx);
        break;
      default:
        break;
    }
  };

  const focusByIndex = (i) => {
    const container = containerRef.current;
    if (!container) return;

    const btns = container.querySelectorAll('[role="tab"]');
    const btn = btns[i];
    if (!btn) return;

    btn.focus();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    centerChild(container, btn, prefersReducedMotion);
  };

  const activateByIndex = (i) => {
    const id = tabs[i]?.id;
    if (id && id !== activeTab) onTabChange(id);
  };

  const onClickTab = (id) => {
    if (drag.current.dragged) return;
    if (id !== activeTab) onTabChange(id);
  };

  return (
    <div
      ref={containerRef}
      className="navbar-container"
      role="tablist"
      aria-label="Site sections"
      {...ariaProps}
    >
      <div className="navbar">
        {tabs.map((t, i) => {
          const selected = t.id === activeTab;
          return (
            <button
              key={t.id}
              type="button"
              className={`tab-button${selected ? ' is-active' : ''}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              id={`tab-${t.id}`}
              tabIndex={selected ? 0 : -1}
              data-tab-id={t.id}
              onKeyDown={(e) => onKeyDown(e, i)}
              onClick={() => onClickTab(t.id)}
            >
              <span className="tab-label">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

NavigationBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  ariaProps: PropTypes.object,
};

function centerChild(container, child, prefersReducedMotion = false) {
  const cRect = container.getBoundingClientRect();
  const bRect = child.getBoundingClientRect();
  const offset = (bRect.left + bRect.width / 2) - (cRect.left + cRect.width / 2);

  container.scrollBy({
    left: offset,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
}
