import "server-only";

import type { ArticleTocItem } from "@/content/content-api/types";

export type { ArticleTocItem };

function escapeAttr(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function stripHtml(text: string) {
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function sanitizeImages(html: string, postTitle: string): string {
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

/**
 * 文章內文來自 WordPress HTML：SEO 友善標題層級、錨點 id、圖片 alt/lazy。
 */
export function prepareArticleHtml(
  html: string,
  postTitle: string,
): { html: string; toc: ArticleTocItem[] } {
  let processed = html.replace(/<h1\b/gi, "<h2").replace(/<\/h1>/gi, "</h2>");

  const toc: ArticleTocItem[] = [];
  let headingIndex = 0;

  processed = processed.replace(
    /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level: string, attrs: string, inner: string) => {
      const text = stripHtml(inner);
      if (!text) return match;

      const existingId = attrs.match(/\bid\s*=\s*["']([^"']+)["']/i)?.[1];
      const id = existingId ?? `section-${++headingIndex}`;
      const levelNum = Number(level) as 2 | 3;

      toc.push({ id, text, level: levelNum });

      if (existingId) return match;

      return `<h${level}${attrs} id="${escapeAttr(id)}">${inner}</h${level}>`;
    },
  );

  processed = sanitizeImages(processed, postTitle);
  processed = removeWpShareBlocks(processed);

  return { html: processed, toc };
}

function removeWpShareBlocks(html: string): string {
  let prev = "";
  let out = html;

  while (out !== prev) {
    prev = out;
    out = out
      .replace(/<div[^>]*\bsharedaddy\b[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, "")
      .replace(/<div[^>]*\bsharedaddy\b[^>]*>[\s\S]*?<\/div>/gi, "")
      .replace(/<div[^>]*\bsd-sharing\b[^>]*>[\s\S]*?<\/div>/gi, "")
      .replace(/<h3[^>]*\bsd-title\b[^>]*>[\s\S]*?<\/h3>/gi, "");
  }

  return out.trim();
}

/** @deprecated 請改用 prepareArticleHtml */
export function sanitizeWpPostHtml(html: string, postTitle: string): string {
  return prepareArticleHtml(html, postTitle).html;
}
