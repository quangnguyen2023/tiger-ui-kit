# Auth forms

The sign-in and sign-up screens let a visitor enter credentials and switch between
the two forms. Sign-up adds a name field; both offer social login and an email or
password form. Submitting needs a backend (absent here), so verification covers
rendering, the fields present, and the toggle between the two forms, not a
completed login.

## Sub-features

- `signin-render` shows the Sign In form with Email and Password fields.
- `signup-render` shows the Sign Up form with an added Name field.
- `auth-toggle` switches from Sign In to Sign Up via the footer link.

## How to get to it (user POV)

- Open `http://127.0.0.1:3100/sign-in` (also linked as "Sign In" in the landing
  page header).
- From the sign-in form, choose the "Sign Up" link at the bottom to switch forms.

## Driving it with the harness

Preconditions:

- The app is healthy per the doctor check (`home: 200`, `identity: ok`).
- No auth session cookie is set (an authenticated visitor is redirected away from
  `/sign-in` by middleware to `/widget-customizer/my-widgets`). A fresh harness run
  has no session.

- **Open sign-in.** Open `/sign-in`. The harness runs
  `page.goto('http://127.0.0.1:3100/sign-in')` and reads
  `getByRole('heading', { name: 'Sign In' })`. Result: heading is `Sign In`
  (printed as `SIGNIN HEADING:`).
- **Confirm the email field.** The harness checks
  `getByPlaceholder('Email')` is visible. Result: visible; screenshot
  `artifacts/auth-forms/sign-in.png` is written.
- **Toggle to sign-up.** Choose the switch link. The harness clicks
  `getByRole('link', { name: 'Sign Up' })` and waits for URL `**/sign-up`. Result:
  the sign-up form's `getByPlaceholder('Your Name')` field is visible (printed as
  `SIGNUP reached, Name field visible`); screenshot `artifacts/auth-forms/sign-up.png`.
- **Proof.** Run
  `env -u NODE_OPTIONS node .kiro/skills/verify-tiger-ui-kit/harness/drive.mjs auth-forms`.
  Success is `DRIVE OK` with the two heading/field lines and two screenshots under
  `artifacts/auth-forms/`.

## Gotchas

- Do not attempt a real submit: there is no auth backend here, so a credentials
  submit cannot succeed and is not what this feature proves.
- Middleware redirects `/sign-in` and `/sign-up` to the customizer when a session
  token exists. Drive only from a fresh, unauthenticated run.
- The Name field exists only on `/sign-up`. Asserting it on `/sign-in` is wrong.
- Email and Password inputs are identified by placeholder text, not by label
  element; use `getByPlaceholder`.
