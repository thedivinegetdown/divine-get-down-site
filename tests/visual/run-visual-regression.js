/* eslint-disable no-console */
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..", "..");
const BUILD_DIR = path.join(ROOT, "build");
const BASELINE_DIR = path.join(__dirname, "baselines");
const MANIFEST_PATH = path.join(__dirname, "baseline-manifest.json");
const RESULTS_DIR = path.join(BUILD_DIR, "visual-results");
const args = new Set(process.argv.slice(2));
const UPDATE = args.has("--update");
const CHECK_ONLY = args.has("--check-only");
const TIMEOUT_MS = 15000;

const scenarios = [
  scenario(
    "route-loading-390x844",
    "/stillness?visual-loading=1",
    390,
    844,
    ".loading-state",
    {
      loadingState: true,
    },
  ),
  scenario("home-1440x900", "/", 1440, 900, "#panel-welcome", {
    expectTop: true,
  }),
  scenario("home-1280x800", "/", 1280, 800, "#panel-welcome", {
    expectTop: true,
  }),
  scenario("home-768x1024", "/", 768, 1024, "#panel-welcome", {
    expectTop: true,
  }),
  scenario("home-390x844", "/", 390, 844, "#panel-welcome", {
    expectTop: true,
  }),
  scenario("home-375x667", "/", 375, 667, "#panel-welcome", {
    expectTop: true,
  }),
  scenario("home-320x568", "/", 320, 568, "#panel-welcome", {
    expectTop: true,
  }),
  scenario("home-844x390", "/", 844, 390, "#panel-welcome", {
    expectTop: true,
  }),
  scenario("stillness-1280x800", "/stillness", 1280, 800, "#main-content"),
  scenario(
    "reset-experience-1280x800",
    "/reset-experience",
    1280,
    800,
    "#main-content",
  ),
  scenario(
    "experience-access-1280x800",
    "/experience-access",
    1280,
    800,
    "#main-content",
  ),
  scenario("journey-1280x800", "/journey", 1280, 800, "#main-content"),
  scenario("community-1280x800", "/community", 1280, 800, "#main-content"),
  scenario("vault-1280x800", "/vault", 1280, 800, "#main-content"),
  scenario("thank-you-1280x800", "/thank-you", 1280, 800, "#main-content"),
  scenario(
    "not-found-320x568",
    "/visual-baseline-not-found",
    320,
    568,
    "#main-content",
  ),
  scenario("contact-tab-1280x800", "/#contact", 1280, 800, "#panel-contact", {
    scrollTo: "#panel-contact",
  }),
  scenario("watch-tab-1280x800", "/#watch", 1280, 800, "#panel-watch", {
    scrollTo: "#panel-watch",
  }),
  scenario("shorts-tab-1280x800", "/#shorts", 1280, 800, "#panel-shorts", {
    scrollTo: "#panel-shorts",
  }),
  scenario("contact-focus-320x568", "/#contact", 320, 568, "#contact-name", {
    focus: "#contact-name",
    scrollTo: "#contact-name",
  }),
  scenario("contact-success-390x844", "/#contact", 390, 844, "#contact-name", {
    action: "contact-success",
    readyAfterAction: ".contact-confirmation",
    scrollTo: ".contact-confirmation",
  }),
  scenario(
    "reset-experience-390x844",
    "/reset-experience",
    390,
    844,
    "#main-content",
  ),
  scenario(
    "experience-access-320x568",
    "/experience-access",
    320,
    568,
    "#main-content",
  ),
];

