import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getRelatedPosts, getAdjacentPosts, getLatestPosts } from "../../lib/wp-api";
import Sidebar from "../../components/Sidebar";
import AdvertSection from "../../components/AdvertSection";
import Breadcrumbs from "../../components/Breadcrumbs";
import PostNavigation from "../../components/PostNavigation";
import RelatedStories from "../../components/RelatedStories";
import FloatingShare from "../../components/FloatingShare";
import { sanitizeHtml } from "../../lib/security";
import { siteConfig } from "../../lib/site-config";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: {
      absolute: siteConfig.seo.titleTemplate.replace("%s", post.title),
    },
    description: post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160) || `Explore the latest stories from ${siteConfig.identity.name}.`,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160),
      images: [post.featuredImage?.node?.sourceUrl].filter(Boolean),
      publishedTime: post.date,
      authors: [post.author?.node?.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160),
      images: [post.featuredImage?.node?.sourceUrl].filter(Boolean),
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    const latestPosts = await getLatestPosts(6);
    return (
      <div className="w-full bg-white pb-32">
        <div className="w-[95%] xl:w-[85%] mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold uppercase mb-4">Post Not Found</h1>
          <p className="text-gray-500 font-serif italic mb-12">The article you're looking for doesn't exist.</p>
          
          <div className="border-t border-gray-100 pt-16">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Suggested Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((p, idx) => (
                <div key={idx} className="text-left flex flex-col gap-4">
                  <Link href={`/${p.slug}`} className="block relative aspect-video bg-gray-100 overflow-hidden rounded-sm hover:opacity-90 transition-opacity">
                    <Image src={p.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl} alt={p.title} fill className="object-cover" />
                  </Link>
                  <Link href={`/${p.slug}`} className="text-lg font-bold leading-tight hover:text-red-600 transition-colors">
                    {p.title}
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-12">
               <Link href="/" className="inline-block bg-black text-white px-8 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all">
                  Back to Homepage
               </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const category = post.categories?.nodes[0];
  const categoryIds = post.categories?.nodes.map(c => c.databaseId) || [];
  
  const [adjacentPosts, relatedPosts] = await Promise.all([
    getAdjacentPosts(post.cursor),
    getRelatedPosts(categoryIds, post.id)
  ]);

  const sanitizedContent = await sanitizeHtml(post.content);

  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "image": [post.featuredImage?.node?.sourceUrl].filter(Boolean),
    "datePublished": post.date,
    "author": [{
      "@type": "Person",
      "name": post.author?.node?.name || siteConfig.identity.name + " Admin",
      "url": siteConfig.seo.baseUrl
    }],
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.identity.name,
      "logo": {
        "@type": "ImageObject",
        "url": siteConfig.seo.baseUrl + siteConfig.identity.logoUrl
      }
    },
    "description": post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160)
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.seo.baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category?.name || "News",
        "item": `${siteConfig.seo.baseUrl}/category/${category?.slug || 'news'}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${siteConfig.seo.baseUrl}/${post.slug}`
      }
    ]
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    } catch (e) { return dateStr; }
  };

  return (
    <article className="w-full bg-white pb-20 font-roboto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <FloatingShare post={post} />

      {/* --- Article Header Area --- */}
      <div className="w-[95%] xl:w-[85%] mx-auto px-4 pt-12 pb-10">
        <div className="max-w-5xl">
          {category && (
            <Link 
              href={`/category/${category.slug}`}
              className="inline-block bg-brand-primary text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] mb-6 hover:bg-black transition-colors"
            >
              {category.name}
            </Link>
          )}
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-8 text-[#222222] uppercase italic" dangerouslySetInnerHTML={{ __html: post.title }} />

          <div className="flex flex-wrap items-center gap-6 text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden relative border border-gray-100">
                <Image 
                  src={post.author?.node?.avatar?.url || "/placeholder-author.jpg"} 
                  alt={post.author?.node?.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <span>By <span className="text-[#222222]">{post.author?.node?.name || "Global Excellence"}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2 ml-auto hidden md:flex">
               <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> 1,240 Views</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Body --- */}
      <div className="w-[95%] xl:w-[85%] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Article CONTENT (Left 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {post.featuredImage?.node?.sourceUrl && (
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}
            
            <div className="prose max-w-none prose-p:font-open-sans prose-p:text-[17px] prose-p:leading-[1.8] prose-p:text-gray-700 prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tight prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline">
              <div 
                className="wp-content"
                dangerouslySetInnerHTML={{ __html: sanitizedContent || '<p>Content unavailable.</p>' }}
              />
            </div>

            {/* AUTHOR BOX */}
            <div className="bg-gray-50 p-8 flex flex-col md:flex-row gap-8 items-center md:items-start border border-gray-100 mt-10">
               <div className="w-32 h-32 rounded-full overflow-hidden relative shrink-0 border-4 border-white shadow-sm">
                  <Image src={post.author?.node?.avatar?.url || "/placeholder-author.jpg"} alt={post.author?.node?.name} fill className="object-cover" />
               </div>
               <div className="flex flex-col gap-4 text-center md:text-left">
                  <div className="flex flex-col gap-1">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Written By</span>
                     <h4 className="text-2xl font-black text-[#222222] uppercase italic">{post.author?.node?.name || "Global Excellence"}</h4>
                  </div>
                  <p className="text-gray-500 font-open-sans text-[14px] leading-relaxed">
                     Global Excellence Magazine is Nigeria's foremost soft-sell magazine, delivering premium news, lifestyle, and society updates for over two decades.
                  </p>
               </div>
            </div>

            {/* Related Stories below content */}
            <div className="mt-12">
                <div className="relative border-b-2 border-gray-100 pb-2 flex items-center mb-8">
                  <h3 className="text-sm font-black tracking-wider text-[#222222]">Related Stories</h3>
                  <div className="absolute -bottom-[2px] left-0 w-12 h-[2px] bg-brand-primary"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {relatedPosts.slice(0, 4).map((rp, idx) => (
                        <Link key={idx} href={`/${rp.slug}`} className="group flex flex-col gap-4">
                            <div className="relative aspect-video overflow-hidden bg-gray-100">
                                <Image src={rp.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl} alt={rp.title} fill className="object-cover transition-transform group-hover:scale-105" />
                            </div>
                            <h4 className="text-[15px] font-black text-[#222222] leading-tight group-hover:text-red-600 transition-colors uppercase italic line-clamp-2" dangerouslySetInnerHTML={{ __html: rp.title }} />
                        </Link>
                    ))}
                </div>
            </div>

            <PostNavigation previous={adjacentPosts.previous} next={adjacentPosts.next} />
          </div>

          {/* SIDEBAR (Right 4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 flex flex-col gap-12">
               <div className="relative border-b-2 border-gray-100 pb-2 flex items-center">
                   <h3 className="text-sm font-black tracking-wider text-[#222222]">Advertisement</h3>
                  <div className="absolute -bottom-[2px] left-0 w-12 h-[2px] bg-brand-primary"></div>
                </div>
               <AdvertSection placement="article-sidebar" layout="sidebar" />
               
               <div className="flex flex-col gap-8">
                  <div className="relative border-b-2 border-gray-100 pb-2 flex items-center">
                     <h3 className="text-sm font-black tracking-wider text-[#222222]">Trending Now</h3>
                    <div className="absolute -bottom-[2px] left-0 w-12 h-[2px] bg-brand-primary"></div>
                  </div>
                  <div className="flex flex-col gap-6">
                    {relatedPosts.slice(4, 9).map((rp, idx) => (
                        <Link key={idx} href={`/${rp.slug}`} className="group flex gap-4 items-start">
                            <div className="relative w-20 h-16 shrink-0 overflow-hidden bg-gray-100">
                                <Image src={rp.featuredImage?.node?.sourceUrl || siteConfig.identity.logoUrl} alt={rp.title} fill className="object-cover transition-transform group-hover:scale-110" />
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                <h4 className="text-[12px] font-bold text-[#222222] leading-snug group-hover:text-red-600 transition-colors line-clamp-2" dangerouslySetInnerHTML={{ __html: rp.title }} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{new Date(rp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </Link>
                    ))}
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}