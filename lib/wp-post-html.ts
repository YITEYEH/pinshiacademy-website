import "server-only";

function escapeAttr(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/**
 * 文章內文來自 WordPress HTML：補 lazy、缺漏或空白 alt，降低爬蟲「缺 alt」與效能告警。
 * 無法修復遠端 404 圖檔，仍須於後台更新圖片網址。
 */
export function sanitizeWpPostHtml(html: string, postTitle: string): string {
  const base = postTitle.trim() || "品識學苑學習專欄";
  const fallbackAlt = escapeAttr(`${base.slice(0, 80)}｜內文附圖`);

  return html.replace(/<img\b([^>]*)>/gi, (_full, attrs: string) => {
    let next = attrs;
    if (!/\bloading\s*=/i.test(next)) {
      next = `${next} loading="lazy"`;
    }
    const emptyAlt = /\balt\s*=\s*["']\s*["']/i.test(next);
    const hasAlt = /\balt\s*=/i.test(next);
    if (!hasAlt || emptyAlt) {
      if (!hasAlt) {
        next = `${next} alt="${fallbackAlt}"`;
      } else {
        next = next.replace(/\balt\s*=\s*["'][^"']*["']/i, `alt="${fallbackAlt}"`);
      }
    }
    return `<img${next}>`;
  });
}