function scenario(id, route, width, height, ready, options = {}) {
  const expectTop =
    options.expectTop ?? (!route.includes("#") && !options.loadingState);
  return { id, route, width, height, ready, expectTop, ...options };
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function safeResetDirectory(target) {
  const resolved = path.resolve(target);
  const allowedRoot = path.resolve(BUILD_DIR) + path.sep;
  assert(
    resolved.startsWith(allowedRoot),
    `Refusing to clear unsafe path: ${resolved}`,
  );
  fs.rmSync(resolved, { recursive: true, force: true });
  fs.mkdirSync(resolved, { recursive: true });
}

function findBrowser() {
  const candidates = [
    process.env.VISUAL_BROWSER_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);

  const browser = candidates.find((candidate) => fs.existsSync(candidate));
  assert(
    browser,
    "No supported Chromium browser found. Set VISUAL_BROWSER_PATH to Chrome or Edge.",
  );
  return browser;
}

function mimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return (
    {
      ".css": "text/css; charset=utf-8",
      ".html": "text/html; charset=utf-8",
      ".ico": "image/x-icon",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".map": "application/json; charset=utf-8",
      ".pdf": "application/pdf",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".txt": "text/plain; charset=utf-8",
      ".webp": "image/webp",
      ".xml": "application/xml; charset=utf-8",
    }[extension] || "application/octet-stream"
  );
}

async function startStaticServer() {
  assert(
    fs.existsSync(path.join(BUILD_DIR, "index.html")),
    "Run npm run build first.",
  );
  const chunkDirectory = path.join(BUILD_DIR, "static", "js");
  const stillnessChunk = fs.readdirSync(chunkDirectory).find((file) => {
    if (!file.endsWith(".chunk.js")) return false;
    return fs
      .readFileSync(path.join(chunkDirectory, file), "utf8")
      .includes("stillness-scroll.pdf");
  });
  assert(
    stillnessChunk,
    "Could not identify the Stillness route chunk for loading-state validation.",
  );
  const state = { contactPosts: 0, delayStillnessChunk: false };

  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, "http://127.0.0.1");

    if (requestUrl.searchParams.get("visual-loading") === "1") {
      state.delayStillnessChunk = true;
    }

    if (request.method === "POST") {
      request.resume();
      request.on("end", () => {
        state.contactPosts += 1;
        response.writeHead(200, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        response.end("Accepted by local visual-test server.");
      });
      return;
    }

    let pathname;
    try {
      pathname = decodeURIComponent(requestUrl.pathname);
    } catch {
      response.writeHead(400);
      response.end("Bad request");
      return;
    }

    const relativePath = pathname.replace(/^\/+/, "");
    let filePath = path.resolve(BUILD_DIR, relativePath || "index.html");
    const buildPrefix = path.resolve(BUILD_DIR) + path.sep;

    if (
      filePath !== path.resolve(BUILD_DIR) &&
      !filePath.startsWith(buildPrefix)
    ) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(BUILD_DIR, "index.html");
    }

    const send = () => {
      const body = fs.readFileSync(filePath);
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Length": body.length,
        "Content-Type": mimeType(filePath),
      });
      response.end(body);
    };

    const isDeferredChunk =
      state.delayStillnessChunk && path.basename(pathname) === stillnessChunk;

    if (isDeferredChunk) {
      state.delayStillnessChunk = false;
      setTimeout(send, 2500);
    } else send();
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve) => server.close(resolve)),
    state,
  };
}

async function getJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const request = http.request(url, options, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(
            new Error(
              `${options.method || "GET"} ${url} returned ${response.statusCode}`,
            ),
          );
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
    request.once("error", reject);
    request.end();
  });
}

async function waitForDevTools(port) {
  const endpoint = `http://127.0.0.1:${port}/json/version`;
  const started = Date.now();
  let lastError;

  while (Date.now() - started < TIMEOUT_MS) {
    try {
      return await getJson(endpoint);
    } catch (error) {
      lastError = error;
      await delay(100);
    }
  }
  throw new Error(
    `Browser DevTools did not start: ${lastError?.message || "timeout"}`,
  );
}

