"use client";

import { motion } from "motion/react";
import { BookOpen, MessageCircle, Target, User } from "lucide-react";
import {
  DreamProse,
  DreamSection,
  DreamSectionHeader,
} from "@/components/dream-project/layout";
import { threeTeachersCollaboration } from "@/content/team/page-copy";

const NODE_ICONS = {
  teaching: BookOpen,
  advisor: Target,
  guidance: MessageCircle,
} as const;

export function CollaborationMap() {
  const { eyebrow, title, nodes, studentLabel, studentEnglish, sees, closing } =
    threeTeachersCollaboration;

  return (
    <DreamSection bg="muted" innerClassName="max-w-5xl">
      <DreamSectionHeader eyebrow={eyebrow} title={title} />

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Mobile vertical */}
        <div className="mx-auto max-w-md lg:hidden">
          <ol>
            {nodes.map((node, index) => {
              const Icon = NODE_ICONS[node.id];
              return (
                <li key={node.id} className="relative pb-8 last:pb-0">
                  {index < nodes.length - 1 ? (
                    <div
                      aria-hidden
                      className="absolute left-5 top-12 bottom-0 w-px bg-primary/20"
                    />
                  ) : null}
                  <div className="flex gap-4">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f5ee]">
                      <Icon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <div className="min-w-0 rounded-2xl border border-border/80 bg-white p-5">
                      <p className="text-xs font-medium tracking-wider text-primary">
                        {node.english}
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {node.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {node.question}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-2 flex flex-col items-center">
            <div
              aria-hidden
              className="mb-3 h-6 w-px bg-primary/25"
            />
            <p className="mb-3 text-xs font-medium tracking-wide text-primary">
              共同關注
            </p>
            <div className="flex w-full items-center justify-center gap-3 rounded-2xl border border-primary/25 bg-white px-5 py-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                <User className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-medium tracking-wider text-primary">
                  {studentEnglish}
                </p>
                <p className="text-lg font-bold text-foreground">
                  {studentLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: three roles → shared student */}
        <div className="mx-auto hidden max-w-4xl lg:block">
          <div className="relative">
            <div className="grid grid-cols-3 gap-5">
              {nodes.map((node) => {
                const Icon = NODE_ICONS[node.id];
                return (
                  <article
                    key={node.id}
                    className="rounded-2xl border border-border/80 bg-white p-6 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f5ee]">
                      <Icon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <p className="text-xs font-medium tracking-wider text-primary">
                      {node.english}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      {node.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {node.question}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Funnel: 左右支線朝上接三師，中線朝下接學生 */}
            <div aria-hidden className="relative mx-auto h-16 w-full max-w-3xl">
              {/* 三支上向支線：卡片 → 匯流橫線 */}
              <div className="absolute left-[16.66%] top-0 h-8 w-px -translate-x-1/2 bg-primary/25" />
              <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-primary/25" />
              <div className="absolute left-[83.34%] top-0 h-8 w-px -translate-x-1/2 bg-primary/25" />
              {/* 匯流橫線 */}
              <div className="absolute inset-x-[16.66%] top-8 h-px bg-primary/25" />
              {/* 中線向下：匯流 → 學生 */}
              <div className="absolute left-1/2 top-8 h-8 w-px -translate-x-1/2 bg-primary/30" />
            </div>

            <div className="mx-auto flex max-w-sm flex-col items-center">
              <p className="mb-3 text-xs font-medium tracking-wide text-primary">
                共同關注
              </p>
              <div className="flex w-full items-center justify-center gap-4 rounded-2xl border border-primary/25 bg-white px-8 py-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <User className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wider text-primary">
                    {studentEnglish}
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {studentLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-12 max-w-2xl space-y-3 border-t border-border/70 pt-10 text-center">
          {sees.map((line) => (
            <li
              key={line}
              className="text-base font-medium leading-relaxed text-foreground sm:text-lg"
            >
              {line}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-8 max-w-2xl">
          <DreamProse paragraphs={closing} className="text-center" />
        </div>
      </motion.div>
    </DreamSection>
  );
}
