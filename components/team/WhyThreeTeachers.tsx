"use client";

import { motion } from "motion/react";
import { DreamProse, DreamSection } from "@/components/dream-project/layout";
import { threeTeachersWhy } from "@/content/team/page-copy";

export function WhyThreeTeachers() {
  const { title, lead, paragraphs } = threeTeachersWhy;

  return (
    <DreamSection bg="white" innerClassName="max-w-3xl">
      <header className="mb-10 sm:mb-12">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="text-xl font-semibold leading-snug tracking-tight text-primary sm:text-2xl lg:text-[1.75rem]">
          {lead}
        </p>
      </header>
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <DreamProse paragraphs={paragraphs} />
      </motion.div>
    </DreamSection>
  );
}
