import HeroSection from "../components/HeroSection";
import AdvertSection from "../components/AdvertSection";
import TrendingTicker from "../components/TrendingTicker";
import { FeaturedSection, GridSection, ListSection } from "../components/HomeSectionTypes";
import { getHeroData, getHomeSections, getCategories } from "../lib/wp-api";
import { siteConfig } from "../lib/site-config";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../components/Sidebar";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const { homeLayout } = siteConfig;

  // 1. Fetch Data
  const [heroData, allCategories] = await Promise.all([
    getHeroData(homeLayout.heroConfig || {}),
    getCategories()
  ]);

  // 2. Determine Top 8 Categories with content
  // We prioritize some key slugs first, then fill with the rest of active categories
  const excludedSlugs = [
    "anniversary-edition", "showbizplus", "anitas-diary", "body-soul", 
    "destiny-by-scherey-m-momoh", "kwara-osun-gist", "oyo-ogun-gist"
  ];
  const prioritySlugs = ["cover-stories", "news", "politics", "society"];

  const filteredCategories = (allCategories || []).filter(cat => 
    cat?.slug && 
    cat.slug !== "uncategorized" && 
    cat.slug !== "featured" && 
    !excludedSlugs.includes(cat.slug) &&
    (!cat.parentDatabaseId || cat.parentDatabaseId === 0)
  );

  const sortedCategories = filteredCategories.sort((a, b) => {
    const aPri = prioritySlugs.indexOf(a.slug);
    const bPri = prioritySlugs.indexOf(b.slug);
    if (aPri !== -1 && bPri !== -1) return aPri - bPri;
    if (aPri !== -1) return -1;
    if (bPri !== -1) return 1;
    return 0;
  });

  const selectedSections = sortedCategories.slice(0, 10).map(cat => {
    // Slug mapping for pretty URLs (Reverse of wp-api source mapping)
    const slugMap = {
      "cover-stories": "cover",
      "society": "society-and-fashion"
    };
    return {
      id: cat.slug,
      title: cat.name,
      slug: slugMap[cat.slug] || cat.slug
    };
  });

  // 3. Batch Fetch Posts for these sections
  const sectionPosts = await getHomeSections(selectedSections.map(s => {
    // We must use the ORIGINAL slug for fetching data
    const originalSlugMap = {
      "cover": "cover-stories",
      "society-and-fashion": "society"
    };
    return {
      id: originalSlugMap[s.slug] || s.slug,
      categorySlug: originalSlugMap[s.slug] || s.slug,
      limit: 6
    };
  }));

  // Combine fresh and stacked for the ticker
  const tickerPosts = heroData ? [...(heroData.fresh || []), ...(heroData.stacked || [])] : [];

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto overflow-hidden">
      <main className="flex-1 w-full flex flex-col">
        
        {/* 1. TRENDING TICKER */}
        {tickerPosts && tickerPosts.length > 0 && <TrendingTicker posts={tickerPosts} />}

        {/* 2. HERO SECTION (BIG GRID) - Maintained per user request */}
        {heroData?.big && <HeroSection data={heroData} />}

        {/* 3. MAIN CONTENT GRID (Sidebar and Main Area) */}
        <div className="w-[95%] xl:w-[85%] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 py-12">
          
          {/* LEFT CONTENT (70% - Dynamic Sections) */}
          <div className="lg:col-span-8 flex flex-col">
            
            {selectedSections.map((section, index) => {
              const posts = sectionPosts[section.id];
              if (!posts || posts.length === 0) return null;

              const href = `/category/${section.slug}`;
              
              // Alternating Logic
              const styles = [FeaturedSection, GridSection, ListSection];
              const SectionComponent = styles[index % styles.length];

              return (
                <div key={section.id}>
                  <SectionComponent title={section.title} posts={posts} href={href} color={index % 2 === 0 ? "#dc2626" : "#222222"} />
                  
                  {/* Inject Advert after first and fourth section */}
                  {(index === 0 || index === 3) && (
                    <AdvertSection placement="between-sections" layout="stack" className="mb-16" />
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDEBAR (30% - Sticky) */}
          <div className="lg:col-span-4 max-lg:hidden">
            <div className="sticky top-28">
              <Sidebar showAdverts={true} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
