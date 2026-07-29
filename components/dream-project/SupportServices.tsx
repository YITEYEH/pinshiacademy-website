"use client";

import { motion } from "motion/react";
import {
  BookOpen,
  ClipboardCheck,
  HeartHandshake,
  MessagesSquare,
  Route,
  Sparkles,
} from "lucide-react";
import { DreamSection, DreamSectionHeader } from "@/components/dream-project/layout";
import { dreamProjectSupport } from "@/content/dream-project/page-copy";

const icons = [
  BookOpen,
  Route,
  ClipboardCheck,
  Sparkles,
  HeartHandshake,
  MessagesSquare,
] as const;

export function SupportServices() {
  const copy = dreamProjectSupport;

  return (
    <DreamSection id="support" bg="muted" innerClassName="max-w-5xl">
      <DreamSectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        paragraphs={copy.intro}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {copy.items.map((item, index) => {
          const Icon = icons[index] ?? BookOpen;
          return (
            <motion.article
              key={item.title}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="rounded-2xl border border-border/80 bg-white p-6"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f5ee]">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <div className="space-y-3 text-[15px] leading-[1.85] text-muted-foreground">
                {item.description.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </DreamSection>
  );
}
