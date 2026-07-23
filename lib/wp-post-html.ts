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

const WP_ORIGIN = "https://blog.pinshiacademy.com";
const WP_PHOTON_PREFIX =
  /^https?:\/\/(?:i[0-3]|c[0-1])\.wp\.com\/blog\.pinshiacademy\.com/i;

/** 將 WP Photon CDN 網址改為來源站直連，避免爬蟲對 CDN／查詢參數回 404 */
export function normalizeWpImageUrl(url: string): string {
  let normalized = url
    .trim()
    .replace(/&#0*38;/gi, "&")
    .replace(/&amp;/gi, "&");

  if (WP_PHOTON_PREFIX.test(normalized)) {
    normalized = normalized.replace(WP_PHOTON_PREFIX, WP_ORIGIN);
  }

  try {
    const parsed = new URL(normalized);
    if (
      parsed.hostname === "blog.pinshiacademy.com" &&
      parsed.pathname.includes("/wp-content/uploads/")
    ) {
      parsed.search = "";
      parsed.hash = "";
      return parsed.toString();
    }
  } catch {
    // 保留原 URL
  }

  return normalized;
}

function normalizeImageAttrValue(attr: string, value: string): string {
  if (attr.toLowerCase() === "srcset") {
    return value
      .split(",")
      .map((part) => {
        const bits = part.trim().split(/\s+/);
        if (bits[0]) bits[0] = normalizeWpImageUrl(bits[0]);
        return bits.join(" ");
      })
      .join(", ");
  }

  return normalizeWpImageUrl(value);
}

function normalizeImageAttrs(attrs: string): string {
  return attrs.replace(
    /\b(src|srcset)=(["'])([\s\S]*?)\2/gi,
    (match, attr: string, quote: string, value: string) => {
      const normalized = normalizeImageAttrValue(attr, value);
      if (normalized === value) return match;
      return `${attr}=${quote}${normalized}${quote}`;
    },
  );
}

function sanitizeImages(html: string, postTitle: string): string {
  const base = postTitle.trim() || "品識學苑學習專欄";
  const fallbackAlt = escapeAttr(`${base.slice(0, 80)}｜內文附圖`);

  return html.replace(/<img\b([^>]*)>/gi, (_full, attrs: string) => {
    let next = normalizeImageAttrs(attrs);
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
  processed = stripStrayTailwindClasses(processed);
  processed = stripEmbeddedSeoTags(processed);
  processed = removeWpShareBlocks(processed);
  processed = mergeConsecutiveSiblingLists(processed);
  processed = renumberFragmentedOrderedLists(processed);
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

const TAILWIND_CLASS_TOKEN =
  /^(?:(?:sm|md|lg|xl|2xl):)?(?:text-(?:\[[^\]]+\]|[a-z0-9-]+)|font-(?:\[[^\]]+\]|[a-z0-9-]+)|leading-(?:\[[^\]]+\]|[a-z0-9-]+)|tracking-(?:\[[^\]]+\]|[a-z0-9-]+)|(?:m[trblxy]?|p[trblxy]?)-(?:\[[^\]]+\]|\d+)|text-foreground|text-muted-foreground|text-primary|bg-\S+|border-\S+|rounded-\S+|flex\S*|grid\S*|gap-\S+|items-\S+|justify-\S+|w-\S+|h-\S+|max-w-\S+|mx-\S+|my-\S+|opacity-\S+|transition\S*|hover:\S+|group\S*)$/;

/** WP 內文若殘留本站 React 元件的 Tailwind class，會被套用成標題字級 */
function stripStrayTailwindClasses(html: string): string {
  return html.replace(/\sclass=(["'])([\s\S]*?)\1/gi, (_full, quote: string, classValue: string) => {
    const tokens = classValue.trim().split(/\s+/).filter(Boolean);
    const kept = tokens.filter((token: string) => !TAILWIND_CLASS_TOKEN.test(token));
    if (kept.length === 0) return "";
    if (kept.length === tokens.length) return _full;
    return ` class=${quote}${kept.join(" ")}${quote}`;
  });
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

/**
 * WordPress／貼上內容常把連續編號拆成多個各自從 1 開始的 <ol>／<ul>。
 * 合併相鄰同類型清單，讓編號正確遞增（1、2、3…）。
 */
function mergeConsecutiveSiblingLists(html: string): string {
  let out = html;
  let prev = "";

  while (out !== prev) {
    prev = out;
    // </ol><ol>、</ol><p></p><ol> 這類「空段落夾在中間」也一併合併
    out = out.replace(
      /<\/ol>\s*(?:<(?:p|div)\b[^>]*>\s*<\/(?:p|div)>\s*)*<ol(\s[^>]*)?>/gi,
      (_match, attrs: string | undefined = "") => {
        // 第二個清單若有明確 start（且不是 1），視為刻意另起編號，不合併
        const start = attrs.match(/\bstart\s*=\s*["']?(\d+)/i)?.[1];
        if (start && start !== "1") return _match;
        return "";
      },
    );
    out = out.replace(
      /<\/ul>\s*(?:<(?:p|div)\b[^>]*>\s*<\/(?:p|div)>\s*)*<ul(\s[^>]*)?>/gi,
      "",
    );
  }

  return out;
}

function countListItems(listInnerHtml: string): number {
  return (listInnerHtml.match(/<li\b/gi) ?? []).length;
}

function withOlStart(attrs: string | undefined, start: number): string {
  const cleaned = (attrs ?? "")
    .replace(/\s*\bstart\s*=\s*(["']?)\d+\1/gi, "")
    .trim();
  const startAttr = ` start="${start}"`;
  return cleaned ? ` ${cleaned}${startAttr}` : startAttr;
}

/**
 * WP 常把「編號標題 + 下方說明段落」拆成多個只有一項的 <ol>，
 * 中間夾著 <p>，導致畫面全是 1.。對這類連續單項清單補上 start。
 */
function renumberFragmentedOrderedLists(html: string): string {
  const olRe = /<ol(\s[^>]*)?>([\s\S]*?)<\/ol>/gi;
  const matches = [...html.matchAll(olRe)];
  if (matches.length < 2) return html;

  type OlHit = {
    index: number;
    end: number;
    full: string;
    attrs: string;
    inner: string;
    single: boolean;
  };

  const ols: OlHit[] = matches.map((match) => {
    const full = match[0];
    const attrs = match[1] ?? "";
    const inner = match[2] ?? "";
    const index = match.index ?? 0;
    return {
      index,
      end: index + full.length,
      full,
      attrs,
      inner,
      single: countListItems(inner) === 1,
    };
  });

  const replacements = new Map<number, string>();
  let i = 0;

  while (i < ols.length) {
    if (!ols[i].single) {
      i += 1;
      continue;
    }

    const group = [ols[i]];
    let j = i + 1;

    while (j < ols.length && ols[j].single) {
      const between = html.slice(group[group.length - 1].end, ols[j].index);
      // 中間只能有段落／空白等說明文字；碰到標題或其他清單就斷開
      if (/<(?:h[1-6]|ul|table|blockquote)\b/i.test(between)) break;
      if (/<ol\b/i.test(between)) break;
      group.push(ols[j]);
      j += 1;
    }

    if (group.length >= 2) {
      group.forEach((ol, offset) => {
        const start = offset + 1;
        const existing = ol.attrs.match(/\bstart\s*=\s*["']?(\d+)/i)?.[1];
        if (existing && existing !== "1" && Number(existing) !== start) {
          return;
        }
        replacements.set(
          ol.index,
          `<ol${withOlStart(ol.attrs, start)}>${ol.inner}</ol>`,
        );
      });
    }

    i = j;
  }

  if (replacements.size === 0) return html;

  let out = "";
  let cursor = 0;
  for (const ol of ols) {
    out += html.slice(cursor, ol.index);
    out += replacements.get(ol.index) ?? ol.full;
    cursor = ol.end;
  }
  out += html.slice(cursor);
  return out;
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
