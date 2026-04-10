"use client";

import Image from "next/image";
import Link from "next/link";

export default function PostCard({ 
  post, 
  variant = "standard", 
  showExcerpt = false, 
  showAuthor = true,
  aspectRatio = "aspect-[16/9]",
  isCircle = false
}) {
  if (!post) return null;

  const { title, slug, date, excerpt, author, featuredImage, categories } = post;
  const imageUrl = featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800";

  if (variant === "overlay") {
    return (
      <Link href={`/${slug}`} className={`group relative block ${aspectRatio} overflow-hidden rounded-[2px] bg-gray-900 transition-colors`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
          {/* Play Icon for "Must Read" style */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 opacity-0 group-hover:opacity-100 transition-all">
             <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
             </div>
          </div>
          
          <div className="bg-brand-primary self-start text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 mb-3">
            {categories?.nodes[0]?.name || "Featured"}
          </div>
          <h3 className="text-xl md:text-2xl font-black leading-tight mb-4 group-hover:text-red-600 transition-colors font-inter" dangerouslySetInnerHTML={{ __html: title }} />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/80">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""}</span>
            </div>
            <button className="text-white/40 hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="group flex gap-5 py-4 first:pt-0 last:pb-0 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors p-3">
        <Link href={`/${slug}`} className="relative w-1/3 aspect-[4/3] overflow-hidden rounded-[2px] bg-gray-100 shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <div className="flex flex-col gap-2 flex-1 pt-1">
          <Link href={`/${slug}`}>
            <h3 className="text-sm lg:text-base font-black leading-[1.3] group-hover:text-red-600 transition-colors font-inter line-clamp-2" dangerouslySetInnerHTML={{ __html: title }} />
          </Link>
          <div className="mt-auto flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 font-inter">
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""}</span>
            </div>
            <button className="text-gray-300 hover:text-brand-primary transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="group flex items-center gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/40 transition-colors px-2">
        <Link href={`/${slug}`} className={`relative w-24 h-16 overflow-hidden ${isCircle ? 'rounded-full' : 'rounded-[2px]'} bg-gray-100 shrink-0`}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <div className="flex flex-col gap-1.5 flex-1">
          <Link href={`/${slug}`}>
            <h4 className="text-[13px] font-bold leading-snug group-hover:text-red-600 transition-colors line-clamp-2" dangerouslySetInnerHTML={{ __html: title }} />
          </Link>
          <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""}</span>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: Standard Grid Post (Matches Reference Layout 3 & 1-Bottom)
  if (variant === "template-card") {
    return (
      <div className="group flex flex-col gap-3 bg-white rounded-sm overflow-hidden">
        <Link href={`/${slug}`} className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
          />
        </Link>
        <div className="flex flex-col gap-2.5 px-3 pb-3">
          <span className="text-brand-primary text-[10px] font-bold uppercase tracking-wider">
            {categories?.nodes[0]?.name || "News"}
          </span>
          <Link href={`/${slug}`}>
            <h3 className="text-[15px] font-bold leading-snug group-hover:text-red-600 transition-colors line-clamp-2" dangerouslySetInnerHTML={{ __html: title }} />
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col gap-4">
      <Link href={`/${slug}`} className={`relative ${aspectRatio} overflow-hidden rounded-[2px] bg-gray-100`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
      </Link>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">
            {categories?.nodes[0]?.name || "Regular"}
          </span>
        </div>
        <Link href={`/${slug}`}>
          <h3 className="text-[16px] lg:text-[18px] font-black leading-tight group-hover:text-red-600 transition-colors font-inter" dangerouslySetInnerHTML={{ __html: title }} />
        </Link>
        {showExcerpt && (
          <div className="text-[14px] text-gray-500 leading-relaxed line-clamp-2 font-medium" dangerouslySetInnerHTML={{ __html: excerpt }} />
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""}</span>
          </div>
          <button className="text-gray-300 hover:text-brand-primary transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
