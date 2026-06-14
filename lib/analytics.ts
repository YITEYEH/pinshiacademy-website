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

/** 聯絡頁 Email 點擊 */
export function trackContactEmail() {
  trackEvent("contact_email_click");
}
