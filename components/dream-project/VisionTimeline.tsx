"use client";

import { motion } from "motion/react";
import {
  DreamProse,
  DreamSection,
  DreamSectionHeader,
} from "@/components/dream-project/layout";
import { dreamProjectVision } from "@/content/dream-project/page-copy";

export function VisionTimeline() {
  const copy = dreamProjectVision;

  return (
    <DreamSection id="vision" bg="white" innerClassName="max-w-3xl">
      <DreamSectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        align="left"
        className="max-w-none"
      />
      <DreamProse paragraphs={copy.paragraphs} className="mb-12" />

      <p className="mb-8 text-lg font-medium leading-relaxed text-foreground">
        {copy.timelineLead}
      </p>

      <ol className="mb-12 space-y-0">
        {copy.timeline.map((step, index) => {
          const isLast = index === copy.timeline.length - 1;
          return (
            <motion.li
              key={step.title}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              {!isLast ? (
                <span
                  aria-hidden
                  className="absolute left-[1.125rem] top-10 bottom-0 w-px bg-primary/25 sm:left-5"
                />
              ) : null}
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-sm sm:h-10 sm:w-10">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1 border-b border-border/60 pb-6">
                <p className="text-base font-medium leading-relaxed text-foreground sm:text-lg">
                  {step.title}
                </p>
                <p className="mt-2 text-base leading-[1.85] text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>

      <div className="space-y-3 text-center text-lg font-medium leading-relaxed text-foreground">
        {copy.quote.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </DreamSection>
  );
}
