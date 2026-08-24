# Error Monitoring Foundation

**Status:** Provider-neutral foundation; disabled by default

**Governing decisions:** ADR-007, ADR-009, and ADR-010

This document defines the privacy and operational boundary for browser error
monitoring. EO-0011 does not approve or connect an external monitoring provider.

## Architecture

`src/utils/errorMonitoring.js` exposes:

- `initErrorMonitoring({ transport })`
- `captureError(error, context)`
- `captureMessage(message, context)`

The adapter installs global `error` and `unhandledrejection` listeners only in a
production build where `REACT_APP_ERROR_MONITORING_ENABLED` is exactly `true`.
It is initialized before React renders. The existing React ErrorBoundary sends
render failures and its component stack through the same sanitizer.

The current application does not provide a transport. Enabling the variable by
itself therefore sends nothing. A future approved provider integration must pass
an in-process transport to `initErrorMonitoring`; that transport receives only
the sanitized envelope and must not receive the original error or browser event.

## Environment Contract

| Variable | Default | Purpose |
| --- | --- | --- |
| `REACT_APP_ERROR_MONITORING_ENABLED` | `false` | Allows production-only listener and adapter activation. It does not load a provider. |
| `REACT_APP_RELEASE` | empty | Optional public release or commit identifier used to correlate a sanitized event with a deploy. |

Create React App embeds `REACT_APP_*` values in the public browser bundle. Never
put a provider secret, private key, DSN containing a secret, customer value, or
credential in either variable.

## Captured Data

Only the following technical fields may reach a future transport:

- event version, event kind, and occurrence time
- current pathname without query string or URL fragment
- browser user-agent string
- viewport width and height
- optional sanitized release identifier
- allowlisted source: global error, unhandled rejection, React ErrorBoundary, or
  an explicit manual capture
- sanitized error name, message, and stack where available
- sanitized React component stack where available
- the ErrorBoundary reference ID shown to the visitor

Repeated capture of the same Error object or fingerprint is suppressed within a
short window. Global handlers observe failures but do not call `preventDefault`,
so existing browser and React recovery behavior remains unchanged.

## Prohibited Data

Monitoring must never read, attach, or transmit:

- form values, names, email addresses, inquiry messages, or organization names
- prayer requests or sensitive spiritual disclosures
- payment or card data
- URL query strings or fragments
- cookies, local-storage contents, or session-storage contents
- authentication data, credentials, access tokens, or private keys
- DOM contents, screenshots, session replay, or user interaction recordings
- arbitrary context objects supplied by callers

The adapter uses an allowlist rather than spreading caller context. It redacts
common email, credential, token, payment-number, sensitive assignment, query,
fragment, and URL patterns and caps string lengths. Developers must still avoid
constructing error messages from user input; no redaction system can infer every
possible personal value.

## Source Maps

EO-0019 disables production source-map generation through the committed
`.env.production` contract. The prior public maps exposed application source
but an in-memory production audit found no common secret patterns. Because no
monitoring provider or release-artifact upload exists, public maps provide no
current operational benefit that justifies continuing the disclosure.

A future provider integration may generate maps only for a private release
artifact upload and must ensure they are excluded from the published site. It
must not restore public maps merely to simplify setup.

The provider release must exactly match `REACT_APP_RELEASE` and the deployed Git
commit. Source maps must never contain environment secrets or captured user data.

## Local Validation

Run the focused tests and normal release gate:

```text
npm test -- --runTestsByPath src/utils/errorMonitoring.test.js src/components/ErrorBoundary.test.jsx
git diff --check
npm run lint
npm test -- --watchAll=false
npm run build
```

The tests inject an in-memory transport. They verify production gating,
sanitization, duplicate suppression, listener cleanup, ErrorBoundary integration,
and that disabled monitoring makes no fetch or XMLHttpRequest calls.

Do not add a production endpoint merely to test this foundation. Provider
delivery, retention, lawful basis, consent requirements, alert ownership, and
source-map upload require a separate approved Execution Order.

## Incident Workflow

When a future provider is connected:

1. Confirm the alert is a technical failure and contains no prohibited data.
2. Correlate the release, pathname, ErrorBoundary reference, and deploy SHA.
3. Reproduce without copying form submissions or personal data into an issue.
4. Follow the production runbook for impact, rollback, recovery, and architecture
   review.
5. Delete or redact any event that unexpectedly contains personal data and begin
   the privacy incident process.

## Emergency Disable

1. Set `REACT_APP_ERROR_MONITORING_ENABLED=false` or remove it in Netlify.
2. Trigger a production deploy and verify its commit and `ready` state.
3. Confirm the provider receives no new website events.
4. If the integration itself breaks the site, publish the last known-good
   Netlify deploy, then revert the provider integration in GitHub.

Because this is a build-time flag, changing it requires a redeploy. Until a
provider is approved, leave the variable unset in Netlify.
