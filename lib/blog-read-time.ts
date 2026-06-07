/** 快速閱讀估算（約 2000 字/分鐘），貼近短文標題如「3 分鐘閱讀」的預期 */
const CHARS_PER_MINUTE = 2000;
const MAX_MINUTES = 10;

export function estimateReadTime(htmlOrText: string): string {
  const plain = htmlOrText.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const chars = plain.length;
  if (chars === 0) return "";
  const minutes = Math.min(
    MAX_MINUTES,
    Math.max(1, Math.ceil(chars / CHARS_PER_MINUTE)),
  );
  return `${minutes} 分鐘`;
}
