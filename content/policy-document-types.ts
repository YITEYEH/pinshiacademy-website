export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "ol"; items: readonly string[] }
  | { type: "internalLink"; before: string; href: string; linkText: string; after: string }
  | { type: "contact" };

export type PolicySection = {
  title: string;
  blocks: readonly PolicyBlock[];
};
