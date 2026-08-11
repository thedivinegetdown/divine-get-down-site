# The Divine Get Down

The Divine Get Down is a Christ-centered faith-based media and digital ministry platform for Scripture-rooted reflection, teaching, guided experiences, speaking inquiries, and peaceful digital resources.

## Mission

To create a sacred rhythm for the weary soul, a place to breathe, remember, and rest in God's presence.

## Architecture

The permanent governing architecture package is documented in [docs/architecture/README.md](docs/architecture/README.md).

The analytics event contract and search-verification setup are documented in [docs/ANALYTICS_AND_SEARCH_READINESS.md](docs/ANALYTICS_AND_SEARCH_READINESS.md).

Production ownership, contact operations, health checks, rollback, and recovery are documented in [docs/operations/PRODUCTION_READINESS.md](docs/operations/PRODUCTION_READINESS.md).

All implementation work must follow the architecture-first workflow defined there:

Architecture -> Roadmap -> Execution Order -> Implementation -> One Validation Cycle -> One Commit -> One Push -> Architecture Review.

## Tech Stack

- React 18
- Create React App / react-scripts
- React Router
- React Helmet Async
- Framer Motion
- Netlify
- Stripe Payment Links
- YouTube embeds
- Static PDF delivery

## Supported Runtime

This repository declares the following engine requirements in `package.json`:

- Node.js `>=18.0.0`
- npm `>=8.0.0`

## Local Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm start
```

## Repository Validation

Use these commands for the current repository baseline:

```bash
git diff --check
npm run lint
npm test -- --watchAll=false
npm run build
npm run test:visual:functional
git status
```

Notes:

- `npm run lint` uses the React app ESLint configuration.
- `npm test -- --watchAll=false` is configured to pass when no test files exist yet.
- Future Execution Orders may add stricter validation gates without changing this baseline retroactively.
- `npm run test:visual:functional` runs the responsive structural and browser
  journey checks without requiring a workstation-specific pixel baseline.

## Routes

Current public routes include:

| Route | Purpose |
| --- | --- |
| `/` | Home |
| `/stillness` | Stillness Scroll |
| `/reset-experience` | Reset Experience landing page |
| `/experience-access` | Experience access page |
| `/journey` | Journey page |
| `/community` | Community page |
| `/vault` | Scroll Vault |
| `/thank-you` | Thank You page |

## Static Resources

Public assets are served from `public/`.

Current examples:

- `/stillness-scroll.pdf`
- `/reset-companion.pdf`
- `/divine_logo.png`
- `/divine_logo.webp`

## Deployment

The current deployment path is GitHub `main` to Netlify production.

React Router fallback routing depends on:

```text
public/_redirects
```

with:

```text
/*    /index.html   200
```

Required Netlify environment variable:

```text
REACT_APP_RESET_EXPERIENCE_CHECKOUT_URL
```

This variable should contain the Stripe Payment Link URL for the Reset Experience checkout.

## Repository Governance

- `main` is the production deployment branch.
- Changes should be made through a scoped Execution Order.
- Each Execution Order should produce one validation cycle, one commit, and one push.
- Product functionality, architecture changes, dependency upgrades, and infrastructure changes require the applicable roadmap and ADR review before implementation.
- Keep changes minimal, intentional, and aligned with the Christ-centered mission and architecture package.

## Contributing

1. Confirm the active Execution Order and scope.
2. Create or use the approved working branch.
3. Make only scoped changes.
4. Run the defined validation cycle.
5. Commit once with the Execution Order commit message.
6. Push to the approved target.

## Contact

thedivinegetdown@gmail.com
