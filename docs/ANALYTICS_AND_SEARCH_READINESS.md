# Analytics and Search Readiness

**Status:** Measurement foundation only

**Canonical domain:** `https://thedivinegetdown.com`

**Governing decision:** ADR-007, Privacy-First Analytics

## Current Analytics Architecture

Analytics is disabled by default. The website does not load an analytics provider, set analytics cookies, write analytics data to browser storage, or make analytics network requests.

`src/utils/analytics.js` defines an allowlisted event contract. When a future, separately approved integration is enabled, it must provide an adapter function at `window.tdgAnalytics.track(eventName, properties)`. Adapter errors are isolated from the website experience.

The only instrumented event is `page_view`. It receives the route pathname only. Hashes, query strings, form values, email addresses, prayer requests, payment details, and other free text are excluded.

Provider selection, consent behavior, lawful-basis review, production activation, and dashboards require a separate Execution Order. Introducing a new analytics provider also requires the architecture review specified by the Enterprise Architecture.

## Environment Contract

| Variable | Default | Purpose |
| --- | --- | --- |
| `REACT_APP_ANALYTICS_ENABLED` | `false` | Allows the approved adapter to receive allowlisted events. It does not load an adapter. |
| `REACT_APP_GOOGLE_SITE_VERIFICATION` | empty | Conditionally renders Google's site-verification meta tag. |
| `REACT_APP_BING_SITE_VERIFICATION` | empty | Conditionally renders Bing's `msvalidate.01` meta tag. |

These are build-time public values, not secrets. Keep provider credentials and private keys out of all `REACT_APP_*` variables because Create React App exposes them in the browser bundle.

## Event Rules

- Use lowercase `snake_case` names.
- Record an action and object without sensitive content.
- Include `event_version: 1` automatically.
- Use stable identifiers, not titles or free text, where an identifier is needed.
- Never include names, email addresses, form entries, prayer content, payment data, URL query strings, or persistent cross-site identifiers.
- The accountable owner is The Divine Get Down product owner.
- Raw event retention is limited to 12 months unless a shorter approved provider setting is available.
- No event may be activated until privacy review documents the applicable lawful basis and consent requirements for the deployment regions.

## Event Taxonomy

| Event | Purpose | Required properties | Collection status |
| --- | --- | --- | --- |
| `page_view` | Measure use of stable public routes. | `path` | Instrumented; disabled until an adapter is approved and enabled. |
| `watch_video` | Measure intentional playback of public video. | `video_id`, `location` | Documented only. |
| `open_scroll` | Measure opening the free Stillness Scroll. | `asset_id`, `location` | Documented only. |
| `open_reset_companion` | Measure opening the Reset Companion. | `asset_id`, `location` | Documented only. |
| `begin_checkout` | Measure intentional departure to checkout. | `product_id`, `location` | Documented only. |
| `contact_click` | Measure use of a contact action. | `method`, `location` | Documented only. |
| `youtube_click` | Measure intentional departure to the public YouTube channel. | `destination`, `location` | Documented only. |

`watch_video`, the two document-open events, and `begin_checkout` are website-specific names corresponding to the Enterprise Architecture's broader `media_start`, `download_requested`, and `checkout_started` concepts. A future cross-product taxonomy must map these once and must not emit duplicate aliases.

## Search Readiness

The repository currently provides:

- canonical URLs using `https://thedivinegetdown.com`
- route-level titles, descriptions, Open Graph tags, and Twitter card tags
- WebSite, Organization, and conditional VideoObject structured data
- `public/robots.txt` with the production sitemap location
- `public/sitemap.xml` containing the six indexable public routes
- `noindex,follow` metadata for thank-you, access, and not-found experiences
- optional Google Search Console and Bing Webmaster Tools meta-verification hooks

### Connection Procedure

1. Create the property in Google Search Console or Bing Webmaster Tools.
2. Prefer domain-level DNS verification when domain administration is available.
3. If meta verification is required, set the appropriate Netlify environment variable without committing the token.
4. Deploy and confirm the verification tag is present on the production homepage.
5. Submit `https://thedivinegetdown.com/sitemap.xml` to each service.
6. Inspect representative routes and record crawl or indexing errors before changing SEO behavior.

## Known Limitations

- Route-specific metadata is client-rendered under Create React App. ADR-008 remains proposed for future server-rendered or statically generated indexable content.
- Major homepage tab content still uses hash state pending the route-based navigation roadmap phase.
- Search Console and Bing ownership, sitemap submission, and production crawl inspection require external account access and are not completed by this repository change.
- No analytics provider, consent system, dashboard, or production event QA is included in this foundation.
