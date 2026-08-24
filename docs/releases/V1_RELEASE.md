# The Divine Get Down Website v1.0 Release Record

**Execution Order:** EO-0020

**Validation date:** 2026-08-24

**Release candidate:** `3abef6a8eecbd5ff3e3132be0966028f690a2c0d`

**Canonical production origin:** `https://thedivinegetdown.com`

**Public Ministry v1.0:** Approved with non-blocking follow-up

**Commercial v1.0:** Not approved

## Release Purpose

This release closes the initial public-website engineering program with a
traceable architecture, stable ministry experience, production release gates,
and an explicit distinction between public ministry readiness and commercial
readiness. It adds no ministry functionality and makes no application or design
change.

## Architecture Summary

The released product is a static, client-rendered React application built with
Create React App and React Router. GitHub `main` is the source of truth. Netlify
builds with Node.js 22 using `npm run build`, publishes `build`, serves the CDN,
TLS, redirects, headers, and forms, and retains atomic deploy rollback. YouTube
provides public video delivery. Stripe is currently a public test Payment Link,
not a production commerce or entitlement system. Public and paid access remain
separate architectural concerns under ADR-003 and ADR-005.

The implementation follows the accepted structured-content, route, brand,
privacy, accessibility/performance, deployment, and canonical-domain
decisions. Proposed server-rendered SEO, backend, membership, Creator Studio,
and community-platform architecture remain future work and are not implied by
this release.

## EO-0001 Through EO-0020 History

The architecture baseline was established before the numbered implementation
sequence. The completed sequence then delivered:

| Order | Outcome |
| --- | --- |
| EO-0001 | Corrected the conditional React hook defect that blocked a stable baseline. |
| EO-0002 | Established repository metadata, validation, ownership, and contributor governance. |
| EO-0003 | Stabilized mobile behavior and bounded the reported crash risk. |
| EO-0004 | Completed post-stability frontend cleanup without redesign. |
| EO-0005 | Reduced loading cost through route chunking, lazy media, and restrained prefetching. |
| EO-0006 | Established technical SEO, route metadata, sitemap, robots, canonicals, and structured data. |
| EO-0007 | Strengthened WCAG 2.2 AA-oriented keyboard, focus, form, motion, media, and reflow protections. |
| EO-0008 | Added the disabled-by-default privacy-first analytics foundation. |
| EO-0009 | Hardened the speaking/contact inquiry workflow and Netlify form handling. |
| EO-0010 | Established the production operations, notification, rollback, and recovery runbook. |
| EO-0011 | Added the provider-neutral, privacy-safe browser error-monitoring adapter and ErrorBoundary integration. |
| EO-0012 | Separated public content and metadata from presentation into structured repository modules. |
| EO-0013 | Established the public design tokens and reusable style primitives. |
| EO-0014 | Established the 23-scenario responsive visual and functional regression baseline. |
| EO-0015 | Established and validated the production CSP and browser security-header baseline. |
| EO-0016 | Expanded discoverability of genuine existing ministry content without thin pages or keyword stuffing. |
| EO-0017 | Recorded the Search Console readiness and no-data search baseline without invented metrics. |
| EO-0018 | Reconciled duplicate rendered metadata and documented the remaining CRA initial-response limitation. |
| EO-0019 | Added CI, corrected cache policy, removed public source maps, classified dependencies, and completed recovery hardening. |
| EO-0020 | Performed the final dual release audit, recorded owner actions, and made the v1.0 decisions. |

## Production Architecture

| Concern | v1.0 implementation |
| --- | --- |
| Source and release | GitHub `main`; one validated release commit; annotated release tag after verified deployment |
| CI | Read-only GitHub Actions workflow using Node.js 22, locked install, lint, 68 tests, and production build |
| Hosting | Git-connected Netlify production project; atomic deploys; `main` production branch |
| Build | `npm run build`; `build` publish directory; production source maps disabled |
| Browser security | HTTPS, CSP, HSTS, nosniff, frame denial, strict referrer policy, permissions restrictions, COOP, and CORP |
| Forms | Netlify Forms `contact-inquiry`, honeypot, accessible client states, email recovery path, and configured notification hook |
| Media | Intent-loaded public YouTube player, public Shorts links, direct Reset embed, and two static PDFs |
| Measurement | Privacy-first analytics and error-monitoring adapters disabled by default; no provider transport configured |
| Recovery | Git reconstruction, Netlify rollback, environment restoration, DNS/TLS recovery, and form recovery documented |

