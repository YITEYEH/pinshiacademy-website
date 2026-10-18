"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { LineCtaButton } from "@/components/LineCtaButton";
import { StickyLineCta } from "@/components/StickyLineCta";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LINE_LINKS } from "@/lib/line-links";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { CTA_ROW_CLASS } from "@/lib/cta-button-styles";
import { page } from "@/content/student-success/page-copy";
import {
  parentFeedbackItems,
  privacyNoticeParagraphs,
  studentStories,
  studentSuccessFaqs,
  successStats,
  successStatsTitle,
  type ParentFeedback,
} from "@/content/student-success";

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

function feedbackBadge(item: ParentFeedback): string {
  if (item.type === "learning-summary") return "課程觀察整理";
  if (item.type === "adapted-feedback") return "家長回饋整理";
  return "家長回饋";
}

function FeedbackCarousel({ items }: { items: readonly ParentFeedback[] }) {
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
              key={item.id}
              className="min-w-0 flex-[0_0_100%] px-1"
            >
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

export function StudentSuccessClient() {
  const beliefs = page.beliefs.slice(0, 3);

  return (
    <div className="w-full pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-[#e8f5ee] to-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {page.heroTitle}
            </h1>
            <div className="mx-auto max-w-2xl">
              <Prose paragraphs={page.heroLead} className="text-center" />
            </div>
            <div className={`mt-10 ${CTA_ROW_CLASS}`}>
              <LineCtaButton
                href={LINE_LINKS.consult}
                analyticsLabel="student_success_hero_line_consult"
                ctaLocation="student_success_hero"
                label={LINE_CTA_LABELS.studentSuccess}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-primary py-12 text-white sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mx-auto mb-8 max-w-2xl text-center text-lg font-bold leading-snug tracking-tight sm:text-xl lg:text-2xl">
            {successStatsTitle}
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-6">
            {successStats.map((stat) => (
              <div
                key={stat.id}
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
      </section>

      <section className="bg-[#f7f9f7] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              {page.worthTitle}
            </h2>
            <p className="text-muted-foreground">{page.worthLead}</p>
          </motion.div>

          <div className="space-y-4">
            {page.worthItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ opacity: 1, y: 0 }}
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

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              {page.storiesTitle}
            </h2>
            <p className="text-muted-foreground">{page.storiesNote}</p>
          </motion.div>

          <div className="space-y-6">
            {studentStories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2 border-b border-border/70 px-5 py-3.5 sm:px-6">
                  <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {story.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-[#e8f5ee] px-2 py-0.5 text-xs font-medium text-primary/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-5 py-5 sm:px-6 sm:py-6">
                  <h3 className="mb-5 text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
                    {story.title}
                  </h3>

                  <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                    <div className="rounded-xl bg-[#fafafa] px-4 py-4">
                      <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground">
                        之前
                      </p>
                      <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                        {story.before.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40"
                              aria-hidden
                            />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-white px-4 py-4">
                      <p className="mb-3 text-xs font-semibold tracking-wide text-foreground/70">
                        怎麼帶
                      </p>
                      <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/80">
                        {story.approach.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/50"
                              aria-hidden
                            />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-[#e8f5ee] px-4 py-4">
                      <p className="mb-3 text-xs font-semibold tracking-wide text-primary">
                        之後
                      </p>
                      <ul className="space-y-2.5 text-sm font-medium leading-relaxed text-foreground">
                        {story.after.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                              aria-hidden
                            />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-primary/15 bg-[#f7f9f7] px-5 py-4 sm:px-6">
                  <p className="border-l-2 border-primary pl-3 text-[0.9375rem] font-medium leading-snug text-foreground sm:text-base">
                    「{story.quote}」
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9f7] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-2xl font-bold text-foreground sm:text-3xl">
            {page.beliefTitle}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-muted-foreground">
            {page.beliefLead}
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {beliefs.map((item) => (
              <div
                key={item.toward}
                className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
              >
                <div className="flex h-full">
                  <div className="w-1 shrink-0 bg-primary/70" aria-hidden />
                  <div className="flex flex-1 flex-col justify-center px-4 py-4 sm:px-5 sm:py-5">
                    <p className="text-base font-bold leading-snug text-foreground">
                      {item.toward}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                      {item.away}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              家長與課堂觀察到的改變
            </h2>
            <p className="text-muted-foreground">
              以下為課程觀察或家長回饋整理，非逐字錄音；皆已去識別化
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <FeedbackCarousel items={parentFeedbackItems} />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9f7] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
            常見問題
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {studentSuccessFaqs.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`faq-${index}`}
                className="rounded-xl border border-border bg-white px-5"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 space-y-2 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {privacyNoticeParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            {page.closingTitle}
          </h2>
          <Prose
            paragraphs={page.closingBody}
            className="text-center text-foreground/85"
          />
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-[#1a4d2e] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {page.ctaTitle}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
            {page.ctaBody}
          </p>
          <LineCtaButton
            href={LINE_LINKS.consult}
            analyticsLabel="student_success_final_line_consult"
            ctaLocation="student_success_final"
            label={LINE_CTA_LABELS.studentSuccess}
            variant="inverse"
            className="px-8 text-lg"
          />
        </div>
      </section>

      <StickyLineCta
        analyticsLabel="student_success_sticky_line_consult"
        ctaLocation="student_success_sticky"
        dismissKey="psa_student_success_sticky_line_dismissed"
        message="想了解孩子適不適合？先預約免費試聽"
        label={LINE_CTA_LABELS.studentSuccess}
      />
    </div>
  );
}
