# Search Performance Baseline

**Execution Order:** EO-0017
**Analysis date:** 2026-08-24
**Canonical property:** `https://thedivinegetdown.com`
**Status:** Technical-readiness baseline; search performance is not yet measurable

## Executive Decision

Real Google Search Console performance data is not available in the current
environment. The available browser session opens the Search Console welcome
screen and offers to add a website; it does not expose an existing property for
`thedivinegetdown.com`. No Search Console connector, API session, export, or
repository data file is available.

Consequently:

- no clicks, impressions, CTR, average position, query, page, device, or
  geography figures are reported;
- all EO-0016 search-demand hypotheses are classified **NOT MEASURABLE**;
- absence of measurable evidence is not treated as evidence that a topic has no
  ministry value;
- no new SEO page or route is justified by search-performance data in this
  sprint;
- the repository is ready for ownership verification and sitemap submission,
  subject to the metadata-delivery limitation documented below.

## Measurement Period

| Period | Availability | Reason |
| --- | --- | --- |
| Previous 28 days | Not available | No accessible verified Search Console property or performance export |
| Previous 90 days | Not available | No accessible verified Search Console property or performance export |

The intended first measurement window is the 28 days after property activation.
A 90-day comparison should be added only after sufficient history exists.

## Baseline Metrics

| Metric | 28 days | 90 days |
| --- | --- | --- |
| Total clicks | Not available | Not available |
| Total impressions | Not available | Not available |
| Average CTR | Not available | Not available |
| Average position | Not available | Not available |

No zero values are recorded because zero would incorrectly imply that a
verified report was queried and returned no activity.

## Search Console Availability

- The current Search Console session has no accessible website property and no
  performance report for the canonical domain.
- Production does not currently render a Google site-verification or Bing
  `msvalidate.01` tag. Token values were neither retrieved nor recorded.
- `.env.example` provides empty
  `REACT_APP_GOOGLE_SITE_VERIFICATION` and
  `REACT_APP_BING_SITE_VERIFICATION` hooks.
- The application conditionally renders those public verification tags when
  corresponding build-time values are provided.
- Domain-property DNS verification remains the preferred Google ownership
  method because it covers protocols and subdomains. Google documents property
  creation at
  <https://support.google.com/webmasters/answer/34592> and ownership methods at
  <https://support.google.com/webmasters/answer/9008080>.

## Production Search Readiness

Live checks were performed on 2026-08-24.

| Check | Result | Evidence / limitation |
| --- | --- | --- |
| Canonical domain | Ready | Repository and production use `https://thedivinegetdown.com` |
| HTTPS | Ready | Homepage returned `200` over HTTPS |
| HTTP redirect | Ready | HTTP returned `301` to the HTTPS homepage |
| `robots.txt` | Ready | Returned `200`, allows `/`, and identifies the production sitemap |
| `sitemap.xml` | Ready | Returned `200`, parsed as XML, and contains six canonical URLs |
| Public route rendering | Ready with limitation | Each routed page rendered one H1 and its intended title |
| Noindex behavior | Ready | Thank-you, access, and not-found experiences render `noindex,follow` |
| WebSite structured data | Ready | Valid JSON-LD rendered on public routes |
| Organization structured data | Ready | Valid JSON-LD rendered on the homepage |
| Video structured data | Ready | Watch tab renders a valid `VideoObject` with the verified title, thumbnail, upload date, and embed URL |
| Google verification | Not connected | No deployed tag and no accessible verified property |
| Bing verification | Not connected | No deployed tag was found |
| Route metadata delivery | Needs follow-up | Client-rendered routed pages contain the static homepage canonical, description, and Open Graph URL alongside their route-specific values |

### Indexable Sitemap Routes

- `/`
- `/stillness`
- `/reset-experience`
- `/journey`
- `/community`
- `/vault`

### Noindex Experiences

- `/thank-you`
- `/experience-access`
- not-found routes

### Metadata Delivery Limitation

Create React App serves the same static `public/index.html` for every route.
React Helmet then adds route-specific metadata after JavaScript runs. On
`/stillness`, for example, the rendered document contained both:

- the homepage canonical and the `/stillness` canonical;
- the homepage description and the Stillness description; and
- the homepage Open Graph URL and the `/stillness` Open Graph URL.

The same fallback-versus-route duplication affects the routed pages. This is a
technical indexing risk and supports ADR-008's server-rendered or statically
generated SEO direction. It should be resolved before expanding the number of
indexable routes. EO-0017 does not modify application architecture or metadata.

## Query, Page, Device, and Geography Baseline

The following reports are pending Search Console activation and history:

- highest-impression and highest-click queries;
- queries in approximate positions 4-20;
- high-impression, low-CTR queries;
- branded versus non-branded discovery;
- highest-impression and highest-click pages;
- pages with impressions but few clicks;
- pages with no measurable discovery;
- mobile, desktop, and tablet comparisons; and
- meaningful aggregate geographic patterns.

No substitute web-search observations are used as traffic or ranking evidence.

## EO-0016 Topic Classification

Search classification and repository content depth are deliberately separate.
Every search classification is **NOT MEASURABLE** until Search Console history
exists.

