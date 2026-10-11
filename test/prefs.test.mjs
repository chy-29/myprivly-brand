import test from "node:test";
import assert from "node:assert/strict";
import { prefCookie, readPref, themeInitScript } from "../prefs.js";

test("readPref returns safe words only", () => {
  assert.equal(readPref("a=1; mp_theme=dark; b=2", "mp_theme"), "dark");
  assert.equal(readPref("mp_theme=<script>", "mp_theme"), null);
  assert.equal(readPref("", "mp_theme"), null);
  assert.equal(readPref("other=dark", "mp_theme"), null);
});

test("prefCookie is shared across the suite on myprivly.com, plain on localhost", () => {
  const live = prefCookie("mp_theme", "dark", "family.myprivly.com");
  assert.match(live, /Domain=\.myprivly\.com/);
  assert.match(live, /Secure/);
  assert.doesNotMatch(prefCookie("mp_theme", "dark", "localhost"), /Domain=/);
  assert.match(prefCookie("mp_theme", null, "localhost"), /Max-Age=0/);
});

test("prefCookie drops unsafe values", () => {
  assert.match(prefCookie("mp_theme", "x; evil=1", "localhost"), /^mp_theme=; /);
});

test("themeInitScript only mentions the fonts it is given", () => {
  assert.match(themeInitScript(["serif", "modern"]), /serif\|modern/);
  assert.doesNotMatch(themeInitScript(), /data-font/);
  assert.doesNotMatch(themeInitScript(["bad font!"]), /bad font/);
});