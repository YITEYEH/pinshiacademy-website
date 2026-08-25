"use client";

import { motion } from "motion/react";
import {
  DreamProse,
  DreamQuote,
  DreamSection,
} from "@/components/dream-project/layout";
import { teachersStatement } from "@/content/teachers/page-copy";

export function TeachersStatement() {
  const { titleLine1, titleLine2, paragraphs, highlight } = teachersStatement;

  return (
    <DreamSection bg="white" innerClassName="max-w-3xl">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground text-balance sm:mb-8 sm:text-3xl lg:text-4xl">
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </h2>
        <DreamProse paragraphs={paragraphs} className="mb-8 sm:mb-10" />
        <DreamQuote centered>
          <p className="text-base font-semibold leading-relaxed sm:text-lg lg:text-xl">
            {highlight}
          </p>
        </DreamQuote>
      </motion.div>
    </DreamSection>
  );
}
