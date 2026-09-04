"use client";

import { motion } from "motion/react";
import { LineCtaButton } from "@/components/LineCtaButton";
import { homeLineValue } from "@/content/home/page-copy";
import { LINE_LINKS } from "@/lib/line-links";

export function HomeLineValue() {
  const {
    id,
    titleLine1,
    titleLine2,
    body,
    steps,
    conversationHint,
    conversationCta,
  } = homeLineValue;

  return (
    <section id={id} className="scroll-mt-24 bg-[#f7f9f7] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
            <span className="block">{titleLine1}</span>
            <span className="block">{titleLine2}</span>
          </h2>
          <p className="text-base leading-[1.85] text-muted-foreground sm:text-[1.0625rem]">
            {body}
          </p>
        </motion.div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-border bg-white p-5 sm:p-6"
            >
              <p className="mb-2 text-xs font-semibold tracking-wide text-primary">
                STEP {step.number}｜{step.label}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {step.example}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {conversationHint}
          </p>
          <div className="mt-6">
            <LineCtaButton
              href={LINE_LINKS.consult}
              analyticsLabel="home_line_value_line_consult"
              ctaLocation="line_value"
              label={conversationCta}
              className="px-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