async function startBrowser(browserPath) {
  const debugPort = 9222 + Math.floor(Math.random() * 5000);
  const profileDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "tdg-visual-profile-"),
  );
  const browser = spawn(
    browserPath,
    [
      "--headless=new",
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${profileDir}`,
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-extensions",
      "--disable-features=MediaRouter,Translate",
      "--disable-sync",
      "--force-device-scale-factor=1",
      "--font-render-hinting=none",
      "--metrics-recording-only",
      "--mute-audio",
      "--no-default-browser-check",
      "--no-first-run",
      "--password-store=basic",
      "--window-size=1280,800",
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );

  let browserError = "";
  browser.stderr.on("data", (chunk) => {
    browserError += chunk.toString();
  });

  try {
    const version = await waitForDevTools(debugPort);
    return {
      browser,
      debugPort,
      profileDir,
      version,
      browserError: () => browserError,
    };
  } catch (error) {
    browser.kill();
    throw error;
  }
}

class CdpClient {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();

    socket.addEventListener("message", async (event) => {
      const raw =
        typeof event.data === "string" ? event.data : await event.data.text();
      const message = JSON.parse(raw);

      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }

      const listeners = this.listeners.get(message.method) || [];
      listeners.forEach((listener) => listener(message.params));
    });
  }

  static async connect(url) {
    const socket = new WebSocket(url);
    await new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    });
    return new CdpClient(socket);
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP command timed out: ${method}`));
      }, TIMEOUT_MS);

      this.pending.set(id, {
        resolve: (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        reject: (error) => {
          clearTimeout(timer);
          reject(error);
        },
      });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) || [];
    listeners.push(listener);
    this.listeners.set(method, listeners);
  }

  once(method, timeout = TIMEOUT_MS) {
    return new Promise((resolve, reject) => {
      const listeners = this.listeners.get(method) || [];
      const timer = setTimeout(() => {
        this.listeners.set(
          method,
          (this.listeners.get(method) || []).filter(
            (item) => item !== listener,
          ),
        );
        reject(new Error(`CDP event timed out: ${method}`));
      }, timeout);

      const listener = (params) => {
        clearTimeout(timer);
        this.listeners.set(
          method,
          (this.listeners.get(method) || []).filter(
            (item) => item !== listener,
          ),
        );
        resolve(params);
      };
      listeners.push(listener);
      this.listeners.set(method, listeners);
    });
  }

  close() {
    this.socket.close();
  }
}

async function createPageClient(debugPort) {
  const target = await getJson(
    `http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent("about:blank")}`,
    { method: "PUT" },
  );
  return CdpClient.connect(target.webSocketDebuggerUrl);
}

async function evaluate(client, expression, awaitPromise = false) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(
      result.exceptionDetails.exception?.description ||
        "Browser evaluation failed.",
    );
  }
  return result.result.value;
}

async function poll(client, expression, description, timeout = TIMEOUT_MS) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(client, expression, true)) return;
    await delay(75);
  }
  throw new Error(`Timed out waiting for ${description}.`);
}

async function configurePage(client, width, height) {
  await client.send("Emulation.setScrollbarsHidden", { hidden: true });
  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width <= 768,
    screenWidth: width,
    screenHeight: height,
  });
  await client.send("Emulation.setTouchEmulationEnabled", {
    enabled: width <= 768,
    maxTouchPoints: width <= 768 ? 5 : 1,
  });
  await client.send("Emulation.setEmulatedMedia", {
    media: "screen",
    features: [
      { name: "prefers-color-scheme", value: "dark" },
      { name: "prefers-reduced-motion", value: "reduce" },
    ],
  });
}

