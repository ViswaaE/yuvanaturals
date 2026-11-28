"use client";

import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { ExternalLink, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import {
  INSTAGRAM_REELS,
  INSTAGRAM_ACCOUNT,
  type InstagramReel,
} from "@/constants/instagram-reels";

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
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface ReelCardProps {
  reel: InstagramReel;
  index: number;
}

function ReelCard({ reel, index }: ReelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  // Lazy-load embed when card approaches viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Safety timeout: if iframe fails to load in 7 seconds (e.g. adblocker / CSP / network block), show fallback
  useEffect(() => {
    if (!isInView) return;
    if (status === "loaded" || status === "error") return;

    const timer = setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "error" : prev));
    }, 7000);

    return () => clearTimeout(timer);
  }, [isInView, status]);

  const handleIframeLoad = () => {
    setStatus("loaded");
  };

  const handleIframeError = () => {
    setStatus("error");
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col bg-white border border-[#E5DFD5] shadow-xs transition-all duration-300 hover:shadow-md hover:border-[#C5A059]/60"
    >
      {/* 9:16 Video Player Container */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#1A3C2F]">
        {/* FALLBACK VIEW: Displayed when embed fails, is blocked, or cannot load */}
        {status === "error" && (
          <a
            href={reel.reelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex flex-col justify-between p-5 text-center text-[#FAF7F2] bg-gradient-to-b from-[#1A3C2F] via-[#122B22] to-[#0E2019] group cursor-pointer z-10 transition-colors"
            title={`Watch ${reel.title} on Instagram`}
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5">
                <InstagramIcon className="h-3.5 w-3.5" />
                <span>Reel {index + 1}</span>
              </span>
              <span className="flex items-center gap-1 text-[9px] text-white/60">
                <ExternalLink className="h-3 w-3" />
                <span>Instagram</span>
              </span>
            </div>

            {/* Middle Content */}
            <div className="space-y-3 my-auto py-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF7F2]/10 border border-[#C5A059] text-[#C5A059] shadow-inner group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-[#1A3C2F] transition-all duration-300">
                <InstagramIcon className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm text-[#FAF7F2] group-hover:text-[#C5A059] transition-colors leading-snug">
                  {reel.title}
                </h3>
                <p className="text-[11px] text-[#FAF7F2]/75 line-clamp-3 leading-relaxed">
                  {reel.caption}
                </p>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="w-full inline-flex items-center justify-center gap-2 bg-[#C5A059] text-[#1A3C2F] py-2.5 px-3 text-[11px] font-bold uppercase tracking-[0.14em] shadow group-hover:bg-white transition-colors">
                <InstagramIcon className="h-3.5 w-3.5" />
                <span>Watch on Instagram</span>
                <ExternalLink className="h-3 w-3" />
              </div>
              <p className="text-[9px] text-[#FAF7F2]/50 tracking-wider uppercase">
                Tap anywhere to open
              </p>
            </div>
          </a>
        )}

        {/* LOADING OVERLAY: Shown while embed iframe is fetching */}
        {status === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#1A3C2F] text-center text-[#FAF7F2] space-y-3 z-5">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <div className="h-10 w-10 border-2 border-white/20 border-t-[#C5A059] rounded-full animate-spin" />
              <InstagramIcon className="absolute h-4 w-4 text-[#C5A059]" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-serif font-bold text-[#FAF7F2]">
                Loading Reel {index + 1}...
              </p>
              <p className="text-[10px] text-[#FAF7F2]/60">Handcrafted Botanical Care</p>
            </div>
            <a
              href={reel.reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#C5A059] underline hover:text-white pt-2 flex items-center gap-1"
            >
              <span>Watch on Instagram</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        )}

        {/* ACTUAL OFFICIAL INSTAGRAM EMBED PLAYER */}
        {isInView && (
          <iframe
            src={reel.embedUrl}
            className={`w-full h-full border-0 transition-opacity duration-300 ${
              status === "loaded" ? "opacity-100" : "opacity-0"
            }`}
            title={`YUVA NATURALS Instagram Reel: ${reel.title}`}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}
      </div>

      {/* Card Footer Bar */}
      <div className="p-3 bg-white flex items-center justify-between border-t border-[#E5DFD5] text-xs">
        <div className="space-y-0.5 truncate pr-2">
          <p className="text-[11px] font-bold text-[#1A3C2F] truncate">{reel.title}</p>
          <span className="text-[9px] font-semibold text-[#7C907C] uppercase tracking-wider block">
            @yuva_naturals
          </span>
        </div>

        <a
          href={reel.reelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 shrink-0 bg-[#FAF7F2] hover:bg-[#1A3C2F] text-[#1A3C2F] hover:text-[#FAF7F2] border border-[#E5DFD5] hover:border-[#1A3C2F] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition group"
          title={`Open ${reel.title} on Instagram`}
        >
          <InstagramIcon className="h-3 w-3 text-[#C5A059]" />
          <span>Watch</span>
          <ExternalLink className="h-2.5 w-2.5 opacity-60 group-hover:opacity-100" />
        </a>
      </div>
    </div>
  );
}

export function InstagramReelsSection() {
  return (
    <>
      {/* Official Instagram Embed JS for embedding support */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).instgrm?.Embeds) {
            (window as any).instgrm.Embeds.process();
          }
        }}
      />

      <section
        id="instagram-reels"
        className="space-y-8 bg-[#FAF7F2] border-y border-[#E5DFD5] py-14 px-4 sm:px-6 lg:px-8"
      >
        {/* Header Container */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-[#E5DFD5] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#C5A059]">
              <InstagramIcon className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>@yuva_naturals on Instagram</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1A3C2F]">
              Follow Our Natural Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#556B61] max-w-2xl leading-relaxed">
              Discover our handmade products, natural ingredients and behind-the-scenes moments.
            </p>
          </div>

          {/* Follow Us Button */}
          <div className="shrink-0">
            <a
              href={INSTAGRAM_ACCOUNT.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#1A3C2F] hover:bg-[#122B22] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.16em] px-6 py-3.5 transition border border-[#1A3C2F] shadow-sm group"
            >
              <InstagramIcon className="h-4 w-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
              <span>Follow Us on Instagram</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#FAF7F2]/60" />
            </a>
          </div>
        </div>

        {/* Responsive Reels Grid (All 5 Reels in 9:16 aspect ratio) */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {INSTAGRAM_REELS.map((reel, index) => (
              <ReelCard key={reel.id} reel={reel} index={index} />
            ))}
          </div>
        </div>

        {/* Subtle Bottom Brand Guarantee */}
        <div className="max-w-7xl mx-auto pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7C907C] border-t border-[#E5DFD5]/60 gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Pure Botanical Formulas &bull; Cold-Processed Soaps &bull; Small Batch Handcrafted</span>
          </div>
          <a
            href={INSTAGRAM_ACCOUNT.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1A3C2F] font-bold hover:text-[#C5A059] transition"
          >
            Visit @yuva_naturals on Instagram &rarr;
          </a>
        </div>
      </section>
    </>
  );
}
