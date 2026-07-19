"use client";

import Link from "next/link";
import { LineCtaLabel } from "@/components/LineCtaLabel";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LINE_LINKS } from "@/lib/line-links";
import { trackInternalNavClick } from "@/lib/analytics";
import { getArticleConsultCta } from "@/lib/blog-article-cta";

type Props = {
  /** WordPress 文章分類；未對應時使用預設 CTA */
  category?: string;
  analyticsLabel?: string;
  className?: string;
  /** compact：文章中段較精簡；full：文末完整版 */
  variant?: "full" | "compact";
};

export function ArticleConsultCta({
  category,
  analyticsLabel,
  className,
  variant = "full",
}: Props) {
  const cta = getArticleConsultCta(category);
  const label =
    analyticsLabel ??
    (variant === "compact"
      ? `${cta.analyticsLabel}_mid`
      : cta.analyticsLabel);
  const isCompact = variant === "compact";
  const wrapperClass =
    className ??
    (isCompact
      ? "mt-10 max-w-[42rem] mx-auto"
      : "mt-12 max-w-[42rem] mx-auto");

  return (
    <div
      role="complementary"
      aria-label="升學諮詢"
      className={`rounded-xl border border-primary/20 bg-primary/5 ${
        isCompact ? "p-4 sm:p-5" : "p-6"
      } ${wrapperClass}`}
    >
      <p className="text-sm font-semibold text-foreground mb-1">{cta.title}</p>
      {cta.description ? (
        <p
          className={`text-muted-foreground ${
            isCompact ? "text-xs mb-3 leading-relaxed" : "text-sm mb-4"
          }`}
        >
          {cta.description}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
          <ExternalLinkOnce href={LINE_LINKS.consult} analyticsLabel={label}>
            <LineCtaLabel iconClassName="size-4" label={cta.lineButtonLabel} />
          </ExternalLinkOnce>
        </Button>
        {cta.secondaryLinks.map((link) => (
          <Button key={link.href} size="sm" variant="outline" asChild>
            <Link
              href={link.href}
              onClick={() =>
                trackInternalNavClick(link.analyticsLabel, link.href)
              }
            >
              {link.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
