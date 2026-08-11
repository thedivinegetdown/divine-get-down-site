# Production v1 Audit and Continuation Roadmap

**Audit date:** 2026-08-11
**Repository baseline:** `main` at `46b7848`
**Canonical site:** `https://thedivinegetdown.com`

## Executive Assessment

The Divine Get Down is a functioning, polished static React ministry website
deployed from GitHub `main` to Netlify. Public content, responsive layouts,
YouTube presentation, free PDF delivery, contact handling, route metadata,
security headers, error boundaries, and the production build are in good shape.

It is not yet production-ready as a paid digital-product platform. The current
Reset Experience uses a Stripe test-mode Payment Link, while the access route,
experience video identifier, and Reset Companion PDF are publicly reachable.
There is no order, webhook, entitlement, identity, or protected asset-delivery
system. A payment redirect therefore does not grant or verify access.

The highest operational repository defect is the absence of automated CI and
protected-main enforcement. The highest product/security defect is public paid
fulfillment. The aging Create React App toolchain is the largest technical-debt
and dependency-security risk.

## Architecture Discovered

| Area | Current implementation | Assessment |
| --- | --- | --- |
| Frontend | React 18, Create React App, React Router 6, React Helmet Async, Framer Motion | Working; CRA is aging technical debt |
| Hosting | GitHub `main` to Netlify, `build/` publish output | Working; no staging environment evidenced |
| Routing | React routes plus homepage hash tabs | Working but mixed architecture limits crawlability and history semantics |
| Payments | Public `REACT_APP_RESET_EXPERIENCE_CHECKOUT_URL` Stripe Payment Link | Deployed link is Stripe test mode; no server checkout |
| Paid access | Public `/experience-access`, public YouTube embed, public `/reset-companion.pdf` | Broken security model; no entitlement verification |
| Media | Lazy YouTube embed, external Shorts links, one direct access iframe | Public media works; premium media is not protected |
| Downloads | Static Netlify PDFs under `public/` | Free scroll works; paid companion is public |
| Forms | Client-enhanced `contact-inquiry` plus Netlify form shell; three simpler interest forms | Contact is robust; interest forms are lead capture, not commerce |
| Content | Structured JavaScript content modules rendered by React | Good separation for current scale; no CMS/backend lifecycle |
| Analytics | Privacy-safe allowlist and disabled adapter contract | Safe foundation; no active provider or production reporting |
| Monitoring | Error boundary and disabled privacy-safe transport contract | Safe foundation; no active provider or uptime monitoring |
| SEO | Helmet metadata, canonicals, social tags, JSON-LD, sitemap, robots | Good SPA baseline; metadata is client-rendered and hash tabs are weak landing pages |
| Security | Netlify CSP and browser headers, no browser secrets required | Strong static baseline; paid content and dependencies remain material risks |
| Tests | 62 unit/rendering tests and 23-scenario visual/browser harness | Strong local baseline; CI absent at audit start |

## What Works

- Canonical `.com` homepage and all documented public routes return HTTP 200.
- Direct refresh and SPA navigation work through Netlify fallback routing.
- Home tabs cover Welcome, Experience, Watch, Shorts, Services, Scroll Vault,
  About, and Contact.
- The Reset Experience landing page renders and its CTAs resolve directly to a
  Stripe-hosted test Payment Link.
- Watch uses an intent-loaded YouTube component; Shorts use lazy thumbnails and
  external YouTube destinations.
- `/stillness-scroll.pdf` and `/reset-companion.pdf` return `application/pdf`.
- The enhanced contact form provides client validation, submitting, success,
  and error states and has matching Netlify discovery markup.
- Route loading, error-boundary, 404 UI, reduced motion, responsive layout, and
  focus treatments have automated or visual coverage.
- Live CSP, `X-Frame-Options: DENY`, no-sniff, referrer, permissions, opener,
  and resource policies are present.
- `robots.txt`, `sitemap.xml`, favicon, manifest, canonical tags, social cards,
  and structured data exist.
- Lint passes, 5 suites / 62 tests pass, and the optimized build completes.

## Partial or Unfinished Areas

- Reset Experience checkout is configured but remains test mode.
- `/experience-access` says `THIS IS LIVE TEST`, has minimal inline styling,
  lacks navigation/recovery guidance, and is not tied to payment state.
- Journey, Community, and Vault are interest-capture funnels rather than
  implemented products, memberships, or paid offerings.
