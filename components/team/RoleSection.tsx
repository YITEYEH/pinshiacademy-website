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
          <p className="mb-3 text-sm font-medium tracking-wide text-primary">
            {role.number}｜{role.title}
          </p>
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f5ee]">
            <Icon className="h-5 w-5 text-primary" aria-hidden />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {role.title}
          </h2>
          <h3 className="mt-2 text-lg font-semibold text-primary sm:text-xl lg:text-2xl">
            {role.subtitle}
          </h3>
          <p className="mt-4 text-base font-medium text-foreground sm:mt-5 sm:text-lg">
            核心問題：{role.question}
          </p>
        </header>

        <DreamProse paragraphs={role.body} />

        {role.process ? (
          <div className="mt-8 sm:mt-10">
            <p className="mb-4 text-sm font-medium tracking-wide text-primary">
              核心流程
            </p>
            {/* Mobile: vertical steps */}
            <ol className="space-y-0 sm:hidden">
              {role.process.map((step, i) => (
                <li key={step} className="relative flex gap-3 pb-4 last:pb-0">
                  {i < role.process!.length - 1 ? (
                    <div
                      aria-hidden
                      className="absolute left-[0.9375rem] top-8 bottom-0 w-px bg-primary/20"
                    />
                  ) : null}
                  <span className="relative z-10 flex h-[1.875rem] w-[1.875rem] shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white text-xs font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1 text-sm font-semibold text-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            {/* sm+: horizontal chips */}
            <ol className="hidden flex-wrap items-center gap-y-2 sm:flex">
              {role.process.map((step, i) => (
                <li key={step} className="flex items-center">
                  <span className="rounded-full border border-primary/20 bg-white px-3.5 py-1.5 text-sm font-semibold text-foreground">
                    {step}
                  </span>
                  {i < role.process!.length - 1 ? (
                    <span aria-hidden className="mx-2 text-primary/40">
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
