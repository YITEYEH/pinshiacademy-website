import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineCtaButton } from "@/components/LineCtaButton";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";
import { CTA_ROW_CLASS } from "@/lib/cta-button-styles";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f5ee] to-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground lg:text-5xl xl:text-6xl">
              成績上不去？
              <br />
              問題不是努力不夠
              <br />
              而是方法不對
            </h1>
            <p className="mb-8 max-w-xl text-lg text-muted-foreground">
              我們不做填鴨式教學
              <br />
              而是幫學生找到能持續進步的讀書方法
            </p>
            <div className={CTA_ROW_CLASS}>
              <LineCtaButton
                href={LINE_LINKS.consult}
                analyticsLabel="home_hero_line_consult"
                label={LINE_CTA_LABELS.homeHero}
                className="w-full bg-primary px-8 text-lg hover:bg-primary/90 sm:w-auto"
              />
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-full border-primary px-8 text-lg text-primary hover:bg-primary/5 sm:w-auto"
                asChild
              >
                <Link href="/courses">探索課程</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/hero-section.jpg"
                alt="品識學苑教室互動教學"
                width={1024}
                height={819}
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 max-w-xs rounded-xl bg-white p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">學生進步率</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