| Topic hypothesis | Search classification | Existing content evidence | Content depth | Decision |
| --- | --- | --- | --- | --- |
| Christian prayer | NOT MEASURABLE | Stillness Scroll prayer; two Reset Companion prayers; Vault and Journey descriptions; protection Short | Strong, but much is image-only | Preserve hypothesis; gather data |
| Prayer for protection | NOT MEASURABLE | One dedicated public Short | Thin to moderate without transcript | Do not build a pillar yet |
| Finding peace in God | NOT MEASURABLE | Stillness and Reset PDFs; Stillness, Vault, and Journey routes; Psalm 46:10 and Isaiah 26:3 | Strong, but much is image-only | Preserve hypothesis; gather data |
| Scripture reflection | NOT MEASURABLE | Both PDFs, Journey, Vault, Community, and Scripture-centered Shorts | Strong concept coverage | Preserve hypothesis; gather data |
| Trusting God | NOT MEASURABLE | Reset prayer language, Isaiah 26:3 reflection, and general encouragement | Moderate | Gather transcripts and data |
| Seeking God | NOT MEASURABLE | One dedicated public Short | Thin without transcript | Do not build yet |
| Christian motivation | NOT MEASURABLE | Video catalog, Shorts, speaking and teaching content | Moderate | Gather data; keep separate from generic hype |
| Bible verses | NOT MEASURABLE | Matthew 11:28, Psalm 46:10, Psalm 34:18, Isaiah 26:3, references to 1 Peter 5:7 and Psalm 23:3, and an Exodus 14:21 Short | Moderate, mostly non-indexable images/video | Do not create a verse page yet |
| God sees you | NOT MEASURABLE | Stillness Scroll states that God sees hidden exhaustion and remains near | Moderate but image-only | Gather data; do not build yet |
| God's love | NOT MEASURABLE | Walk-in-love and Love-like-Jesus Shorts; prayer and reflection language | Moderate without transcripts | Gather data |
| Christian encouragement | NOT MEASURABLE | Homepage, About, Services, all routed experiences, and video catalog | Strong broad coverage | Preserve as a site-level theme |
| Christian videos | NOT MEASURABLE | Two long-form references and six public Shorts | Moderate catalog depth | Gather data and transcripts |
| Faith videos | NOT MEASURABLE | Same video inventory and homepage video presentation | Moderate catalog depth | Gather data and transcripts |
| Jesus Christ | NOT MEASURABLE | Explicit Christ-centered prayer, reflection, brand language, and video themes | Strong mission alignment | Preserve; do not create a generic pillar |
| Prayer life | NOT MEASURABLE | Stillness, Vault, Journey, and Community describe repeated prayer rhythms | Moderate | Gather data; develop only with genuine guidance |

## Content Inventory

| Content type | Repository evidence | Search/content value | Limitation |
| --- | --- | --- | --- |
| Public long-form video | “The Light of God That Formed the Universe” | Supports Christian video and God-centered reflection discovery | No repository transcript or stable `/watch` route |
| Reset Experience video | “The Reset Experience \| A Sacred Pause for the Weary Soul” | Strong connection to weariness, rest, and peace | Access route is intentionally noindex; transcript publication requires product/access review |
| Public Shorts | Six titled videos covering walking in love, protection prayer, perseverance, seeking God, Exodus 14:21, and loving like Jesus | Strongest item-level topic signals | No repository transcripts, captions, descriptions, or stable `/shorts` route |
| Stillness Scroll PDF | Eight image-only pages with breath guidance, prayer, reflection, and Matthew 11:28, Psalm 46:10, and Psalm 34:18 | Substantial support for peace, weariness, prayer, and God's nearness | No searchable text layer; page copy summarizes rather than reproduces the resource |
| Reset Companion PDF | Eleven image-only pages with prayers, reflection prompts, and Scripture including Matthew 11:28, Psalm 46:10, and Isaiah 26:3 | Substantial support for peace, emotional exhaustion, prayer, and trust | No searchable text layer; associated access route is noindex |
| Scroll Vault | Structured landing-page copy promises prayers, audio reflections, and Scripture prompts | Supports prayer and reflection positioning | The promised collection assets are not present in the repository and cannot be counted as completed content |
| Four-week Journey | Structured landing-page copy names prayer, Scripture, reflection, breath, and movement | Supports prayer-life and guided-journey positioning | Weekly lessons, audio, and reflection bodies are not present in the repository |
| Community | Structured landing-page copy names shared prayer and Scripture reflection | Supports community intent | No published community content corpus exists in the repository |
| Services, About, Contact | Substantial structured homepage-tab copy | Sufficient for navigational/business routes | Hash-state presentation and duplicate route metadata remain technical constraints |

## Transcript Assessment

No transcript, caption, `.srt`, or `.vtt` file exists in the repository. No
transcript was fabricated or imported.

Recommended transcript priorities:

1. **The Light of God That Formed the Universe** — the primary public long-form
   message and best first source for accessible, indexable text.
2. **A Prayer of Protection for This Generation** — directly supports a focused
   prayer hypothesis, but a transcript is required before considering a useful
   topic resource.
