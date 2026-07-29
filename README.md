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
- **Goal-reached celebration** when you hit your target.
- **Saved locally** — your goal and full history persist in the browser via `localStorage`.

## Run it

Open `index.html` in any modern browser:

```bash
# from the project folder
open index.html        # macOS
# or just double-click the file, or drag it into a browser tab
```

On a phone, open the same file/URL — it fills the screen and behaves like a
mobile app (add it to your home screen for a PWA-like experience).

## Notes

- Each glass is counted as **250 ml**. Water volumes shown throughout the app
  (current, goal, and history totals) are derived from this glass size.
- All data stays on your device — nothing is sent anywhere.
