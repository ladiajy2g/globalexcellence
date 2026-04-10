import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdvertSection from "../components/AdvertSection";
import { siteConfig } from "../lib/site-config";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL(siteConfig.seo.baseUrl),
  title: {
    template: siteConfig.seo.titleTemplate,
    default: siteConfig.identity.name + " | " + siteConfig.identity.tagline,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.seo.author }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    siteName: siteConfig.identity.name,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  "name": siteConfig.identity.name,
  "alternateName": "Global Excellence Magazine",
  "url": siteConfig.seo.baseUrl,
  "logo": siteConfig.seo.baseUrl + siteConfig.identity.logoUrl,
  "description": siteConfig.identity.tagline,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lagos",
    "addressRegion": "Lagos State",
    "addressCountry": "NG"
  },
  "sameAs": [
    siteConfig.seo.facebookUrl,
    "https://twitter.com/" + siteConfig.seo.twitterHandle.replace("@", ""),
  ]
};

import { getLatestPostsByCategory, getCategories, getLatestPosts } from "../lib/wp-api";

export default async function RootLayout({ children }) {
  const footerPosts = await getLatestPosts(3);
  const categories = await getCategories();

  return (
    <html lang="en" className={`${roboto.variable} ${inter.variable}`} suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-roboto">
        <Header categories={categories} />
        <AdvertSection placement="top-banner" layout="grid" className="bg-gray-50/50" />
        <main className="flex-1">{children}</main>
        <AdvertSection placement="footer-banner" layout="stack" className="bg-gray-50/50" />
        <Footer latestPosts={footerPosts} />
      </body>
    </html>
  );
}