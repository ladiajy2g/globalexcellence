"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "../lib/site-config";
import Logo from "./Logo";

const MobileNavItem = ({ item, level = 0, onNavLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-white/5">
        <Link
          href={item.href}
          onClick={() => {
            if (!hasChildren) onNavLinkClick();
          }}
          className={`${
            level === 0 ? "text-xl font-black" : "text-base font-bold"
          } uppercase text-white hover:text-brand-primary transition-colors py-4 flex-1 tracking-tight`}
        >
          {item.name}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 text-white/50 hover:text-brand-primary transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="flex flex-col pl-4 bg-white/5 mt-1">
          {item.children.map((child, idx) => (
            <MobileNavItem 
              key={`${child.name}-${idx}`} 
              item={child} 
              level={level + 1} 
              onNavLinkClick={onNavLinkClick} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const NavItem = ({ item, level = 0 }) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className={`relative h-full flex items-center group/nav ${level > 0 ? "w-full" : ""}`}>
      <Link
        href={item.href}
        className={`px-4 xl:px-5 h-full flex items-center text-[12px] font-black uppercase tracking-wider text-white hover:bg-gray-100 hover:text-brand-primary transition-all whitespace-nowrap
        ${level > 0 ? "py-3 px-6 hover:bg-gray-50 !text-black border-b border-gray-100 last:border-0 w-full justify-between" : "text-white opacity-100"}
        `}
      >
        <span className={level === 0 ? "text-white" : ""}>{item.name}</span>
        {hasChildren && (
          <svg
            className={`w-3 h-3 ml-2 transition-transform ${level > 0 ? "-rotate-90 group-hover/nav:translate-x-1" : "group-hover/nav:rotate-180"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>

      {hasChildren && (
        <div 
          className={`absolute ${level === 0 ? "top-[100%] left-0" : "top-0 left-full"} 
          bg-white shadow-2xl min-w-[260px] opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200 z-[100]
          border-t-2 border-brand-primary
          `}
        >
          <div className="flex flex-col">
            {item.children.map((child, idx) => (
              <NavItem key={`${child.name}-${idx}`} item={child} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
  }, []);

  return (
    <header className="w-full relative z-[100] bg-white shadow-sm font-roboto">
      {/* 1. TOP BAR */}
      <div className="bg-brand-primary text-white py-1.5 hidden lg:block border-b border-white/10">
        <div className="w-[95%] xl:w-[85%] mx-auto px-4 flex justify-between items-center text-[11px] font-bold tracking-widest">
          <div className="flex items-center gap-4 text-white">
            <span>{currentDate}</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/about-us" className="hover:bg-white/10 px-2 py-1 rounded transition-colors">About Us</Link>
            <Link href="/contact-us" className="hover:bg-white/10 px-2 py-1 rounded transition-colors">Contact Us</Link>
            <Link href={siteConfig.seo.facebookUrl} className="hover:bg-white/10 px-2 py-1 rounded transition-colors">Facebook</Link>
            <Link href={"https://twitter.com/" + siteConfig.seo.twitterHandle.replace("@", "")} className="hover:bg-white/10 px-2 py-1 rounded transition-colors">Twitter</Link>
          </div>
        </div>
      </div>

      {/* 2. LOGO AREA */}
      <div className="py-4 bg-white hidden lg:block">
        <div className="w-[95%] xl:w-[85%] mx-auto flex flex-col items-start px-4">
          <Link href="/" className="block relative group">
            <Logo className="h-32 transition-transform group-hover:scale-[1.01] duration-300" />
          </Link>
        </div>
      </div>

      {/* 3. MAIN NAVIGATION */}
      <nav className="w-full bg-brand-primary sticky top-0 z-[90] hidden lg:block shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
        <div className="w-[95%] xl:w-[85%] mx-auto flex justify-between items-center h-14">
          <div className="flex items-center h-full">
            <Link href="/" className="px-6 h-full flex items-center bg-white hover:bg-gray-100 transition-all group">
              <svg className="w-5 h-5 text-brand-primary transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
            <div className="flex items-center h-full">
              {siteConfig.navigation.map((item, idx) => (
                <NavItem key={`${item.name}-${idx}`} item={item} />
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="px-6 h-full flex items-center text-white hover:text-gray-300 transition-colors border-l border-white/10 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE HEADER */}
      <div className="lg:hidden h-16 flex items-center justify-between px-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-[100]">
        <button onClick={() => setIsMenuOpen(true)} className="p-2 text-black hover:text-brand-primary transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link href="/">
          <Logo className="h-10" />
        </Link>

        <button onClick={() => setIsSearchOpen(true)} className="p-2 text-black hover:text-brand-primary transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/98 z-[200] flex flex-col animate-in fade-in duration-300">
           <div className="flex justify-between items-center p-6 border-b border-white/10">
              <Logo className="h-8 invert grayscale" />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-brand-primary transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
           </div>
           <div className="flex-1 overflow-y-auto p-8 flex flex-col">
              {siteConfig.navigation.map((item, idx) => (
                <MobileNavItem 
                  key={`${item.name}-${idx}`} 
                  item={item} 
                  onNavLinkClick={() => setIsMenuOpen(false)} 
                />
              ))}
           </div>
        </div>
      )}

      {/* SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/98 z-[300] flex flex-col p-8 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="self-end p-2 text-white hover:text-brand-primary transition-colors"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex-1 flex flex-col justify-center items-center max-w-4xl mx-auto w-full">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-8">Search Global Excellence</span>
            <input
              autoFocus
              type="text"
              placeholder="SEARCH NOW..."
              className="w-full text-5xl md:text-8xl font-black text-center text-white bg-transparent border-b-8 border-white/5 focus:border-brand-primary outline-none pb-8 transition-colors uppercase italic"
            />
            <p className="mt-8 text-white/30 text-xs font-bold uppercase tracking-widest">Type your keywords and press enter</p>
          </div>
        </div>
      )}
    </header>
  );
}