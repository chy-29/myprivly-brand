// Sign-in sessions are shared by every app under myprivly.com: the Supabase cookie is set on
// ".myprivly.com", so signing in once on family.myprivly.com also signs you in on the others.
// Pass this to the Supabase clients as `cookieOptions`.

import { COOKIE_DOMAIN, ROOT_DOMAIN } from "./apps.js";

/** True for myprivly.com and any subdomain of it (not localhost, not *.vercel.app previews). */
export function isSuiteHost(hostname = "") {
  return hostname === ROOT_DOMAIN || hostname.endsWith(`.${ROOT_DOMAIN}`);
}

/**
 * Cookie options for the Supabase auth session. Empty off the suite's domain, so local
 * development and preview deployments keep ordinary per-host cookies.
 *
 * @param {string} hostname the host the request or page is on (no port)
 */
export function sharedCookieOptions(hostname = "") {
  if (!isSuiteHost(hostname)) return {};
  return { domain: COOKIE_DOMAIN, path: "/", sameSite: "lax", secure: true };
}
