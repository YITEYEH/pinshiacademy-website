import { StickyLineCta } from "@/components/StickyLineCta";

const DISMISS_KEY = "psa_blog_sticky_line_dismissed";

export function ArticleStickyLineCta() {
  return (
    <StickyLineCta
      analyticsLabel="blog_article_sticky_line_consult"
      dismissKey={DISMISS_KEY}
    />
  );
}
