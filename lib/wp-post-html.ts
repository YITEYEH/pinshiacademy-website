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
  processed = stripEmbeddedSeoTags(processed);
  processed = removeWpShareBlocks(processed);
  processed = stripTrailingOrphanCloseTags(processed);

  const filteredToc = toc.filter((item) => !isShareHeading(item.text));

  return { html: processed, toc: filteredToc };
}

function isShareHeading(text: string) {
  return /分享此文|分享到|Share this|Share on/i.test(text);
}

/** WP 內文若殘留 canonical／meta robots，會與 Next metadata 衝突 */
function stripEmbeddedSeoTags(html: string): string {
  return html
    .replace(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/gi, "")
    .replace(/<meta\b[^>]*\bname\s*=\s*["']robots["'][^>]*>/gi, "")
    .replace(/<!--\s*notionvc:[^>]*-->/gi, "");
}

/** WordPress Jetpack 分享區塊殘留會破壞 DOM，導致後續 React 元件 hydration 失敗 */
function removeWpShareBlocks(html: string): string {
  let out = html;

  const cutFromShare = [
    /<h[23][^>]*>\s*分享此文[\s\S]*$/i,
    /<h[23][^>]*\bsd-title\b[^>]*>[\s\S]*$/i,
    /<div[^>]*\bsharedaddy\b[^>]*>[\s\S]*$/i,
    /<div[^>]*\bsd-sharing\b[^>]*>[\s\S]*$/i,
    /<div[^>]*\brobots-nocontent\b[^>]*\bsd-social\b[^>]*>[\s\S]*$/i,
  ];
  for (const pattern of cutFromShare) {
    out = out.replace(pattern, "");
  }

  let prev = "";
  while (out !== prev) {
    prev = out;
    out = out
      .replace(/<div[^>]*\bsharedaddy\b[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, "")
      .replace(/<div[^>]*\bsharedaddy\b[^>]*>[\s\S]*?<\/div>/gi, "")
      .replace(/<div[^>]*\bsd-sharing\b[^>]*>[\s\S]*?<\/div>/gi, "")
      .replace(/<ul[^>]*>[\s\S]*?<li[^>]*\bshare-(?:twitter|facebook|line)\b[\s\S]*?<\/ul>/gi, "")
      .replace(/<h3[^>]*\bsd-title\b[^>]*>[\s\S]*?<\/h3>/gi, "");
  }

  return out.trim();
}

/** 移除 WP 內文尾端多餘的闭合標籤，避免瀏覽器提前關閉 article-content 容器 */
function stripTrailingOrphanCloseTags(html: string): string {
  let out = html.trim();

  while (true) {
    const before = out;
    const tags = ["div", "p", "section", "article", "aside"] as const;

    for (const tag of tags) {
      const open = (out.match(new RegExp(`<${tag}\\b`, "gi")) ?? []).length;
      const close = (out.match(new RegExp(`</${tag}>`, "gi")) ?? []).length;
      const trailing = new RegExp(`</${tag}>\\s*$`, "i");

      if (close > open && trailing.test(out)) {
        out = out.replace(trailing, "").trim();
      }
    }

    if (out === before) break;
  }

  return out;
}

/** @deprecated 請改用 prepareArticleHtml */
export function sanitizeWpPostHtml(html: string, postTitle: string): string {
  return prepareArticleHtml(html, postTitle).html;
}
