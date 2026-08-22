"use client";

import { motion } from "motion/react";
import {
  DreamQuote,
  DreamSection,
  DreamSectionHeader,
} from "@/components/dream-project/layout";
import { threeTeachersOperation } from "@/content/team/page-copy";

export function OperationFlow() {
  const { eyebrow, title, steps, highlight } = threeTeachersOperation;

  return (
    <DreamSection bg="white" innerClassName="max-w-3xl">
      <DreamSectionHeader
        eyebrow={eyebrow}
        title={title}
        align="left"
        className="max-w-none"
      />
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <ol>
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const number = String(index + 1).padStart(2, "0");

            return (
              <li
                key={step.title}
                className="relative flex gap-5 pb-10 last:pb-0"
              >
                {!isLast ? (
                  <div
                    aria-hidden
                    className="absolute left-5 top-12 bottom-0 w-px bg-primary/20"
                  />
                ) : null}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {number}
                </div>
                <div className="min-w-0 pt-1.5">
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-[1.85] text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <DreamQuote className="mt-4">{highlight}</DreamQuote>
      </motion.div>
    </DreamSection>
  );
}
