"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../lib/site-config";
import Logo from "./Logo";

const categories = [
  { name: "Home", href: "/" },
  { name: "News", href: "/category/news" },
  { name: "Politics", href: "/category/politics" },
  { name: "Crime", href: "/category/crime" },
  { name: "Showbiz", href: "/category/showbizplus" },
  { name: "World", href: "/category/world" },
  { name: "Sports", href: "/category/sport" },
  { name: "Society", href: "/category/society-and-fashion" },
  { name: "Interview", href: "/category/interview" },
];

const companyLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Advert Rates", href: "/advert-rates" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function Footer({ latestPosts = [] }) {
  const displayPosts = latestPosts?.length > 0 ? latestPosts : [
    {
      title: "Take a Stroll Through the Pros and Cons of Permanent Eyebrows Tattoos",
      categories: { nodes: [{ name: "Make-up", slug: "makeup" }] },
      date: "September 29, 2021",
      slug: "article-1",
    },
    {
      title: "Best 7 Free Apps for Learning a New Language While Traveling",
      categories: { nodes: [{ name: "Travel", slug: "travel" }] },
      date: "September 29, 2021",
      slug: "article-2",
    },
    {
      title: "Creating the Perfect Home Workspace for Maximum Productivity",
      categories: { nodes: [{ name: "Tech", slug: "tech" }] },
      date: "September 29, 2021",
      slug: "article-3",
    },
  ];

  return (
    <footer className="w-full bg-red-600 font-roboto">
      {/* MIDDLE FOOTER: BRAND & ABOUT (Dark Section) */}
      <div className="w-full bg-red-700 py-16 text-white border-b border-white/5">
        <div className="w-[95%] xl:w-[85%] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Logo Column */}
          <div className="flex flex-col gap-8 lg:items-start items-center text-center lg:text-left">
            <Link href="/">
              <Logo className="h-16 invert grayscale brightness-200" />
            </Link>
          </div>

          {/* About Column */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
             <h3 className="text-sm font-black uppercase tracking-wider text-white">About Us</h3>
             <p className="text-[14px] leading-relaxed text-white font-medium font-open-sans">
                {siteConfig.identity.tagline}
                <br /><br />
                Global Excellence Magazine is the leading source for high-quality information and entertainment in Nigeria.
             </p>
          </div>

          {/* Follow Column */}
          <div className="flex flex-col gap-6 items-center lg:items-end text-center lg:text-right">
             <h3 className="text-sm font-black uppercase tracking-wider text-white">Follow Us</h3>
             <div className="flex gap-4">
                <Link href={siteConfig.seo.facebookUrl} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                </Link>
                <Link href={"https://twitter.com/" + siteConfig.seo.twitterHandle.replace("@", "")} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                </Link>
             </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM BAR: COPYRIGHT */}
      <div className="w-full bg-red-800 py-6 text-white text-[10px] font-black uppercase tracking-[0.2em]">
        <div className="w-[95%] xl:w-[85%] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.identity.name}. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact-us" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");
  const [honeyPot, setHoneyPot] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honey_pot: honeyPot }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setMessage("Thank you for joining our community.");
      } else {
        setStatus("error");
        setMessage(data.error || "Please try again later.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Connection failed. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 text-green-400 font-black text-xs uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2">
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honey Pot (Bot Trap) */}
      <input
        type="text"
        name="company_id_verification"
        className="hidden"
        value={honeyPot}
        onChange={(e) => setHoneyPot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
      
      <input
        type="email"
        placeholder="Email address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white text-black p-4 text-base focus:outline-none rounded-[2px] w-full"
        disabled={status === "loading"}
      />
      
      <button 
        type="submit"
        disabled={status === "loading"}
        className="bg-brand-primary text-white py-4 text-sm font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
      >
        <span>{status === "loading" ? "Validating..." : "I want in"}</span>
        {status !== "loading" && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
      
      {status === "error" && (
        <p className="text-[10px] text-white/70 font-bold uppercase tracking-wider animate-shake">
          {message}
        </p>
      )}
    </form>
  );
}
