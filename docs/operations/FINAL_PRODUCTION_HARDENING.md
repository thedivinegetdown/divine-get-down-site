# Final Production Hardening Record

**Execution Order:** EO-0019
**Audit date:** 2026-08-24
**Scope:** Final hardening before the v1.0 release audit

This record separates repository controls that EO-0019 can safely implement
from account, registrar, DNS, and commercial decisions that require an
authorized owner. It contains no credentials, verification values, form
submissions, private environment values, or customer data.

## Pre-Change Risk Register

| Risk | Severity | Evidence | Current mitigation | Recommended action | EO-0019 action | v1.0 blocker |
| --- | --- | --- | --- | --- | --- | --- |
| Invalid `.net` TLS and obsolete destination | High | Both `.net` hostnames present a `*.netlify.app` certificate; normal TLS validation fails; the apex serves the obsolete site instead of redirecting | Healthy canonical `.com` | Attach both names to the canonical Netlify project, provision TLS, and permanently redirect to `.com` | Owner action documented | Yes |
| Test checkout and public paid-access assets | High | Deployed Reset CTA uses a Stripe test Payment Link; `/experience-access` and the companion PDF are public | Access page is noindex, but that is not authorization | Configure the approved live link before taking payment and do not claim protected fulfillment until ADR-005 work | Explicitly deferred; no Stripe or PDF change | Yes for commercial v1 |
| No enforceable `main` protection visible | High | Public rulesets response is empty; settings require owner authentication; direct production pushes have succeeded | Execution Orders and manual local validation | Require PRs and validation; block force-push and deletion while retaining documented recovery access | CI added; owner protection steps documented | Yes |
| Repository security controls not verifiable | High | Secret scanning, push protection, and Dependabot settings are inaccessible without owner authentication and were previously documented disabled | Manual secret discipline | Enable controls and assign alert ownership | Owner action documented | Yes |
| Validation workflow absent from Git | High | No workflow file existed at the audited commit; GitHub retained only a stale workflow record with no runs | Local release gate | Add least-privilege Node 22 lint, test, and build checks | Corrected | No after correction |
| Dependency advisories | Medium production risk | `npm audit` reports 2 Critical, 21 High, 17 Moderate, and 10 Low packages | Static hosting, controlled inputs, CSP, reviewed releases | Classify exposure and address CRA replacement only in a dedicated order | Classified and deferred | No |
| Hashed assets revalidated on every visit | Medium | Live hashed JS and CSS returned `Cache-Control: public, max-age=0, must-revalidate` | ETags and atomic deploys | Restore long-lived immutable browser caching for `/static/*` | Corrected | No |
| Public source maps | Medium | Production JS and CSS maps returned `200`; common secret-pattern scan returned no matches | Maps contain source code rather than detected secrets | Stop publishing maps until private provider upload exists | Corrected | No |
| No monitoring or uptime provider | Medium | Error monitoring is disabled and has no transport; no uptime provider is documented | ErrorBoundary and provider-neutral sanitized adapter | Authorize a privacy-reviewed observability order or accept for v1 | Deferred with evidence | No |
| Partial recovery documentation | Medium | Git/Netlify rollback existed; full DNS and environment restoration steps were incomplete | Atomic deploys and Git source history | Add credential-free source, environment, DNS, and form recovery steps | Corrected | No |
| SPA soft 404 | Medium | Unknown paths return HTTP `200` and render a client NotFound experience | Rendered `noindex,follow` | Resolve only through scoped routing/SEO architecture | Deferred | No |
| Private registrar renewal state unavailable | Medium | Live DNS does not establish registrar owner, renewal contact, or expiration policy | Monthly operator review is documented | Record these facts in the approved private operations record | Owner action documented | No |
| Security headers | Low | CSP, HSTS, content-type, frame, referrer, permissions, opener, and resource policies are deployed | Netlify header contract | Preserve and revalidate | Validated | No |
| Operational notification state | Low | Enabled email hooks exist for `submission_created` and `deploy_failed`; the contact form is registered and has recent submissions | Netlify storage and ministry inbox workflow | Owner confirms actual inbox receipt during EO-0020 | Validated without reading submissions | No |
| Canonical `.com` health | Low | Valid TLS, HTTPS `200`, and correct HTTP and `www` redirects | Netlify DNS, TLS, and redirect controls | Preserve | Validated | No |

No Critical advisory was demonstrated in the deployed browser application. The
Critical npm labels belong to `shell-quote` and `websocket-driver` through
`react-scripts` development-server paths. Neither package appears in the
production JavaScript source-map inventory.

## Repository and Deployment Controls

### GitHub

- Repository: public, active, default branch `main`.
- Public repository rulesets: none at audit time.
- Protected-branch details: not retrievable without valid owner authentication.
- The local GitHub CLI credential is invalid, and the browser settings page
  requires sign-in; EO-0019 did not bypass authentication.
- The committed workflow now runs locked installation, lint, all tests, and a
  production build for pull requests and pushes to `main` with read-only
  repository contents permission.
- The owner must require the workflow's `validate` check only after its first
  successful run exists, avoiding an accidental repository lockout.

### Netlify

- Canonical project access was verified through the authenticated CLI without
  linking or mutating the local project.
- Email hooks are enabled for form submissions and failed deployments.
- GitHub status/check hooks are enabled for build creation and failure events.
- `contact-inquiry` is registered, with a recent submission timestamp and count;
  no submission body or personal field was read.
- Actual ministry-inbox delivery remains an owner confirmation for EO-0020. The
  repository states the intended notification workflow but does not provide
  inbox evidence.

