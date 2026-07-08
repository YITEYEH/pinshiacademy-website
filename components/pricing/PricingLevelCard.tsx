"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { PricingCardTier } from "@/content/pricing";
import { PricingCtaButton } from "@/components/pricing/PricingCtaButton";
import { lineLink } from "@/lib/line-links";
import { cn } from "@/components/ui/utils";

type PricingLevelCardProps = {
  tier: PricingCardTier;
};

const tierAccent: Record<PricingCardTier["id"], string> = {
  elementary: "from-emerald-400/80 to-emerald-600/40",
  "junior-high": "from-primary/70 to-primary/30",
  "senior-high": "from-[#1a4d2e]/80 to-primary/40",
};

function PriceAmount({
  amount,
  suffix = "起",
  amountClassName,
  size = "sm",
}: {
  amount: number;
  suffix?: string;
  amountClassName?: string;
  size?: "sm" | "lg";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline justify-end gap-1 tabular-nums",
        size === "sm" && "min-w-[4.5rem]",
      )}
    >
      <span
        className={cn(
          "text-right font-semibold text-foreground",
          size === "sm" && "text-sm",
          amountClassName,
        )}
      >
        {amount.toLocaleString("zh-TW")}
      </span>
      <span
        className={cn(
          "shrink-0 text-muted-foreground",
          size === "sm" ? "text-xs" : "text-sm font-medium",
        )}
      >
        {suffix}
      </span>
    </span>
  );
}

export function PricingLevelCard({ tier }: PricingLevelCardProps) {
  const [expanded, setExpanded] = useState(false);
  const ctaHref = lineLink(tier.ctaLineKey, tier.analyticsLabel);
  const panelId = `pricing-subjects-${tier.id}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm transition-all duration-300",
        "hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_16px_48px_rgba(45,122,79,0.12)]",
      )}
    >
      <div
        className={cn("h-1 w-full bg-gradient-to-r", tierAccent[tier.id])}
        aria-hidden
      />

      <div className="flex flex-col p-5 sm:p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            {tier.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{tier.sessionLabel}</p>
        </div>

        <div className="mb-4">
          <PriceAmount
            amount={tier.startingAmount}
            suffix="起／堂"
            size="lg"
            amountClassName="text-[2rem] font-bold leading-none sm:text-[2.125rem]"
          />
        </div>

        <div className="mb-5 overflow-hidden rounded-xl border border-border/70">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="flex w-full items-center justify-between gap-3 bg-[#f7f9f7] px-4 py-3 text-left transition-colors hover:bg-[#eef4f0]"
          >
            <span className="text-sm font-medium text-foreground">
              {expanded ? "收合各科價格" : "查看各科價格"}
            </span>
            <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
              <span>{tier.rows.length} 科</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-primary transition-transform duration-200",
                  expanded && "rotate-180",
                )}
                aria-hidden
              />
            </span>
          </button>

          <div
            id={panelId}
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-out",
              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <table className="w-full table-fixed border-t border-border/70 text-sm">
                <colgroup>
                  <col />
                  <col className="w-[5.5rem] sm:w-[6rem]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-border/50 bg-white">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                      科目
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">
                      價格
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tier.rows.map((row, index) => (
                    <tr
                      key={row.subject}
                      className={cn(
                        index % 2 === 1 && "bg-[#fafbfa]",
                        index !== tier.rows.length - 1 &&
                          "border-b border-border/50",
                      )}
                    >
                      <td className="px-4 py-2.5 text-foreground/90">
                        {row.subject}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex justify-end">
                          <PriceAmount amount={row.amount} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <PricingCtaButton
            href={ctaHref}
            analyticsLabel={tier.analyticsLabel}
            label={tier.ctaLabel}
            size="default"
            fullWidth
          />
        </div>
      </div>
    </article>
  );
}
