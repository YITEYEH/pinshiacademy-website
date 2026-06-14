"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", eventName, params);
}

/** LINE 諮詢、外部 CTA 點擊 */
export function trackOutboundClick(label: string, href: string) {
  trackEvent("outbound_click", {
    link_label: label,
    link_url: href,
  });
}

/** Email 點擊（聯絡頁、Footer 等） */
export function trackContactEmail(source = "contact_page") {
  trackEvent("contact_email_click", { link_label: source });
}

/** Footer / 社群等外部連結 */
export function trackSocialClick(platform: string, href: string) {
  trackOutboundClick(`footer_social_${platform}`, href);
}

/** 文章分享（複製連結、Facebook、LINE） */
export function trackShareClick(action: "copy" | "facebook" | "line", url: string) {
  trackEvent("share_click", {
    share_method: action,
    content_url: url,
  });
}
