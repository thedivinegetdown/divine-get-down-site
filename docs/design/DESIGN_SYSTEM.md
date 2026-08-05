# The Divine Get Down Website Design System

## Purpose

This design system supports the current public website. It keeps the interface
peaceful, reverent, cinematic, readable, and recognizably Christ-centered as
the codebase grows. It does not authorize a visual redesign, branding change,
content rewrite, route change, or new product behavior.

The current website remains the visual reference. Shared tokens and primitives
make that reference repeatable; they do not replace brand review.

## Source Files

- `src/styles/tokens.css` is the canonical token foundation.
- `src/styles/primitives.css` owns shared interaction and layout contracts.
- `src/index.css` owns the global reset and document baseline.
- `src/App.css` owns the active homepage and ministry-specific presentation.
- Page and component stylesheets retain intentional local variations.

Load tokens before any stylesheet that consumes them. Load primitives once at
the application entry point. Do not import the shared files again from routed
components.

## Brand Intent

Approved work preserves:

- a peaceful digital-sanctuary feeling
- clear Christ-centered ministry presentation
- the current dark premium background treatment
- warm gold and amber emphasis
- calm, non-manipulative interaction patterns
- readable text and visible keyboard focus
- mobile reflow and reduced-motion behavior

Engagement pressure, artificial urgency, excessive motion, and decorative
effects that compete with ministry content are not part of the system.

## Token Categories

### Color

Use semantic color tokens instead of copying a hex or RGBA value. Primary
categories cover page backgrounds, surfaces, text, accents, borders, focus,
success, warning, and error states. The legacy `--gold`, `--gold-text`,
`--shadow-1`, and related aliases remain available for compatibility while
existing components migrate incrementally.

Do not add a new brand color inside a component stylesheet. A palette change
requires brand review and an Execution Order with visual validation.

### Typography

The system defines the sans-serif and monospace families, shared body and
heading sizes, line heights, weights, and letter spacing. Display treatments
may remain page-specific when they are part of the current cinematic design.
Body copy should use the body or relaxed line-height tokens.

### Spacing

The spacing scale is derived from values already used by the site. Use the
smallest token that matches the established layout. Avoid introducing a new
one-off spacing value when a token expresses the same intent.

### Shape And Elevation

Shape tokens cover controls, cards, surfaces, panels, and pills. Elevation
tokens cover raised surfaces, card treatment, button treatment, glow, and the
focus ring. Large radii are an established brand treatment, not permission to
wrap every section in a card.

### Motion

Use `--duration-fast` for immediate feedback, `--duration-standard` for normal
control transitions, and `--duration-slow` for restrained entrance motion.
Ambient motion remains exceptional and must be bounded. Every new motion must
work with the global reduced-motion contract.

### Layout

Content-width and page-padding tokens define common shells. Breakpoint values
are documented as tokens, but CSS custom properties cannot be used reliably in
media-query conditions. Keep media-query values aligned with the documented
tiers and avoid adding a new tier without a demonstrated layout need.

## Shared Patterns

### Actions And Links

- `.primary-cta` is the established primary action.
- `.secondary-cta` is the quieter companion action.
- `.text-link` is the shared inline navigation link.
- `.funnel-link` remains a compatibility alias for routed funnel pages.

Use one primary action per decision area where practical. Preserve native link
semantics for navigation and downloads; use a button for an in-page action.

### Surfaces And Layout

- `.page-shell` provides the shared full-viewport page baseline.
- `.section-container` provides the standard constrained section width.
- `.card` and `.panel` provide the established elevated surface treatment.
- Existing `.funnel-shell`, `.reset-shell`, `.compliance-card`,
  `.uspto-panel-card`, `.contact-hero-card`, and `.panel-inner` classes are
  supported semantic contracts, not a parallel style system.

Do not nest cards for decoration. Page sections should remain unframed unless
the content needs a repeated, modal, or tool-like surface.

### Forms

The shared contracts are `.form-field`, `.form-label`, `.form-input`,
`.form-textarea`, `.form-select`, and `.helper-text`. Existing contact and
funnel form classes share the same structural and focus behavior while keeping
their current local surface treatment.

Every form control requires a visible label. Required state, helper text,
validation errors, and status messages must remain programmatically connected
to the relevant control. Use `.error-text` and `.success-text` for semantic
status color, never color alone to communicate meaning.

### Loading And Status

Use `.loading-state` for a polite route or component loading message. Loading,
success, and failure states must use an appropriate live region when visitors
need to be notified of an asynchronous change.

## Accessibility Expectations

- Preserve the global `:focus-visible` ring; do not remove outlines.
- Keep keyboard focus order aligned with reading order.
- Maintain at least 48 CSS pixels for important touch controls where the
  existing component contract specifies it.
- Keep text contrast suitable for WCAG 2.2 AA.
- Test reflow, zoom, landscape orientation, and long text before release.
- Preserve semantic links, buttons, headings, labels, landmarks, and status
  messages when applying a visual primitive.

## Reduced Motion

The primitive layer applies the global reduced-motion safeguard and disables
the existing logo and active-tab ambient animations. Framer Motion components
must also continue to consult the user's motion preference so JavaScript-driven
motion can be skipped rather than merely shortened.

Do not add an animation without a reduced-motion result that communicates the
same state. Do not use motion as the only signal for success, focus, or change.

## Examples

```jsx
<a className="primary-cta" href="/stillness-scroll.pdf">
  Open The Stillness Scroll
</a>
```

```jsx
<div className="form-field">
  <label className="form-label" htmlFor="organization">Organization</label>
  <input className="form-input" id="organization" name="organization" />
</div>
```

```css
.ministry-section {
  max-width: var(--content-width-standard);
  padding: var(--space-9);
  color: var(--color-text-primary);
}
```

## Anti-Patterns

- copying brand color literals into new component styles
- suppressing or removing keyboard focus indicators
- creating a second button, card, or form system with near-identical styles
- adding viewport-dependent body typography without a validated need
- using large blur, glow, or animation as decoration without performance review
- changing token values to restyle one isolated component
- broadly renaming established classes during feature work
- using utility classes to replace meaningful component semantics everywhere

## Extending The System

1. Confirm an existing token or primitive cannot express the requirement.
2. Collect at least two real use cases for a new shared contract.
3. Choose a semantic name and preserve backward compatibility.
4. Add focused tests and update this document.
5. Validate keyboard use, contrast, reduced motion, mobile reflow, and the
   production build.

A change to brand colors, typography direction, core interaction behavior,
framework, styling technology, or accessibility target requires architectural
and brand approval through a separate Execution Order. This foundation does
not authorize those changes.
