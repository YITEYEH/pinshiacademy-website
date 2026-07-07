import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingFaqSection } from "@/content/pricing";

export function PricingFaq() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {pricingFaqSection.title}
        </h2>

        <Accordion
          type="single"
          collapsible
          className="mt-10 rounded-2xl border border-border bg-white px-5 sm:px-6"
        >
          {pricingFaqSection.items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="py-5 text-base font-medium text-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                {"answer" in item && item.answer ? item.answer : null}
                {"refundLink" in item && item.refundLink ? (
                  <>
                    {item.answerPrefix}
                    <Link
                      href="/refund"
                      className="text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      退費（款）辦法
                    </Link>
                    {item.answerSuffix}
                  </>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
