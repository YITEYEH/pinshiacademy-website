"use client";

import { motion } from "motion/react";
import {
  DreamQuote,
  DreamSection,
} from "@/components/dream-project/layout";
import { teachersSelection } from "@/content/teachers/page-copy";

export function TeachersSelectionJourney() {
  const { id, titleLine1, titleLine2, steps, closingTitle } = teachersSelection;

  return (
    <DreamSection id={id} bg="white" innerClassName="max-w-3xl">
      <motion.header
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 sm:mb-12"
      >
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </h2>
      </motion.header>

      <ol className="relative space-y-0 border-l border-primary/25 pl-6 sm:pl-8">
        {steps.map((step, index) => (
          <motion.li
            key={step.number}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="relative pb-10 last:pb-0"
          >
            <span
              aria-hidden
              className="absolute -left-[1.625rem] top-1.5 flex h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-white sm:-left-[2.125rem]"
            />
            <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">
              <span className="font-mono text-sm tracking-wider text-primary sm:text-base">
                {step.number}
              </span>
              <span className="mx-1.5 text-primary/40">｜</span>
              {step.title}
            </h3>
            <p className="text-sm leading-[1.85] text-muted-foreground sm:text-base">
              {step.description}
            </p>
          </motion.li>
        ))}
      </ol>

      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12 sm:mt-14"
      >
        <DreamQuote centered>
          <p className="text-base font-semibold leading-relaxed sm:text-lg lg:text-xl">
            {closingTitle}
          </p>
        </DreamQuote>
      </motion.div>
    </DreamSection>
  );
}
