import Link from "next/link";
import { LineCtaLabel } from "@/components/LineCtaLabel";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LINE_LINKS } from "@/lib/line-links";
import { getArticleConsultCta } from "@/lib/blog-article-cta";

type Props = {
  /** WordPress 文章分類；未對應時使用預設 CTA */
  category?: string;
  analyticsLabel?: string;
  className?: string;
};

export function ArticleConsultCta({
  category,
  analyticsLabel,
  className = "mt-12 max-w-[42rem] mx-auto",
}: Props) {
  const cta = getArticleConsultCta(category);
  const label = analyticsLabel ?? cta.analyticsLabel;

  return (
    <div
      role="complementary"
      aria-label="升學諮詢"
      className={`rounded-xl border border-primary/20 bg-primary/5 p-6 ${className}`}
    >
      <p
        className={`text-sm font-semibold text-foreground ${cta.description ? "mb-1" : "mb-4"}`}
      >
        {cta.title}
      </p>
      {cta.description ? (
        <p className="text-sm text-muted-foreground mb-4">{cta.description}</p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
          <ExternalLinkOnce href={LINE_LINKS.consult} analyticsLabel={label}>
            <LineCtaLabel iconClassName="size-4" label={cta.lineButtonLabel} />
          </ExternalLinkOnce>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href="/courses">查看課程</Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href="/faq">常見問題</Link>
        </Button>
      </div>
    </div>
  );
}
