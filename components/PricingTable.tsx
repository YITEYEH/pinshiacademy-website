import type { PricingGroup } from "@/content/pricing";
import { Fragment } from "react";

type Props = {
  groups: readonly PricingGroup[];
};

export function PricingTable({ groups }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full table-fixed text-sm">
        <colgroup>
          <col className="w-[42%] sm:w-[38%]" />
          <col className="w-[58%] sm:w-[62%]" />
        </colgroup>
        <thead>
          <tr className="bg-[#f7f9f7] border-b border-border">
            <th className="text-left font-semibold text-foreground px-4 py-3">
              科目
            </th>
            <th className="text-right font-semibold text-foreground px-4 py-3">
              單堂價格
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
                <tr key={row.subject}>
                  <td className="px-4 py-3 text-foreground align-middle">
                    {row.subject}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground/80 tabular-nums whitespace-nowrap align-middle">
                    {row.price}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
