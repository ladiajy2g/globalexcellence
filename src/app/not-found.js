import Link from "next/link";
import Image from "next/image";
import { getLatestPosts } from "../lib/wp-api";
import { siteConfig } from "../lib/site-config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCategories } from "../lib/wp-api";

import BackButton from "../components/BackButton";

export default async function NotFound() {
  const [latestPosts, footerPosts, categories] = await Promise.all([
    getLatestPosts(6),
    getLatestPosts(3),
    getCategories()
  ]);

  return (
    <div className="min-h-screen flex flex-col font-roboto bg-white">
      <Header categories={categories} />
      
      <main className="flex-1 flex flex-col items-center justify-center py-24 md:py-32">
        <div className="w-[95%] xl:w-[85%] mx-auto px-4 text-center flex flex-col items-center">
          <div className="relative mb-8 group">
            <span className="text-[120px] md:text-[200px] font-black leading-none text-gray-50 select-none transition-all group-hover:text-red-50">404</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-[#222222]">Story Relocated</h1>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-gray-500 font-serif italic mb-12 max-w-2xl">
            The article you're looking for may have been moved or archived. Explore our latest headlines below.
          </p>
          
          <div className="w-full border-t border-gray-100 pt-16">
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-2xl font-black uppercase tracking-tight italic border-l-4 border-red-600 pl-4 text-left">Suggested Reading</h2>
               <Link href="/" className="text-[11px] font-black uppercase tracking-widest text-red-600 hover:text-black transition-colors hidden md:block">View All Stories →</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {latestPosts.map((p, idx) => (
                <Link key={idx} href={`/${p.slug}`} className="group flex flex-col gap-4 text-left">
                  <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-sm">
                    <Image 
                      src={p.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl} 
                      alt={p.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-600">{p.categories?.nodes[0]?.name || 'Recent'}</span>
                    <h3 className="text-lg font-black leading-tight group-hover:text-red-600 transition-colors italic line-clamp-2">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center gap-4">
               <Link href="/" className="px-10 py-4 bg-[#222222] text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-red-600 transition-all duration-300 shadow-lg">
                  Homepage
               </Link>
               <BackButton 
                className="px-10 py-4 bg-white border border-gray-200 text-[#222222] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-gray-50 transition-all duration-300 shadow-md"
               />
            </div>
          </div>
        </div>
      </main>

      <Footer latestPosts={footerPosts} />
    </div>
  );
}
