"use client";

import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LineCtaButton } from "@/components/LineCtaButton";
import { LINE_LINKS } from "@/lib/line-links";
import { LINE_CTA_LABELS } from "@/lib/line-cta";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  lineHref?: string;
  ctaLabel?: string;
  /** GA4 outbound_click 的 link_label；未填時用 ctaLabel */
  analyticsLabel?: string;
};

export function LandingPageShell({
  title,
  subtitle,
  children,
  lineHref = LINE_LINKS.consult,
  ctaLabel = LINE_CTA_LABELS.landing,
  analyticsLabel,
}: Props) {
  const outboundLabel = analyticsLabel ?? ctaLabel;
  return (
    <div className="w-full">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{subtitle}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-neutral max-w-none">
          {children}
        </div>
      </section>

      <section className="py-16 bg-[#f7f9f7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            想進一步了解適合的課程規劃？
          </h2>
          <p className="text-muted-foreground mb-8">
            歡迎預約免費諮詢，我們會依學生程度與目標提供建議
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <LineCtaButton href={lineHref} analyticsLabel={outboundLabel} label={ctaLabel} />
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses">查看完整課程</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
