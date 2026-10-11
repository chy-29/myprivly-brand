import test from "node:test";
import assert from "node:assert/strict";
import { APPS, COOKIE_DOMAIN, appById } from "../apps.js";

test("every app has a name, an https url on myprivly.com and both taglines", () => {
  for (const a of APPS) {
    assert.ok(a.name && a.id);
    const host = new URL(a.url).hostname;
    assert.equal(a.url.startsWith("https://"), true);
    assert.equal(host, `${a.id}.myprivly.com`);
    assert.ok(a.tagline.en && a.tagline.es);
  }
});

test("ids are unique and appById finds them", () => {
  assert.equal(new Set(APPS.map((a) => a.id)).size, APPS.length);
  assert.equal(appById("money")?.name, "Money");
  assert.equal(appById("nope"), undefined);
  assert.equal(COOKIE_DOMAIN, ".myprivly.com");
});