3. **The God Who Parts Seas — Exodus 14:21** — connects a known Scripture
   reference to a public message.
4. **When You Seek Him with All Your Heart** and **Love Like Jesus** — useful
   evidence for seeking-God and God's-love hypotheses.
5. **The Reset Experience** — important for accessibility and customer value,
   but any transcript must respect the intended access and entitlement policy;
   it should not automatically become public SEO copy.

Transcripts must be obtained from the creator or the source media and reviewed
for accuracy, Scripture citations, speaker intent, and accessibility before use.

## Route Decision Matrix

| Candidate route/topic | Search evidence | Existing content depth | Visitor value | SEO value | Implementation complexity | Recommendation |
| --- | --- | --- | --- | --- | --- | --- |
| `/watch` | Not measurable | Moderate: one primary public message plus related catalog | High | Potentially high | Medium; metadata delivery and transcripts should precede expansion | Gather more data |
| `/shorts` | Not measurable | Moderate: six genuine titled Shorts | High | Potentially medium to high | Medium; requires stable item semantics and transcript/description policy | Gather more data |
| `/services` | Not measurable | Moderate to strong structured copy | High for speaking and collaboration visitors | Medium | Low to medium, but belongs with route/navigation work | Gather more data |
| `/about` | Not measurable | Moderate structured mission copy | High for trust and ministry understanding | Low to medium | Low to medium, but belongs with route/navigation work | Gather more data |
| `/contact` | Not measurable | Strong functional form and inquiry guidance | High for direct ministry/business action | Low | Low to medium, but belongs with route/navigation work | Gather more data |
| `/faith/prayer` | Not measurable | Strong theme coverage but fragmented and often image-only | Potentially high | Unknown | High: requires reviewed text, taxonomy, and relationships | Do not build yet |
| `/faith/peace-in-god` | Not measurable | Strongest candidate content depth across PDFs and routed experiences | Potentially high | Unknown | High: requires indexable source text and metadata remediation | Do not build yet |
| `/faith/trusting-god` | Not measurable | Moderate supporting material | Potentially high | Unknown | High: insufficient focused body content | Do not build yet |

No candidate is marked **Build next** because real search evidence is absent and
the routed metadata duplication should be addressed before indexable expansion.
Stable Services, About, and Contact routes may still be justified later by
ADR-002 and visitor navigation needs, but that decision belongs to the dedicated
information-architecture phase rather than a speculative SEO release.

## External Ownership and Setup Steps

These actions require an authorized Search Console owner and were not performed
by EO-0017:

1. In Google Search Console, select **Add property** and create the Domain
   property `thedivinegetdown.com` without a protocol or path.
2. Add the Google-provided DNS TXT record at the domain's DNS provider, then
   complete verification. Do not commit the record or any alternative
   verification token to the repository.
3. If DNS administration is unavailable, create the URL-prefix property
   `https://thedivinegetdown.com/`, configure the approved verification method,
   and confirm the deployed homepage tag without recording its value here.
4. Open the Sitemaps report and submit
   `https://thedivinegetdown.com/sitemap.xml`. Google documents the report at
   <https://support.google.com/webmasters/answer/7451001>.
5. Use URL Inspection for the homepage and the five other sitemap routes.
   Record Google's selected canonical, indexing state, last crawl, and any
   rendering issue.
6. Permit at least the first 28-day measurement window, then export Performance
   reports by query, page, device, and country. Retain only aggregate data needed
   for the decision matrix.
7. Repeat with 90 days after enough history accumulates.
8. Optionally add The Divine Get Down's YouTube channel as a separate Search
   Console platform property if the account offers that feature. Keep platform
   performance separate from website performance. Google documents platform
   properties at <https://support.google.com/webmasters/answer/17148418>.
9. Complete equivalent Bing Webmaster Tools ownership and sitemap submission if
   Bing reporting is desired.

## Recommended EO-0018

**Title:** Rendered Metadata Delivery & Search Ownership Activation

Recommended bounded scope:

1. Require verified Google Search Console ownership and sitemap submission as a
   manual precondition.
2. Correct duplicate static and route-specific canonical, description, and Open
   Graph metadata without introducing a framework migration.
3. Validate initial HTML and post-rendered DOM for all six public routes.
4. Record URL Inspection results for each sitemap route.
5. Define the exact 28-day Search Console export procedure and privacy-safe
   storage format.
6. Do not add routes or topic pages.

If the duplicate-metadata correction cannot be achieved safely within Create
React App, stop and create the dedicated ADR/roadmap work required by ADR-008
rather than improvising a framework change.

## Limitations

- No Search Console or Bing performance data was accessible.
- No search volume, ranking, keyword difficulty, CTR, competitor, or traffic
  estimate was invented.
- Client-rendered metadata cannot establish what canonical Google has selected;
  URL Inspection is required.
- The PDFs are image-only and provide no searchable or accessible text layer.
- Video titles were validated from the current public YouTube references, but
  transcripts and performance metrics were not retrieved.
- Content described by the Vault, Journey, and Community landing pages was not
  counted as a completed corpus when its underlying assets were absent.
