import HeroSection from "../components/HeroSection";
import AdvertSection from "../components/AdvertSection";
import TrendingTicker from "../components/TrendingTicker";
import { FeaturedSection, GridSection, ListSection } from "../components/HomeSectionTypes";
import { getHeroData, getHomeSections, getCategories } from "../lib/wp-api";
import { siteConfig } from "../lib/site-config";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const { homeLayout } = siteConfig;

  // 1. Fetch Data
  const [heroData, allCategories] = await Promise.all([
    getHeroData(homeLayout.heroConfig || {}),
    getCategories()
  ]);

  // 2. Determine Top 8 Categories with content
  // We prioritize some key slugs first, then fill with the rest of active categories
  const prioritizedSlugs = ["news", "politics", "interview", "showbizplus", "society-and-fashion", "crime", "lifestyle", "events"];
  
  const activeCategories = (allCategories || []).filter(cat => 
    cat?.slug && cat.slug !== "uncategorized" && cat.slug !== "featured"
  );

  const selectedSections = prioritizedSlugs
    .map((slug) => {
      const cat = activeCategories.find(c => c.slug === slug);
      if (!cat) return null;
      return { id: cat.slug, title: cat.name, slug: cat.slug };
    })
    .filter(Boolean)
    .slice(0, 8); // Strictly limit to top 8 per user request

  // 3. Batch Fetch Posts for these sections
  const sectionPosts = await getHomeSections(selectedSections.map(s => ({
    id: s.slug,
    categorySlug: s.slug,
    limit: 6
  })));

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
              const styleType = index % 3;
              
              const renderSection = () => {
                switch(styleType) {
                  case 0:
                    return <FeaturedSection key={section.id} title={section.title} posts={posts} href={href} color="#dc2626" />;
                  case 1:
                    return <GridSection key={section.id} title={section.title} posts={posts} href={href} color="#222222" />;
                  case 2:
                    return <ListSection key={section.id} title={section.title} posts={posts} href={href} color="#222222" />;
                  default:
                    return <FeaturedSection key={section.id} title={section.title} posts={posts} href={href} color="#dc2626" />;
                }
              };

              return (
                <div key={section.id}>
                  {renderSection()}
                  {/* Inject Advert after first and fourth section */}
                  {(index === 0 || index === 3) && (
                    <AdvertSection placement="between-sections" layout="stack" className="mb-16" />
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDEBAR (30% - Sticky) */}
          <aside className="lg:col-span-4">
             <div className="sticky top-24 flex flex-col gap-12">
               
               {/* SIDEBAR WIDGET: STAY CONNECTED */}
               <div className="flex flex-col gap-6">
                  <div className="relative border-b-2 border-gray-100 pb-2 flex items-center">
                    <h3 className="text-sm font-black tracking-wider text-[#222222]">Stay Connected</h3>
                    <div className="absolute -bottom-[2px] left-0 w-12 h-[2px] bg-brand-primary"></div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                     <Link href={siteConfig.seo.facebookUrl} target="_blank" className="flex items-center justify-between p-4 bg-[#3b5998] text-white hover:opacity-90 transition-opacity">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                          <span className="text-[11px] font-black uppercase tracking-widest">Facebook</span>
                        </div>
                     </Link>
                     <Link href={"https://twitter.com/" + siteConfig.seo.twitterHandle.replace("@", "")} target="_blank" className="flex items-center justify-between p-4 bg-[#1da1f2] text-white hover:opacity-90 transition-opacity">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                          <span className="text-[11px] font-black uppercase tracking-widest">Twitter</span>
                        </div>
                     </Link>
                  </div>
               </div>

               {/* SIDEBAR WIDGET: ADVERT */}
               <AdvertSection placement="article-sidebar" layout="sidebar" />

               {/* SIDEBAR WIDGET: POPULAR POSTS */}
               <div className="flex flex-col gap-8">
                  <div className="relative border-b-2 border-gray-100 pb-2 flex items-center">
                    <h3 className="text-sm font-black tracking-wider text-[#222222]">Popular Posts</h3>
                    <div className="absolute -bottom-[2px] left-0 w-12 h-[2px] bg-brand-primary"></div>
                  </div>
                  <div className="flex flex-col gap-6">
                     {heroData?.popular?.slice(0, 5).map((post, idx) => (
                        <Link key={idx} href={`/${post.slug}`} className="group flex gap-4 items-start h-full">
                           <div className="relative w-20 h-16 shrink-0 overflow-hidden bg-gray-100 rounded-sm">
                              <Image 
                                src={post.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                           </div>
                           <div className="flex flex-col gap-1 flex-1">
                              <h4 className="text-[12px] font-bold text-[#222222] leading-snug group-hover:text-red-600 transition-colors line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title }} />
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                           </div>
                        </Link>
                     ))}
                  </div>
               </div>

               {/* FINAL SIDEBAR ADVERT (FLOATING AT BOTTOM OF SIDEBAR) */}
               <AdvertSection placement="footer-banner" layout="stack" className="mt-4" />
             </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
