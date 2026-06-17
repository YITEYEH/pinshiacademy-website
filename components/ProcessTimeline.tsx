"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LINE_LINKS } from "@/lib/line-links";

export type ProcessStep = {
  title: string;
  description: string;
};

type ProcessTimelineProps = {
  title: string;
  description: string;
  steps: readonly ProcessStep[];
  /** 給家長的重點說明（可選） */
  parentNote?: {
    title: string;
    points: readonly string[];
  };
  showCta?: boolean;
  analyticsLabel?: string;
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
  className = "",
  sectionClassName = "bg-[#f7f9f7]",
}: ProcessTimelineProps) {
  return (
    <section className={`py-20 ${sectionClassName} ${className}`.trim()}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
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
                  <h3 className="text-lg font-semibold text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
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
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <ExternalLinkOnce href={LINE_LINKS.consult} analyticsLabel={analyticsLabel}>
                預約免費諮詢
                <ArrowRight className="ml-2 w-5 h-5" />
              </ExternalLinkOnce>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
