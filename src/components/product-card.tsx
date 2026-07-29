"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, Star, Check } from "lucide-react";
import type { Product } from "@/types/product";
import { QuickViewModal } from "@/components/quick-view-modal";

export function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <article className="group relative flex flex-col overflow-hidden rounded-[2.25rem] border border-[#2E5E4E]/10 bg-white p-4 shadow-[0_20px_50px_rgba(46,94,78,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(46,94,78,0.14)]">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] bg-[#F6F1E9]">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute right-3.5 top-3.5 z-10 rounded-full p-2.5 shadow-md backdrop-blur-md transition ${
              isWishlisted
                ? "bg-white text-red-500"
                : "bg-white/80 text-[#2E5E4E] hover:bg-white hover:text-red-500"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>

          {/* Badge */}
          {product.badge && (
            <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-[#2E5E4E] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FAF8F3]">
              {product.badge}
            </span>
          )}

          {/* Product Image */}
          <Link href={`/product/${product.slug}`} className="block h-full w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Quick View Floating Button */}
          <div className="absolute inset-x-4 bottom-4 z-10 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={handleQuickView}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-[#2E5E4E]/90 py-2.5 text-xs font-bold text-[#FAF8F3] shadow-lg backdrop-blur-sm transition hover:bg-[#2E5E4E]"
            >
              <Eye className="h-3.5 w-3.5 text-[#C9A66B]" /> Quick View
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between px-2 pb-2 pt-4">
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A66B]">
              <span>{product.category}</span>
              <span className="rounded-full bg-[#F6F1E9] px-2.5 py-0.5 text-[10px] text-[#2E5E4E]">{product.size}</span>
            </div>

            <Link href={`/product/${product.slug}`}>
              <h3 className="mt-2 text-base font-bold text-[#2E5E4E] font-serif transition hover:text-[#C9A66B] line-clamp-2">
                {product.name}
              </h3>
            </Link>

            <p className="mt-1.5 text-xs text-[#1F332B]/70 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#2E5E4E]/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#6e6258]">
                <Star className="h-3.5 w-3.5 fill-[#C9A66B] text-[#C9A66B]" />
                <span className="font-bold text-[#2E5E4E]">{product.rating}</span>
                <span>({product.reviews})</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-[#2E5E4E]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-[#C9A66B] line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                  added
                    ? "bg-emerald-700 text-white"
                    : "bg-[#2E5E4E] text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3.5 w-3.5 text-[#C9A66B]" /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Quick View Modal */}
      {quickViewOpen && <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />}
    </>
  );
}
