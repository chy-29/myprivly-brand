# Adding a new app to myprivly.com

1. **Pick the name and subdomain.** `<id>.myprivly.com`, one short lowercase word. Add an entry to `apps.js` (name, url, EN and ES tagline) and bump the version.
2. **DNS (Bluehost).** CNAME `<id>` to the host (Vercel: `cname.vercel-dns.com`), or an A record for a VM. Leave MX and email records alone.
3. **Hosting.** New Vercel project (or server block) with the domain attached.
4. **Account.** Use the shared Supabase project. Create the Supabase client with `cookieOptions: { domain: ".myprivly.com" }`, add `https://<id>.myprivly.com/auth/callback` to Supabase's redirect URLs, and treat `profiles` as the per-user record. An app that needs its own tables gets its own Postgres schema named after the app.
5. **Look.** Import `tokens.css`, add `themeInitScript()` to `<head>`, and use `THEME_COOKIE`/`FONT_COOKIE` for the Light/Dark/typeface choice.
6. **Icons and manifest.** Run `npx myprivly-make-icons`, set `theme_color` and `background_color` from the tokens.
7. **Navigation.** Show the mark and the app's name top-left, and an app switcher built from `APPS`.
8. **Languages.** English and Spanish for every word, same as the other apps.
9. **Check.** Sign in on one app and open another: no second login. Light and dark, phone and desktop, contrast, keyboard focus.
