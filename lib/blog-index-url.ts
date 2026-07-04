type BlogIndexParams = {
  category?: string;
  tag?: string;
  page?: number;
};

export function buildBlogIndexHref(params: BlogIndexParams = {}) {
  const sp = new URLSearchParams();
  if (params.category) sp.set("category", params.category);
  if (params.tag) sp.set("tag", params.tag);
  if (params.page && params.page > 1) sp.set("page", String(params.page));
  const q = sp.toString();
  return q ? `/blog?${q}` : "/blog";
}
