"use client";

import Link from "next/link";

export default function TrendingTicker({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="w-full bg-white border-b border-gray-100 py-1.5 hidden lg:block overflow-hidden">
      <div className="w-[95%] xl:w-[85%] mx-auto px-4 flex items-center">
        <div className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 mr-4 shrink-0">
          Trending Now
        </div>
        <div className="flex-1 overflow-hidden relative h-5">
           <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
              {posts.map((post, idx) => (
                <Link 
                  key={idx} 
                  href={`/${post.slug}`} 
                  className="text-[12px] font-bold text-[#222222] hover:text-red-600 transition-colors flex items-center gap-2 uppercase tracking-tight"
                >
                  <span className="w-1.5 h-1.5 bg-red-600"></span>
                  <span dangerouslySetInnerHTML={{ __html: post.title }} />
                </Link>
              ))}
              {/* Duplicate for seamless loop */}
              {posts.map((post, idx) => (
                <Link 
                  key={`dup-${idx}`} 
                  href={`/${post.slug}`} 
                  className="text-[12px] font-bold text-[#222222] hover:text-red-600 transition-colors flex items-center gap-2 uppercase tracking-tight"
                >
                  <span className="w-1.5 h-1.5 bg-red-600"></span>
                  <span dangerouslySetInnerHTML={{ __html: post.title }} />
                </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
