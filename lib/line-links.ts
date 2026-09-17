/** LINE 官方帳號 Basic ID（lin.ee 短網址會轉到 @700jglin） */
export const LINE_OA_BASIC_ID = "@700jglin";

/**
 * 家長點 CTA 進入 LINE 時預填的訊息模板。
 * 透過 https://line.me/R/oaMessage/... 帶入輸入框，需家長自行送出。
 */
export const LINE_CONSULT_PREFILL = `我想了解品識學苑的課程：

學生年級：
想加強的科目：
目前學習上遇到的狀況：
希望達成的目標：`;

/** 開啟官方帳號聊天室並預填訊息（UTF-8 percent-encode） */
export function buildLineOaMessageUrl(
  text: string = LINE_CONSULT_PREFILL,
): string {
  const encodedId = encodeURIComponent(LINE_OA_BASIC_ID);
  const encodedText = encodeURIComponent(text);
  return `https://line.me/R/oaMessage/${encodedId}/?${encodedText}`;
}

/**
 * 站內 CTA 預設用 lin.ee（桌面／無 JS 最穩）。
 * 手機端由 ExternalLinkOnce 改走 oaMessage 以帶預填。
 */
const LINE_BASE = {
  consult: "https://lin.ee/8nQNuYl",
  homeAssessment: "https://lin.ee/7j5iJiV",
  about: "https://lin.ee/5cE2MLo",
  coursesConsult: "https://lin.ee/9x27qTh",
  humanities: "https://lin.ee/5itUHpZ",
  stem: "https://lin.ee/rl0Wyvh",
} as const;

export type LineLinkKey = keyof typeof LINE_BASE;

/** 是否為站內 LINE CTA 網址（短網址或 line.me） */
export function isLineCtaUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === "lin.ee" || host === "line.me" || host.endsWith(".line.me");
  } catch {
    return false;
  }
}

/** 粗判手機／平板（有 LINE App 機率高）；桌面一律走 lin.ee */
export function isLikelyMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Windows Phone|Mobile/i.test(
    navigator.userAgent,
  );
}

/**
 * 依裝置選擇 LINE 連結：手機用預填 oaMessage，其餘用傳入的桌面連結。
 */
export function resolveLineHrefForDevice(desktopHref: string): string {
  if (!isLineCtaUrl(desktopHref)) return desktopHref;
  if (isLikelyMobileDevice()) return buildLineOaMessageUrl();
  return desktopHref;
}

/** @deprecated oaMessage 無法同時保留訊息與 UTM query；請用 GA 標籤追蹤 */
export function withLineUtm(baseUrl: string, campaign: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", "website");
  url.searchParams.set("utm_medium", "cta");
  url.searchParams.set("utm_campaign", campaign);
  return url.href;
}

/**
 * 依用途取得 LINE 桌面／預設連結。
 * campaign 保留參數以相容舊呼叫，實際歸因請看 analyticsLabel／cta_location。
 */
export function lineLink(key: LineLinkKey, campaign?: string): string {
  const base = LINE_BASE[key];
  return campaign ? withLineUtm(base, campaign) : base;
}

/** 全站 LINE 官方帳號連結（集中管理；手機預填由 ExternalLinkOnce 處理） */
export const LINE_LINKS: Record<LineLinkKey, string> = {
  consult: lineLink("consult"),
  homeAssessment: lineLink("homeAssessment"),
  about: lineLink("about"),
  coursesConsult: lineLink("coursesConsult"),
  humanities: lineLink("humanities"),
  stem: lineLink("stem"),
};

/** 築夢計畫專用 CTA（以 GA label／UTM campaign 區分用途） */
export const DREAM_PROJECT_LINE = {
  apply: lineLink("consult", "dream_project_apply"),
  teacher: lineLink("consult", "dream_project_teacher"),
  partner: lineLink("consult", "dream_project_partner"),
} as const;
