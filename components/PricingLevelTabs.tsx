import { PricingTable } from "@/components/PricingTable";
import { pricingLevels } from "@/content/pricing";

const tabLabelClass =
  "pricing-level-tab cursor-pointer rounded-md px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground";

export function PricingLevelTabs() {
  return (
    <>
      <input
        type="radio"
        name="pricing-level"
        id="pricing-level-0"
        defaultChecked
        className="peer/pricing0 sr-only"
      />
      <input
        type="radio"
        name="pricing-level"
        id="pricing-level-1"
        className="peer/pricing1 sr-only"
      />
      <input
        type="radio"
        name="pricing-level"
        id="pricing-level-2"
        className="peer/pricing2 sr-only"
      />

      <div className="pricing-level-tabs-header mb-8 text-center">
        <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
          參考價目表
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          一對一單堂課程，依科目提供參考價格區間
        </p>

        <div className="mx-auto mt-6 inline-flex flex-wrap justify-center gap-1 rounded-lg bg-[#f7f9f7] p-1">
          <label htmlFor="pricing-level-0" className={tabLabelClass}>
            {pricingLevels[0].level}
          </label>
          <label htmlFor="pricing-level-1" className={tabLabelClass}>
            {pricingLevels[1].level}
          </label>
          <label htmlFor="pricing-level-2" className={tabLabelClass}>
            {pricingLevels[2].level}
          </label>
        </div>
      </div>

      <div className="hidden peer-checked/pricing0:block">
        <PricingTable
          groups={pricingLevels[0].groups}
          sessionDuration={pricingLevels[0].sessionDuration}
        />
      </div>
      <div className="hidden peer-checked/pricing1:block">
        <PricingTable
          groups={pricingLevels[1].groups}
          sessionDuration={pricingLevels[1].sessionDuration}
        />
      </div>
      <div className="hidden peer-checked/pricing2:block">
        <PricingTable
          groups={pricingLevels[2].groups}
          sessionDuration={pricingLevels[2].sessionDuration}
        />
      </div>
    </>
  );
}
