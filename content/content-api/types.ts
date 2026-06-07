export type ArticleTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  modifiedDate?: string; // YYYY-MM-DD
  category?: string;
  tags?: string[];
  readTime?: string;
  cover?: string;
  authorName?: string;
  authorAvatar?: string;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  toc?: ArticleTocItem[];
};

export type BlogPostSummary = {
  slug: string;
  frontmatter: BlogPostFrontmatter;
};

