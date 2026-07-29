"use client";

import { motion } from "motion/react";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import {
  DreamSection,
  DreamSectionHeader,
} from "@/components/dream-project/layout";
import { dreamProjectEligibility } from "@/content/dream-project/page-copy";

export function EligibilitySection() {
  const copy = dreamProjectEligibility;

  return (
    <>
      <DreamSection id="eligibility" bg="white" innerClassName="max-w-3xl">
        <DreamSectionHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          paragraphs={copy.intro}
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
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            {copy.conditionsIntro}
          </h3>
          <ul className="mb-8 space-y-3">
            {copy.conditions.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-border/70 pb-3 text-[15px] leading-relaxed text-foreground last:border-b-0"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mb-10 text-base font-medium leading-[1.85] text-foreground sm:text-lg">
            {copy.emphasis}
          </p>

          <div
            role="note"
            className="rounded-2xl border border-border bg-[#f7f9f7] px-5 py-5 sm:px-6"
          >
            <h3 className="mb-3 text-base font-semibold text-foreground">
              {copy.noticesTitle}
            </h3>
            <ul className="space-y-2 text-[15px] leading-relaxed text-muted-foreground">
              {copy.notices.map((notice) => (
                <li key={notice} className="flex gap-2">
                  <span className="shrink-0 text-primary" aria-hidden>
                    ·
                  </span>
                  <span>{notice}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </DreamSection>

      <ProcessTimeline
        title={copy.processTitle}
        description={copy.processLead}
        steps={copy.processSteps}
        sectionClassName="bg-[#f7f9f7]"
        showCta={false}
      />
    </>
  );
}
