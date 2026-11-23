"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ExternalLink, X, ChevronLeft, ChevronRight, ShoppingBag, Sparkles } from "lucide-react";
import { INSTAGRAM_REELS, INSTAGRAM_ACCOUNT, type InstagramReel } from "@/constants/instagram-reels";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function InstagramReelsSection() {
  const [activeReel, setActiveReel] = useState<InstagramReel | null>(null);
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [embedLoading, setEmbedLoading] = useState(true);

  const openReelModal = (reel: InstagramReel, index: number) => {
    setActiveReel(reel);
    setActiveReelIndex(index);
    setEmbedLoading(true);
  };

  const closeReelModal = () => {
    setActiveReel(null);
  };

  const nextReel = () => {
    const nextIdx = (activeReelIndex + 1) % INSTAGRAM_REELS.length;
    setActiveReelIndex(nextIdx);
    setActiveReel(INSTAGRAM_REELS[nextIdx]);
    setEmbedLoading(true);
  };

  const prevReel = () => {
    const prevIdx = (activeReelIndex - 1 + INSTAGRAM_REELS.length) % INSTAGRAM_REELS.length;
    setActiveReelIndex(prevIdx);
    setActiveReel(INSTAGRAM_REELS[prevIdx]);
    setEmbedLoading(true);
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeReelModal();
      if (e.key === "ArrowRight" && activeReel) nextReel();
      if (e.key === "ArrowLeft" && activeReel) prevReel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeReel, activeReelIndex]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeReel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeReel]);

  return (
    <section className="space-y-8 bg-[#FAF7F2] border-y border-[#E5DFD5] py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Container */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5DFD5] pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#C5A059]">
            <InstagramIcon className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>@yuva_naturals on Instagram</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3C2F]">
            Follow Our Natural Journey
          </h2>
          <p className="text-xs sm:text-sm text-[#556B61] max-w-xl">
            Discover our handmade products, natural ingredients and behind-the-scenes moments.
          </p>
        </div>

        {/* CTA to official Instagram profile */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={INSTAGRAM_ACCOUNT.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1A3C2F] text-[#FAF7F2] hover:bg-[#122B22] text-xs font-bold uppercase tracking-[0.14em] px-5 py-2.5 transition border border-[#1A3C2F] shadow-2xs group"
          >
            <InstagramIcon className="h-4 w-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
            <span>Follow Us on Instagram</span>
            <ExternalLink className="h-3 w-3 text-[#FAF7F2]/60" />
          </a>
        </div>
      </div>

      {/* Reels Grid (9:16 aspect ratio cards) */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_REELS.map((reel, index) => (
            <div
              key={reel.id}
              className="group relative flex flex-col overflow-hidden bg-white border border-[#E5DFD5] shadow-2xs transition-all duration-300 hover:shadow-md hover:border-[#C5A059]/50"
            >
              {/* 9:16 Portrait Media Container */}
              <div
                onClick={() => openReelModal(reel, index)}
                className="relative aspect-[9/16] w-full overflow-hidden bg-[#1A3C2F]/10 cursor-pointer"
              >
                <Image
                  src={reel.thumbnail}
                  alt={reel.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 opacity-70 group-hover:opacity-85 transition-opacity pointer-events-none" />

                {/* Top badges: Instagram tag & Duration */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] pointer-events-none">
                  <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-medium tracking-tight">
                    <InstagramIcon className="h-3 w-3 text-[#FAF7F2]" />
                    <span>Reel</span>
                  </span>
                  {reel.duration && (
                    <span className="bg-black/50 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-mono">
                      {reel.duration}
                    </span>
                  )}
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-11 w-11 rounded-full bg-[#1A3C2F]/80 text-[#FAF7F2] border border-[#C5A059]/80 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-115 group-hover:bg-[#C5A059] group-hover:text-[#1A3C2F]">
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay: Title & Product Tag */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white space-y-1">
                  <p className="text-[11px] font-semibold line-clamp-2 leading-snug drop-shadow-xs">
                    {reel.title}
                  </p>
                  {reel.productTag && (
                    <span className="inline-flex items-center gap-1 text-[9px] text-[#C5A059] font-medium tracking-wide">
                      <Sparkles className="h-2.5 w-2.5" />
                      <span className="truncate">{reel.productTag}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Quick Actions Bar */}
              <div className="p-2 bg-white flex items-center justify-between border-t border-[#E5DFD5] text-[10px]">
                <button
                  type="button"
                  onClick={() => openReelModal(reel, index)}
                  className="font-bold text-[#1A3C2F] hover:text-[#C5A059] transition flex items-center gap-1 cursor-pointer"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Watch</span>
                </button>

                {reel.productSlug && (
                  <Link
                    href={`/product/${reel.productSlug}`}
                    className="text-[#556B61] hover:text-[#1A3C2F] flex items-center gap-1 transition"
                    title={`View ${reel.productTag}`}
                  >
                    <ShoppingBag className="h-3 w-3" />
                    <span>Shop</span>
                  </Link>
                )}

                <a
                  href={reel.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7C907C] hover:text-[#1A3C2F] transition"
                  title="Open on Instagram"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive In-Site Video Modal (Lazy Loaded, No performance penalty) */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          {/* Modal Background click listener */}
          <div className="absolute inset-0" onClick={closeReelModal} />

          <div className="relative z-10 w-full max-w-4xl bg-[#FAF7F2] border border-[#C5A059]/40 shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeReelModal}
              className="absolute top-3 right-3 z-20 bg-black/60 hover:bg-black text-white p-2 rounded-full transition"
              aria-label="Close video player"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left/Main: 9:16 In-site Video/Player Viewport */}
            <div className="relative w-full md:w-[420px] shrink-0 bg-black flex items-center justify-center aspect-[9/16] md:max-h-[85vh]">
              {/* Instagram Official Embed Iframe */}
              <iframe
                src={`https://www.instagram.com/reel/${activeReel.shortcode}/embed/`}
                className="w-full h-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                onLoad={() => setEmbedLoading(false)}
              />

              {/* Embedded Player Fallback / Loading Overlay */}
              {embedLoading && (
                <div className="absolute inset-0 bg-[#1A3C2F] flex flex-col items-center justify-center p-6 text-center text-white space-y-3 pointer-events-none">
                  <div className="relative aspect-[9/16] w-full max-w-[200px] overflow-hidden rounded border border-[#C5A059]/40">
                    <Image
                      src={activeReel.thumbnail}
                      alt={activeReel.title}
                      fill
                      className="object-cover opacity-80"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#C5A059]">
                    <InstagramIcon className="h-4 w-4 animate-spin" />
                    <span>Loading Instagram Player...</span>
                  </div>
                </div>
              )}

              {/* Navigation arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevReel();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-1.5 rounded-full z-10 transition hidden sm:block"
                aria-label="Previous reel"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextReel();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-1.5 rounded-full z-10 transition hidden sm:block"
                aria-label="Next reel"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Right: Reel Information & Product Context */}
            <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto bg-white border-t md:border-t-0 md:border-l border-[#E5DFD5]">
              <div className="space-y-4">
                {/* Account info header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-[#1A3C2F] text-[#FAF7F2] flex items-center justify-center font-bold text-xs border border-[#C5A059]">
                      YN
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1A3C2F]">yuva_naturals</p>
                      <p className="text-[10px] text-[#7C907C]">Official Brand Channel</p>
                    </div>
                  </div>
                  <a
                    href={INSTAGRAM_ACCOUNT.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#C5A059] hover:text-[#1A3C2F] transition flex items-center gap-1"
                  >
                    <span>Follow</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Title & Caption */}
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#1A3C2F]">
                    {activeReel.title}
                  </h3>
                  <p className="text-xs text-[#3E564A] leading-relaxed whitespace-pre-line">
                    {activeReel.caption}
                  </p>
                </div>

                {/* Featured Product Card in Reel */}
                {activeReel.productTag && activeReel.productSlug && (
                  <div className="bg-[#FAF7F2] border border-[#E5DFD5] p-3 rounded space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#C5A059] block">
                      Featured in this Reel
                    </span>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-[#1A3C2F]">{activeReel.productTag}</p>
                        <p className="text-[10px] text-[#556B61]">Handcrafted botanical formula</p>
                      </div>
                      <Link
                        href={`/product/${activeReel.productSlug}`}
                        onClick={closeReelModal}
                        className="bg-[#1A3C2F] hover:bg-[#122B22] text-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 transition flex items-center gap-1 shrink-0"
                      >
                        <ShoppingBag className="h-3 w-3 text-[#C5A059]" />
                        <span>View Product</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-[#E5DFD5] space-y-2">
                <a
                  href={activeReel.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#1A3C2F] border border-[#E5DFD5] py-2.5 text-xs font-bold uppercase tracking-wider transition"
                >
                  <InstagramIcon className="h-4 w-4 text-[#C5A059]" />
                  <span>Open Reel on Instagram</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#556B61]" />
                </a>

                {/* Next/Prev Navigation for Mobile */}
                <div className="flex items-center justify-between sm:hidden pt-2 text-xs">
                  <button
                    type="button"
                    onClick={prevReel}
                    className="flex items-center gap-1 text-[#556B61] hover:text-[#1A3C2F]"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  <span className="text-[10px] text-[#7C907C]">
                    {activeReelIndex + 1} of {INSTAGRAM_REELS.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextReel}
                    className="flex items-center gap-1 text-[#556B61] hover:text-[#1A3C2F]"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
