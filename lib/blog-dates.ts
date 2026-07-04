/** 僅在更新日期不早於發布日期時回傳，供顯示與 SEO 使用。 */
export function effectiveModifiedDate(
  publishedDate: string,
  modifiedDate?: string,
): string | undefined {
  if (!modifiedDate || modifiedDate === publishedDate) return undefined;
  if (modifiedDate < publishedDate) return undefined;
  return modifiedDate;
}
