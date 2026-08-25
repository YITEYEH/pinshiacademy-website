"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DreamProse,
  DreamSection,
} from "@/components/dream-project/layout";
import { teachersTeamBridge } from "@/content/teachers/page-copy";
import {
  CTA_PRIMARY_CLASS,
  CTA_ROW_CLASS,
  CTA_SECONDARY_CLASS,
} from "@/lib/cta-button-styles";

export function TeachersTeamBridge() {
  const {
    titleLine1,
    titleLine2,
    paragraphs,
    rolesLine,
    focusLine,
    primaryCta,
    primaryHref,
    secondaryCta,
    secondaryHref,
  } = teachersTeamBridge;

  return (
    <DreamSection bg="white" innerClassName="max-w-3xl">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-foreground text-balance sm:mb-8 sm:text-3xl lg:text-4xl">
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </h2>
        <DreamProse paragraphs={paragraphs} className="mb-10" />

        <div className="mb-10 space-y-2 text-center">
          <p className="text-base font-semibold tracking-wide text-foreground sm:text-lg lg:text-xl">
            {rolesLine}
          </p>
          <p className="text-sm tracking-wide text-primary sm:text-base">
            {focusLine}
          </p>
        </div>

        <div className={CTA_ROW_CLASS}>
          <Button size="lg" className={CTA_PRIMARY_CLASS} asChild>
            <Link href={primaryHref}>
              {primaryCta}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className={CTA_SECONDARY_CLASS} asChild>
            <Link href={secondaryHref}>{secondaryCta}</Link>
          </Button>
        </div>
      </motion.div>
    </DreamSection>
  );
}