async function navigate(client, url, readySelector, options = {}) {
  const currentUrl = await evaluate(client, "location.href");
  const current = new URL(currentUrl);
  const next = new URL(url);
  const sameDocument =
    current.origin === next.origin &&
    current.pathname === next.pathname &&
    current.search === next.search;

  if (sameDocument || options.loadingState) {
    await client.send("Page.navigate", { url });
  } else {
    const load = client.once("Page.loadEventFired");
    await client.send("Page.navigate", { url });
    await load;
  }
  await poll(
    client,
    `Boolean(document.querySelector(${JSON.stringify(readySelector)}))`,
    readySelector,
    options.loadingState ? 5000 : TIMEOUT_MS,
  );

  if (!options.loadingState) {
    await poll(
      client,
      `!document.querySelector('.loading-state') && document.querySelector('#root')?.innerText.trim().length > 20`,
      "rendered route content",
    );
    await evaluate(
      client,
      `Promise.all([
        document.fonts?.ready || Promise.resolve(),
        new Promise((resolve) => {
          const images = Array.from(document.images).filter((image) => !image.src.startsWith('https://'));
          if (images.every((image) => image.complete)) return resolve();
          const finish = () => images.every((image) => image.complete) && resolve();
          images.forEach((image) => {
            image.addEventListener('load', finish, { once: true });
            image.addEventListener('error', finish, { once: true });
          });
          setTimeout(resolve, 3000);
        }),
      ])`,
      true,
    );
    await delay(150);
  }
}

async function applyScenarioAction(client, current) {
  if (current.action === "contact-success") {
    await evaluate(
      client,
      `(() => {
        const values = {
          '#contact-name': 'Visual Test',
          '#contact-email': 'visual-test@example.invalid',
          '#contact-organization': 'Local Validation',
          '#contact-inquiry-type': 'general-inquiry',
          '#contact-message': 'Local visual validation only.'
        };
        for (const [selector, value] of Object.entries(values)) {
          const control = document.querySelector(selector);
          if (!control) throw new Error('Missing contact control: ' + selector);
          control.value = value;
          control.dispatchEvent(new Event('input', { bubbles: true }));
          control.dispatchEvent(new Event('change', { bubbles: true }));
        }
        document.querySelector('.contact-form').requestSubmit();
        return true;
      })()`,
    );
  }

  if (current.readyAfterAction) {
    await poll(
      client,
      `Boolean(document.querySelector(${JSON.stringify(current.readyAfterAction)}))`,
      current.readyAfterAction,
    );
  }

  if (current.focus) {
    await focusWithKeyboard(client, current.focus);
  }

  if (current.scrollTo) {
    await evaluate(
      client,
      `document.querySelector(${JSON.stringify(current.scrollTo)}).scrollIntoView({ block: 'center' })`,
    );
    await delay(100);
  }
}

async function focusWithKeyboard(client, selector) {
  await evaluate(client, "document.activeElement?.blur()");
  for (let index = 0; index < 40; index += 1) {
    await pressTab(client);
    if (
      await evaluate(
        client,
        `document.activeElement?.matches(${JSON.stringify(selector)})`,
      )
    )
      return;
  }
  throw new Error(`Keyboard focus did not reach ${selector}.`);
}

async function pressTab(client) {
  await client.send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
    nativeVirtualKeyCode: 9,
  });
  await client.send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
    nativeVirtualKeyCode: 9,
  });
}

async function auditContactKeyboard(client) {
  const expected = [
    "#contact-name",
    "#contact-email",
    "#contact-organization",
    "#contact-inquiry-type",
    "#contact-message",
    '.contact-form button[type="submit"]',
  ];
  const visited = [];
  await evaluate(client, "document.activeElement?.blur()");

  for (
    let index = 0;
    index < 50 && visited.length < expected.length;
    index += 1
  ) {
    await pressTab(client);
    const matched = await evaluate(
      client,
      `(${JSON.stringify(expected)}).find((selector) => document.activeElement?.matches(selector)) || null`,
    );
    if (!matched || visited.includes(matched)) continue;

    await delay(50);
    const focusAudit = await evaluate(
      client,
      `(() => {
        const active = document.activeElement;
        const rect = active.getBoundingClientRect();
        const intersects = (left, right) => !(
          left.right <= right.left || left.left >= right.right ||
          left.bottom <= right.top || left.top >= right.bottom
        );
        const overlays = Array.from(document.querySelectorAll('.mobile-subscribe, .top-site-menu.is-stuck'))
          .filter((element) => {
            const style = getComputedStyle(element);
            const box = element.getBoundingClientRect();
            return style.display !== 'none' && style.visibility !== 'hidden' &&
              Number(style.opacity) > 0 && box.width > 0 && box.height > 0;
          });
        const style = getComputedStyle(active);
        return {
          focusVisible: active.matches(':focus-visible') && style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0,
          obscuredBy: overlays.filter((element) => intersects(rect, element.getBoundingClientRect())).map((element) => element.className),
        };
      })()`,
    );
    assert(
      focusAudit.focusVisible,
      `${matched}: keyboard focus indicator is not visible.`,
    );
    assert(
      focusAudit.obscuredBy.length === 0,
      `${matched}: focused control is obscured by ${focusAudit.obscuredBy.join(", ")}.`,
    );
    visited.push(matched);
  }

  assert(
    JSON.stringify(visited) === JSON.stringify(expected),
    `Contact keyboard order mismatch: ${JSON.stringify(visited)}.`,
  );
}

