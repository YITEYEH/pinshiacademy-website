"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LineCtaButton } from "@/components/LineCtaButton";
import { LineCtaLabel } from "@/components/LineCtaLabel";
import { dreamProjectFinalCta } from "@/content/dream-project/page-copy";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { DREAM_PROJECT_LINE } from "@/lib/line-links";
import {
  CTA_LINE_ON_DARK_CLASS,
  CTA_ROW_CLASS,
  CTA_SECONDARY_ON_DARK_CLASS,
} from "@/lib/cta-button-styles";

export function FinalCTA() {
  const copy = dreamProjectFinalCta;

  return (
    <section className="bg-gradient-to-br from-primary to-[#1a4d2e] py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
            {copy.title}
          </h2>
          <div className="mx-auto mb-8 max-w-2xl space-y-4 text-lg leading-relaxed text-white/90">
            {copy.body.map((p, index) => (
              <p
                key={p}
                className={
                  index === 0
                    ? "text-xl font-medium text-white"
                    : undefined
                }
              >
                {p}
              </p>
            ))}
          </div>
          <div className={CTA_ROW_CLASS}>
            <LineCtaButton
              href={DREAM_PROJECT_LINE.apply}
              analyticsLabel="dream_project_final_apply"
              label={LINE_CTA_LABELS.dreamApply}
              variant="inverse"
              className={`${CTA_LINE_ON_DARK_CLASS} text-lg px-8`}
            />
            <Button
              size="lg"
              variant="outline"
              className={CTA_SECONDARY_ON_DARK_CLASS}
              asChild
            >
              <ExternalLinkOnce
                href={DREAM_PROJECT_LINE.teacher}
                analyticsLabel="dream_project_final_teacher"
              >
                <LineCtaLabel
                  iconClassName="size-5"
                  label={LINE_CTA_LABELS.dreamTeacher}
                />
              </ExternalLinkOnce>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
