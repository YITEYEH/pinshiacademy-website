"use client";

import { motion } from "motion/react";
import { BookOpen, MessageCircle, Target } from "lucide-react";
import {
  DreamProse,
  DreamQuote,
  DreamSection,
} from "@/components/dream-project/layout";
import type { ThreeTeacherRoleCopy } from "@/content/team/page-copy";

const ICONS = {
  teaching: BookOpen,
  advisor: Target,
  guidance: MessageCircle,
} as const;

type RoleSectionProps = {
  role: ThreeTeacherRoleCopy;
  index: number;
};

export function RoleSection({ role, index }: RoleSectionProps) {
  const Icon = ICONS[role.id];
  const bg = index % 2 === 0 ? "muted" : "white";

  return (
    <DreamSection bg={bg} innerClassName="max-w-3xl">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-8 sm:mb-10">
          <div className="mb-5 flex items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f5ee] sm:h-12 sm:w-12">
              <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium tabular-nums tracking-wide text-primary">
                {role.number}
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {role.title}
              </h2>
            </div>
          </div>

          <p className="text-xl font-semibold tracking-tight text-primary sm:text-2xl">
            {role.subtitle}
          </p>

          <p className="mt-4 border-l-2 border-primary/30 pl-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
            <span className="sr-only">核心問題：</span>
            {role.question}
          </p>
        </header>

        <DreamProse paragraphs={role.body} />

        {role.process ? (
          <div className="mt-8 sm:mt-10">
            <p className="mb-4 text-sm font-medium tracking-wide text-primary">
              核心流程
            </p>
            <ol className="flex flex-wrap items-center justify-start gap-y-2">
              {role.process.map((step, i) => (
                <li key={step} className="flex items-center">
                  <span className="rounded-full border border-primary/20 bg-white px-3 py-1.5 text-sm font-semibold text-foreground sm:px-3.5">
                    {step}
                  </span>
                  {i < role.process!.length - 1 ? (
                    <span aria-hidden className="mx-1.5 text-primary/40 sm:mx-2">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <div className="mt-10 sm:mt-12">
          <h4 className="mb-4 text-base font-semibold text-foreground sm:text-lg">
            主要職責
          </h4>
          <ol className="space-y-3">
            {role.duties.map((duty, dutyIndex) => (
              <li
                key={duty}
                className="flex gap-3 border-b border-border/70 pb-3 text-sm leading-relaxed text-foreground last:border-b-0 sm:text-[15px]"
              >
                <span className="w-6 shrink-0 tabular-nums text-sm font-semibold text-primary">
                  {String(dutyIndex + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">{duty}</span>
              </li>
            ))}
          </ol>
        </div>

        <DreamQuote className="mt-10 sm:mt-12">{role.highlight}</DreamQuote>
      </motion.div>
    </DreamSection>
  );
}