async function auditPage(client, current) {
  return evaluate(
    client,
    `(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const visible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      };
      const label = (element) => {
        const id = element.id ? '#' + element.id : '';
        const classes = typeof element.className === 'string' && element.className.trim()
          ? '.' + element.className.trim().split(/\\s+/).slice(0, 3).join('.')
          : '';
        return element.tagName.toLowerCase() + id + classes;
      };

      const overflow = [];
      document.querySelectorAll('body *').forEach((element) => {
        if (!visible(element) || element.closest('.contact-honeypot')) return;
        if (element.matches('.skip-link') && document.activeElement !== element) return;
        if (element.closest('.navbar-container') && !element.matches('.navbar-container')) return;
        const rect = element.getBoundingClientRect();
        if (rect.left < -1 || rect.right > viewportWidth + 1) {
          overflow.push({ element: label(element), left: Math.round(rect.left), right: Math.round(rect.right) });
        }
      });

      const clippedText = [];
      document.querySelectorAll('h1,h2,h3,h4,p,a,button,label,li,span').forEach((element) => {
        if (!visible(element) || element.closest('.contact-honeypot')) return;
        if (element.closest('.lyt-visually-hidden, .sr-only')) return;
        const style = getComputedStyle(element);
        const clips = ['hidden', 'clip'].includes(style.overflow) ||
          ['hidden', 'clip'].includes(style.overflowX) ||
          ['hidden', 'clip'].includes(style.overflowY);
        if (clips && (element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1)) {
          clippedText.push({ element: label(element), text: element.textContent.trim().slice(0, 80) });
        }
      });

      const undersizedControls = Array.from(
        document.querySelectorAll('button, a.primary-cta, a.secondary-cta, .mobile-subscribe')
      )
        .filter(visible)
        .map((element) => ({ element: label(element), rect: element.getBoundingClientRect() }))
        .filter(({ rect }) => rect.width < 24 || rect.height < 24)
        .map(({ element, rect }) => ({
          element,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        }));

      const contactControls = Array.from(
        document.querySelectorAll('.contact-field input, .contact-field select, .contact-field textarea')
      )
        .filter(visible)
        .map((element) => ({ element: label(element), height: Math.round(element.getBoundingClientRect().height) }))
        .filter(({ height }) => height < 48);

      const iframe = document.querySelector('#main-content iframe');
      const iframeIssue = iframe && visible(iframe)
        ? (() => {
            const rect = iframe.getBoundingClientRect();
            const parentRect = iframe.parentElement.getBoundingClientRect();
            const ratio = rect.width / rect.height;
            return rect.width > parentRect.width + 1 || Math.abs(ratio - (16 / 9)) > 0.03
              ? { width: rect.width, height: rect.height, parentWidth: parentRect.width, ratio }
              : null;
          })()
        : null;

      const fixedSubscribe = document.querySelector('.mobile-subscribe');
      const subscribeIssue = fixedSubscribe && visible(fixedSubscribe)
        ? (() => {
            const rect = fixedSubscribe.getBoundingClientRect();
            return rect.left < 0 || rect.right > viewportWidth || rect.bottom > innerHeight
              ? { left: rect.left, right: rect.right, bottom: rect.bottom }
              : null;
          })()
        : null;

      const rootStyles = getComputedStyle(document.documentElement);
      const missingTokens = [
        '--color-page-background',
        '--color-text-primary',
        '--color-accent-gold',
        '--space-4',
        '--radius-card',
        '--focus-outline',
        '--duration-standard'
      ].filter((token) => !rootStyles.getPropertyValue(token).trim());

      const focused = document.activeElement;
      const focusStyle = focused && focused !== document.body ? getComputedStyle(focused) : null;
      const focusIssue = ${JSON.stringify(Boolean(current.focus))} &&
        (!focusStyle || focusStyle.outlineStyle === 'none' || parseFloat(focusStyle.outlineWidth) <= 0)
        ? label(focused)
        : null;

      const longAnimations = document.getAnimations()
        .map((animation) => animation.effect?.getComputedTiming?.().duration || 0)
        .filter((duration) => Number(duration) > 50);

      return {
        clippedText,
        contactControls,
        focusIssue,
        iframeIssue,
        initialScrollY: Math.round(scrollY),
        longAnimations,
        missingTokens,
        overflow,
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
        subscribeIssue,
        undersizedControls,
        errors: window.__tdgVisualErrors || [],
        pathname: location.pathname,
      };
    })()`,
  );
}

