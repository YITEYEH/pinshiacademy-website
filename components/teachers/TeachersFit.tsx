"use client";

import { motion } from "motion/react";
import {
  DreamProse,
  DreamQuote,
  DreamSection,
} from "@/components/dream-project/layout";
import { LineCtaButton } from "@/components/LineCtaButton";
import { teachersFit } from "@/content/teachers/page-copy";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";
import { CTA_LINE_CLASS } from "@/lib/cta-button-styles";

export function TeachersFit() {
  const { title, paragraphs, highlight, closing } = teachersFit;

  return (
    <DreamSection bg="muted" innerClassName="max-w-3xl">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground text-balance sm:mb-8 sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <DreamProse paragraphs={paragraphs} className="mb-8" />
        <DreamQuote centered className="mb-6">
          <p className="text-base font-semibold leading-relaxed sm:text-lg lg:text-xl">
            {highlight}
          </p>
        </DreamQuote>
        <p className="mb-8 text-base leading-[1.85] text-muted-foreground sm:mb-10 sm:text-[1.0625rem]">
          {closing}
        </p>
        <div className="flex justify-center sm:justify-start">
          <LineCtaButton
            href={LINE_LINKS.consult}
            analyticsLabel="teachers_fit_line_consult"
            label={LINE_CTA_LABELS.teachers}
            className={`px-8 text-base sm:text-lg ${CTA_LINE_CLASS}`}
          />
        </div>
      </motion.div>
    </DreamSection>
  );
}
