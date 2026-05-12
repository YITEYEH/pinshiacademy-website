import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { getGa4MeasurementId, getGoogleSiteVerificationToken } from "@/lib/analytics-env";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const googleSiteVerification = getGoogleSiteVerificationToken();

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    template: `%s｜${SITE.name}`,
  },
  description: SITE.defaultDescription,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "zh_TW",
  },
  alternates: {
    canonical: SITE.url,
  },
  icons: {
    icon: [{ url: "/brand/logo.png", type: "image/png" }],
  },
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SITE.name,
      alternateName: SITE.englishName,
      url: SITE.url,
      logo: `${SITE.url}/brand/logo.png`,
    },
    {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.name,
      inLanguage: "zh-Hant",
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/brand/logo.png`,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga4Id = getGa4MeasurementId();

  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        {ga4Id ? <GoogleAnalytics measurementId={ga4Id} /> : null}
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}