function assertAudit(current, audit) {
  assert(
    audit.reducedMotion,
    `${current.id}: reduced-motion emulation is inactive.`,
  );
  assert(
    audit.missingTokens.length === 0,
    `${current.id}: missing tokens ${audit.missingTokens.join(", ")}`,
  );
  assert(
    audit.overflow.length === 0,
    `${current.id}: horizontal overflow ${JSON.stringify(audit.overflow)}`,
  );
  assert(
    audit.clippedText.length === 0,
    `${current.id}: clipped text ${JSON.stringify(audit.clippedText)}`,
  );
  assert(
    audit.undersizedControls.length === 0,
    `${current.id}: controls below 24px ${JSON.stringify(audit.undersizedControls)}`,
  );
  assert(
    audit.contactControls.length === 0,
    `${current.id}: contact controls below 48px ${JSON.stringify(audit.contactControls)}`,
  );
  assert(
    !audit.iframeIssue,
    `${current.id}: responsive video issue ${JSON.stringify(audit.iframeIssue)}`,
  );
  assert(
    !audit.subscribeIssue,
    `${current.id}: mobile subscribe issue ${JSON.stringify(audit.subscribeIssue)}`,
  );
  assert(
    !audit.focusIssue,
    `${current.id}: focus indicator is not visible on ${audit.focusIssue}`,
  );
  assert(
    audit.longAnimations.length === 0,
    `${current.id}: reduced-motion left long animations active.`,
  );
  assert(
    audit.errors.length === 0,
    `${current.id}: browser errors ${JSON.stringify(audit.errors)}`,
  );
  if (current.expectTop) {
    assert(
      audit.initialScrollY <= 1,
      `${current.id}: initial load scrolled to Y=${audit.initialScrollY}.`,
    );
  }
}

async function captureScenario(client, baseUrl, current, outputDir) {
  await configurePage(client, current.width, current.height);
  await navigate(client, `${baseUrl}${current.route}`, current.ready, current);
  await applyScenarioAction(client, current);
  const audit = current.loadingState ? null : await auditPage(client, current);
  if (audit) assertAudit(current, audit);

  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  const buffer = Buffer.from(screenshot.data, "base64");
  const filePath = path.join(outputDir, `${current.id}.png`);
  fs.writeFileSync(filePath, buffer);
  console.log(`  captured ${current.id}`);
  return {
    ...current,
    file: `${current.id}.png`,
    sha256: sha256(buffer),
    audit,
  };
}