- Analytics and error monitoring define contracts but have no approved provider.
- The sitemap includes six indexable routes but homepage hash-tab destinations
  cannot provide server-visible standalone documents.
- Visual regression has reviewed Windows baselines, but exact pixel comparison
  is pinned to a Chrome patch version and is not portable to hosted CI.
- Source cannot confirm Netlify notifications, registrar renewal, Search
  Console, form inbox delivery, or rollback rehearsal.

## Broken or High-Risk Behavior

1. **Paid access is public.** Direct navigation bypasses checkout, and the Reset
   Companion is a permanent public asset. Client-side route checks cannot fix it.
2. **No verified fulfillment.** There are no Checkout Sessions, signed webhooks,
   idempotent orders, entitlements, refunds/revocations, or revisit identity.
3. **Test checkout is on the live canonical site.** No charge was initiated
   during this audit, but the live CTA is not a production sale path.
4. **Unknown routes are soft 404s.** Netlify returns HTTP 200 and React renders a
   not-found page, which can confuse crawlers and monitoring.
5. **No CI or protected-main evidence at audit start.** Local validation can be
   bypassed before Netlify deploys `main`.
6. **Dependency advisories.** `npm audit` reports 50 findings: 2 critical, 21
   high, 17 moderate, and 10 low. Most are transitive build/development paths
   under `react-scripts`; React Router is a direct moderate finding whose npm
   suggested remediation is a semver-major upgrade.

## Checkout and Reset Experience Assessment

| Step | Status | Evidence |
| --- | --- | --- |
| Landing page | Working | `/reset-experience` renders the $17 offer |
| CTA to checkout | Working in test mode | Live href is `buy.stripe.com/test_...` |
| Successful payment | Not tested | Production charges prohibited; no safe local webhook harness exists |
| Payment verification | Missing | No server or Netlify Function exists |
| Access grant | Broken | Public route, independent of payment |
| Companion access | Broken | Public static PDF |
| Refresh/revisit | Publicly available | Works for everyone, not verified purchasers |
| Failure/cancel | Undocumented | No application cancel/failure route or recovery state |
| Duplicate session | Not controlled | Payment Link/provider behavior only; no order idempotency |
| Refund/revocation | Missing | No order or entitlement state |

The historical `/reset-experience#checkout` issue is not reproducible in the
current primary CTA flow because both CTAs use the configured Payment Link
directly. The `#checkout` section still exists for deep links, but it is not the
mechanism granting access.

## SEO and Discoverability

Production-ready elements include canonical URLs, per-route titles and
descriptions, Open Graph/Twitter tags, Organization/WebSite data, conditional
VideoObject data, robots, sitemap, and noindex metadata for access, thank-you,
and not-found UI.

Remaining risks are client-only metadata, soft 404 responses, hash-tab canonical
URLs, a generic logo image on many social cards, a static placeholder video
upload date, and no repository-verifiable Search Console/Bing ownership.

## Accessibility and Responsive State

The code includes a skip link, semantic headings, labelled forms, keyboard tab
navigation, roving tab focus, route focus management, visible focus styles,
reduced-motion handling, alt text, live status messaging, and an error alert.
The browser harness exercises 320-1440 pixel widths, landscape, tablet,
orientation changes, keyboard form focus, rapid tabs, and direct refresh.

Automated functional checks passed. Formal WCAG 2.2 AA sign-off still requires
portable axe coverage plus manual screen-reader, zoom/reflow, contrast, and
media-alternative testing. Video captions/transcripts are not represented in
the repository.

## Performance State

- Main JavaScript is 64.5 kB gzip; the shared vendor chunk is 35.01 kB gzip.
- Routes are lazy-loaded, images declare dimensions, Shorts are lazy-loaded,
  the public YouTube player is intent-loaded, and constrained connections skip
  idle route prefetching.
- Static hashed assets use immutable one-year caching and HTML stays fresh.

Remaining risks include homepage animation/observer complexity on low-end
devices, eager idle prefetch, the direct YouTube iframe on the access page,
unoptimized PDFs, and no enforced Core Web Vitals or bundle budgets.

## Security and Privacy State

No secret key is present in the inspected source or required browser contract.
All `REACT_APP_*` values are correctly documented as public. Contact fields are
bounded, honeypot-protected, and excluded from analytics/error contracts.

