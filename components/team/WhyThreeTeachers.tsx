"use client";

import { motion } from "motion/react";
import {
  DreamProse,
  DreamSection,
  DreamSectionHeader,
} from "@/components/dream-project/layout";
import { threeTeachersWhy } from "@/content/team/page-copy";

export function WhyThreeTeachers() {
  const { title, lead, paragraphs } = threeTeachersWhy;

  return (
    <DreamSection bg="white" innerClassName="max-w-3xl">
      <DreamSectionHeader
        title={title}
        lead={lead}
        align="left"
        className="max-w-none"
      />
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
