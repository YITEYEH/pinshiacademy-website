import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  /**
   * 不在此做 www ↔ apex 的 host 轉址：Vercel／DNS 若已設定主網域轉址，
   * 與 Next redirects 疊加會造成 ERR_TOO_MANY_REDIRECTS。
   * 請在託管後台只保留一組 301，並讓 NEXT_PUBLIC_SITE_URL 與該慣用網址一致。
   */
  async redirects() {
    return [
      // GSC 常誤填 /sitemap；若回 404 HTML 會報「Sitemap 為 HTML 檔案」
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },
      { source: "/online-tutoring", destination: "/courses", permanent: true },
      { source: "/courses/math", destination: "/courses", permanent: true },
      { source: "/courses/senior-high", destination: "/courses", permanent: true },
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

