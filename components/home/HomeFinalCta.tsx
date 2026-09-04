"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LineCtaButton } from "@/components/LineCtaButton";
import { homeFinalCta } from "@/content/home/page-copy";
import { LINE_LINKS } from "@/lib/line-links";

export function HomeFinalCta() {
  const {
    titleLine1,
    titleLine2,
    subtitle,
    primaryCta,
    secondaryCta,
    secondaryHref,
  } = homeFinalCta;

  return (
    <section className="bg-gradient-to-br from-primary to-[#1a4d2e] py-12 sm:py-14">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-white text-balance sm:text-3xl">
            <span className="block">{titleLine1}</span>
            <span className="block">{titleLine2}</span>
          </h2>
          <p className="mb-6 text-sm text-white/85 sm:text-base">{subtitle}</p>
          <LineCtaButton
            href={LINE_LINKS.consult}
            analyticsLabel="home_final_line_consult"
            ctaLocation="final_cta"
            label={primaryCta}
            variant="inverse"
            className="px-8"
          />
          <div className="mt-4">
            <Link
              href={secondaryHref}
              className="text-sm text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
