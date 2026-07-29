"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { LineCtaButton } from "@/components/LineCtaButton";
import { dreamProjectHero } from "@/content/dream-project/page-copy";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { DREAM_PROJECT_LINE } from "@/lib/line-links";
import { CTA_ROW_CLASS } from "@/lib/cta-button-styles";

export function DreamHero() {
  const copy = dreamProjectHero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f5ee] via-white to-[#f7f9f7] py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-medium tracking-wide text-primary">
            {copy.eyebrow}
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            {copy.title}
          </h1>
          <p className="mb-8 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
            {copy.taglineLines[0]}
            <br />
            {copy.taglineLines[1]}
          </p>
          <div className="mx-auto max-w-2xl space-y-5 text-base leading-[1.9] text-muted-foreground sm:text-[1.0625rem]">
            {copy.subtitleParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className={`mt-12 ${CTA_ROW_CLASS}`}>
            <LineCtaButton
              href={DREAM_PROJECT_LINE.apply}
              analyticsLabel="dream_project_hero_apply"
              label={LINE_CTA_LABELS.dreamApply}
            />
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-primary/40 px-8 text-base text-primary hover:bg-primary/5 sm:text-lg"
              asChild
            >
              <Link href="#support">{copy.secondaryCta}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
