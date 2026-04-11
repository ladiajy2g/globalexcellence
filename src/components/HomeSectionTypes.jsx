"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "../lib/site-config";

function SectionHeader({ title, color = "#222222", href = "#" }) {
  return (
    <div className="flex justify-between items-center border-b-2 border-gray-100 pb-2 relative mb-8">
      <h2 className="text-xl font-black tracking-widest text-[#222222]">
         {title}
      </h2>
      <div className="absolute -bottom-[2px] left-0 w-24 h-[2px]" style={{ backgroundColor: color }}></div>
      <Link href={href} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors">
        View All <span className="ml-1">→</span>
      </Link>
    </div>
  );
}

/**
 * STYLE 1: Featured + Side List (Standard)
 */
export function FeaturedSection({ title, posts = [], color, href }) {
  if (!posts || posts.length === 0) return null;
  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 4);

  return (
    <div className="flex flex-col mb-16 px-4 md:px-0">
      <SectionHeader title={title} color={color} href={href} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 xl:col-span-7 group flex flex-col gap-5">
           <Link href={`/${mainPost.slug}`} className="relative aspect-[16/10] overflow-hidden bg-gray-100 rounded-sm">
              <Image 
                src={mainPost.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl}
                alt={mainPost.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
                priority
              />
           </Link>
           <div className="flex flex-col gap-3">
              <Link href={`/${mainPost.slug}`}>
                <h3 className="text-2xl font-black text-[#222222] leading-tight group-hover:text-red-600 transition-colors italic" dangerouslySetInnerHTML={{ __html: mainPost.title }} />
              </Link>
              <p className="text-[14px] text-gray-600 leading-relaxed font-open-sans line-clamp-2" dangerouslySetInnerHTML={{ __html: mainPost.excerpt }} />
           </div>
        </div>
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
           {sidePosts.map((post, idx) => (
              <Link key={idx} href={`/${post.slug}`} className="group flex gap-4 items-start">
                 <div className="relative w-24 h-20 shrink-0 overflow-hidden bg-gray-100 rounded-sm">
                    <Image src={post.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="96px" />
                 </div>
                 <div className="flex flex-col gap-1.5 flex-1">
                    <h4 className="text-[13px] font-bold text-[#222222] leading-snug group-hover:text-red-600 transition-colors line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
                 </div>
              </Link>
           ))}
        </div>
      </div>
    </div>
  );
}

/**
 * STYLE 2: Box Grid (3-4 columns)
 */
export function GridSection({ title, posts = [], color, href }) {
  if (!posts || posts.length === 0) return null;
  const gridPosts = posts.slice(0, 4);

  return (
    <div className="flex flex-col mb-16 px-4 md:px-0">
      <SectionHeader title={title} color={color} href={href} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gridPosts.map((post, idx) => (
          <Link key={idx} href={`/${post.slug}`} className="group flex flex-col gap-4">
            <div className="relative aspect-video overflow-hidden bg-gray-100 rounded-sm">
              <Image src={post.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 400px" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[15px] font-black text-[#222222] leading-tight group-hover:text-red-600 transition-colors italic line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title }} />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * STYLE 3: Compact List Section
 */
export function ListSection({ title, posts = [], color, href }) {
  if (!posts || posts.length === 0) return null;
  const listPosts = posts.slice(0, 6);

  return (
    <div className="flex flex-col mb-16 px-4 md:px-0">
      <SectionHeader title={title} color={color} href={href} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
        {listPosts.map((post, idx) => (
          <Link key={idx} href={`/${post.slug}`} className="group flex gap-4 items-start border-b border-gray-50 pb-4 h-full">
            <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-gray-100 rounded-full border-2 border-white shadow-sm">
                <Image src={post.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <h4 className="text-[12px] font-bold text-[#222222] leading-snug group-hover:text-red-600 transition-colors line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title }} />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
