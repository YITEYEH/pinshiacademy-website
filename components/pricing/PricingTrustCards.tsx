import { ShieldCheck } from "lucide-react";
import { pricingTrustSection } from "@/content/pricing";

export function PricingTrustCards() {
  return (
    <section className="py-20 lg:py-24 bg-accent/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {pricingTrustSection.title}
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {pricingTrustSection.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
