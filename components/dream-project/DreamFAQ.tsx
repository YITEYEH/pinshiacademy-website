"use client";

import { Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DreamSection, DreamSectionHeader } from "@/components/dream-project/layout";
import {
  dreamProjectDisclaimer,
  dreamProjectFaqs,
} from "@/content/dream-project/page-copy";

export function DreamFAQ() {
  const notice = dreamProjectDisclaimer;

  return (
    <DreamSection id="faq" bg="muted" innerClassName="max-w-3xl">
      <DreamSectionHeader eyebrow="常見問題" title="築夢計畫常見問題" />

      <Accordion
        type="single"
        collapsible
        className="rounded-2xl border border-border bg-white px-5 sm:px-6"
      >
        {dreamProjectFaqs.map((item, index) => (
          <AccordionItem key={item.q} value={`dream-faq-${index}`}>
            <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <aside
        id="notice"
        aria-labelledby="dream-project-notice-title"
        className="mt-12 border-t border-border/70 pt-10"
      >
        <div className="rounded-2xl border border-border/70 bg-white/70 px-5 py-6 sm:px-6">
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f7f9f7] text-primary">
              <Info className="h-4 w-4" aria-hidden />
            </span>
            <h2
              id="dream-project-notice-title"
              className="text-base font-semibold tracking-tight text-foreground"
            >
              {notice.title}
            </h2>
          </div>
          <ul className="space-y-3.5">
            {notice.paragraphs.map((p) => (
              <li
                key={p}
                className="flex gap-3 text-sm leading-[1.85] text-muted-foreground"
              >
                <span
                  className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50"
                  aria-hidden
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </DreamSection>
  );
}
