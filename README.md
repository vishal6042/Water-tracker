# 💧 Water Tracker

A clean, mobile-styled web app to track your daily water intake. Set a glass goal,
tap to log each glass, and watch a blue progress ring fill up — with a full history
of everything you've drunk.

No build step, no dependencies. It's a single self-contained `index.html`.

## Features

- **Set a daily goal** — choose how many glasses you want to drink (default 8).
- **Blue theme** rendered inside a phone-style frame — looks like a real mobile app.
- **Circular progress ring** showing `current / target` glasses and the water volume in **ml**.
- **Add / Remove glass** buttons to log or undo a drink.
- **Today's Log** — every glass appears with the **time** you drank it (e.g. `8:15 AM · 250 ml`), newest first.
- **History** — a **bar graph** with three navigable ranges (tap ‹ / › to move between periods, capped at the present):
  - **Daily** — one bar per hour (24h) of the selected day, with a `X / target glasses` summary.
  - **Monthly** — one bar per day (1–28/29/30/31) of the selected month, with a **goal line** at your daily target.
  - **Yearly** — one bar per month (Jan–Dec) of the selected year, with a **goal line** scaled per month (daily goal × days in that month).
  - The current period is highlighted, tap any bar to read its exact value, plus all-time totals (glasses, litres, active days).
- **Reminders** — opt-in notifications to drink water, with an on/off toggle, a
  configurable **interval** (1–4h), **active hours** (so it doesn't buzz overnight), and
  **stop when goal reached**. Real background notifications in the Android app; a
  while-open fallback in the browser.
- **Goal-reached celebration** when you hit your target.
- **Saved locally** — your goal, history, and reminder settings persist via `localStorage`.

## Run it (web)

Open `index.html` in any modern browser:

```bash
# from the project folder
open index.html        # macOS
# or just double-click the file, or drag it into a browser tab
```

On a phone, open the same file/URL — it fills the screen and behaves like a
mobile app (add it to your home screen for a PWA-like experience).

## Android app (Google Play)

This project is also set up as a native Android app via [Capacitor](https://capacitorjs.com/),
reusing the same `index.html` and adding real background notifications for reminders.

```bash
npm install
npm run build          # copies index.html → www/
npx cap add android    # creates the native android/ project (one time)
npx cap sync
npx cap open android   # build & run in Android Studio
```

App id: `com.vb.watertracker`. Full step-by-step publishing instructions (icons,
signing, Play Console, data-safety) are in **[ANDROID_PUBLISHING.md](ANDROID_PUBLISHING.md)**.
Icon/splash sources live in `assets/`; the privacy policy is in `PRIVACY.md`.

## Notes

- Each glass is counted as **250 ml**. Water volumes shown throughout the app
  (current, goal, and history totals) are derived from this glass size.
- All data stays on your device — nothing is sent anywhere.
