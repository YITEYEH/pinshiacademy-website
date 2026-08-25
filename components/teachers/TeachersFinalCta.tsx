"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { LineCtaButton } from "@/components/LineCtaButton";
import { teachersFinalCta } from "@/content/teachers/page-copy";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";
import {
  CTA_LINE_ON_DARK_CLASS,
  CTA_ROW_CLASS,
  CTA_SECONDARY_ON_DARK_CLASS,
} from "@/lib/cta-button-styles";

export function TeachersFinalCta() {
  const { titleLine1, titleLine2, paragraphs, secondaryLabel, secondaryHref } =
    teachersFinalCta;

  return (
    <section className="bg-gradient-to-br from-primary to-[#1a4d2e] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-5 text-center text-2xl font-bold tracking-tight text-white text-balance sm:mb-6 sm:text-3xl lg:text-4xl">
            <span className="block">{titleLine1}</span>
            <span className="block">{titleLine2}</span>
          </h2>
          <div className="mb-8 text-center text-sm leading-[1.85] text-white/90 sm:mb-10 sm:text-base lg:text-[1.0625rem]">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className={CTA_ROW_CLASS}>
            <LineCtaButton
              href={LINE_LINKS.consult}
              analyticsLabel="teachers_final_line_consult"
              label={LINE_CTA_LABELS.teachers}
              variant="inverse"
              className={`px-8 text-base sm:text-lg ${CTA_LINE_ON_DARK_CLASS}`}
            />
            <Button size="lg" className={CTA_SECONDARY_ON_DARK_CLASS} asChild>
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
