import "server-only";

import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { defaultOgImageUrl } from "@/lib/site-assets";

const OG_LOCALE = "zh_TW";

/** Ahrefs 等工具常將過短描述標為問題；低於此字數時自動補上品牌語句（不影響已足夠長的文案）。 */
const MIN_DESCRIPTION_CHARS = 72;

const DESCRIPTION_SUFFIX =
  "品識學苑專注12年國教升學規劃與個人化學習，陪伴國小到高中學生建立學習節奏與成就感。";

function finalizeDescription(raw: string): string {
  const t = raw.trim();
  if (t.length >= MIN_DESCRIPTION_CHARS) {
    return t.length > 320 ? `${t.slice(0, 319)}…` : t;
  }
  const joiner = t && !/[。．.!！?？]$/u.test(t) ? "。" : "";
  const merged = `${t}${joiner}${DESCRIPTION_SUFFIX}`;
  return merged.length > 320 ? `${merged.slice(0, 319)}…` : merged;
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
};

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
}: BuildPageMetadataInput): Metadata {
  const url = pageCanonical(path);
  const images =
    ogImages && ogImages.length > 0
      ? ogImages.map((src) => ({ url: src }))
      : [{ url: defaultOgImageUrl() }];

  const twitterImages = images.map((i) => i.url);
  const shareTitle = resolvedShareTitle(title, titleAbsolute);
  const descriptionOut = finalizeDescription(description);

  return {
    ...(titleAbsolute ? { title: { absolute: title } } : { title }),
    description: descriptionOut,
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
