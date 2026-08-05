# Production Operations and Launch Readiness

**Status:** Active production runbook

**Last verified:** 2026-08-05

**Canonical domain:** `https://thedivinegetdown.com`

**Source repository:** `thedivinegetdown/divine-get-down-site`

This runbook covers the current public React website and its GitHub-to-Netlify
deployment. It does not authorize architecture changes, backend services,
memberships, Creator Studio, or new analytics providers.

## Service Inventory

| Service | Production role | Source of truth |
| --- | --- | --- |
| GitHub | Application source and release history | `main` branch |
| Netlify | Build, deploy, CDN, DNS, TLS, redirects, and form processing | Git-connected production project |
| Netlify Forms | Speaking and contact inquiry receipt | Form `contact-inquiry` |
| Stripe | Reset Experience checkout destination | Public Netlify build variable |
| YouTube | Public video delivery | Existing public embeds |

The production build command is `npm run build`, the publish directory is
`build`, and Netlify builds with Node.js 22. The production branch is `main`.

## Operational Ownership

- The ministry inbox is `thedivinegetdown@gmail.com`.
- The operator reviews form notifications and the Netlify Forms dashboard each
  business day.
- The operator reviews failed-deploy notifications immediately and confirms that
  the last known-good deploy remains published.
- Domain registration, DNS, and TLS renewal status are reviewed monthly and at
  least 30 days before any registrar expiration date.
- Access to GitHub, Netlify, the domain registrar, Stripe, and the ministry inbox
  is limited to accountable operators and protected with MFA where available.

Do not place passwords, access tokens, payment details, private customer data, or
form submissions in GitHub issues, commits, deploy logs, or this repository.

## Release Procedure

1. Confirm the active Execution Order and its rollback approach.
2. Confirm `main` is synchronized and the working tree contains only scoped work.
3. Run the complete release gate:

   ```text
   git diff --check
   npm run lint
   npm test -- --watchAll=false
   npm run build
   git status --short
   ```

4. Commit once with the authorized message and push once to `origin main`.
5. Confirm Netlify publishes the same commit SHA with state `ready`.
6. Check the homepage, primary routes, `robots.txt`, `sitemap.xml`, favicon, and
   manifest over HTTPS.
7. Confirm the contact form remains registered and a recent verified submission
   is visible when a form change is released.
8. Record validation, deploy status, and remaining risks in the architecture
   review.

A failed deploy does not authorize an unreviewed production patch. Diagnose the
failure against its commit and Execution Order, then use the normal validation
and release process.

## Contact Inquiry Operations

The public form collects name, email, optional organization, inquiry type, and a
message. It uses Netlify spam filtering and a honeypot. Verified submissions are
stored in Netlify and generate an email notification to the ministry inbox.

### Response Workflow

1. Review the notification and confirm the submission exists in Netlify Forms.
2. Classify it as speaking, teaching, media, collaboration, partnership, or
   general inquiry.
3. Acknowledge a legitimate inquiry within two business days when practical.
4. Reply from the ministry inbox. Do not move sensitive information into project
   trackers or source control.
5. If a message contains payment credentials, passwords, medical details, or
   highly sensitive spiritual disclosures, do not redistribute it. Remove the
   unnecessary data and direct the sender to an appropriate channel if a reply is
   warranted.
6. Mark spam in Netlify so future filtering can improve.
7. Close the inquiry after the response or decision is complete.

If an email notification is missing, check the Netlify Forms dashboard before
assuming the submission failed. Confirm the form-specific notification hook is
enabled, inspect spam submissions, and use the visible ministry email as the
visitor recovery path.

### Data Retention

- Delete test submissions and obvious spam after validation.
- Review stored submissions monthly.
- Delete resolved or declined submissions from Netlify no later than 90 days
  after closure unless a documented legal or business need requires longer.
- Remember that notification email is a second copy. Deleting a Netlify record
  does not delete the corresponding email.
- Avoid routine CSV exports. If an export is required, store it in an approved
  encrypted location and delete it when its purpose is complete.

## Health Checklist

After every production release, verify:

- `https://thedivinegetdown.com/` returns `200` over HTTPS.
- `/stillness`, `/reset-experience`, `/experience-access`, `/journey`,
  `/community`, `/vault`, and `/thank-you` load directly and after refresh.
- `robots.txt`, `sitemap.xml`, `favicon.ico`, and `manifest.json` return `200`.
- HTTP redirects to HTTPS and `www.thedivinegetdown.com` resolves to the
  canonical apex domain.
