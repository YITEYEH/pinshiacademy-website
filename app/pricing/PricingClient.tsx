"use client";

import { motion } from "motion/react";
import {
  pricingCardTiers,
  pricingCardsSection,
  pricingExplanationSection,
  pricingFinalCta,
  pricingHero,
} from "@/content/pricing";
import { LINE_LINKS } from "@/lib/line-links";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { LineCtaButton } from "@/components/LineCtaButton";
import { PricingCtaButton } from "@/components/pricing/PricingCtaButton";
import { PricingFactorsCard } from "@/components/pricing/PricingFactorsCard";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingIncludedGrid } from "@/components/pricing/PricingIncludedGrid";
import { PricingLevelCard } from "@/components/pricing/PricingLevelCard";
import { PricingTrustCards } from "@/components/pricing/PricingTrustCards";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function PricingClient() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f9f6] via-white to-white py-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(45,122,79,0.12), transparent)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              {pricingHero.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {pricingHero.subtitle}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {pricingHero.description}
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <PricingCtaButton
                href={LINE_LINKS.homeAssessment}
                analyticsLabel="pricing_hero_assessment"
                label={LINE_CTA_LABELS.pricingHero}
              />
              <p className="text-sm text-muted-foreground">
                {pricingHero.ctaNote}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-14 lg:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {pricingCardsSection.title}
            </h2>
            <div className="mt-4 space-y-1 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {pricingCardsSection.subtitle.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 grid items-start gap-5 lg:grid-cols-3 lg:gap-6">
            {pricingCardTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <PricingLevelCard tier={tier} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PricingIncludedGrid />

      {/* Pricing Explanation */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {pricingExplanationSection.title}
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">
                {pricingExplanationSection.body}
              </p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">
                {pricingExplanationSection.footnote}
              </p>
            </div>

            <PricingFactorsCard />
          </div>
        </div>
      </section>

      <PricingTrustCards />
      <PricingFaq />

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary to-[#1a4d2e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {pricingFinalCta.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/90 sm:text-xl">
              {pricingFinalCta.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center">
              <PricingCtaButton
                href={LINE_LINKS.homeAssessment}
                analyticsLabel="pricing_final_assessment"
                variant="inverse"
                label={LINE_CTA_LABELS.pricingFinal}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
