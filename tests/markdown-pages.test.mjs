import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  AGENT_RECOVERY_LINKS,
  buildNotFoundMarkdownBody,
} from "./fixtures/agent-recovery.mjs";

describe("buildNotFoundMarkdownBody", () => {
  it("includes sitemap and llms recovery links", () => {
    const body = buildNotFoundMarkdownBody({
      pathname: "/no-such-page",
      siteName: "品識學苑",
      englishName: "Pin Shi Academy",
      siteUrl: "https://www.pinshiacademy.com",
    });
    assert.match(body, /# 404 Not Found/);
    assert.match(body, /sitemap\.xml/);
    assert.match(body, /llms\.txt/);
    assert.match(body, /llms-full\.txt/);
    assert.match(body, /\/no-such-page/);
    assert.match(body, /www\.pinshiacademy\.com/);
  });

  it("lists core recovery paths", () => {
    const hrefs = AGENT_RECOVERY_LINKS.map((l) => l.href);
    for (const required of [
      "/",
      "/courses",
      "/teachers",
      "/faq",
      "/contact",
      "/blog",
    ]) {
      assert.ok(hrefs.includes(required), `missing ${required}`);
    }
  });
});
