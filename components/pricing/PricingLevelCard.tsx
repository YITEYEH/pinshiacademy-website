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
}: {
  amount: number;
  suffix?: string;
}) {
  return (
    <span className="inline-flex shrink-0 items-baseline gap-1 tabular-nums">
      <span className="text-[2rem] font-bold leading-none text-foreground sm:text-[2.125rem]">
        {amount.toLocaleString("zh-TW")}
      </span>
      <span className="shrink-0 text-sm font-medium text-muted-foreground">
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
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm transition-all duration-300",
        "hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_16px_48px_rgba(45,122,79,0.12)]",
      )}
    >
      <div
        className={cn("h-1 w-full bg-gradient-to-r", tierAccent[tier.id])}
        aria-hidden
      />

      <div className="flex flex-col p-5 sm:p-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {tier.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{tier.sessionLabel}</p>
          </div>
          <PriceAmount amount={tier.startingAmount} suffix="起／堂" />
        </div>

        <div className="mt-auto">
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