## Dependency Security Decision

### Counts

| Audit view | Critical | High | Moderate | Low | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Full installed tree | 2 | 21 | 17 | 10 | 50 |
| `--omit=dev` npm classification | 2 | 21 | 14 | 10 | 47 |

`react-scripts` is a production-declared package even though its vulnerable
compiler, development server, optimizer, test, and service-worker tooling does
not ship as executable browser code. Consequently, `--omit=dev` alone
overstates runtime exposure for this static CRA deployment.

### Meaningful Paths

| Finding | Relationship | Exposure decision | Remediation decision |
| --- | --- | --- | --- |
| `shell-quote` Critical | Transitive through CRA developer utilities and webpack development server | Not present in production maps; local/build tooling only | Defer to framework/toolchain order; do not force overrides |
| `websocket-driver` Critical | Transitive through webpack development server | Not present in production maps; local development server only | Defer to framework/toolchain order |
| CRA High findings | Direct `react-scripts`, transitive compiler/optimizer/server packages | Build and developer environment; malicious repository input remains a supply-chain concern | Use reviewed PRs and CI; migrate only through dedicated architecture work |
| PostCSS High | Direct development package and CRA build dependency | Build-time CSS processing; not present in browser maps | No broad upgrade in EO-0019 |
| React Router Moderate | Direct runtime dependency; router packages appear in the main bundle | Runtime code is present, but current links and redirects use repository-controlled destinations rather than visitor-controlled URLs | Track a compatible remediation; do not make an unreviewed major upgrade |

No `npm audit fix --force`, override, or dependency update was applied. This
preserves the validated application while keeping the residual build-chain and
router risks explicit for the framework remediation decision.

## Domain Evidence and Owner Action

### Canonical `.com`

- Apex DNS resolves and HTTPS returns `200`.
- Certificate covers the apex and `www` and is valid from 2026-08-20 through
  2026-11-18.
- HTTP apex redirects `301` to the HTTPS apex.
- HTTPS `www` redirects `301` to the HTTPS apex.

### Secondary `.net`

- The apex resolves to a Netlify load balancer and returns an obsolete `200`
  response only when certificate validation is bypassed.
- Both `.net` hostnames present a certificate for `*.netlify.app`, not the
  requested brand hostname.
- HTTP redirects only to the broken HTTPS `.net` hostname; HTTPS `www` points to
  the broken `.net` apex rather than canonical `.com`.

An authorized owner must add both `.net` hostnames to the canonical Netlify
project or another approved redirect service, update DNS as required, wait for
valid hostname certificates, and configure a permanent redirect to
`https://thedivinegetdown.com`. Verify all four HTTP/HTTPS variants after DNS
propagation. Do not remove the old destination before confirming the canonical
redirect and TLS are live.

## Caching Policy

| Resource class | Policy | Reason |
| --- | --- | --- |
| HTML and SPA routes | `public, max-age=0, must-revalidate` | Deploy changes should appear immediately while allowing validation |
| Hashed `/static/*` JavaScript and CSS | `public, max-age=31536000, immutable` | Content hashes make long-lived browser caching safe |
| Unversioned images and icons | Revalidate | Avoid hiding replacements behind a long browser TTL |
| PDFs | Revalidate | Public resources can be updated without changing their stable URLs |
| `robots.txt`, `sitemap.xml`, and manifest | Revalidate | Search and install metadata should update promptly |

The prior rule order allowed the catch-all Cache-Control value to override the
hashed asset value in production. The specific `/static/*` rule now follows the
catch-all. Post-deployment response headers must confirm the effective result.

## Source-Map Policy

Production maps were publicly downloadable and contained original application
source. An in-memory scan of the deployed main map found no Stripe secret key,
private key, AWS access key, Google API key, bearer token, or password-assignment
pattern. Public source maps are not automatically a Critical vulnerability, but
they are unnecessary while no monitoring provider exists.

Production generation is therefore disabled. A future monitoring integration
may generate maps for a private release-artifact upload, tied to the exact Git
SHA, while excluding them from the public deploy.

## Security, Privacy, and Recovery Decision

- The enforced CSP still permits the narrowly documented inline script and
  style behavior required by the current CRA application.
- YouTube, same-origin Netlify Forms, PDFs, and metadata remain within the
  existing header policy.
- Error monitoring remains production-gated, disabled, without a provider or
  network transport, and subject to its existing prohibited-data rules.
- Recovery documentation now covers source reconstruction, Netlify rollback,
  environment-name inventory, DNS/TLS restoration, and form/notification
  recovery without storing private values in Git.

## Owner Checklist Before v1.0 Approval

1. Correct `.net` TLS and permanent redirects.
2. Decide whether commercial Reset Experience launch is in v1. If yes, configure
   and test an approved live Stripe Payment Link and accept that fulfillment is
   not entitlement-protected; otherwise remove the commercial journey through a
   separately authorized order.
3. Enable `main` protection and require the successful `validate` check.
4. Enable secret scanning, push protection, Dependabot alerts, and Dependabot
   security updates; assign alert ownership.
5. Confirm actual contact-form and deploy-failure emails reach the accountable
   inbox without intentionally causing a failed deploy.
6. Record registrar ownership, renewal dates, contacts, and recovery methods in
   the approved private operations record.
7. Decide whether the documented absence of real-time error and uptime
   monitoring is accepted for v1 or requires a separate observability order.

EO-0020 may perform the final audit while owner actions are underway, but it
must not approve a commercial v1.0 release while the blocking High items remain.
