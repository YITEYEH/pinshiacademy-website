"use client";

import { motion } from "motion/react";
import {
  DreamProse,
  DreamSection,
  DreamSectionHeader,
} from "@/components/dream-project/layout";
import { dreamProjectMission } from "@/content/dream-project/page-copy";

export function MissionSection() {
  const copy = dreamProjectMission;

  return (
    <DreamSection id="mission" bg="white" innerClassName="max-w-3xl">
      <DreamSectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
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
        <DreamProse paragraphs={copy.paragraphs} />
      </motion.div>
    </DreamSection>
  );
}
