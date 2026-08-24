# Search Console Setup and Metadata Delivery Audit

**Execution Order:** EO-0018
**Audit date:** 2026-08-24
**Canonical property:** `thedivinegetdown.com`
**Production origin:** `https://thedivinegetdown.com`

This document records the metadata-delivery decision for the current Create
React App site and the manual, owner-authorized procedure for activating Google
Search Console. It contains no verification value or search-performance data.

## Metadata Delivery Audit

The audit inspected the raw production response and the browser document after
React rendered for every indexable sitemap route. The following shorthand is
used in the comparison matrix:

- **H** is the static homepage fallback from `public/index.html`.
- **R** is the route-specific metadata produced by React Helmet.
- **Implicit index** means no robots meta tag is present; crawling and indexing
  are not prohibited by page metadata.

### Initial Response Profile H

Every route initially received the same values because Netlify serves the CRA
SPA shell:

| Field | Initial response value |
| --- | --- |
| Title | `Christ-Centered Videos, Prayer & Encouragement \| The Divine Get Down` |
| Description | `Find Christ-centered videos, Scripture-rooted prayer, peaceful encouragement, and speaking services from The Divine Get Down.` |
| Canonical | `https://thedivinegetdown.com/` |
| Robots | Implicit index |
| Open Graph title | `Christ-Centered Videos, Prayer & Encouragement \| The Divine Get Down` |
| Open Graph description | Same as the initial description |
| Open Graph URL | `https://thedivinegetdown.com/` |
| Twitter title | Same as the initial title |
| Twitter description | Same as the initial description |
| Structured data | None in the raw response |

### Intended Route Profiles R

| Route | Title / social title | Description / social description | Canonical / social URL | Robots | Structured data after render |
| --- | --- | --- | --- | --- | --- |
| `/` | Title: `Christ-Centered Videos, Prayer & Encouragement \| The Divine Get Down`; social: `The Divine Get Down` | Page: H description; social: `Christ-centered videos, Scripture-rooted prayer, peaceful encouragement, and speaking services.` | `https://thedivinegetdown.com/` | Implicit index | `WebSite`, `Organization` |
| `/stillness` | `Christian Prayer & Scripture for Peace \| The Divine Get Down` | `Pause with a free guided Christian prayer, gentle breathwork, and Scripture for stillness, surrender, and peace through Jesus Christ.` | `https://thedivinegetdown.com/stillness` | Implicit index | `WebSite` |
| `/reset-experience` | `Faith-Based Reset Experience \| The Divine Get Down` | `A faith-based guided movement and rhythm experience to quiet your mind, reconnect with your body, and return to spiritual alignment.` | `https://thedivinegetdown.com/reset-experience` | Implicit index | `WebSite` |
| `/journey` | `4-Week Christian Prayer & Scripture Journey \| The Divine Get Down` | `A four-week Christian journey through guided prayer, Scripture reflection, stillness, gentle movement, and intentional time with God.` | `https://thedivinegetdown.com/journey` | Implicit index | `WebSite` |
| `/community` | `Christian Prayer & Scripture Community \| The Divine Get Down` | `Join a Christ-centered community for shared prayer, Scripture reflection, collective stillness, and gentle spiritual encouragement.` | `https://thedivinegetdown.com/community` | Implicit index | `WebSite` |
| `/vault` | `Christian Prayers & Scripture Reflections \| The Divine Get Down` | `Explore Christian prayers for peace, strength, and healing, Scripture reflections, and guided moments that help you realign with God.` | `https://thedivinegetdown.com/vault` | Implicit index | `WebSite` |

Open Graph and Twitter values use the route title and description unless the
homepage-specific social value is noted. They use the same canonical URL.

### Initial-versus-Rendered Comparison Before EO-0018

| Route | Initial value | Browser-rendered value before correction | Conflict | Likely crawler impact | Severity |
| --- | --- | --- | --- | --- | --- |
| `/` | H for every field; no structured data | One correct title; duplicate H description, canonical, and social URL; conflicting H and R social title/description; `WebSite` and `Organization` data | Yes, duplicate or conflicting tags except robots and structured data | Parsers may choose different homepage social values; canonical target itself remains the same | Medium |
| `/stillness` | H for every field; no structured data | R title; both H and R descriptions, canonicals, and social values; `WebSite` data | Yes; homepage and route canonical conflict | A crawler or link-preview parser may treat the route as the homepage or select the wrong summary | High |
| `/reset-experience` | H for every field; no structured data | R title; both H and R descriptions, canonicals, and social values; `WebSite` data | Yes; homepage and route canonical conflict | Same route-identity and summary ambiguity | High |
| `/journey` | H for every field; no structured data | R title; both H and R descriptions, canonicals, and social values; `WebSite` data | Yes; homepage and route canonical conflict | Same route-identity and summary ambiguity | High |
| `/community` | H for every field; no structured data | R title; both H and R descriptions, canonicals, and social values; `WebSite` data | Yes; homepage and route canonical conflict | Same route-identity and summary ambiguity | High |
| `/vault` | H for every field; no structured data | R title; both H and R descriptions, canonicals, and social values; `WebSite` data | Yes; homepage and route canonical conflict | Same route-identity and summary ambiguity | High |

Robots metadata did not conflict: all six indexable routes were implicitly
indexable before and after rendering. Structured data did not conflict because
the raw shell contained none; React added valid `WebSite` data on every route
and `Organization` data on the homepage.

## Metadata Architecture Decision

### Ownership

- `public/index.html` retains a complete homepage fallback for crawlers,
  previews, and browsers that do not execute JavaScript.
- `src/content/appMetadata.js` owns site-level title, description, and `WebSite`
  structured data.
