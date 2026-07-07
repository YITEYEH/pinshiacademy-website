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
  const ctaHref = lineLink(tier.ctaLineKey, tier.analyticsLabel);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300",
        "hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(45,122,79,0.12)]",
        tier.featured
          ? "border-primary/30 shadow-[0_10px_36px_rgba(45,122,79,0.12)] ring-1 ring-primary/20"
          : "border-border/80 shadow-sm hover:border-primary/25",
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

        <div className="mb-5 rounded-xl border border-border/70">
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col />
              <col className="w-[5.5rem] sm:w-[6rem]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border bg-[#f7f9f7]">
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
                    index !== tier.rows.length - 1 && "border-b border-border/50",
                  )}
                >
                  <td className="px-4 py-2.5 text-foreground/90">{row.subject}</td>
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

        <div>
          <PricingCtaButton
            href={ctaHref}
            analyticsLabel={tier.analyticsLabel}
            label={tier.ctaLabel}
            size="default"
            fullWidth
            className={cn(
              tier.featured &&
                "shadow-[0_4px_14px_rgba(45,122,79,0.25)] hover:shadow-[0_6px_20px_rgba(45,122,79,0.3)]",
            )}
          />
        </div>
      </div>
    </article>
  );
}