async function verifyStaticAssets(baseUrl) {
  for (const asset of ["/stillness-scroll.pdf", "/reset-companion.pdf"]) {
    const response = await fetch(`${baseUrl}${asset}`);
    assert(response.ok, `${asset} returned ${response.status}.`);
    assert(
      response.headers.get("content-type")?.startsWith("application/pdf"),
      `${asset} did not return application/pdf.`,
    );
    const body = Buffer.from(await response.arrayBuffer());
    assert(
      body.subarray(0, 4).toString() === "%PDF",
      `${asset} is not a readable PDF response.`,
    );
  }
}

async function runFunctionalChecks(client, baseUrl, localServer) {
  console.log("Running functional browser checks...");
  await configurePage(client, 390, 844);
  await navigate(client, `${baseUrl}/stillness`, "#main-content");
  await client.send("Page.reload", { ignoreCache: true });
  await poll(
    client,
    `location.pathname === '/stillness' && Boolean(document.querySelector('#main-content'))`,
    "direct route refresh",
  );

  await navigate(client, `${baseUrl}/journey`, "#main-content");
  await navigate(client, `${baseUrl}/community`, "#main-content");
  await evaluate(client, "history.back()");
  await poll(
    client,
    `location.pathname === '/journey'`,
    "browser back navigation",
  );
  await evaluate(client, "history.forward()");
  await poll(
    client,
    `location.pathname === '/community'`,
    "browser forward navigation",
  );

  await navigate(client, `${baseUrl}/#welcome`, "#panel-welcome");
  await evaluate(
    client,
    `(() => {
      ['watch', 'shorts', 'services', 'start', 'about', 'contact'].forEach((id) => {
        document.querySelector('#tab-' + id)?.click();
      });
      return true;
    })()`,
  );
  await poll(
    client,
    `Boolean(document.querySelector('#panel-contact'))`,
    "rapid tab switching",
  );

  await configurePage(client, 320, 568);
  await navigate(client, `${baseUrl}/?focus-audit=1#contact`, "#panel-contact");
  await auditContactKeyboard(client);

  await configurePage(client, 844, 390);
  const landscapeAudit = await auditPage(client, {
    id: "orientation-change",
    focus: false,
  });
  assertAudit({ id: "orientation-change", expectTop: false }, landscapeAudit);

  assert(
    localServer.state.contactPosts === 1,
    `Expected one local contact POST, received ${localServer.state.contactPosts}.`,
  );
  await verifyStaticAssets(baseUrl);
  console.log(
    "  direct refresh, history, rapid tabs, orientation, contact, and PDF checks passed",
  );
}

function baselineManifest(browserVersion, results) {
  return {
    schemaVersion: 1,
    browser: browserVersion.Browser,
    protocolVersion: browserVersion["Protocol-Version"],
    platform: process.platform,
    reducedMotion: true,
    scenarios: results.map(
      ({ id, route, width, height, file, sha256: hash }) => ({
        id,
        route,
        width,
        height,
        file,
        sha256: hash,
      }),
    ),
  };
}

function updateBaselines(manifest, results) {
  fs.mkdirSync(BASELINE_DIR, { recursive: true });
  const expected = new Set(results.map((result) => result.file));
  fs.readdirSync(BASELINE_DIR).forEach((file) => {
    if (file.endsWith(".png") && !expected.has(file))
      fs.rmSync(path.join(BASELINE_DIR, file));
  });
  results.forEach((result) => {
    fs.copyFileSync(
      path.join(RESULTS_DIR, result.file),
      path.join(BASELINE_DIR, result.file),
    );
  });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
}

function compareBaselines(manifest, results) {
  assert(
    fs.existsSync(MANIFEST_PATH),
    "Visual manifest is missing. Run npm run test:visual -- --update.",
  );
  const expected = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  assert(
    expected.browser === manifest.browser,
    `Browser mismatch: baseline uses ${expected.browser}, current run uses ${manifest.browser}.`,
  );
  assert(
    expected.platform === manifest.platform,
    `Platform mismatch: baseline uses ${expected.platform}, current run uses ${manifest.platform}.`,
  );

  const expectedById = new Map(
    expected.scenarios.map((item) => [item.id, item]),
  );
  const failures = [];
  results.forEach((result) => {
    const prior = expectedById.get(result.id);
    if (!prior) failures.push(`${result.id}: baseline missing`);
    else if (prior.sha256 !== result.sha256)
      failures.push(`${result.id}: screenshot changed`);
  });
  expected.scenarios.forEach((prior) => {
    if (!results.some((result) => result.id === prior.id))
      failures.push(`${prior.id}: scenario removed`);
  });
  assert(
    failures.length === 0,
    `Visual regressions detected:\n- ${failures.join("\n- ")}`,
  );
}

