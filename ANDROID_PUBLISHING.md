# Publishing Water Tracker to the Google Play Store

This app is a single-file web app (`index.html`) wrapped in a native Android shell
with [Capacitor](https://capacitorjs.com/). Reminders use the native
`@capacitor/local-notifications` plugin. This guide takes you from this repo to a
live Play Store listing.

> **What you can automate vs. what only you can do.** The project scaffolding,
> icons, reminder feature, and build config are all in this repo. Creating the
> Google Play developer account, generating and safeguarding your signing key,
> writing the store listing, and submitting for review are steps **only you** can
> do — they require your identity, a payment method, and secret keys that must
> never be committed to git.

---

## 0. Prerequisites (install once)

- **Node.js 18+** — https://nodejs.org
- **Android Studio** (latest) — https://developer.android.com/studio
  - During setup, install the **Android SDK**, **SDK Platform (API 34+)**, and
    **Android SDK Build-Tools**.
- **JDK 17** — bundled with recent Android Studio (set `JAVA_HOME` to it if building from CLI).

---

## 1. Install dependencies & create the Android project

From the repo root:

```bash
npm install                 # installs Capacitor + plugins
npm run build               # copies index.html → www/
npx cap add android         # generates the native android/ project (one time)
npx cap sync                # copies web assets + plugins into android/
```

`npx cap add android` creates the `android/` folder — a normal Gradle project you
can open in Android Studio. Commit it after this step (it's your native project).

## 2. Generate app icons & splash

The 1024px icons and 2732px splash sources are in `assets/`
(`icon-only.png`, `icon-foreground.png`, `icon-background.png`, `splash.png`,
`splash-dark.png`). Generate all Android densities:

```bash
npx capacitor-assets generate --android
```

**Notification status-bar icon:** In Android Studio, right-click
`android/app/src/main/res` → **New → Image Asset → Icon Type: "Notification Icons"**,
name it **`ic_stat_drop`**, and use `assets/ic_stat_drop.svg` as the source. This is
the white silhouette Android shows in the status bar (referenced by
`capacitor.config.json`).

## 3. Run & test on a device

```bash
npx cap open android        # opens the project in Android Studio
```

Press **Run ▶** with an emulator or a USB device (Developer Mode + USB debugging on).

**Test reminders specifically:**
- Toggle **Reminders** on → Android 13+ prompts for the notification permission (allow it).
- Set a short interval and an active window that includes the current time; confirm a
  notification fires. (Tip: set the start hour to the current hour to get one soon.)
- Add glasses to reach the goal with **Stop when goal reached** on → confirm the day's
  remaining reminders stop.

> **Background reliability:** reminders use `AlarmManager` via the plugin. Some OEMs
> (Xiaomi, Oppo, etc.) aggressively kill background apps — if reminders are delayed,
> exempt the app from battery optimization in system settings. For exact timing on
> Android 12+, the app requests notification permission; exact-alarm scheduling is
> handled by the plugin with `allowWhileIdle`.

## 4. Set the version

Edit `android/app/build.gradle`:

```gradle
android {
  defaultConfig {
    applicationId "com.vb.watertracker"
    versionCode 1            // integer, increment on every Play upload
    versionName "1.0.0"      // user-visible string
  }
}
```

Bump `versionCode` for **every** upload to Play (even re-uploads of the same version).

## 5. Create your signing key (keep it secret forever)

Your key identifies you as the publisher — **if you lose it you can't update the app.**
Store it and its passwords in a password manager; never commit them.

```bash
keytool -genkey -v -keystore water-tracker-release.jks \
  -alias water-tracker -keyalg RSA -keysize 2048 -validity 10000
```

Create `android/keystore.properties` (already git-ignored) — do **not** commit it:

```properties
storeFile=/absolute/path/to/water-tracker-release.jks
storePassword=YOUR_STORE_PASSWORD
keyAlias=water-tracker
keyPassword=YOUR_KEY_PASSWORD
```

Wire it into `android/app/build.gradle` (above `android { }`):

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file("keystore.properties")
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

and inside `android { }`:

```gradle
signingConfigs {
    release {
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
    }
}
```

> **Recommended:** also enable **Play App Signing** in the Play Console (default for new
> apps). You upload with your key; Google manages the final signing key.

## 6. Build the release bundle (.aab)

```bash
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab` — this is what you
upload to Play. (Or in Android Studio: **Build → Generate Signed Bundle / APK → Android App Bundle**.)

## 7. Google Play Console — one-time account

1. Go to https://play.google.com/console and create a **developer account**
   (one-time **$25** fee; requires ID verification).
2. **Create app** → name **Water Tracker**, default language, "App", "Free".

## 8. Fill the store listing

Prepare these assets (you can screenshot the running app for the phone shots):

- **App icon:** 512×512 PNG (export from `assets/icon-only.png`).
- **Feature graphic:** 1024×500 PNG.
- **Phone screenshots:** 2–8 images (e.g. the ring, history graph, reminders card).
- **Short description** (≤80 chars) and **full description**.
- **Category:** Health & Fitness.
- **Contact email.**

## 9. Required policy declarations

- **Privacy policy URL** — required. Water Tracker stores everything locally
  (`localStorage`) and collects/transmits **no** personal data, but Play still requires a
  hosted privacy-policy page. A starter is in `PRIVACY.md` — host it (e.g. GitHub Pages)
  and paste the URL.
- **Data safety form:** declare **no data collected / no data shared**. Note that the app
  uses notifications (reminders) — there's a section for that.
- **Content rating:** complete the questionnaire (this app rates "Everyone").
- **Target audience**, **ads** (none), and **news** declarations.

## 10. Upload & release

1. **Testing → Internal testing** → create a release → upload the `.aab` → add testers →
   roll out. Install via the opt-in link and verify everything, especially notifications.
2. When happy: **Production → Create release** → upload the same/newer `.aab` → review →
   **Roll out to production**.
3. First review typically takes a few hours to a few days.

## Updating later

```bash
# after editing index.html or native code
npm run build && npx cap sync
# bump versionCode/versionName in android/app/build.gradle
cd android && ./gradlew bundleRelease
# upload the new .aab to a new Play release
```

---

### Handy references
- Capacitor Android: https://capacitorjs.com/docs/android
- Local Notifications plugin: https://capacitorjs.com/docs/apis/local-notifications
- Play Console: https://support.google.com/googleplay/android-developer
