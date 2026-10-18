"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineCtaButton } from "@/components/LineCtaButton";
import { homeProof } from "@/content/home/page-copy";
import {
  parentFeedbackItems,
  type ParentFeedback,
} from "@/content/student-success";
import { page as studentSuccessPage } from "@/content/student-success/page-copy";
import { LINE_LINKS } from "@/lib/line-links";

function feedbackBadge(item: ParentFeedback): string {
  if (item.type === "learning-summary") return "課程觀察整理";
  if (item.type === "adapted-feedback") return "家長回饋整理";
  return "家長回饋";
}

function HomeFeedbackCarousel({
  items,
}: {
  items: readonly ParentFeedback[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    slidesToScroll: 1,
  });
  const [selected, setSelected] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    };
    sync();
    emblaApi.on("reInit", sync);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", sync);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {items.map((item) => (
            <div key={item.id} className="min-w-0 flex-[0_0_100%] px-1">
              <figure className="rounded-2xl border border-border bg-gradient-to-br from-[#e8f5ee] to-white p-6 sm:p-8 lg:p-10">
                <p className="mb-4 text-sm font-medium text-primary">
                  {feedbackBadge(item)}
                  <span className="font-normal text-muted-foreground">
                    {" "}
                    · {item.category}
                  </span>
                </p>
                {item.title ? (
                  <h3 className="mb-3 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                ) : null}
                <blockquote className="text-left text-base leading-[1.85] text-foreground sm:text-lg">
                  「{item.content}」
                </blockquote>
                <figcaption className="mt-6 border-t border-border/60 pt-5 text-left text-sm text-muted-foreground">
                  {item.source}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="上一則回饋"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <p className="min-w-[4.5rem] text-center text-sm tabular-nums text-muted-foreground">
          {selected + 1} / {scrollSnaps.length || items.length}
        </p>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="下一則回饋"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}

export function HomeProof() {
  const {
    worthTitle,
    worthLead,
    beforeLabel,
    afterLabel,
    statsTitle,
    stats,
    moreCta,
    moreHref,
    lineCta,
  } = homeProof;

  return (
    <section className="bg-[#f7f9f7] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {worthTitle}
          </h2>
          <p className="text-muted-foreground">{worthLead}</p>
        </motion.div>

        <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {studentSuccessPage.worthItems.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-border bg-white p-5 sm:p-6"
            >
              <p className="mb-4 text-sm font-semibold text-primary">{item.label}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-[#f7f9f7] px-3 py-3">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">
                    {beforeLabel}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {item.before}
                  </p>
                </div>
                <div className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-3">
                  <p className="mb-1 text-xs font-medium text-primary">
                    {afterLabel}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {item.after}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mb-10 text-center">
          <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
            家長與課堂觀察到的改變
          </h3>
          <p className="mb-8 text-sm text-muted-foreground sm:text-base">
            課程觀察或家長回饋整理，皆已去識別化
          </p>
          <div className="mx-auto max-w-3xl">
            <HomeFeedbackCarousel items={parentFeedbackItems} />
          </div>
        </div>

        <div className="mb-10 rounded-2xl bg-primary px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
          <h3 className="mx-auto mb-8 max-w-2xl text-center text-lg font-bold leading-snug tracking-tight sm:text-xl lg:text-2xl">
            {statsTitle}
          </h3>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
              >
                <p className="mb-2 flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
                    {stat.value}
                  </span>
                  {stat.unit ? (
                    <span className="text-sm font-semibold text-white/85 sm:text-base">
                      {stat.unit}
                    </span>
                  ) : null}
                </p>
                <p className="max-w-[12rem] text-xs leading-relaxed text-white/80 sm:max-w-none sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <LineCtaButton
            href={LINE_LINKS.consult}
            analyticsLabel="home_proof_line_consult"
            ctaLocation="proof"
            label={lineCta}
            className="px-8"
          />
          <Link
            href={moreHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            {moreCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
