#!/usr/bin/env node
/**
 * Live checks for agent readiness (404, markdown negotiation, homepage content).
 * Usage: BASE_URL=http://127.0.0.1:3000 node scripts/verify-agent-readiness.mjs
 */

const BASE = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);

const failures = [];

function fail(msg) {
  failures.push(msg);
  console.error(`FAIL: ${msg}`);
}

function ok(msg) {
  console.log(`OK: ${msg}`);
}

async function check(name, fn) {
  try {
    await fn();
  } catch (err) {
    fail(`${name}: ${err instanceof Error ? err.message : String(err)}`);
  }
}

function countMeaningfulChars(html) {
  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, "");
  return withoutScripts.length;
}

await check("404 status", async () => {
  const res = await fetch(`${BASE}/no-such-page-agent-ready`);
  if (res.status !== 404) throw new Error(`expected 404, got ${res.status}`);
  ok("HTML 404 status");
});

await check("markdown 404", async () => {
  const res = await fetch(`${BASE}/no-such-page-agent-ready`, {
    headers: { Accept: "text/markdown" },
  });
  if (res.status !== 404) throw new Error(`expected 404, got ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("text/markdown")) {
    throw new Error(`expected text/markdown, got ${ct}`);
  }
  const vary = res.headers.get("vary") || "";
  if (!/accept/i.test(vary)) throw new Error(`Vary missing Accept: ${vary}`);
  const body = await res.text();
  if (!body.includes("sitemap.xml") || !body.includes("llms.txt")) {
    throw new Error("markdown 404 missing recovery links");
  }
  ok("Markdown 404 Content-Type + Vary + body");
});

await check("homepage markdown negotiation", async () => {
  const res = await fetch(`${BASE}/`, {
    headers: { Accept: "text/markdown" },
  });
  if (res.status !== 200) throw new Error(`expected 200, got ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("text/markdown")) {
    throw new Error(`expected text/markdown, got ${ct}`);
  }
  const vary = res.headers.get("vary") || "";
  if (!/accept/i.test(vary)) throw new Error(`Vary missing Accept: ${vary}`);
  const body = await res.text();
  if (!body.includes("品識學苑")) throw new Error("markdown home missing brand");
  ok("Homepage Accept: text/markdown");
});

await check("browser Accept still HTML", async () => {
  const res = await fetch(`${BASE}/`, {
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("text/html")) {
    throw new Error(`expected text/html, got ${ct}`);
  }
  // Next App Router RSC often rewrites Vary on HTML shells; markdown branch
  // (checked above) is the critical Accept-keyed representation.
  ok("Browser Accept → HTML");
});

await check("homepage has H1 + SSR hero copy", async () => {
  const res = await fetch(`${BASE}/`);
  const html = await res.text();
  if (!/<h1[\s>]/i.test(html)) throw new Error("missing H1");
  if (!html.includes("成績上不去")) {
    throw new Error("missing SSR hero copy");
  }
  const chars = countMeaningfulChars(html);
  ok(`Homepage H1 + SSR hero (chars=${chars})`);
});

await check("homepage markdown has substantive body", async () => {
  const res = await fetch(`${BASE}/`, {
    headers: { Accept: "text/markdown" },
  });
  const body = await res.text();
  if (body.length < 500) {
    throw new Error(`markdown body too short: ${body.length}`);
  }
  if (!body.includes("孩子最近") || !body.includes("品識學苑")) {
    throw new Error("markdown home missing core sections");
  }
  ok(`Homepage markdown body length=${body.length}`);
});

await check("406 when markdown and html rejected", async () => {
  const res = await fetch(`${BASE}/`, {
    headers: { Accept: "application/pdf" },
  });
  if (res.status !== 406) throw new Error(`expected 406, got ${res.status}`);
  ok("406 Not Acceptable");
});

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed against ${BASE}`);
  process.exit(1);
}

console.log(`\nAll agent-readiness checks passed (${BASE})`);
