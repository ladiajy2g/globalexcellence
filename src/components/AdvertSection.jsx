import Image from "next/image";
import { getAdvertsByPlacement } from "../lib/wp-api";

/**
 * Robustly extract YouTube video ID from any URL format
 */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    // Standard: youtube.com/watch?v=ID
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }
    // Short: youtu.be/ID
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    // Already an embed URL
    if (url.includes("/embed/")) return url;
  } catch {
    return null;
  }
  return null;
}

/**
 * A single ad slot — renders an image banner or YouTube video.
 * Fails silently (returns null) if the ad has no content to show.
 */
function AdSlot({ ad, isSidebar = false, aspectClass = "aspect-[3/1]" }) {
  const img = ad.featuredImage?.node;
  const embedUrl = getYouTubeEmbedUrl(ad.adVideoUrl);


  // --- VIDEO AD ---
  if (embedUrl) {
    return (
      <div className="w-full overflow-hidden rounded-md bg-black shadow-md">
        <iframe
          src={`${embedUrl}?autoplay=0&mute=1&controls=1&rel=0`}
          className="w-full aspect-video border-0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={ad.title || "Advertisement"}
        />
      </div>
    );
  }

  // --- IMAGE AD ---
  if (!img?.sourceUrl) return null;

  const hasRealDimensions = img.mediaDetails?.width && img.mediaDetails?.height;

  const ImageEl = hasRealDimensions ? (
    // Use exact dimensions from WordPress for zero layout shift
    <Image
      src={img.sourceUrl}
      alt={img.altText || ad.title || "Advertisement"}
      width={img.mediaDetails.width}
      height={img.mediaDetails.height}
      className="w-full h-auto object-cover hover:opacity-90 transition-opacity duration-300"
      sizes={isSidebar ? "(max-width: 768px) 100vw, 360px" : "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"}
      priority={false}
    />
  ) : (
    // Fallback: fill container with aspect ratio
    <div className={`group relative ${aspectClass} w-full overflow-hidden`}>
      <Image
        src={img.sourceUrl}
        alt={img.altText || ad.title || "Advertisement"}
        fill
        className="object-cover hover:opacity-90 transition-opacity duration-300"
        sizes={isSidebar ? "(max-width: 768px) 100vw, 360px" : "100vw"}
      />
    </div>
  );

  if (ad.adLink) {
    return (
      <a href={ad.adLink} target="_blank" rel="noopener noreferrer" className="block w-full rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        {ImageEl}
      </a>
    );
  }

  return (
    <div className="w-full rounded-md overflow-hidden shadow-sm">
      {ImageEl}
    </div>
  );
}

/**
 * AdvertSection Component
 * @param {string} placement  — the ad_placement taxonomy slug
 * @param {'wide' | 'grid' | 'sidebar'} layout
 * @param {string} className
 */
export default async function AdvertSection({ placement, layout = "wide", className = "" }) {
  const limit = layout === "grid" ? 6 : (layout === "sidebar" ? 10 : (layout === "stack" ? 5 : 1));
  const adverts = await getAdvertsByPlacement(placement, limit);
  
  if (!adverts || adverts.length === 0) {
    // Return a low-profile fallback to reserve space or stay invisible based on context
    // For Top Banner, we return null to keep the header tight if no ads
    if (placement === "top-banner") return null;
    return <div className={`w-full opacity-0 pointer-events-none transition-opacity duration-500`} />;
  }



  // --- GRID LAYOUT (3 columns, 2 rows = 6 slots, only show rows with ads) ---
  if (layout === "grid") {
    const totalAds = adverts.length;

    if (totalAds === 0) return null;

    const row1 = [0, 1, 2].map(i => adverts[i] || null);
    const row2 = [3, 4, 5].map(i => adverts[i] || null);

    const row1HasAd = row1.some(slot => slot !== null);
    const row2HasAd = row2.some(slot => slot !== null);

    if (!row1HasAd && !row2HasAd) return null;

    return (
      <section className={`container mx-auto px-4 py-8 ${className}`} aria-label="Sponsored">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {row1HasAd && row1.map((ad, i) => (
            ad ? (
              <AdSlot key={i} ad={ad} aspectClass="aspect-[4/5]" />
            ) : (
              <div key={i} className="aspect-[4/5] bg-gray-100 rounded-lg" />
            )
          ))}
        </div>
        {row2HasAd && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {row2.map((ad, i) => (
              ad ? (
                <AdSlot key={i + 3} ad={ad} aspectClass="aspect-[4/5]" />
              ) : (
                <div key={i + 3} className="aspect-[4/5] bg-gray-100 rounded-lg" />
              )
            ))}
          </div>
        )}
      </section>
    );
  }

  // --- STACK LAYOUT (vertical stacked wide banners, e.g. hero-bottom, between-sections) ---
  if (layout === "stack") {
    return (
      <section className={`container mx-auto px-4 py-4 ${className}`} aria-label="Sponsored">
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {adverts.map((ad, i) => (
            <AdSlot key={i} ad={ad} aspectClass="aspect-[2/1] md:aspect-[3/1]" />
          ))}
        </div>
      </section>
    );
  }

  // --- SIDEBAR LAYOUT (portrait, stacked vertically, e.g. article-sidebar) ---
  if (layout === "sidebar") {
    return (
      <section className={`w-full py-4 ${className}`} aria-label="Sponsored">
        <div className="flex flex-col gap-4">
          {adverts.map((ad, i) => (
            <AdSlot key={i} ad={ad} isSidebar aspectClass="aspect-[4/5]" />
          ))}
        </div>
      </section>
    );
  }

  // --- WIDE / DEFAULT LAYOUT (banners, e.g. top-banner, hero-bottom) ---
  if (layout === "wide") {
    return (
      <section className={`container mx-auto px-4 py-4 ${className}`} aria-label="Sponsored">
        <AdSlot ad={adverts[0]} aspectClass="aspect-[2/1] md:aspect-[3/1]" />
      </section>
    );
  }

  // --- FOOTER LAYOUT (single centered banner, any size - small or large) ---
  if (layout === "footer") {
    return (
      <section className={`container mx-auto px-4 py-6 ${className}`} aria-label="Sponsored">
        <div className="flex justify-center max-w-3xl mx-auto">
          <AdSlot ad={adverts[0]} />
        </div>
      </section>
    );
  }
}