## Route Inventory

| Route | Purpose | Index policy |
| --- | --- | --- |
| `/` | Sanctuary homepage with Welcome, Watch, Shorts, Services, Scroll Vault, About, and Contact sections | Index |
| `/stillness` | Free Stillness Scroll landing page | Index |
| `/reset-experience` | Reset Experience description and test checkout CTA | Index; commercial flow not approved |
| `/journey` | Four-week prayer and Scripture journey information | Index |
| `/community` | Christ-centered community information | Index |
| `/vault` | Scroll Vault prayers and Scripture-reflection information | Index |
| `/experience-access` | Public Reset video and companion access | `noindex,follow`; not entitlement-protected |
| `/thank-you` | Contact/journey confirmation and stillness content | `noindex,follow` |
| Unknown path | Custom NotFound experience | `noindex,follow`; host-level response remains a soft HTTP `200` |

The sitemap contains exactly the six indexable routes. Legacy `/scroll`,
`/inner-rhythm`, and `/reset` paths redirect inside the application to their
current destinations.

## Content-Delivery Inventory

- The Stillness Scroll opens from `/stillness`; its deployed file returns
  `application/pdf` and begins with `%PDF-`.
- The Reset Experience page uses a Stripe test Payment Link. The access route
  displays the test state, loads the current YouTube experience, and opens the
  public Reset Companion PDF, which also begins with `%PDF-`.
- The homepage Watch section does not create a YouTube iframe until visitor
  intent. After activation it loads the titled `youtube-nocookie.com` embed.
- Six Scripture-centered Shorts, service information, ministry/about copy,
  contact guidance, Scroll Vault, Journey, and Community information remain
  discoverable through the existing calm navigation model.

## Security Posture

The canonical site uses valid HTTPS and the deployed header contract. Browser
inspection found no CSP, mixed-content, or fatal console error. YouTube and
same-origin Netlify Forms remain compatible. Hashed JavaScript and CSS use
one-year immutable caching; HTML, search files, images, icons, and PDFs
revalidate. A request for the deployed JavaScript map returns the SPA HTML shell
rather than source-map JSON, so production source code maps are not published.
Netlify's release-candidate deploy reports no secret matches across 135 files.

`npm audit` reports 50 affected packages: 2 Critical, 21 High, 17 Moderate, and
10 Low. The Critical `shell-quote` and `websocket-driver` paths are CRA
development-server/build tooling and are not demonstrated executable code in
the deployed browser bundle. Most High findings are also compiler, optimizer,
test, service-worker, or development-server paths. React Router's Moderate
advisories affect runtime packages, but the current routes and redirects use
repository-controlled destinations. No forced fix or broad dependency upgrade
is approved; modernization requires dedicated architecture work.

GitHub's public API shows no repository ruleset. Classic branch protection,
secret scanning, push protection, and Dependabot settings require valid owner
authentication and remain unverified. The candidate CI run succeeded. These
account controls are important follow-up but are not evidence of an active
visitor compromise on the immutable audited deployment.

## Accessibility Posture

The release preserves skip navigation, semantic landmarks, visible focus,
roving keyboard tabs, route focus support, ordered headings, visible form
labels, required fields, accessible status handling, responsive media, reduced
motion, touch-target checks, and narrow reflow. The visual runner checks focus
visibility and obstruction, contact keyboard order, 24-pixel minimum
interactive geometry, 48-pixel form controls, responsive iframes, horizontal
overflow, clipped text, and runtime errors.

This is not a formal WCAG certification. Physical iPhone Safari, private
browsing, Android Chrome, screen-reader combinations, and native 200 percent
zoom/reflow remain owner validation items.

## Performance Posture

The production build compiles successfully. Gzip sizes are unchanged from the
EO-0019 baseline: main JavaScript 64.43 kB, shared vendor JavaScript 34.96 kB,
main CSS 5.82 kB, with route JavaScript chunks from 600 B to 5.54 kB and route
CSS chunks at or below 1.50 kB. Initial compressed application JavaScript stays
within the architecture's practical 200 kB target. Route-level lazy loading,
idle prefetch only on unconstrained connections, lazy Shorts thumbnails,
intent-driven YouTube loading, the logo preload, reduced motion, and responsive
media remain active. No bundle regression was measured.

Field Core Web Vitals and physical-device memory behavior are not available
without approved production measurement and device evidence.

## Visual Regression Posture

