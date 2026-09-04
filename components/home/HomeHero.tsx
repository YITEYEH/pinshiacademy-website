import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LineCtaButton } from "@/components/LineCtaButton";
import { homeHero } from "@/content/home/page-copy";
import { CTA_SECONDARY_CLASS } from "@/lib/cta-button-styles";
import { LINE_LINKS } from "@/lib/line-links";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f5ee] to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <h1 className="mb-5 text-[1.75rem] font-bold leading-snug tracking-tight text-foreground text-balance sm:mb-6 sm:text-4xl sm:leading-tight lg:text-5xl">
              <span className="block">{homeHero.h1Line1}</span>
              <span className="block">{homeHero.h1Line2}</span>
              <span className="block">{homeHero.h1Line3}</span>
            </h1>
            <p className="mb-8 text-base leading-[1.85] text-muted-foreground sm:text-lg">
              {homeHero.subtitle}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <LineCtaButton
                href={LINE_LINKS.consult}
                analyticsLabel="home_hero_line_consult"
                ctaLocation="hero"
                label={homeHero.primaryCta}
                className="w-full bg-primary px-8 text-base hover:bg-primary/90 sm:w-auto sm:text-lg"
              />
              <Button
                size="lg"
                variant="outline"
                className={CTA_SECONDARY_CLASS}
                asChild
              >
                <Link href={homeHero.secondaryHref}>{homeHero.secondaryCta}</Link>
              </Button>
            </div>
          </div>

          <div className="relative w-full min-w-0">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/hero-section.jpg"
                alt="品識學苑教室互動教學"
                width={1024}
                height={819}
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, min(560px, 50vw)"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
