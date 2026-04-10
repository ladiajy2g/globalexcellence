import Link from "next/link";
import Image from "next/image";
import { getLatestPosts } from "../lib/wp-api";
import AdvertSection from "./AdvertSection";

export default async function Sidebar({ showAdverts = true }) {
  // Fetch data on the server
  const popularPosts = (await getLatestPosts(5)) || [];

  return (
    <aside className="w-full flex flex-col gap-12">
      {/* 1. Stay Connected & Top Ad */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <h3 className="text-xs font-black tracking-[0.2em] border-l-4 border-brand-primary pl-4">Stay Connected</h3>
          <div className="flex flex-row gap-2">
            {[
              { 
                name: "Facebook", 
                color: "bg-[#3b5998]", 
                href: "https://web.facebook.com/globalexcellence", 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )
              },
              { 
                name: "Twitter", 
                color: "bg-[#1da1f2]", 
                href: "https://twitter.com/globalexcellence", 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                )
              },
              { 
                name: "Youtube", 
                color: "bg-[#ff0000]", 
                href: "https://www.youtube.com/@globalexcellence", 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                )
              },
            ].map((social) => (
              <Link 
                key={social.name} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className={`w-11 h-11 ${social.color} text-white hover:text-gray-400 flex items-center justify-center hover:scale-105 transition-all duration-300 rounded-[2px] shadow-sm hover:shadow-md`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {social.icon}
                </div>
              </Link>
            ))}
          </div>
        </div>
        {showAdverts && <AdvertSection placement="article-sidebar" layout="sidebar" className="!pt-2 !pb-0" />}
      </div>

      {/* 2. Popular Posts */}
      <div className="flex flex-col gap-6">
        <h3 className="text-xs font-black tracking-[0.2em] border-l-4 border-red-600 pl-4">Popular Posts</h3>
        <div className="flex flex-col gap-6">
          {popularPosts.length > 0 ? popularPosts.map((post, idx) => (
            <Link key={idx} href={`/${post.slug}`} className="group flex gap-4 items-start">
              <div className="w-20 h-20 relative flex-shrink-0 overflow-hidden bg-gray-100">
                {post.featuredImage?.node?.sourceUrl && (
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="text-[14px] font-black leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {post.date ? new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Recent"}
                </div>
              </div>
            </Link>
          )) : (
            <p className="text-[11px] font-bold text-gray-400 tracking-widest italic">No popular stories found.</p>
          )}
        </div>
      </div>

      {/* 3. Newsletter */}
      <div className="bg-gray-50 p-8 rounded-[4px] border border-gray-100">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4">Newsletter</h3>
        <p className="text-[13px] text-gray-500 font-serif italic mb-6">
          Get the most important stories of the day delivered to your inbox.
        </p>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full p-4 text-sm border border-gray-200 focus:outline-none focus:border-black transition-colors"
          />
          <button className="w-full bg-black text-white py-4 text-[11px] font-black uppercase tracking-[0.25em] hover:bg-red-600 transition-all duration-300">
            Subscribe Now
          </button>
        </div>
      </div>

      {/* 5. Sidebar Adverts (Bottom) */}
      <AdvertSection placement="article-sidebar" layout="sidebar" className="!py-0" />
    </aside>
  );
}
