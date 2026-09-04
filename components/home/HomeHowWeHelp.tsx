"use client";

import { motion } from "motion/react";
import { homeHowWeHelp } from "@/content/home/page-copy";

export function HomeHowWeHelp() {
  const { id, titleLine1, titleLine2, steps, highlight } = homeHowWeHelp;

  return (
    <section id={id} className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
            <span className="block">{titleLine1}</span>
            <span className="block">{titleLine2}</span>
          </h2>
        </motion.div>

        <ol className="mb-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {steps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-[#f7f9f7] p-5 sm:p-6"
            >
              <p className="mb-2 font-mono text-sm font-semibold tracking-wider text-primary">
                {step.number}
              </p>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>

        <blockquote className="mx-auto max-w-3xl rounded-xl border border-primary/15 bg-[#e8f5ee] px-4 py-4 text-center sm:px-6 sm:py-5">
          <p className="text-base font-semibold leading-relaxed text-foreground sm:text-lg">
            {highlight}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
