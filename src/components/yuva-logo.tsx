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
  // Sizing definitions per requirement
  const variantStyles = {
    header: "w-[125px] sm:w-[140px] md:w-[155px] max-h-[46px] h-auto object-contain mix-blend-multiply",
    footer: "w-[140px] md:w-[165px] max-h-[52px] h-auto object-contain mix-blend-multiply",
    hero: "w-[180px] sm:w-[220px] max-h-[70px] h-auto object-contain mix-blend-multiply",
    large: "w-[200px] sm:w-[250px] max-h-[85px] h-auto object-contain mix-blend-multiply",
  };

  return (
    <Link href="/" className={`inline-flex flex-col items-center group ${className}`}>
      <div className="relative flex items-center justify-center">
        <Image
          src="/api/logo"
          alt="Yuva Naturals - Nature's Touch, Radiant Glow"
          width={320}
          height={120}
          priority={priority}
          unoptimized
          className={`${variantStyles[variant]} transition-transform duration-300 group-hover:scale-[1.02] ${imageClassName}`}
        />
      </div>
      {showTagline && (
        <span className="mt-1.5 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-serif text-[#C5A059] font-medium text-center leading-none">
          Nature&apos;s Touch, Radiant Glow
        </span>
      )}
    </Link>
  );
}

