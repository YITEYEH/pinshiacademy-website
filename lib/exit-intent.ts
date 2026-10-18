/** localStorage：關閉／繼續瀏覽／點 LINE 後，多久內不再顯示 */
export const EXIT_INTENT_STORAGE_KEY = "psa_exit_intent_line_v2";

/** sessionStorage：同一瀏覽工作階段最多出現一次 */
export const EXIT_INTENT_SESSION_KEY = "psa_exit_intent_line_session_v2";

export const EXIT_INTENT_SUPPRESS_MS = 24 * 60 * 60 * 1000;

export const EXIT_INTENT_DESKTOP = {
  minDwellMs: 30_000,
  minScrollRatio: 0.5,
} as const;

export const EXIT_INTENT_MOBILE = {
  minDwellMs: 45_000,
  minScrollRatio: 0.6,
} as const;

export const EXIT_INTENT_LINE_HREF = "https://lin.ee/8nQNuYl";

export const EXIT_INTENT_EXCLUDE_PATHS = [
  "/privacy",
  "/terms",
  "/refund",
] as const;

type ExitIntentStorage = {
  suppressedUntil: number;
};

export function isExitIntentExcludedPath(pathname: string): boolean {
  return EXIT_INTENT_EXCLUDE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function isExitIntentSuppressed(): boolean {
  try {
    if (sessionStorage.getItem(EXIT_INTENT_SESSION_KEY) === "1") return true;
    const raw = localStorage.getItem(EXIT_INTENT_STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw) as ExitIntentStorage;
    if (
      typeof data.suppressedUntil === "number" &&
      Date.now() < data.suppressedUntil
    ) {
      return true;
    }
    localStorage.removeItem(EXIT_INTENT_STORAGE_KEY);
    return false;
  } catch {
    return false;
  }
}

/** 本工作階段標記已顯示，避免同 session 再跳 */
export function markExitIntentShownThisSession() {
  try {
    sessionStorage.setItem(EXIT_INTENT_SESSION_KEY, "1");
  } catch {
    // ignore
  }
}

/** 關閉、繼續瀏覽、或點 LINE 後，1 天內不再顯示 */
export function suppressExitIntentForOneDay() {
  try {
    const payload: ExitIntentStorage = {
      suppressedUntil: Date.now() + EXIT_INTENT_SUPPRESS_MS,
    };
    localStorage.setItem(EXIT_INTENT_STORAGE_KEY, JSON.stringify(payload));
    sessionStorage.setItem(EXIT_INTENT_SESSION_KEY, "1");
  } catch {
    // ignore
  }
}

export function getDocumentScrollRatio(): number {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop || 0;
  const viewport = window.innerHeight || doc.clientHeight || 0;
  const height = Math.max(doc.scrollHeight, doc.offsetHeight, viewport);
  const traversable = Math.max(height - viewport, 1);
  return Math.min(1, Math.max(0, scrollTop / traversable));
}

export function isMobileViewport(): boolean {
  return window.matchMedia("(max-width: 767px)").matches;
}
