"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homeProof } from "@/content/home/page-copy";
import { page as studentSuccessPage } from "@/content/student-success/page-copy";

function HomeParentsCarousel({
  items,
}: {
  items: typeof studentSuccessPage.parents;
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
            <div
              key={`${item.name}-${item.quote.slice(0, 16)}`}
              className="min-w-0 flex-[0_0_100%] px-1"
            >
              <figure className="rounded-2xl border border-border bg-gradient-to-br from-[#e8f5ee] to-white p-6 sm:p-8 lg:p-10">
                <p className="mb-4 text-sm font-medium text-primary">家長回饋</p>
                <blockquote className="text-left text-base leading-[1.85] text-foreground sm:text-lg">
                  「{item.quote}」
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white text-sm font-semibold text-primary"
                    aria-hidden
                  >
                    {item.name.slice(0, 1)}
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-semibold text-foreground sm:text-base">
                      {item.name}
                      <span className="font-normal text-muted-foreground">
                        {" "}
                        · {item.role}
                      </span>
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {item.context}
                    </span>
                  </span>
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
          aria-label="上一則家長推薦"
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
          aria-label="下一則家長推薦"
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
            {studentSuccessPage.parentsTitle}
          </h3>
          <p className="mb-8 text-sm text-muted-foreground sm:text-base">
            {studentSuccessPage.parentsNote}
          </p>
          <div className="mx-auto max-w-3xl">
            <HomeParentsCarousel items={studentSuccessPage.parents} />
          </div>
        </div>

        <div className="mb-10 rounded-2xl bg-primary px-4 py-8 text-white sm:px-8 sm:py-10">
          <p className="mb-6 text-center text-sm font-medium text-white/90 sm:text-base">
            {statsTitle}
          </p>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mb-1 text-2xl font-bold sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs text-white/80 sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href={moreHref}
            className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:underline"
          >
            {moreCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
