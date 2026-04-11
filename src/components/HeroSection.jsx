"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../lib/site-config";

/**
 * MODULAR HERO SECTION
 * Supports different layout types for various site aesthetics.
 */
export default function HeroSection({ data }) {
  const { big, fresh, stacked } = data;

  if (!big) return null;

  // Combine fresh and stacked for the grid variety
  const gridPosts = [...(fresh || []), ...(stacked || [])].slice(0, 2);

  return (
    <section className="w-full bg-white pb-10">
      <div className="w-[95%] xl:w-[85%] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:h-[550px]">
          
          {/* Main Big Post (Left 8 Columns) */}
          <div className="lg:col-span-8 relative group overflow-hidden h-[350px] lg:h-full">
            <Link href={`/${big.slug}`} className="block w-full h-full relative">
              <Image
                src={big.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl}
                alt={big.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 850px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-10 flex flex-col gap-3">
                <span className="bg-red-600 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] px-3 py-1.5 self-start">
                  {big.categories?.node?.[0]?.name || "Featured"}
                </span>
                <h2 className="text-2xl md:text-5xl font-black text-white leading-[1.1] group-hover:text-red-600 transition-colors italic" dangerouslySetInnerHTML={{ __html: big.title }} />
                <div className="flex items-center gap-4 text-white/60 text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
                  <span>{big.author?.node?.name}</span>
                  <span>-</span>
                  <span>{new Date(big.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Side Grid (Right 4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-1 h-[500px] lg:h-full">
            {gridPosts.map((post, idx) => (
              <div key={idx} className="flex-1 relative group overflow-hidden">
                <Link href={`/${post.slug}`} className="block w-full h-full relative font-roboto">
                  <Image
                    src={post.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-2">
                    <span className="bg-red-600 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1 self-start">
                      {post.categories?.node?.[0]?.name || "Latest"}
                    </span>
                    <h3 className="text-lg md:text-xl font-black text-white leading-tight group-hover:text-red-600 transition-colors italic line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title }} />
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
