import type { NextConfig } from "next";

function normalizeCanonicalSiteUrl(): URL | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fallback = "https://pinshiacademy.com";
  const candidate = (raw || fallback).replace(/\/$/, "");
  try {
    const u = new URL(candidate);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return u;
  } catch {
    try {
      return new URL(fallback);
    } catch {
      return null;
    }
  }
}

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  /**
   * 將 www 與非 www 其中一邊 301 到 NEXT_PUBLIC_SITE_URL 的 hostname，
   * 與 lib/site.ts、canonical、sitemap 一致，減少 Ahrefs「canonical 指向轉址」類問題。
   */
  async redirects() {
    const canonical = normalizeCanonicalSiteUrl();
    if (!canonical) return [];

    const host = canonical.hostname;
    if (host === "localhost" || host.endsWith(".local")) return [];

    const origin = canonical.origin;
    const withWww = `www.${host.replace(/^www\./, "")}`;
    const apex = host.replace(/^www\./, "");

    if (host.startsWith("www.")) {
      return [
        {
          source: "/:path*",
          has: [{ type: "host" as const, value: apex }],
          destination: `${origin}/:path*`,
          permanent: true,
        },
      ];
    }

    return [
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: withWww }],
        destination: `${origin}/:path*`,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/brand/logo.png" }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "blog.pinshiacademy.com" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "i1.wp.com" },
      { protocol: "https", hostname: "i2.wp.com" },
      { protocol: "https", hostname: "i3.wp.com" },
      { protocol: "https", hostname: "c0.wp.com" },
      { protocol: "https", hostname: "c1.wp.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "www.gravatar.com" },
    ],
  },
};

export default nextConfig;

