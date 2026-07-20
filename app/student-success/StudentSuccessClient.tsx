"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { LineCtaButton } from "@/components/LineCtaButton";
import { Button } from "@/components/ui/button";
import { LINE_LINKS } from "@/lib/line-links";
import { CTA_ROW_CLASS } from "@/lib/cta-button-styles";
import { page } from "@/content/student-success/page-copy";

function Prose({
  paragraphs,
  className = "",
}: {
  paragraphs: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={`space-y-5 text-base leading-[1.85] text-muted-foreground sm:text-[1.0625rem] ${className}`}
    >
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function ParentsCarousel({
  items,
}: {
  items: typeof page.parents;
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
                <p className="mb-4 text-sm font-medium text-primary">
                  家長回饋
                </p>
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

        <p className="min-w-[4.5rem] text-center text-sm text-muted-foreground tabular-nums">
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

export function StudentSuccessClient() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-[#e8f5ee] to-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground lg:text-5xl">
              {page.heroTitle}
            </h1>
            <div className="mx-auto max-w-2xl">
              <Prose paragraphs={page.heroLead} className="text-center" />
            </div>
            <div className={`mt-10 ${CTA_ROW_CLASS}`}>
              <LineCtaButton
                href={LINE_LINKS.consult}
                analyticsLabel="student_success_hero_line_consult"
                label={page.ctaLabel}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 改變重點：以前／現在並陳，重點一眼可見 */}
      <section className="bg-[#f7f9f7] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              {page.worthTitle}
            </h2>
            <p className="text-lg text-muted-foreground">{page.worthLead}</p>
          </motion.div>

          <div className="space-y-4">
            {page.worthItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="overflow-hidden rounded-xl border border-border bg-white"
              >
                <div className="grid sm:grid-cols-[8.5rem_1fr_1fr]">
                  <div className="flex items-center border-b border-border px-5 py-4 sm:border-b-0 sm:border-r sm:py-5">
                    <p className="text-sm font-semibold text-primary sm:text-base">
                      {item.label}
                    </p>
                  </div>
                  <div className="border-b border-border bg-[#fafafa] px-5 py-4 sm:border-b-0 sm:border-r sm:py-5">
                    <p className="mb-1.5 text-xs font-medium text-muted-foreground/80">
                      以前
                    </p>
                    <p className="text-[15px] leading-relaxed text-muted-foreground/75">
                      {item.before}
                    </p>
                  </div>
                  <div className="bg-[#e8f5ee] px-5 py-4 sm:py-5">
                    <p className="mb-1.5 text-xs font-semibold text-primary">
                      現在
                    </p>
                    <p className="text-base font-bold leading-relaxed text-foreground">
                      {item.after}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 故事 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
              {page.storiesTitle}
            </h2>
            <p className="text-muted-foreground">{page.storiesNote}</p>
          </motion.div>

          <div className="space-y-5">
            {page.stories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
              >
                <div className="border-b border-border px-5 py-3 sm:px-6">
                  <p className="text-sm font-semibold text-primary">
                    {story.label}
                  </p>
                </div>
                <div className="px-5 py-5 sm:px-6 sm:py-6">
                  <h3 className="mb-4 text-xl font-bold leading-snug text-foreground sm:text-2xl">
                    {story.title}
                  </h3>
                  <div className="space-y-3 text-[15px] leading-[1.85] text-muted-foreground">
                    {story.body.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="border-t border-primary/15 bg-[#e8f5ee] px-5 py-4 sm:px-6">
                  <p className="font-semibold leading-snug text-foreground">
                    {story.takeaway}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 信念：一句一卡，願意／而不是層次對照 */}
      <section className="bg-[#f7f9f7] py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              {page.beliefTitle}
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {page.beliefLead}
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {page.beliefs.map((item, index) => (
              <motion.div
                key={item.toward}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
              >
                <div className="flex h-full">
                  <div
                    className="w-1 shrink-0 bg-primary/70"
                    aria-hidden
                  />
                  <div className="flex flex-1 flex-col justify-center px-4 py-4 sm:px-5 sm:py-5">
                    <p className="text-base font-bold leading-snug text-foreground sm:text-lg">
                      {item.toward}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                      {item.away}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 家長推薦：輪播 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
              {page.parentsTitle}
            </h2>
            <p className="text-muted-foreground">{page.parentsNote}</p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <ParentsCarousel items={page.parents} />
          </div>
        </div>
      </section>

      {/* 結語 */}
      <section className="border-y border-border/50 bg-white py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-foreground lg:text-4xl">
              {page.closingTitle}
            </h2>
            <Prose
              paragraphs={page.closingBody}
              className="text-center text-foreground/85"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-[#1a4d2e] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
              {page.ctaTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-white/90">
              {page.ctaBody}
            </p>
            <LineCtaButton
              href={LINE_LINKS.consult}
              analyticsLabel="student_success_final_line_consult"
              label={page.ctaLabel}
              variant="inverse"
              className="px-8 text-lg"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
