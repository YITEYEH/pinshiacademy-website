"use client";

import { motion } from "motion/react";
import {
  DreamProse,
  DreamQuote,
  DreamSection,
  DreamSectionHeader,
} from "@/components/dream-project/layout";
import { threeTeachersBrand } from "@/content/team/page-copy";

export function BrandBelief() {
  const { eyebrow, title, paragraphs, closing } = threeTeachersBrand;

  return (
    <DreamSection bg="muted" innerClassName="max-w-3xl">
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
        <DreamProse paragraphs={paragraphs} />
        <DreamQuote className="mt-12" centered>
          {closing}
        </DreamQuote>
      </motion.div>
    </DreamSection>
  );
}
