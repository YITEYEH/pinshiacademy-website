"use client";

import { motion } from "motion/react";
import { LineCtaButton } from "@/components/LineCtaButton";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";

export type ProcessStep = {
  title: string;
  description: string | readonly string[];
};

type ProcessTimelineProps = {
  title: string;
  description: string | readonly string[];
  steps: readonly ProcessStep[];
  /** 給家長的重點說明（可選） */
  parentNote?: {
    title: string;
    points: readonly string[];
  };
  showCta?: boolean;
  analyticsLabel?: string;
  ctaLabel?: string;
  className?: string;
  sectionClassName?: string;
};

export function ProcessTimeline({
  title,
  description,
  steps,
  parentNote,
  showCta = false,
  analyticsLabel = "process_timeline_line_consult",
  ctaLabel,
  className = "",
  sectionClassName = "bg-[#f7f9f7]",
}: ProcessTimelineProps) {
  const descriptionParagraphs = Array.isArray(description)
    ? description
    : [description];
  const isMultiParagraph = descriptionParagraphs.length > 1;

  return (
    <section className={`py-20 ${sectionClassName} ${className}`.trim()}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="mb-5 text-center text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            {title}
          </h2>
          {isMultiParagraph ? (
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <p className="text-lg font-medium leading-relaxed text-foreground">
                {descriptionParagraphs[0]}
              </p>
              <div className="space-y-3 text-base leading-[1.85] text-muted-foreground sm:text-[1.0625rem]">
                {descriptionParagraphs.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-lg leading-relaxed text-muted-foreground">
              {descriptionParagraphs[0]}
            </p>
          )}
        </motion.div>

        <ol className="relative">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;

            return (
              <motion.li
                key={step.title}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative flex gap-4 sm:gap-5 pb-8 last:pb-0"
              >
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute left-[1.125rem] sm:left-5 top-10 bottom-0 w-px bg-primary/25"
                  />
                )}

                <div className="relative z-10 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm sm:text-base font-bold text-white shadow-sm">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1 rounded-xl border border-border bg-white px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="mb-1.5 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <div className="space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {(Array.isArray(step.description)
                      ? step.description
                      : [step.description]
                    ).map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {parentNote && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 rounded-xl border border-primary/20 bg-[#e8f5ee] px-5 py-5 sm:px-6 sm:py-6"
          >
            <h3 className="text-base font-semibold text-foreground mb-3">
              {parentNote.title}
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {parentNote.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="text-primary shrink-0">·</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {showCta && (
          <div className="text-center mt-12">
            <LineCtaButton
              href={LINE_LINKS.consult}
              analyticsLabel={analyticsLabel}
              label={ctaLabel ?? LINE_CTA_LABELS.homeProcess}
            />
          </div>
        )}
      </div>
    </section>
  );
}
