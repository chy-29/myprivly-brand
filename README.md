# @myprivly/brand

Shared brand pieces for the apps under **myprivly.com**: design tokens, the logo, an icon generator, the app registry and cross-app preferences.

| File | What it is |
|---|---|
| `tokens.css` | Colors, shadows, glass and glow values with light/dark and `data-theme="light\|dark"`. The semantic names (`--bg --surface --ink --accent ...`). |
| `logo/mark.svg` | The violet hexagon "P", transparent background. `mark-mono.svg` uses `currentColor`. `app-icon.svg` / `app-icon-512.png` are the mark on the dark violet icon background. |
| `apps.js` | The list of apps (`APPS`), `COOKIE_DOMAIN` and `HUB_URL`. The hub cards and each app's app switcher read it. |
| `prefs.js` | Theme and font stored in a cookie on `.myprivly.com` so they carry across apps, plus `themeInitScript()` for `<head>`. |
| `scripts/make-icons.mjs` | `npx myprivly-make-icons` writes PWA, favicon and apple icons from the mark. |
| `CHECKLIST.md` | Everything to do when adding a new app. |

## Use it

```json
"dependencies": { "@myprivly/brand": "github:chy-29/myprivly-brand#v1.0.0" }
```

```css
@import "@myprivly/brand/tokens.css";   /* Vite, or any CSS pipeline */
```

```js
import { APPS } from "@myprivly/brand/apps";
import { themeInitScript } from "@myprivly/brand/prefs";
```

Pin a tag (`#v1.0.0`) so an app only changes when you bump it on purpose.

## Changing the brand

Edit here, run `npm test`, then tag a new version (`git tag v1.1.0 && git push --tags`) and bump the tag in each app. Colors change in `tokens.css` only; apps never hard-code the accent.

The accent is the violet of the logo (`#5b3df5` light, `#8b7bff` dark). Every text/background pair in `tokens.css` was checked for 4.5:1 contrast; re-check any you change.