Chrome `151.0.7922.173` and Edge `151.0.4129.101` passed all 23 structural and
functional scenarios, including direct refresh, history, rapid tab changes,
orientation, local-only contact success, and both PDFs. Exact comparison was
correctly withheld because the reviewed manifest pins Chrome
`151.0.7922.75`. Manual review found three expected differences from the older
baseline: published Short titles, the featured-video title, and the Stillness
internal related-content link. The other 20 screenshot hashes match.

## SEO Posture

`robots.txt` allows public crawling and points to the canonical sitemap.
`sitemap.xml` parses and lists exactly six `.com` URLs. Each rendered route has
one description, one canonical, correct Open Graph/Twitter identity, and valid
`WebSite` data; the homepage also provides `Organization`, and Watch provides
the verified `VideoObject`. Access, thank-you, and NotFound experiences render
`noindex,follow` and are omitted from the sitemap. Internal links connect
related genuine ministry resources.

Search Console remains an owner action, and no ranking, traffic, search volume,
or performance claim is made. The raw CRA response for deep routes still
contains the homepage fallback until JavaScript renders route metadata. Further
indexable expansion should wait for measured evidence or dedicated ADR-008
work.

## Operational Posture

Netlify recognizes `contact-inquiry`, including the honeypot and expected
fields. Contact-submission and deploy-failure email hooks are configured. Actual
owner inbox receipt was not independently confirmed during EO-0020, and no
unnecessary production submission or intentional failed deploy was created.
The visible ministry email remains the recovery path.

ErrorBoundary and the sanitized monitoring adapter remain present. Monitoring
is disabled by default, has no provider or transport, and showed no unintended
network transmission. The production runbook covers release health, incidents,
rollback, GitHub source recovery, environment restoration, DNS/TLS recovery,
and contact-form recovery.

## Domain Status

| Host | Classification | Evidence |
| --- | --- | --- |
| `thedivinegetdown.com` | Healthy | Valid hostname certificate; HTTPS `200`; canonical production site |
| `www.thedivinegetdown.com` | Healthy | Valid certificate; HTTPS `301` to canonical apex |
| `thedivinegetdown.net` | Warning; non-public for this release | Presents `*.netlify.app` certificate, fails normal TLS validation, and serves the obsolete site when validation is bypassed |
| `www.thedivinegetdown.net` | Warning; non-public for this release | Same invalid hostname certificate; redirects only to broken `.net` apex |

The `.net` state violates the target ADR-013 redirect policy and requires owner
correction. It does not block the explicitly scoped canonical `.com` Public
Ministry release because it is formally excluded as a public release surface.

## Known Limitations and Owner Actions

- Commercial checkout is test-only, and fulfillment is not protected.
- `.net` TLS and canonical redirects are broken and excluded from public v1.0.
- GitHub branch and account security controls require owner authentication.
- Contact and deploy-failure inbox receipt remains to be confirmed.
- Search Console and real search-performance data are unavailable.
- Error and uptime providers are not connected.
- CRA dependency debt, initial deep-route metadata, and soft HTTP 404 behavior
  require scoped future work.
- Physical assistive-technology, Safari/private-browsing, Android, and native
  zoom evidence remains outstanding.

The authoritative action list is [V1_OWNER_ACTIONS.md](V1_OWNER_ACTIONS.md).

## Release Decisions

### Public Ministry v1.0 — APPROVED WITH NON-BLOCKING FOLLOW-UP

Visitors can safely and reliably use the canonical `.com` website for
Christ-centered videos, Shorts, Stillness Scroll, Scroll Vault, Journey,
Community and Services information, About, and Contact. Automated quality,
security, responsive, metadata, PDF, and production-deployment gates pass. The
remaining actions are explicitly bounded and do not conceal a current failure
of the canonical public ministry journey.

### Commercial v1.0 — NOT APPROVED

The Reset CTA is a Stripe test Payment Link. The access route, embedded Reset
video, and companion PDF are public, and no server-verified order or entitlement
protects fulfillment. No real payment was attempted. Commercial approval
requires the owner actions above and a separately validated production
fulfillment decision.

## Rollback

If the documentation release causes an unexpected deployment issue, publish
the last verified Netlify deploy for candidate
`3abef6a8eecbd5ff3e3132be0966028f690a2c0d`, revert the release documentation
commit with a new Git commit, run the complete release gate, and redeploy through
`main`. Do not rewrite published history or move a release tag.
