// Theme and typeface choices live in a cookie on .myprivly.com so they carry across apps
// (localStorage is per subdomain). Values are checked before use: only short lowercase words.

export const THEME_COOKIE = "mp_theme";
export const FONT_COOKIE = "mp_font";

const SAFE = /^[a-z][a-z-]{0,19}$/;

/** Read one cookie from a `document.cookie`-style string. Returns null if absent or not a safe word. */
export function readPref(cookieString, name) {
  for (const part of (cookieString || "").split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    if (part.slice(0, i).trim() !== name) continue;
    const value = part.slice(i + 1).trim();
    return SAFE.test(value) ? value : null;
  }
  return null;
}

/**
 * The cookie string to assign to `document.cookie`. Pass the page's hostname so local
 * development (localhost) gets a plain cookie instead of one for the wrong domain.
 * An empty or null value clears it.
 */
export function prefCookie(name, value, hostname = "") {
  const onSuite = hostname === "myprivly.com" || hostname.endsWith(".myprivly.com");
  const parts = [`${name}=${value && SAFE.test(value) ? value : ""}`, "Path=/", "SameSite=Lax"];
  parts.push(value ? "Max-Age=31536000" : "Max-Age=0");
  if (onSuite) parts.push("Domain=.myprivly.com", "Secure");
  return parts.join("; ");
}

/**
 * A tiny script for <head> that applies the saved theme and font before first paint.
 * `fonts` lists the data-font values this app understands. Static text only.
 */
export function themeInitScript(fonts = []) {
  const list = fonts.filter((f) => SAFE.test(f)).join("|");
  return (
    `try{var d=document.documentElement,c=document.cookie,` +
    `m=function(n){var r=c.match(new RegExp("(?:^|; )"+n+"=([a-z-]+)"));return r?r[1]:null},` +
    `t=m("${THEME_COOKIE}")||localStorage.getItem("theme");` +
    `if(t==="light"||t==="dark")d.setAttribute("data-theme",t);` +
    (list
      ? `var f=m("${FONT_COOKIE}")||localStorage.getItem("font");` +
        `if(f&&/^(${list})$/.test(f))d.setAttribute("data-font",f);`
      : "") +
    `}catch(e){}`
  );
}