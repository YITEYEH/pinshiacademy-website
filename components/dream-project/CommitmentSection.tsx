"use client";

import { motion } from "motion/react";
import {
  DreamProse,
  DreamSection,
  DreamSectionHeader,
} from "@/components/dream-project/layout";
import { dreamProjectCommitment } from "@/content/dream-project/page-copy";

export function CommitmentSection() {
  const copy = dreamProjectCommitment;

  return (
    <DreamSection id="commitment" bg="muted" innerClassName="max-w-3xl">
      <DreamSectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
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
        <DreamProse paragraphs={copy.paragraphs} />

        <h3 className="mb-4 mt-12 text-lg font-semibold text-foreground">
          {copy.promisesTitle}
        </h3>
        <ul className="mb-12 space-y-3">
          {copy.promises.map((item) => (
            <li
              key={item}
              className="flex gap-3 border-b border-border/70 pb-3 text-[15px] leading-relaxed text-foreground last:border-b-0"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-border/70 pt-10">
          <p className="mb-4 text-base font-semibold text-foreground sm:text-lg">
            {copy.closingTitle}
          </p>
          <div className="space-y-3 text-base font-medium leading-[1.85] text-foreground sm:text-lg">
            {copy.closing.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </motion.div>
    </DreamSection>
  );
}
