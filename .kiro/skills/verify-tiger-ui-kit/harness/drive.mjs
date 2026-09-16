// Playwright driving harness for tiger-ui-kit verification.
//
// One-process design: this sandbox does not keep background processes or /tmp
// files alive between separate shell invocations, so this script both launches
// the Next.js dev server and drives it, then tears the server down. Evidence is
// written under the skill's artifacts/ dir (inside the workspace, which does
// persist). See SKILL.md for how it is invoked.

import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
import { chromium } from 'playwright';

const CHROME = process.env.VERIFY_CHROME || '/usr/local/bin/chrome';
const PORT = process.env.VERIFY_PORT || '3100';
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = process.env.VERIFY_REPO || '/projects/sandbox/tiger-ui-kit';
const ARTIFACTS = `${REPO}/.kiro/skills/verify-tiger-ui-kit/artifacts`;
// Feature id passed as first CLI arg selects which recipe to run.
const feature = process.argv[2] || 'landing-widget-preview';

mkdirSync(`${ARTIFACTS}/${feature}`, { recursive: true });

function log(...a) {
  console.log(...a);
}

async function waitForReady(url, tries = 45) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {}
    await sleep(2000);
  }
  return false;
}

// ---- Launch -------------------------------------------------------------
const env = { ...process.env, PORT, NEXTAUTH_SECRET: 'verify-secret' };
delete env.NODE_OPTIONS; // sandbox sets a broken preload; Next must run without it
const server = spawn(`${REPO}/node_modules/.bin/next`, ['dev', '-p', PORT], {
  cwd: REPO,
  env,
  stdio: 'inherit',
});

let browser;
let failed = false;
try {
  const ready = await waitForReady(`${BASE}/`);
  if (!ready) throw new Error(`server did not become ready at ${BASE}`);
  log(`READY ${BASE}`);

  browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  if (feature === 'landing-widget-preview') {
    await runLandingWidgetPreview(page);
  } else if (feature === 'auth-forms') {
    await runAuthForms(page);
  } else {
    throw new Error(`unknown feature: ${feature}`);
  }

  log('DRIVE OK');
} catch (err) {
  failed = true;
  console.error('DRIVE FAILED:', err.message);
} finally {
  // ---- Cleanup ----------------------------------------------------------
  if (browser) await browser.close().catch(() => {});
  server.kill('SIGTERM');
  await sleep(1500);
  if (!server.killed) server.kill('SIGKILL');
  log('CLEANUP done (server stopped, evidence kept in artifacts/)');
}
process.exit(failed ? 1 : 0);

// ---- Recipes ------------------------------------------------------------

async function runLandingWidgetPreview(page) {
  const dir = `${ARTIFACTS}/landing-widget-preview`;
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 60000 });

  const heading = await page
    .getByRole('heading', { name: /Modern Workspaces/i })
    .first()
    .textContent();
  log('HEADING:', heading?.trim());

  // Default tab is Analog Clock; switch to Digital Clock and confirm selection.
  const digital = page.getByRole('tab', { name: 'Digital Clock' });
  await digital.scrollIntoViewIfNeeded();
  await digital.click();
  await page.waitForTimeout(500);
  const digitalState = await digital.getAttribute('data-state');
  log('DIGITAL data-state:', digitalState);
  if (digitalState !== 'active') throw new Error('Digital Clock tab not active after click');
  await page.screenshot({ path: `${dir}/digital-clock-selected.png` });

  // Switch to Weather Forecast and confirm selection.
  const weather = page.getByRole('tab', { name: 'Weather Forecast' });
  await weather.click();
  await page.waitForTimeout(500);
  const weatherState = await weather.getAttribute('data-state');
  log('WEATHER data-state:', weatherState);
  if (weatherState !== 'active') throw new Error('Weather Forecast tab not active after click');
  await page.screenshot({ path: `${dir}/weather-forecast-selected.png` });
}

async function runAuthForms(page) {
  const dir = `${ARTIFACTS}/auth-forms`;
  await page.goto(`${BASE}/sign-in`, { waitUntil: 'networkidle', timeout: 60000 });
  const h = await page.getByRole('heading', { name: 'Sign In' }).textContent();
  log('SIGNIN HEADING:', h?.trim());
  if (h?.trim() !== 'Sign In') throw new Error('Sign In heading missing');
  const email = page.getByPlaceholder('Email');
  if (!(await email.isVisible())) throw new Error('Email field not visible');
  await page.screenshot({ path: `${dir}/sign-in.png` });

  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.waitForURL('**/sign-up', { timeout: 30000 });
  const nameField = page.getByPlaceholder('Your Name');
  if (!(await nameField.isVisible())) throw new Error('Name field not visible on sign-up');
  log('SIGNUP reached, Name field visible');
  await page.screenshot({ path: `${dir}/sign-up.png` });
}
