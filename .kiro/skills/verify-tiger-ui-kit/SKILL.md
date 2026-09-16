---
name: verify-tiger-ui-kit
description: >-
  Verify tiger-ui-kit, the Next.js widget UI kit, by driving its running web app
  the way a user does: browse the marketing landing page and its live widget
  preview tabs, and reach the sign-in / sign-up forms. Reach for this whenever you
  need to prove user-facing behavior of tiger-ui-kit end to end (a change to the
  landing page, widget previews, auth screens, or shared UI), not just that it
  compiles. Drives Chrome via Playwright against a local dev server.
---

# Verify tiger-ui-kit

`tiger-ui-kit` is a Next.js 15 (App Router) widget kit. The truest "a user touches
this" surface is the **web app**: the public landing page at `/` with its
interactive widget-preview tabs, and the auth screens at `/sign-in` and `/sign-up`.
Drive it with **Playwright** against a local `next dev` server, using the
sandbox's pre-installed Chrome.

Read `features/README.md` and the matching feature file before driving. This file
covers how to launch, check health, drive, capture evidence, and clean up.

## Environment facts (read before anything)

- **No external backend.** Widget CRUD (`api/widget.ts`) calls an axios base URL
  that is unset here; those calls catch errors and return empty data. So routes
  that need stored widgets (`/embed/...`, `/widget-customizer/...`) render empty
  or "Widget not found". The landing page and auth forms are fully client-side and
  do not need a backend, which is why they are the verification surface.
- **Google Fonts are blocked.** `next dev` logs "Failed to download Poppins from
  Google Fonts. Using fallback font instead." This is expected and harmless; the
  page still renders. Do not treat it as a failure.
- **`NODE_OPTIONS` is broken in this sandbox** (it preloads a missing
  `proxy-bootstrap.js`). Every node/npm/next invocation must run with
  `NODE_OPTIONS` unset. The harness unsets it for you.
- **Playwright's browser CDN is blocked.** Do not run `npx playwright install`.
  Use the pre-installed Chrome at `/usr/local/bin/chrome` via `executablePath`
  (the harness does this).
- **Background processes and `/tmp` do not persist between separate shell calls**
  in this sandbox. Launch and drive in a single process. The harness
  (`harness/drive.mjs`) starts the server, drives it, and stops it within one run,
  and writes evidence under `artifacts/` inside the workspace, which does persist.

## Launch

Prerequisite (once per checkout): install deps and the Playwright package.

```bash
cd /projects/sandbox/tiger-ui-kit
env -u NODE_OPTIONS npm install
env -u NODE_OPTIONS npm install --no-save playwright   # driver only; Chrome is preinstalled
```

There is no long-lived server to keep alive across steps. A verification run
launches the dev server, drives one feature, and stops the server, all in one
process, via the helper:

```bash
cd /projects/sandbox/tiger-ui-kit
env -u NODE_OPTIONS node .kiro/skills/verify-tiger-ui-kit/harness/drive.mjs <feature-id>
```

The helper starts `./node_modules/.bin/next dev -p 3100` with
`NEXTAUTH_SECRET=verify-secret`, waits until `http://127.0.0.1:3100/` answers
`200`, then drives. It prints `READY http://127.0.0.1:3100` when the server is up
and `CLEANUP done` when it has stopped the server. `<feature-id>` is one of the
ids in `features/README.md` (e.g. `landing-widget-preview`, `auth-forms`).

Teardown is automatic: the helper always stops the server it started, even on
failure (see Cleanup).

## Doctor

Is the running instance worth driving? Run this read-only check before trusting a
run (or when a drive misbehaves). It only reads; it starts nothing.

