"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DreamProse,
  DreamQuote,
  DreamSection,
} from "@/components/dream-project/layout";
import { teachersGrowth } from "@/content/teachers/page-copy";
import { CTA_PRIMARY_CLASS } from "@/lib/cta-button-styles";

export function TeachersGrowth() {
  const { titleLine1, titleLine2, paragraphs, highlight, ctaLabel, ctaHref } =
    teachersGrowth;

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
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </h2>
        <DreamProse paragraphs={paragraphs} className="mb-8" />
        <DreamQuote centered className="mb-8 sm:mb-10">
          <p className="text-base font-semibold leading-relaxed sm:text-lg lg:text-xl">
            {highlight}
          </p>
        </DreamQuote>
        <div className="flex justify-center sm:justify-start">
          <Button size="lg" className={CTA_PRIMARY_CLASS} asChild>
            <Link href={ctaHref}>
              {ctaLabel}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </DreamSection>
  );
}
