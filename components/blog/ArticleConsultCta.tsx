import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LINE_LINKS } from "@/lib/line-links";

export function ArticleConsultCta() {
  return (
    <div
      role="complementary"
      aria-label="升學諮詢"
      className="mt-12 max-w-[42rem] mx-auto rounded-xl border border-primary/20 bg-primary/5 p-6"
    >
      <p className="text-sm font-semibold text-foreground mb-1">
        想進一步規劃學習方向？
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        品識學苑提供線上一對一與小班升學輔導，歡迎預約免費諮詢。
      </p>
      <div className="flex flex-wrap gap-3">
        <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
          <ExternalLinkOnce
            href={LINE_LINKS.consult}
            analyticsLabel="blog_article_line_consult"
          >
            預約免費諮詢
            <ArrowRight className="ml-2 w-4 h-4" />
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
