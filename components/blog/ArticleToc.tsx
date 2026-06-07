import type { ArticleTocItem } from "@/content/content-api/types";

type Props = {
  items: ArticleTocItem[];
};

export function ArticleToc({ items }: Props) {
  if (items.length < 2) return null;

  return (
    <nav
      aria-label="文章目錄"
      className="mb-10 rounded-xl border border-border bg-[#f7f9f7] p-5 max-w-[42rem] mx-auto"
    >
      <p className="text-sm font-semibold text-foreground mb-3">本文目錄</p>
      <ol className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "pl-4" : undefined}
          >
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-primary transition-colors leading-relaxed"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
