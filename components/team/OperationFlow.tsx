"use client";

import { motion } from "motion/react";
import {
  DreamQuote,
  DreamSection,
  DreamSectionHeader,
} from "@/components/dream-project/layout";
import { threeTeachersOperation } from "@/content/team/page-copy";

export function OperationFlow() {
  const { title, steps, highlight } = threeTeachersOperation;

  return (
    <DreamSection bg="white" innerClassName="max-w-3xl">
      <DreamSectionHeader
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
                className="relative flex gap-3 pb-8 last:pb-0 sm:gap-5 sm:pb-10"
              >
                {!isLast ? (
                  <div
                    aria-hidden
                    className="absolute left-4 top-11 bottom-0 w-px bg-primary/20 sm:left-5 sm:top-12"
                  />
                ) : null}
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm">
                  {number}
                </div>
                <div className="min-w-0 pt-0.5 sm:pt-1.5">
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-[1.85] text-muted-foreground sm:mt-2 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <DreamQuote className="mt-2 sm:mt-4">{highlight}</DreamQuote>
      </motion.div>
    </DreamSection>
  );
}
