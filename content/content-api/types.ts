export type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
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
};

export type BlogPostSummary = {
  slug: string;
  frontmatter: BlogPostFrontmatter;
};

