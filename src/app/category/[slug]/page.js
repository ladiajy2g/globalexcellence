import Image from "next/image";
import Link from "next/link";
import { getCategoryPosts } from "../../../lib/wp-api";
import { notFound } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PostCard from "../../../components/PostCard";
import { siteConfig } from "../../../lib/site-config";

export const revalidate = 300; // 5 minutes

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categoryData = await getCategoryPosts(slug, 12);
  
  if (!categoryData || !categoryData.name) {
    notFound();
  }

  const { name, posts } = categoryData;

  return (
    <div className="w-full bg-white pb-24 font-roboto text-[#222222]">
      {/* 1. CATEGORY HEADER */}
      <div className="border-b border-gray-100 mb-12">
        <div className="w-[95%] xl:w-[85%] mx-auto px-4 py-16 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>/</span>
            <span className="text-[#222222]">{name}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic leading-none">
            {name}
          </h1>
          <div className="w-20 h-1 bg-brand-primary mt-4"></div>
        </div>
      </div>

      <div className="w-[95%] xl:w-[85%] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content (Left 8 Cols) */}
          <div className="lg:col-span-8">
            {posts && posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post, idx) => (
                    <Link key={idx} href={`/${post.slug}`} className="group flex flex-col gap-5 pb-8 border-b border-gray-100 last:border-0">
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                        <Image 
                            src={post.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl md:text-2xl font-black leading-tight group-hover:text-red-600 transition-colors italic line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title }} />
                        <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                            <span>{post.author?.node?.name}</span>
                            <span>-</span>
                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <p className="text-[14px] text-gray-600 leading-relaxed font-open-sans line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </div>
                    </Link>
                ))}
                </div>
            ) : (
                <p className="text-gray-500 italic">No stories found in this category.</p>
            )}
            
            {/* Pagination Placeholder */}
            {posts && posts.length >= 10 && (
                <div className="flex justify-center mt-16 pt-12 border-t border-gray-100">
                <button className="px-12 py-4 bg-[#222222] text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-red-600 transition-all duration-300">
                    Load More Stories
                </button>
                </div>
            )}
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            <div className="sticky top-24">
                <div className="relative border-b-2 border-gray-100 pb-2 flex items-center mb-8">
                  <h3 className="text-sm font-black tracking-wider text-[#222222]">Sidebar Advert</h3>
                  <div className="absolute -bottom-[2px] left-0 w-12 h-[2px] bg-brand-primary"></div>
                </div>
                <Sidebar showAdverts={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
