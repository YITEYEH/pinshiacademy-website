const H2_BLOCK_REGEX = /<h2\b[^>]*>[\s\S]*?<\/h2>/gi;

/** 在第 n 個 h2 區塊結束後切分 HTML；不足 n 個 h2 時回傳 null */
export function splitArticleHtmlAfterNthH2(
  html: string,
  n: number,
): { before: string; after: string } | null {
  if (n < 1) return null;

  const matches = [...html.matchAll(H2_BLOCK_REGEX)];
  if (matches.length < n) return null;

  const target = matches[n - 1];
  const splitIndex = (target.index ?? 0) + target[0].length;

  return {
    before: html.slice(0, splitIndex),
    after: html.slice(splitIndex),
  };
}
