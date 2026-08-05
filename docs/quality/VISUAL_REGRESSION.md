# Visual Regression Baseline

## Purpose

This baseline protects The Divine Get Down website from accidental visual, responsive, and focus-state regressions. It supports the existing design system and does not authorize a redesign, content change, or route change.

The suite uses the production build, a local static SPA server, and a locally installed Chromium browser. It has no browser-testing package dependency and never submits the Contact form to Netlify.

## Tooling

- Runner: `tests/visual/run-visual-regression.js`
- Reviewed images: `tests/visual/baselines/`
- Baseline metadata: `tests/visual/baseline-manifest.json`
- Current browser baseline: Google Chrome on Windows
- Secondary structural check: Microsoft Edge through `VISUAL_BROWSER_PATH`
- Protocol: Chrome DevTools Protocol through Node's built-in WebSocket client
- Current screenshot count: 23 focused scenarios

The manifest pins the browser build and operating-system family. An exact screenshot comparison is meaningful only with the recorded browser build and platform. A browser update requires human review before the baseline is updated.

## Route Coverage

The reviewed baseline covers:

- `/`
- `/stillness`
- `/reset-experience`
- `/experience-access`
- `/journey`
- `/community`
- `/vault`
- `/thank-you`
- `/visual-baseline-not-found` as the NotFound route
- `/#contact`
- `/#watch`
- `/#shorts`

The browser checks also exercise a direct route refresh, browser back and forward navigation, rapid homepage tab switching, and portrait-to-landscape emulation.

## Viewport Coverage

| Class            | Viewport   |
| ---------------- | ---------- |
| Desktop          | 1440 x 900 |
| Desktop          | 1280 x 800 |
| Tablet           | 768 x 1024 |
| Mobile           | 390 x 844  |
| Mobile           | 375 x 667  |
| Mobile           | 320 x 568  |
| Mobile landscape | 844 x 390  |

The 320-pixel viewport is the automated narrow-reflow equivalent. Browser zoom at 200 percent remains a manual check because DevTools zoom emulation does not reproduce every native browser and operating-system behavior.

## State Coverage

- Initial homepage load at every required viewport
- Reduced-motion mode for every screenshot
- Dark system preference, matching the site's declared color scheme
- Focused Contact name field at 320 x 568
- Complete Contact keyboard order and visible focus checks at 320 x 568
- Local-only Contact success state at 390 x 844
- Deterministically delayed route loading state at 390 x 844
- Direct route refresh
- Browser back and forward navigation
- Rapid tab switching
- Orientation change
- Responsive YouTube frame geometry
- PDF response and file-signature validation

The React ErrorBoundary state remains covered by its component test. It is not forced into a production screenshot because the public application has no safe route that intentionally throws.

## Deterministic Rendering

Before each screenshot, the runner:

1. Serves the current `build/` directory with SPA fallback behavior.
2. Disables the browser cache.
3. Emulates `prefers-reduced-motion: reduce` and a dark system preference.
4. Waits for route content, fonts, and local images.
5. Uses a fixed device scale factor of 1.
6. Hides the text caret and browser-controlled scrollbar pixels.
7. Masks only external YouTube thumbnail and iframe pixels while retaining their real containers, geometry, aspect ratios, labels, links, and controls.
8. Keeps scrolling and overflow assertions active.
9. Avoids external video playback.

The loading screenshot delays only the identified Stillness route chunk on the local server. Contact success uses one synthetic POST to that local server; the request body is discarded and no production form record is created.

## Commands

Create the production build before running visual checks:

```powershell
npm run build
npm run test:visual
```

Run structural and functional checks without comparing screenshots:

```powershell
node tests/visual/run-visual-regression.js --check-only
```

Run the Edge structural check on Windows:

```powershell
$env:VISUAL_BROWSER_PATH='C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
node tests/visual/run-visual-regression.js --check-only
Remove-Item Env:VISUAL_BROWSER_PATH
```

## Reviewing A Change

When `npm run test:visual` reports a changed screenshot:

1. Inspect the current images under `build/visual-results/` beside the reviewed images in `tests/visual/baselines/`.
2. Confirm that routes, text, focus visibility, responsive containment, and brand presentation remain correct.
3. Reject the application change when the difference is accidental.
4. Update baselines only after the visual change is intentional, scoped, and approved.

Update the reviewed baseline with:

```powershell
node tests/visual/run-visual-regression.js --update
git diff -- tests/visual
```

Never update screenshots only to make a failing check pass. The corresponding source change and its architectural authorization must be understood first.

## Automated Assertions

Each rendered route checks:

- no visible horizontal overflow, excluding only the intentional horizontal tab scroller
- no clipped visible text
- minimum 24 x 24 interactive target geometry
- minimum 48-pixel Contact form control height
- visible keyboard focus
- logical Contact form keyboard order
- focused form controls are not obscured by sticky or fixed controls
- responsive iframe containment and 16:9 aspect ratio
- required design tokens resolve
- reduced motion leaves no long-running animation
- no captured runtime or unhandled-promise error
- the homepage initial load remains at the top

The functional pass verifies direct route refresh, history navigation, rapid tab switching, orientation change, one local Contact submission, and both public PDF responses.

## Manual And Physical-Device Procedure

On each available device, validate portrait and landscape where supported:

1. Load the homepage and confirm the hero remains visible on first load.
2. Switch rapidly through Welcome, Watch, Shorts, Services, Scroll Vault, About, and Contact.
3. Open every routed page directly, refresh it, and use browser back and forward.
4. Confirm tab scrolling, sticky navigation, and the mobile Subscribe control remain usable.
5. Keyboard through the Contact form and confirm every focus indicator remains visible and unobscured.
6. Confirm form layout and validation without creating unnecessary production submissions.
7. Open and return from both PDFs.
8. Open Watch and Shorts content without repeated embeds, crashes, or freezes.
9. Enable reduced motion and repeat route and tab transitions.
10. Test 200 percent zoom or the platform's equivalent text/reflow setting.

Required physical targets are iPhone Safari, iPhone Safari Private Browsing, and Android Chrome. Record the operating-system version, browser version, device orientation, and any failure reproduction steps.

## Limitations

- Firefox and WebKit/Safari-compatible automation are not installed in the current repository environment.
- Physical iPhone and Android checks cannot be inferred from Chromium emulation and must be recorded separately.
- External YouTube thumbnail and iframe pixels are masked for deterministic screenshots; their layout containers, geometry, and links remain tested.
- No external video is played during automated validation.
- Production Netlify form delivery is outside this local visual suite.
- Native 200 percent browser zoom remains a manual check.
- Social-card cropping is not a browser-page regression and belongs to a scoped SEO validation order.

## Accessibility Pairing

Visual review must be paired with semantic and keyboard checks. A screenshot alone cannot establish accessible names, landmark structure, logical reading order, reduced-motion behavior, or production assistive-technology compatibility. Keep lint, component tests, the production build, keyboard validation, and physical-device checks in the release gate with this suite.
