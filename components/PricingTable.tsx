import type { PricingGroup } from "@/content/pricing";
import { Fragment } from "react";

type Props = {
  groups: readonly PricingGroup[];
  sessionDuration?: string;
};

export function PricingTable({ groups, sessionDuration }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] table-fixed text-sm">
          <colgroup>
            <col className="w-[42%] sm:w-[38%]" />
            <col className="w-[58%] sm:w-[62%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-border bg-[#f7f9f7]">
              <th className="px-4 py-3.5 text-left font-semibold text-foreground">
                科目
              </th>
              <th className="px-4 py-3.5 text-right font-semibold text-foreground">
                單堂參考價格
                {sessionDuration ? (
                  <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                    {sessionDuration}
                  </span>
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:not(:last-child)]:border-b [&_tr:not(:last-child)]:border-border">
            {groups.map((group, groupIndex) => (
              <Fragment key={group.subtitle ?? `group-${groupIndex}`}>
                {group.subtitle ? (
                  <tr className="bg-[#f0f4f1]">
                    <td
                      colSpan={2}
                      className="px-4 py-2.5 text-sm font-semibold text-foreground"
                    >
                      {group.subtitle}
                    </td>
                  </tr>
                ) : null}
                {group.rows.map((row) => (
                  <tr
                    key={row.subject}
                    className="transition-colors hover:bg-[#f7f9f7]/60"
                  >
                    <td className="px-4 py-3.5 align-middle text-foreground">
                      {row.subject}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-right align-middle font-medium tabular-nums text-foreground">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
