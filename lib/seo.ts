import "server-only";

import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { defaultOgImageUrl } from "@/lib/site-assets";

const OG_LOCALE = "zh_TW";
const DEFAULT_OG_WIDTH = 1200;
const DEFAULT_OG_HEIGHT = 630;

/**
 * Meta description 建議長度（繁中）：
 * - Google 約顯示 150–160 英文字元寬度，中文約 70–90 字較不易被截斷
 * - 過短（<50）工具常標警告；過長無益且易被省略
 */
const MIN_DESCRIPTION_CHARS = 50;
const MAX_DESCRIPTION_CHARS = 90;

const DESCRIPTION_SUFFIX =
  "先診斷弱點、再安排一對一或小班，陪伴會考與學測穩定進步";

function finalizeDescription(raw: string): string {
  const t = raw.trim();
  const endsWithEllipsis = /(?:…|\.\.\.)\s*$/u.test(t);
  let out = t;
  if (t.length < MIN_DESCRIPTION_CHARS && !endsWithEllipsis) {
    out = `${t}${DESCRIPTION_SUFFIX}`;
  }
  if (out.length > MAX_DESCRIPTION_CHARS) {
    return `${out.slice(0, MAX_DESCRIPTION_CHARS - 1)}…`;
  }
  return out;
}

function pageCanonical(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE.url : `${SITE.url}${normalized}`;
}

export type BuildPageMetadataInput = {
  /** URL path without domain, e.g. `/about` or `/` */
  path: string;
  title: string;
  description: string;
  /** Absolute image URLs for OG/Twitter; defaults to site logo */
  ogImages?: string[];
  /** Homepage-style title without layout template */
  titleAbsolute?: boolean;
  openGraphType?: "website" | "article";
  /** ISO 8601 date (YYYY-MM-DD or full ISO) for article pages */
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthors?: string[];
  articleSection?: string;
  articleTags?: string[];
  /** 預設允許索引；篩選頁、404 等可設為 false */
  index?: boolean;
  /** OG/Twitter 圖片 alt 文字 */
  ogImageAlt?: string;
};

function resolveOgImages(
  ogImages: string[] | undefined,
  alt: string,
): { url: string; width: number; height: number; alt: string }[] {
  const sources =
    ogImages && ogImages.length > 0 ? ogImages : [defaultOgImageUrl()];

  return sources.map((src) => ({
    url: src,
    width: DEFAULT_OG_WIDTH,
    height: DEFAULT_OG_HEIGHT,
    alt,
  }));
}

export function buildNotFoundMetadata(path: string, label: string): Metadata {
  return buildPageMetadata({
    path,
    title: `找不到${label}`,
    description: `您所尋找的${label}不存在或已移除，請返回品識學苑首頁`,
    titleAbsolute: true,
    index: false,
  });
}

function resolvedShareTitle(title: string, titleAbsolute: boolean): string {
  if (titleAbsolute) return title;
  return `${title}｜${SITE.name}`;
}

export function buildPageMetadata({
  path,
  title,
  description,
  ogImages,
  titleAbsolute = false,
  openGraphType = "website",
  articlePublishedTime,
  articleModifiedTime,
  articleAuthors,
  articleSection,
  articleTags,
  index = true,
  ogImageAlt,
}: BuildPageMetadataInput): Metadata {
  const url = pageCanonical(path);
  const shareTitle = resolvedShareTitle(title, titleAbsolute);
  const imageAlt = ogImageAlt ?? shareTitle;
  const images = resolveOgImages(ogImages, imageAlt);
  const descriptionOut = finalizeDescription(description);
  const twitterImages = images.map((i) => i.url);

  return {
    ...(titleAbsolute ? { title: { absolute: title } } : { title }),
    description: descriptionOut,
    robots: { index, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: openGraphType,
      url,
      title: shareTitle,
      description: descriptionOut,
      locale: OG_LOCALE,
      siteName: SITE.name,
      images,
      ...(openGraphType === "article"
        ? {
            publishedTime: articlePublishedTime,
            modifiedTime: articleModifiedTime,
            authors: articleAuthors,
            section: articleSection,
            tags: articleTags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: descriptionOut,
      images: twitterImages,
    },
  };
}