Material risks are public paid assets, test/live ambiguity, missing server
verification, missing active monitoring, dependency advisories, CSP allowance
of inline scripts/styles, and external GitHub/Netlify security settings that
cannot be proven from source. No production form submission, checkout, or
Stripe charge was performed.

## Technical Debt and Dead Code

- Create React App / `react-scripts` is the primary dependency and security-debt
  concentration.
- Homepage navigation mixes tab semantics, hashes, imperative location changes,
  and React routes.
- `DivineGetDownTabs`, `VoiceTest`, `DebugCanvas`, `AudioVisualizer`,
  `PrayerBook`, and `SpiritualMovementAI` appear outside the active App import
  graph and require confirmation before scoped removal.
- Funnel pages duplicate structure and inline styles.
- Access-page content and styling are below the current design-system baseline.
- There is no TypeScript or static typecheck gate.

## Prioritized Continuation Roadmap

### P0 — Release safety

Add pull-request CI for locked install, lint, tests, build, functional browser
journeys, and whitespace checks. Then require the successful check on protected
`main`. EO-2026-001 implements the repository portion; branch protection is an
external owner action.

### P0 — Paid-product architecture and safe fulfillment

Issue a dedicated architecture/owner decision covering buyer identity and
revisit behavior, Stripe product/price ownership, success/cancel URLs, webhook
secret custody, retention, refunds/revocation, protected video delivery, signed
companion delivery, and support. Implement Roadmap 4.1 then 4.2 with Stripe test
fixtures before any live-mode action.

Until that system exists, treat Reset Experience as a non-production test
offer. Do not attempt client-only protection or rely on a success redirect.

### P0 — Framework and dependency remediation assessment

Create an ADR-scoped migration assessment for a maintained React build/runtime
stack and React Router remediation. Separate framework migration from feature
work; include license, bundle, Netlify, form, metadata, and visual compatibility.

### P1 — Route and SEO architecture

Replace indexable homepage hashes with stable public routes while preserving
legacy hashes, add redirect/canonical tests, resolve soft 404s where Netlify
permits, and make metadata available without relying solely on client execution.

### P1 — Accessibility and performance gates

Add portable automated accessibility tests, manual WCAG evidence, bundle
budgets, and repeatable mobile performance checks. Add captions/transcripts or
document their YouTube ownership for every published video.

### P1 — Content and funnel completion

Clarify whether Journey, Community, and Vault are launchable offerings or lead
capture only. Complete only owner-approved offerings; add privacy, terms, and
refund language alongside paid launch after legal/business review.

### P2 — Observability, analytics, and operations

Select privacy-reviewed uptime/error providers, approve analytics/consent only
if needed, verify Netlify notifications and retention, rehearse rollback, and
document private registrar/security ownership outside source.

### P2 — Cleanup and maintainability

Remove confirmed dead components, consolidate funnel primitives, replace
remaining inline styles, and add type safety after higher-risk journeys stabilize.

## Validation Evidence

| Check | Result |
| --- | --- |
| `git diff --check` on baseline | Pass |
| `npm run lint` | Pass |
| Jest suites | 5 passed |
| Jest tests | 62 passed |
| `npm run build` | Pass |
| Production bundle | Main 64.5 kB gzip; shared chunk 35.01 kB gzip |
| Browser scenarios | 23 captured; all functional journey checks passed |
| Pixel baseline | Not compared: Chrome `.108` differs from reviewed `.75` |
| Live core routes/assets | HTTP 200 |
| Unknown live route | HTTP 200 soft 404 confirmed |
| Live security headers | CSP and frame denial confirmed |
| Dependency audit | 50 total: 2 critical, 21 high, 17 moderate, 10 low |

## Human Gates and Owner Actions

1. Approve paid-product identity, fulfillment, retention, refund, and legal
   policy before server checkout implementation.
2. Provide test-mode Stripe server credentials/webhook configuration only for a
   separately scoped secure implementation; live mode remains prohibited until
   explicit approval.
3. Enable protected `main` and require the new validation check after merge.
4. Decide whether to activate monitoring/analytics providers and accept their
   privacy/cost implications.
5. Authorize live deployment, domain/DNS changes, and any legal copy.

## Audit Assurances

- No production Stripe charge or checkout session was created.
- No production form was submitted.
- No secret was printed, added, or exposed by this audit.
- Existing ministry copy, Scripture, media identifiers, routes, and public
  content were preserved.
