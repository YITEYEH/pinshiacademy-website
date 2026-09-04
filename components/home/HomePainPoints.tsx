"use client";

import { motion } from "motion/react";
import { homePainPoints } from "@/content/home/page-copy";

export function HomePainPoints() {
  const { title, cards, closing } = homePainPoints;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {cards.map((card, index) => (
            <motion.article
              key={card.number}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-[#f7f9f7] p-4 sm:p-5 lg:p-6"
            >
              <p className="mb-2 font-mono text-xs font-semibold tracking-wider text-primary sm:mb-3 sm:text-sm">
                {card.number}
              </p>
              <p className="text-sm font-medium leading-relaxed text-foreground sm:text-[1.0625rem]">
                <span className="block">{card.line1}</span>
                <span className="block">{card.line2}</span>
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:mt-12 sm:text-lg">
          {closing}
        </p>
      </div>
    </section>
  );
}
