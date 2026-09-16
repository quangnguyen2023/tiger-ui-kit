# Landing widget preview

The public landing page at `/` markets the widget kit and shows a live preview
panel with a tab per widget type. A visitor switches tabs to preview each widget
(Analog Clock, Digital Clock, World Clock, Weather Forecast, Calendar, Chart)
without signing in. The preview renders entirely client-side, so it works with no
backend.

## Sub-features

- `landing-load` serves the marketing page with the hero heading.
- `preview-default` shows the Analog Clock preview as the default selected tab.
- `preview-switch` switches the selected preview when the user clicks another tab.

## How to get to it (user POV)

- Open `http://127.0.0.1:3100/` in a browser (the app root; no auth required).
- Scroll to the "Powerful Features, Simple Interface" section and use the tab row
  above the preview panel.

## Driving it with the harness

Preconditions:

- The app is healthy per the doctor check (`home: 200`, `identity: ok`).
- Chrome is present at `/usr/local/bin/chrome`.

- **Load the landing page.** Open `/`. The harness runs
  `page.goto('http://127.0.0.1:3100/')` and reads
  `getByRole('heading', { name: /Modern Workspaces/i })`. Result: heading text
  contains `Modern Workspaces` (printed as `HEADING:`).
- **Select the Digital Clock preview.** Click the tab. The harness clicks
  `getByRole('tab', { name: 'Digital Clock' })`. Result: that tab reports
  `data-state="active"` (printed as `DIGITAL data-state: active`); screenshot
  `artifacts/landing-widget-preview/digital-clock-selected.png` is written.
- **Switch to the Weather Forecast preview.** Click the tab. The harness clicks
  `getByRole('tab', { name: 'Weather Forecast' })`. Result: that tab reports
  `data-state="active"` (printed as `WEATHER data-state: active`); screenshot
  `artifacts/landing-widget-preview/weather-forecast-selected.png` is written.
- **Proof.** Run
  `env -u NODE_OPTIONS node .kiro/skills/verify-tiger-ui-kit/harness/drive.mjs landing-widget-preview`.
  Success is `DRIVE OK` with both `data-state: active` lines and two screenshots
  under `artifacts/landing-widget-preview/` showing the tab row with the app hero.

## Gotchas

- The tabs sit far below the fold. Scroll the target tab into view before clicking
  (the harness calls `scrollIntoViewIfNeeded`); a raw click can miss.
- The default selected tab is Analog Clock. Asserting Digital is selected on load
  would be wrong; assert it only after the click.
- Radix animates tab panels. Assert the trigger's `data-state="active"`, not a
  fixed sleep on panel contents.
- Expect a Google Fonts download warning in the server log. It is not a failure.
- The preview shows the current wall-clock time and live weather placeholder; do
  not assert exact clock text, assert which tab is selected.