```bash
# 1. Homepage answers 200 and is the tiger-ui-kit landing page.
curl -s -o /dev/null -w "home: %{http_code}\n" http://127.0.0.1:3100/
curl -s http://127.0.0.1:3100/ | grep -q "Modern Workspaces" && echo "identity: ok" || echo "identity: MISSING"

# 2. Chrome the harness will use exists and reports a version.
/usr/local/bin/chrome --version

# 3. Deps are installed (Next binary + Playwright driver present).
ls /projects/sandbox/tiger-ui-kit/node_modules/.bin/next >/dev/null 2>&1 && echo "next: ok" || echo "next: MISSING"
ls /projects/sandbox/tiger-ui-kit/node_modules/playwright >/dev/null 2>&1 && echo "playwright: ok" || echo "playwright: MISSING"
```

Expect `home: 200`, `identity: ok`, a Chrome version line, `next: ok`,
`playwright: ok`. If the server is not running, steps 1 are `000`/`MISSING`; that
just means no instance is up yet, which is normal before a run (the harness starts
one). If `identity: MISSING` while `home: 200`, something else owns port 3100, do
not drive it.

## Drive

The harness uses stable ARIA handles from the real app, not coordinates:

- Landing heading: `getByRole('heading', { name: /Modern Workspaces/i })`.
- Widget preview tabs (Radix Tabs, `role="tab"`): accessible names are the widget
  labels, e.g. `Analog Clock`, `Digital Clock`, `World Clock`, `Weather Forecast`,
  `Calendar`, `Chart`. A selected tab has `data-state="active"`.
- Auth heading: `getByRole('heading', { name: 'Sign In' })` (and `Sign Up`).
- Auth inputs by placeholder: `Email`, `Password`, and `Your Name` (sign-up only).
- Auth toggle link: `getByRole('link', { name: 'Sign Up' })` / `'Sign In'`.

Each feature file under `features/` gives the exact click/observe sequence. To add
a new feature, add a recipe branch in `harness/drive.mjs` keyed by its feature id
and a matching feature file.

## Evidence

Proof artifacts go under
`.kiro/skills/verify-tiger-ui-kit/artifacts/<feature-id>/` (inside the workspace,
so they survive cleanup). The harness writes PNG screenshots there and prints the
observed state (headings, `data-state`, field visibility) to stdout.

Proof standards:

- Drive the real user path (click the actual tab / follow the actual link), never
  internal setters or test-only hooks.
- Capture the action and the resulting state, not only a final screen: the harness
  asserts `data-state="active"` after a tab click and reaching `/sign-up` after the
  link click, and screenshots each.
- The landing page and auth forms have no server-side side effects to check (no
  backend here). When you extend this to a feature that does persist, add a
  read-only second-view check of the stored value, do not trust a success toast
  alone.
- Keep the dev-server stdout (fonts warning, compile lines, `GET / 200`) as part of
  the run transcript; it is your launch evidence.

## Cleanup

The harness stops what it started and nothing else:

- It kills the specific server child process it spawned (`SIGTERM`, then `SIGKILL`
  if needed). It never kills by process name, so it cannot touch an unrelated node
  process.
- Because each run is one process, a finished or crashed run leaves no server
  behind. If a run was interrupted mid-flight and port 3100 is still held, find and
  stop only that pid:
  `PID=$(lsof -ti tcp:3100); [ -n "$PID" ] && kill "$PID"`.
- Cleanup never deletes `artifacts/`. Proof survives teardown.
- Verification scaffolding to remove when done: the repo-root files `smoke-run.sh`
  and `smoke-drive.mjs` (bring-up scratch, safe to delete) and the un-saved
  `playwright` dev dependency (`npm install --no-save` means it is not written to
  package.json). The skill itself under `.kiro/skills/` is the deliverable, keep it.

## Helpers

- `harness/drive.mjs` (invocation shown under Launch): launches the server, drives
  the given feature id, captures screenshots + stdout state, and stops the server.
  Run it with `env -u NODE_OPTIONS node .kiro/skills/verify-tiger-ui-kit/harness/drive.mjs <feature-id>`.