- Routed content modules own their route title, description, path, and noindex
  decision.
- `src/components/MetaTags.jsx` constructs routed canonical and social tags.
- `src/content/tabMetadata.js` and `src/components/TabContent.jsx` own homepage
  tab metadata plus homepage `Organization` and featured `VideoObject` data.
- `src/App.jsx` owns the optional Google and Bing verification hooks.

### Selected Solution: Option A, with Option C Recorded

EO-0018 retains the current CRA client-metadata architecture. The safe
high-confidence correction marks the static fallback tags with the metadata
library's `data-rh="true"` ownership attribute. React Helmet can then reconcile
and replace those nodes instead of appending a second permanent set.

Post-correction browser checks show one title, description, canonical, Open
Graph set, and Twitter set per route. `/experience-access`, `/thank-you`, and
the NotFound experience each retain one `noindex,follow` directive. Structured
data remains unchanged and parseable.

Option B was rejected. Existing tooling does not produce route-aware static
HTML, and adding a custom post-build rewriter would be fragile, duplicate
content rules, and exceed this Execution Order. Correct route-specific initial
HTML therefore remains Option C future work governed by proposed ADR-008: a
dedicated static-generation, prerendering, or server-rendering decision.

### Remaining CRA Limitation

The raw response for every deep route still contains H until JavaScript runs.
The correction eliminates permanent post-render conflicts; it does not make
the initial server response route-aware. Search systems and social preview
parsers that do not execute JavaScript can still see the homepage fallback for
deep links. Indexable-route expansion should wait for either measured evidence
that the current delivery is sufficient or dedicated ADR-008 implementation.

## Production Search Readiness

Live checks on 2026-08-24 established:

| Check | Result |
| --- | --- |
| HTTPS homepage | `200` |
| HTTP canonical redirect | `301` to `https://thedivinegetdown.com/` |
| `www` redirect | `301` to `https://thedivinegetdown.com/` |
| Six sitemap routes | Each returned `200` |
| `robots.txt` | `200`; allows `/`; declares the canonical sitemap |
| `sitemap.xml` | `200`, `application/xml`; contains exactly the six indexable routes |
| Noindex exclusion | Access, thank-you, and NotFound URLs are absent from the sitemap and render `noindex,follow` |
| Canonical host | `https://thedivinegetdown.com` throughout structured content and sitemap |
| Verification hooks | Empty Google and Bing build-time hooks exist; values are rendered only when configured |
| CSP | Valid; meta verification does not require an external script and is not blocked |

Verification identifiers are public identifiers, but they must still be
handled through authorized owner configuration. Do not commit DNS records or
verification values to Git.

## Google Search Console Owner Procedure

Only an authorized domain owner or delegate should perform these steps.

1. Open [Google Search Console](https://search.google.com/search-console/).
2. Select **Add property**, choose **Domain**, and enter
   `thedivinegetdown.com` without a protocol or path.
3. Copy the DNS TXT verification record supplied by Google.
4. Add that TXT record at the authoritative DNS provider. Do not put it in the
   repository, screenshots, tickets, analytics, or this document.
5. Wait for DNS propagation, return to Search Console, and select **Verify**.
6. Open **Sitemaps** and submit
   `https://thedivinegetdown.com/sitemap.xml`.
7. Confirm the sitemap is fetched successfully and that it reports the six
   canonical URLs listed below.
8. Open **URL Inspection** for each URL:
   - `https://thedivinegetdown.com/`
   - `https://thedivinegetdown.com/stillness`
   - `https://thedivinegetdown.com/reset-experience`
   - `https://thedivinegetdown.com/journey`
   - `https://thedivinegetdown.com/community`
   - `https://thedivinegetdown.com/vault`
9. For each URL, record the inspection date, whether the URL is available to
   Google, whether indexing is allowed, the user-declared canonical, Google's
   selected canonical, last crawl/crawl status, and rendered-page status or
   resource errors.
10. Use **Test live URL** where the indexed result is stale or unclear. Request
    indexing only for canonical, indexable ministry pages that are ready for
    public discovery. Do not request indexing for access, thank-you, NotFound,
    redirects, or duplicate URLs.

Google's official references cover
[property creation](https://support.google.com/webmasters/answer/34592),
[ownership verification](https://support.google.com/webmasters/answer/9008080),
and [sitemap submission](https://support.google.com/webmasters/answer/7451001).

## Privacy-Safe Performance Baseline

Search Console data must not be inferred before it exists. Record `not
available`, rather than zero, when no verified report was queried.

### First 28 Days

After the property has collected a complete 28-day window:

1. Set the Search results report to the previous 28 complete days and note the
   export date and filters.
2. Record aggregate clicks, impressions, CTR, and average position.
3. Export the query, page, and device breakdowns. Export country only at an
   aggregate level when it informs a genuine ministry or technical decision.
4. Compare the six canonical pages and the EO-0016 topic hypotheses. Classify
   evidence as observed, not measurable, or requiring more history.
5. Store only the smallest aggregate dataset needed for decisions. Do not
   combine search data with prayer requests, form submissions, purchase data,
   email addresses, or other identifiers.
6. Do not attempt to identify a visitor from a rare query, location, device,
   or combination of dimensions. Suppress unnecessary low-volume geographic
   detail from internal reports.

### First 90 Days

Once 90 complete days exist, repeat the same report and safeguards with a
90-day range. Compare it with the documented 28-day baseline while noting site
changes, indexing dates, and incomplete history. Do not interpret normal
volatility as proof of a content opportunity without corroborating query and
page evidence.

Search Console activation and the first data collection window are manual
external work. They do not block unrelated, separately authorized execution
orders while data accumulates.
