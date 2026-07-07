import { pricingExplanationSection } from "@/content/pricing";

export function PricingFactorsCard() {
  return (
    <div className="rounded-2xl border border-border bg-[#fafbfa] p-6 sm:p-8">
      <p className="mb-5 text-sm font-semibold text-muted-foreground">
        {pricingExplanationSection.factorsTitle}
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 sm:items-stretch">
        {pricingExplanationSection.factors.map((factor) => (
          <li
            key={factor.label}
            className="flex h-full min-h-16 items-center rounded-xl border border-border/80 bg-white px-4 py-3.5"
          >
            <span className="text-[0.9375rem] font-medium leading-snug text-foreground">
              {factor.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
