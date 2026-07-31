"use client";

import Image from "next/image";
import Link from "next/link";

interface YuvaLogoProps {
  className?: string;
  imageClassName?: string;
  showTagline?: boolean;
  variant?: "header" | "footer" | "hero" | "large";
  priority?: boolean;
}

export function YuvaLogo({
  className = "",
  imageClassName = "",
  showTagline = false,
  variant = "header",
  priority = true,
}: YuvaLogoProps) {
  // Exact requirement specs:
  // Header: Mobile 48px, Tablet 60px, Desktop 72px, height auto width object-contain
  // Footer: 120px wide, height auto object-contain
  // Hero / Large: 100px - 140px high
  const variantStyles = {
    header: "h-[48px] md:h-[60px] lg:h-[72px] w-auto object-contain",
    footer: "w-[120px] h-auto object-contain",
    hero: "h-[90px] sm:h-[110px] lg:h-[130px] w-auto object-contain",
    large: "h-[100px] sm:h-[130px] lg:h-[150px] w-auto object-contain",
  };

  return (
    <Link href="/" className={`inline-flex flex-col items-center group ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Yuva Naturals Official Logo Image */}
        <Image
          src="/api/logo"
          alt="Yuva Naturals - Nature's Touch, Radiant Glow"
          width={300}
          height={150}
          priority={priority}
          unoptimized
          className={`${variantStyles[variant]} transition-transform duration-300 group-hover:scale-[1.02] ${imageClassName}`}
        />
      </div>
      {showTagline && (
        <span className="mt-2 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-serif text-[#C9A66B] font-semibold text-center leading-tight">
          Nature&apos;s Touch, Radiant Glow
        </span>
      )}
    </Link>
  );
}
