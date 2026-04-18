import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { getGa4MeasurementId, getGoogleSiteVerificationToken } from "@/lib/analytics-env";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
    url: SITE.url,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga4Id = getGa4MeasurementId();

  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {ga4Id ? <GoogleAnalytics measurementId={ga4Id} /> : null}
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

