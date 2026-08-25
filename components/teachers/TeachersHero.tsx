"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { teachersHero } from "@/content/teachers/page-copy";
import {
  CTA_PRIMARY_CLASS,
  CTA_ROW_CLASS,
  CTA_SECONDARY_CLASS,
} from "@/lib/cta-button-styles";

export function TeachersHero() {
  const {
    h1Line1,
    h1Line2,
    subtitle,
    primaryCta,
    primaryHref,
    secondaryCta,
    secondaryHref,
  } = teachersHero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f5ee] via-white to-[#f7f9f7] py-16 sm:py-20 lg:py-28">
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
          <h1 className="mb-6 text-[1.75rem] font-bold leading-snug tracking-tight text-foreground text-balance sm:mb-8 sm:text-4xl sm:leading-tight lg:text-5xl">
            <span className="block">{h1Line1}</span>
            <span className="block">{h1Line2}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-[1.85] text-muted-foreground sm:mb-10 sm:text-[1.0625rem]">
            {subtitle}
          </p>
          <div className={CTA_ROW_CLASS}>
            <Button size="lg" className={CTA_PRIMARY_CLASS} asChild>
              <a href={primaryHref}>{primaryCta}</a>
            </Button>
            <Button size="lg" variant="outline" className={CTA_SECONDARY_CLASS} asChild>
              <a href={secondaryHref}>{secondaryCta}</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
