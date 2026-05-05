import "server-only";

import type { Metadata } from "next";
import { SITE } from "@/lib/site";

const OG_LOCALE = "zh_TW";

const defaultOgImageUrl = () => `${SITE.url}/brand/logo.png`;

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
}: BuildPageMetadataInput): Metadata {
  const url = pageCanonical(path);
  const images =
    ogImages && ogImages.length > 0
      ? ogImages.map((src) => ({ url: src }))
      : [{ url: defaultOgImageUrl() }];

  const twitterImages = images.map((i) => i.url);
  const shareTitle = resolvedShareTitle(title, titleAbsolute);

  return {
    ...(titleAbsolute ? { title: { absolute: title } } : { title }),
    description,
    alternates: { canonical: url },
    openGraph: {
      type: openGraphType,
      url,
      title: shareTitle,
      description,
      locale: OG_LOCALE,
      siteName: SITE.name,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: twitterImages,
    },
  };
}
