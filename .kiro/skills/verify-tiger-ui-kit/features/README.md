# tiger-ui-kit verification map

This directory is the maintained source for verifying user-facing behavior of
tiger-ui-kit. Read this index before driving the app, then use the matching
feature file as the recipe. Launch, doctor, evidence, and cleanup live in
`../SKILL.md`.

## Baseline preconditions

- Deps installed and the Playwright driver present (`../SKILL.md` > Launch).
- The harness owns the app at `http://127.0.0.1:3100` (it starts and stops the
  dev server itself; do not point a recipe at a server you did not start).
- `NEXTAUTH_SECRET=verify-secret` is set by the harness; no other env is required.
- No external backend and no Google Fonts network (both expected, see SKILL.md).
- Run the doctor check and require `home: 200`, `identity: ok`, and Chrome present.

## Driving conventions

- Start every recipe from a fresh harness run unless its preconditions say
  otherwise (each run is a clean server).
- Prefer ARIA roles and accessible names over CSS selectors or DOM position.
- Treat every command and quoted name as literal. Keep flags and labels unchanged.
- Run browser actions through the harness (`../harness/drive.mjs`), which uses the
  sandbox's pre-installed Chrome.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes a screenshot (under `../artifacts/<feature-id>/`) and the
  observed handle state the harness prints (heading text, tab `data-state`, field
  visibility, resulting URL).
- Record the feature id and entry point used with every artifact.
- Report an unreachable path with the attempted command and the unmet
  precondition. Do not report a skipped entry point as verified through another.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph of user-visible
behavior, then uses exactly four H2 sections in this order:

1. `Sub-features` lists short ids with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with the harness` starts with `Preconditions:` and pairs each user
   action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a run.

Keep implementation details out of the map. Name only user paths, stable handles,
required state, commands, and observable proof.

## Features

- [Landing widget preview](./landing-widget-preview.md) — the public `/` page and
  its interactive widget-preview tabs. Feature id: `landing-widget-preview`.
- [Auth forms](./auth-forms.md) — the `/sign-in` and `/sign-up` screens and the
  toggle between them. Feature id: `auth-forms`.

Not yet mapped (no backend in this environment, so not user-verifiable here):
widget customizer (`/widget-customizer/*`, redirects to sign-in when unauthed) and
widget embed (`/embed/*`, renders "Widget not found" without stored data).
