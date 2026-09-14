"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, Star, Check } from "lucide-react";
import type { Product } from "@/types/product";
import { QuickViewModal } from "@/components/quick-view-modal";
import { useCart } from "@/context/cart-context";

interface ProductCardProps {
  product: Product;
  showRating?: boolean;
}

export function ProductCard({ product, showRating = true }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const isCookie = product.category === "Cookies";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
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
      <article className="group relative flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white p-3.5 shadow-xs transition hover:border-[#173F32]/30 hover:shadow-md">
        {/* Product Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-[#FCFAF5]">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute right-2.5 top-2.5 z-10 rounded-full p-1.5 shadow-xs backdrop-blur-sm transition ${
              isWishlisted
                ? "bg-white text-red-500"
                : "bg-white/80 text-[#173F32] hover:bg-white hover:text-red-500"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>

          {/* Sale / Badge Tag */}
          {product.badge && (
            <span className="absolute left-2.5 top-2.5 z-10 rounded-sm bg-[#173F32] px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#FCFAF5] uppercase">
              {product.badge}
            </span>
          )}

          {/* Product Image */}
          <Link href={`/product/${product.slug}`} className="block h-full w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-104"
            />
          </Link>

          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-center gap-1.5 rounded-md bg-white/95 py-1.5 text-[11px] font-medium text-[#173F32] shadow-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#173F32] hover:text-white"
          >
            <Eye className="h-3.5 w-3.5 text-[#C9A45C]" /> Quick View
          </button>
        </div>

        {/* Content */}
        <div className="mt-3 flex flex-1 flex-col justify-between">
          <div>
            {/* Category & Weight/Size */}
            <div className="flex items-center justify-between text-[11px] font-medium text-[#C9A45C]">
              <span>{product.category}</span>
              <span className="text-stone-500 text-[10px]">{product.size || "300g"}</span>
            </div>

            {/* Product Title */}
            <Link href={`/product/${product.slug}`}>
              <h3 className="mt-1 text-sm font-semibold text-[#173F32] transition hover:text-[#C9A45C] line-clamp-2">
                {product.name}
              </h3>
            </Link>

            {/* Short Benefit / Description */}
            <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-snug">
              {product.shortDescription}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 space-y-2.5">
            {/* Price & Optional Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-[#173F32]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>

              {showRating && product.rating && (
                <div className="flex items-center gap-1 text-xs text-stone-600">
                  <Star className="h-3.5 w-3.5 fill-[#C9A45C] text-[#C9A45C]" />
                  <span className="font-medium text-[#173F32]">{product.rating}</span>
                  <span className="text-[10px] text-stone-400">({product.reviews})</span>
                </div>
              )}
            </div>

            {/* Add to Cart Action */}
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                added
                  ? "bg-emerald-700 text-white"
                  : "bg-[#173F32] text-[#FCFAF5] hover:bg-[#0D2F25]"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5 text-white" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5 text-[#C9A45C]" /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </article>

      {/* Quick View Modal */}
      {quickViewOpen && <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />}
    </>
  );
}

