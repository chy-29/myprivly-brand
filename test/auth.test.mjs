import test from "node:test";
import assert from "node:assert/strict";
import { isSuiteHost, sharedCookieOptions } from "../auth.js";

test("suite hosts get a cookie shared across subdomains", () => {
  for (const h of ["myprivly.com", "family.myprivly.com", "money.myprivly.com"]) {
    assert.equal(isSuiteHost(h), true);
    assert.deepEqual(sharedCookieOptions(h), { domain: ".myprivly.com", path: "/", sameSite: "lax", secure: true });
  }
});

test("other hosts keep ordinary per-host cookies", () => {
  for (const h of ["localhost", "", "myprivly-hub.vercel.app", "evilmyprivly.com", "myprivly.com.evil.io"]) {
    assert.equal(isSuiteHost(h), false);
    assert.deepEqual(sharedCookieOptions(h), {});
  }
});
