import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { preferredType, parseAccept } from "../lib/accept-markdown.ts";

describe("preferredType", () => {
  it("defaults to text/html when Accept is missing", () => {
    assert.equal(preferredType(null), "text/html");
  });

  it("prefers text/markdown when listed first among equals", () => {
    assert.equal(
      preferredType("text/markdown, text/html, */*"),
      "text/markdown",
    );
  });

  it("prefers higher q-value", () => {
    assert.equal(
      preferredType("text/html;q=0.8, text/markdown;q=0.9"),
      "text/markdown",
    );
  });

  it("honors q=0 rejection of text/html via specificity", () => {
    assert.equal(preferredType("text/html;q=0, */*;q=1"), "text/markdown");
  });

  it("returns null when all produced types are rejected", () => {
    assert.equal(
      preferredType("text/html;q=0, text/markdown;q=0, application/pdf"),
      null,
    );
  });

  it("keeps browser-like Accept on HTML", () => {
    assert.equal(
      preferredType(
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      ),
      "text/html",
    );
  });
});

describe("parseAccept", () => {
  it("parses q values", () => {
    const entries = parseAccept("text/markdown;q=0.5, text/html");
    assert.equal(entries[0].type, "text/markdown");
    assert.equal(entries[0].q, 0.5);
    assert.equal(entries[1].q, 1);
  });
});