- The published Netlify deploy SHA matches the intended Git commit.
- The `contact-inquiry` form is active, honeypot protection is enabled, and the
  operator notification hooks are enabled.
- Stripe, YouTube, and public PDF links retain their expected behavior.
- No private value appears in the browser bundle or public deploy output.

## Incident Response

Treat an unavailable canonical site, broken inquiry delivery, TLS failure on the
canonical domain, exposed secret, or unintended checkout change as urgent.

1. Record the start time, affected journey, observed status, deploy SHA, and
   operator owner.
2. Preserve evidence without copying personal form data or credentials.
3. Determine whether the last deploy introduced the issue.
4. Roll back when the previous atomic deploy is known-good and the impact of
   rollback is lower than remaining on the current deploy.
5. Verify the core health checklist after recovery.
6. Record impact, timeline, root cause, corrective action, and architecture
   follow-up.

## Rollback Procedure

Netlify retains successful atomic deploys. To restore a known-good version:

1. In Netlify, open **Deploys** and select the last verified successful deploy.
2. Publish that deploy as the production version. Lock publishing temporarily if
   another automatic production deploy could overwrite the rollback.
3. Verify the canonical domain and core health checklist.
4. Revert the faulty Git commit in GitHub with a new commit. Do not rewrite
   published history.
5. Run the full validation gate and push the corrective commit through the
   normal Git-to-Netlify path.
6. Unlock publishing after the corrected production deploy is verified.

Publishing an older Netlify deploy does not change GitHub. The Git history must
also be corrected or the next automatic deploy can reintroduce the defect.

## Deployment Recovery

GitHub `main` is the application source of truth. Netlify deploy artifacts are a
fast rollback mechanism, not the permanent source.

If the Netlify project must be recreated:

1. Clone the GitHub repository and check out the last verified `main` commit.
2. Run `npm ci`, lint, tests, and the production build.
3. Connect the repository to a replacement Netlify project with production
   branch `main`, build command `npm run build`, and publish directory `build`.
4. Restore the public `REACT_APP_RESET_EXPERIENCE_CHECKOUT_URL` build variable.
   Do not put private credentials in any `REACT_APP_*` value.
5. Enable form detection, deploy, and confirm `contact-inquiry` is registered.
6. Recreate the form and deploy-failure notifications to the ministry inbox.
7. Attach the canonical domain, verify DNS and TLS, then run the health checklist.

Netlify form submissions are operational records and are not stored in GitHub.
Apply the retention process rather than treating the repository as their backup.

## Security and Privacy Baseline

- The provider-neutral browser-error contract and emergency disable procedure
  are documented in [ERROR_MONITORING.md](ERROR_MONITORING.md).
- HTTPS is forced and HSTS, content-type, frame, referrer, permissions, opener,
  resource, and embedder headers are present.
- No private production secret is required by the current browser-only site.
- `REACT_APP_*` values are public at build time and must never contain secrets.
- Netlify Forms collects only the minimum inquiry data and must not be expanded
  to sensitive data without a privacy review.
- Dependency, secret-scanning, CSP, and monitoring findings require their own
  scoped Execution Orders when they exceed this runbook's documentation scope.

## Known Launch Risks

| Severity | Risk | Required follow-up |
| --- | --- | --- |
| High | GitHub `main` is unprotected and has no CI validation workflow | Add branch protection and automated lint, test, and build gates under ADR-010 |
| High | GitHub secret scanning, push protection, and Dependabot alerts are disabled | Enable repository security controls and establish alert ownership |
| High | `thedivinegetdown.net` has an expired certificate and serves an old under-construction site | Migrate it to the canonical site and implement the ADR-013 redirect in a domain-specific Execution Order |
| High | The Create React App toolchain has critical and high npm audit findings in build and development dependency paths | Perform a dedicated dependency and framework remediation assessment |
| Medium | Unknown SPA routes return HTTP `200` while rendering the custom Not Found page | Address soft-404 behavior with route and SEO architecture work |
| Medium | No Content Security Policy or production browser-error and uptime monitoring is active | Design staged CSP and observability controls without introducing an unapproved vendor |
| Medium | Registrar renewal state is outside Netlify because both brand domains use an external registrar | Record registrar ownership, renewal contacts, and renewal dates in the approved private operations record |

The canonical `.com` site may continue operating while these risks are tracked,
but the High items require correction or explicit risk acceptance before a full
production-readiness sign-off.
