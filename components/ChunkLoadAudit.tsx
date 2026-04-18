"use client";

import { useEffect } from "react";

/**
 * Debug-only: reports whether the loaded document still references old
 * `app/(site)/` chunk URLs (common cause of ChunkLoadError / 400).
 */
export function ChunkLoadAudit() {
  useEffect(() => {
    const scripts = Array.from(
      document.querySelectorAll("script[src*='/_next/static/chunks/']"),
    ).map((el) => (el as HTMLScriptElement).src);
    const bad = scripts.filter((src) => src.includes("/(site)/"));
    // #region agent log
    fetch("http://127.0.0.1:7442/ingest/95c05a26-70b9-4505-b92d-505284b8a457", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "a8dacb",
      },
      body: JSON.stringify({
        sessionId: "a8dacb",
        hypothesisId: "H_BROWSER_CHUNKS",
        location: "ChunkLoadAudit.tsx:mount",
        message: "script tags chunk URL audit",
        data: {
          href: typeof window !== "undefined" ? window.location.href : "",
          scriptCount: scripts.length,
          badSiteChunkRefs: bad,
          hasStaleSiteChunks: bad.length > 0,
        },
        timestamp: Date.now(),
        runId: "client-audit",
      }),
    }).catch(() => {});
    // #endregion
  }, []);

  return null;
}