async function main() {
  assert(
    !(UPDATE && CHECK_ONLY),
    "Use either --update or --check-only, not both.",
  );
  safeResetDirectory(RESULTS_DIR);
  const browserPath = findBrowser();
  const localServer = await startStaticServer();
  const browserState = await startBrowser(browserPath);
  let client;

  try {
    client = await createPageClient(browserState.debugPort);
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Network.enable");
    await client.send("Network.setCacheDisabled", { cacheDisabled: true });
    await client.send("Page.addScriptToEvaluateOnNewDocument", {
      source: `(() => {
        window.__tdgVisualErrors = [];
        const record = (kind, value) => {
          const error = value instanceof Error ? value : null;
          window.__tdgVisualErrors.push({
            kind,
            name: error?.name || typeof value,
            message: String(error?.message || value || 'Unknown error').slice(0, 240)
          });
        };
        addEventListener('error', (event) => record('error', event.error || event.message));
        addEventListener('unhandledrejection', (event) => record('unhandledrejection', event.reason));
        addEventListener('DOMContentLoaded', () => {
          const style = document.createElement('style');
          style.dataset.visualTest = 'true';
          style.textContent = [
            '* { caret-color: transparent !important; }',
            '.short-thumb { opacity: 0 !important; }',
            'lite-youtube { background-image: none !important; background-color: #10131c !important; }',
            'iframe[src*="youtube.com/embed"] { opacity: 0 !important; background-color: #10131c !important; }'
          ].join('\\n');
          document.head.appendChild(style);
        });
      })();`,
    });

    console.log(`Browser: ${browserState.version.Browser}`);
    console.log(`Capturing ${scenarios.length} focused scenarios...`);
    const results = [];
    for (const current of scenarios) {
      results.push(
        await captureScenario(
          client,
          localServer.baseUrl,
          current,
          RESULTS_DIR,
        ),
      );
    }

    await runFunctionalChecks(client, localServer.baseUrl, localServer);
    const manifest = baselineManifest(browserState.version, results);

    if (UPDATE) {
      updateBaselines(manifest, results);
      console.log(
        `Updated ${results.length} reviewed baselines in ${path.relative(ROOT, BASELINE_DIR)}.`,
      );
    } else if (CHECK_ONLY) {
      console.log(
        "Structural and functional checks passed; screenshot comparison skipped.",
      );
    } else {
      compareBaselines(manifest, results);
      console.log(`${results.length} screenshots match the reviewed baseline.`);
    }
  } finally {
    client?.close();
    if (!browserState.browser.killed) browserState.browser.kill();
    await Promise.race([
      new Promise((resolve) => browserState.browser.once("exit", resolve)),
      delay(2000),
    ]);
    await localServer.close();
    const profile = path.resolve(browserState.profileDir);
    const tempPrefix =
      path.resolve(os.tmpdir()) + path.sep + "tdg-visual-profile-";
    if (profile.startsWith(tempPrefix)) {
      try {
        fs.rmSync(profile, {
          recursive: true,
          force: true,
          maxRetries: 5,
          retryDelay: 200,
        });
      } catch (error) {
        console.warn(
          `Could not remove temporary browser profile: ${error.message}`,
        );
      }
    }
  }
}

main().catch((error) => {
  console.error(`Visual validation failed: ${error.message}`);
  console.error(`Current screenshots: ${path.relative(ROOT, RESULTS_DIR)}`);
  process.exitCode = 1;
});
