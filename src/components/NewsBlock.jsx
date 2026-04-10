"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "../lib/site-config";

export default function NewsBlock({ title, posts = [], color = "#222222", href = "#" }) {
  if (!posts || posts.length === 0) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 4);

  return (
    <div className="flex flex-col gap-6 mb-16">
      <div className="flex justify-between items-center border-b-2 border-gray-100 pb-2 relative">
        <h2 className="text-xl font-black tracking-widest text-[#222222]">
           {title}
        </h2>
        <div className="absolute -bottom-[2px] left-0 w-24 h-[2px]" style={{ backgroundColor: color }}></div>
        <Link href={href} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors">
          View All <span className="ml-1">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Post (Left 7 Cols) */}
        <div className="lg:col-span-7 group flex flex-col gap-5">
           <Link href={`/${mainPost.slug}`} className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <Image 
                src={mainPost.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl}
                alt={mainPost.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
           </Link>
           <div className="flex flex-col gap-3">
              <Link href={`/${mainPost.slug}`}>
                <h3 className="text-2xl font-black text-[#222222] leading-tight group-hover:text-red-600 transition-colors italic" dangerouslySetInnerHTML={{ __html: mainPost.title }} />
              </Link>
              <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                <span>{mainPost.author?.node?.name}</span>
                <span>-</span>
                <span>{new Date(mainPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <p className="text-[14px] text-gray-600 leading-relaxed font-open-sans line-clamp-2" dangerouslySetInnerHTML={{ __html: mainPost.excerpt }} />
           </div>
        </div>

        {/* Side Posts (Right 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           {sidePosts.map((post, idx) => (
              <Link key={idx} href={`/${post.slug}`} className="group flex gap-4 items-start">
                 <div className="relative w-24 h-20 shrink-0 overflow-hidden bg-gray-100">
                    <Image 
                      src={post.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                 </div>
                 <div className="flex flex-col gap-1.5 flex-1">
                    <h4 className="text-[13px] font-bold text-[#222222] leading-snug group-hover:text-red-600 transition-colors line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                 </div>
              </Link>
           ))}
        </div>
      </div>
    </div>
  );
}
