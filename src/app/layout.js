import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdvertSection from "../components/AdvertSection";
import { siteConfig } from "../lib/site-config";
import { getCategories, getLatestPosts } from "../lib/wp-api";

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
    template: `%s | ${siteConfig.identity.name}`,
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
    url: siteConfig.seo.baseUrl,
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
  "logo": {
    "@type": "ImageObject",
    "url": siteConfig.seo.baseUrl + siteConfig.identity.logoUrl
  },
  "description": siteConfig.identity.tagline,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": siteConfig.business.address,
    "addressLocality": siteConfig.business.locality,
    "addressRegion": siteConfig.business.region,
    "postalCode": siteConfig.business.postalCode,
    "addressCountry": siteConfig.business.country
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": siteConfig.business.geo.latitude,
    "longitude": siteConfig.business.geo.longitude
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": siteConfig.business.phone,
    "contactType": "customer service"
  },
  "knowsAbout": siteConfig.business.compliance,
  "sameAs": [
    siteConfig.seo.facebookUrl,
    "https://x.com/" + siteConfig.seo.twitterHandle.replace("@", ""),
  ]
};

export default async function RootLayout({ children }) {
  const [categories, footerPosts] = await Promise.all([
    getCategories(),
    getLatestPosts(3)
  ]);

  return (
    <html lang="en" className={`${roboto.variable} ${inter.variable}`} suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href={process.env.WORDPRESS_API_URL} />
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