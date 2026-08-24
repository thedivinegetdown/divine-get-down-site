# v1.0 Owner Action Register

**Release audit:** EO-0020

**Validation date:** 2026-08-24

**Public release surface:** `https://thedivinegetdown.com`

**Commercial status:** Not approved

This register separates genuine release blockers from accepted follow-up. It
does not contain credentials, DNS verification records, payment details, form
submissions, or private recovery data.

## Must Complete Before Public Ministry v1.0

None.

Public Ministry v1.0 is approved with non-blocking follow-up for the canonical
`.com` website. This decision treats `thedivinegetdown.net` as a non-public
secondary domain until its TLS and redirect defects are corrected. The `.net`
name must not be advertised or relied on as a visitor entry point in that state.

## Must Complete Before Commercial v1.0

1. Replace the deployed Stripe test Payment Link with an owner-approved live
   checkout only after price, destination, refund, and operational ownership
   have been verified. Do not place Stripe secrets in the repository or a
   `REACT_APP_*` variable.
2. Approve and implement a fulfillment/access model. The current
   `/experience-access` route, Reset video, and `reset-companion.pdf` are
   publicly reachable and do not establish payment or entitlement. A redirect
   from Stripe is not proof of payment under ADR-005.
3. Decide whether Commercial v1.0 will include server-verified entitlement and
   protected assets or will use a separately authorized, explicitly accepted
   interim fulfillment model. Validate successful, failed, duplicate, delayed,
   refunded, and recovery paths before approval.
4. Remove or intentionally disable public purchase messaging through a
   separate Execution Order if commercial launch is deferred. Until then, the
   Reset Experience is test-only and must not be represented as a production
   purchase flow.

## Recommended After v1.0

### Repository and account controls

- Authenticate as the GitHub owner, protect `main`, require reviewed pull
  requests and the successful `validate` check, and block force pushes and
  branch deletion while retaining a documented emergency recovery path.
- Enable and assign ownership for GitHub secret scanning, push protection,
  Dependabot alerts, and Dependabot security updates. The public API could not
  verify these settings; no public repository ruleset was present at audit.
- Modernize or replace the Create React App toolchain only through a dedicated
  architecture order. Retain the evidence-based advisory classification and do
  not use forced dependency upgrades.

### Domains and recovery

- Attach `thedivinegetdown.net` and `www.thedivinegetdown.net` to the canonical
  Netlify project or another approved redirect service, provision valid
  hostname certificates, and permanently redirect all variants to
  `https://thedivinegetdown.com`.
- Record registrar ownership, renewal dates, recovery contacts, and protected
  DNS restoration information in the approved private operations record.

### Accessibility, visual, and device evidence

- Complete physical iPhone Safari, iPhone Safari Private Browsing, Android
  Chrome, screen-reader, keyboard, and native 200 percent zoom/reflow checks.
  Record device, operating-system, browser, orientation, and results.
- Re-review and re-pin the visual baseline when the approved Chrome build is
  updated. Chrome and Edge passed all 23 structural and functional scenarios;
  exact comparison was withheld because the baseline pins Chrome
  `151.0.7922.75` and the installed browser is `151.0.7922.173`.

### Search, operations, and observability

- Activate the authorized Google Search Console Domain property, submit the
  six-URL sitemap, inspect each canonical URL, and collect the first complete
  28-day and 90-day aggregate baselines. Do not infer performance before data
  exists.
- Independently confirm that contact-form and deploy-failure notification
  emails reach the accountable inbox. The hooks are configured and the form is
  registered, but EO-0020 did not read an inbox or create a failure.
- Decide whether to authorize privacy-reviewed browser-error and uptime
  providers. Monitoring remains provider-neutral, disabled by default, and has
  no transport.
- Address the SPA soft-404 response and route-specific initial HTML only in
  scoped routing/SEO architecture work. Rendered NotFound metadata is
  `noindex,follow`, but the host currently returns HTTP `200` for unknown SPA
  paths.
