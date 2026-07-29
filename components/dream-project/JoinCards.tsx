"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LineCtaButton } from "@/components/LineCtaButton";
import { LineCtaLabel } from "@/components/LineCtaLabel";
import { DreamSection, DreamSectionHeader } from "@/components/dream-project/layout";
import { dreamProjectJoin } from "@/content/dream-project/page-copy";
import { DREAM_PROJECT_LINE } from "@/lib/line-links";
import { CTA_ROW_CLASS } from "@/lib/cta-button-styles";

const hrefById = {
  student: DREAM_PROJECT_LINE.apply,
  teacher: DREAM_PROJECT_LINE.teacher,
  partner: DREAM_PROJECT_LINE.partner,
} as const;

export function JoinCards() {
  const copy = dreamProjectJoin;

  return (
    <DreamSection id="join" bg="white" innerClassName="max-w-5xl">
      <DreamSectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={copy.lead}
        paragraphs={copy.paragraphs}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {copy.cards.map((card, index) => {
          const isDisabled = "ctaDisabled" in card && card.ctaDisabled;

          return (
            <motion.article
              key={card.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-sm"
            >
              <p className="mb-3 text-sm font-medium text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground">
                {card.title}
              </h3>
              <div className="mb-8 flex-1 space-y-3 text-[15px] leading-[1.85] text-muted-foreground">
                {(Array.isArray(card.body) ? card.body : [card.body]).map(
                  (paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ),
                )}
              </div>
              <div className="space-y-3">
                {isDisabled ? (
                  <p className="rounded-xl border border-dashed border-border bg-[#f7f9f7] px-4 py-3 text-center text-sm text-muted-foreground">
                    {card.cta}
                  </p>
                ) : (
                  <LineCtaButton
                    href={hrefById[card.id as keyof typeof hrefById]}
                    analyticsLabel={card.analyticsLabel}
                    label={card.cta}
                    size="default"
                    fullWidth
                  />
                )}
                {"secondaryHref" in card && card.secondaryHref ? (
                  <Link
                    href={card.secondaryHref}
                    className="inline-flex w-full items-center justify-center text-sm font-medium text-primary hover:underline"
                  >
                    {card.secondaryLabel}
                  </Link>
                ) : null}
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-16 max-w-3xl border-t border-border/70 pt-12 text-center"
      >
        <h3 className="mb-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {copy.closingTitle}
        </h3>
        <div className="mx-auto mb-8 max-w-2xl space-y-4 text-base leading-[1.85] text-muted-foreground sm:text-[1.0625rem]">
          {copy.closingParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className={CTA_ROW_CLASS}>
          <LineCtaButton
            href={DREAM_PROJECT_LINE.apply}
            analyticsLabel="dream_project_join_closing_apply"
            label={copy.closingPrimaryCta}
          />
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-primary/40 px-8 text-base text-primary hover:bg-primary/5 sm:text-lg"
            asChild
          >
            <ExternalLinkOnce
              href={DREAM_PROJECT_LINE.teacher}
              analyticsLabel="dream_project_join_closing_teacher"
            >
              <LineCtaLabel
                iconClassName="size-5"
                label={copy.closingSecondaryCta}
              />
            </ExternalLinkOnce>
          </Button>
        </div>
      </motion.div>
    </DreamSection>
  );
}
