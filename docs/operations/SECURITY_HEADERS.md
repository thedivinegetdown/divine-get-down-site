# Production Security Headers

**Status:** Active production control

**Last verified:** 2026-08-05

The public website's browser security headers are defined in `netlify.toml` and
deployed by Netlify. This document records the intended policy, required
external origins, validation procedure, and known limits. It does not authorize
new third-party services or changes to application behavior.

## Header Contract

| Header | Policy | Purpose |
| --- | --- | --- |
| `Content-Security-Policy` | Narrow directives documented below | Limits script, frame, image, form, and other resource sources |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing |
| `X-Frame-Options` | `DENY` | Provides legacy clickjacking protection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Avoids sending paths to cross-origin destinations |
| `Permissions-Policy` | Camera, microphone, and geolocation disabled | Denies browser capabilities the website does not use |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates the top-level browsing context from cross-origin openers |
| `Cross-Origin-Resource-Policy` | `same-origin` | Prevents other origins from embedding the site's resources |
| `Strict-Transport-Security` | Netlify-managed, one year in production | Keeps supported browsers on HTTPS after the first secure visit |

`Cross-Origin-Embedder-Policy` is intentionally omitted. The website embeds
approved YouTube frames, and a parent COEP policy blocks those frames unless the
third party cooperates with cross-origin isolation. The application does not use
`SharedArrayBuffer` or another feature that requires cross-origin isolation.

## Content Security Policy

The enforced CSP follows these rules:

- Application scripts, fonts, media, workers, and the manifest are restricted
  to the same origin.
- Inline script elements remain allowed only because React Helmet renders
  route-specific JSON-LD as inline `application/ld+json` elements. Inline event
  handler attributes remain prohibited by `script-src-attr 'none'`.
- Inline styles remain allowed because the existing React presentation uses
  style attributes and the static document contains critical accessibility
  styles.
- Forms may submit only to the same origin, which preserves Netlify Forms.
- The site cannot be embedded by another origin. `frame-ancestors 'none'` is the
  primary control, with `X-Frame-Options: DENY` retained for older browsers.
- Object embeds are disabled and insecure resource requests are upgraded.

## Approved External Origins

| Origin | CSP use | Website behavior |
| --- | --- | --- |
| `https://www.youtube.com` | Frame and connection | Direct Experience Access video and public YouTube links |
| `https://www.youtube-nocookie.com` | Frame and connection | Lite YouTube player created after visitor intent |
| `https://i.ytimg.com` | Image | YouTube and Shorts thumbnails |
| `https://www.google.com` | Connection | Lite YouTube intent-time preconnect |
| `https://googleads.g.doubleclick.net` | Connection | Lite YouTube intent-time preconnect |
| `https://static.doubleclick.net` | Connection | Lite YouTube intent-time preconnect |

Stripe Checkout is a top-level link rather than a script, frame, or form target,
so it does not require a CSP resource-source exception. Public PDFs, favicons,
the manifest, and Netlify form submission remain same-origin.

Adding an analytics provider, monitoring transport, media host, font provider,
or other external origin requires privacy and security review before changing
the allowlist.

## Validation

For every header change:

1. Run `git diff --check`, lint, tests, and the production build.
2. Serve the production build through Netlify tooling so `netlify.toml` headers
   are applied.
3. Confirm the CSP and other response headers on the homepage and a direct
   route.
4. Load every public route and inspect the browser console for CSP violations,
   blocked assets, mixed content, and security errors.
5. Exercise the direct YouTube embed and the intent-loaded Lite YouTube player.
6. Confirm the contact form markup and same-origin submission target, Stripe
   link, PDFs, favicon, `robots.txt`, and `sitemap.xml` remain available.
7. After deployment, repeat the header and browser checks on the canonical
   HTTPS domain.

Do not submit a production contact form or payment merely to test headers.
Form delivery and checkout transactions follow their own operational checks.

## Known Limits and Rollback

The current CSP still permits inline scripts and styles for compatibility with
the existing static architecture. Removing those allowances requires a scoped
React and metadata migration, not an unreviewed header edit. Public source maps
remain governed by the decision recorded in `ERROR_MONITORING.md`.

If a release blocks an approved production journey, restore the previous
known-good Netlify deploy, revert the single security commit in Git, run the
normal release gate, and publish the correction through `main`.
