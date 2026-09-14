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
      <article className="group relative flex flex-col overflow-hidden bg-white border border-[#E5DFD5] p-3 shadow-2xs transition-all duration-300 hover:border-[#1A3C2F]/40 hover:shadow-md">
        {/* Large Product Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F2]">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute right-2.5 top-2.5 z-10 p-1.5 rounded-full backdrop-blur-xs transition ${
              isWishlisted
                ? "bg-white text-red-500 shadow-sm"
                : "bg-white/80 text-[#1A3C2F] hover:bg-white hover:text-red-500"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>

          {/* Badge Tag */}
          {product.badge && (
            <span className="absolute left-2.5 top-2.5 z-10 bg-[#1A3C2F] px-2 py-0.5 text-[9px] font-semibold tracking-wider text-[#FAF7F2] uppercase">
              {product.badge}
            </span>
          )}

          {/* Image */}
          <Link href={`/product/${product.slug}`} className="block h-full w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-104"
            />
          </Link>

          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-center gap-1.5 bg-white/95 py-2 text-[10px] font-semibold tracking-wider uppercase text-[#1A3C2F] opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-[#1A3C2F] hover:text-white shadow-sm"
          >
            <Eye className="h-3.5 w-3.5 text-[#C5A059]" /> Quick View
          </button>
        </div>

        {/* Product Details */}
        <div className="mt-3 flex flex-1 flex-col justify-between space-y-2">
          <div>
            {/* Category & Size */}
            <div className="flex items-center justify-between text-[10px] font-medium tracking-wider uppercase text-[#C5A059]">
              <span>{product.category}</span>
              <span className="text-[#7C907C] lowercase">{product.size || "300g"}</span>
            </div>

            {/* Product Title */}
            <Link href={`/product/${product.slug}`}>
              <h3 className="mt-1 text-xs sm:text-sm font-bold text-[#1A3C2F] transition-colors hover:text-[#C5A059] line-clamp-2 leading-snug">
                {product.name}
              </h3>
            </Link>

            {/* Short Benefit */}
            <p className="mt-1 text-[11px] text-[#556B61] line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          <div className="pt-2 border-t border-[#E5DFD5]/60 space-y-2">
            {/* Price & Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm sm:text-base font-bold text-[#1A3C2F]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-[#7C907C] line-through">₹{product.originalPrice}</span>
                )}
              </div>

              {showRating && product.rating && (
                <div className="flex items-center gap-1 text-[11px] text-[#1A3C2F]">
                  <Star className="h-3 w-3 fill-[#C5A059] text-[#C5A059]" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-[10px] text-[#7C907C]">({product.reviews})</span>
                </div>
              )}
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                added
                  ? "bg-emerald-800 text-white"
                  : "bg-[#1A3C2F] text-[#FAF7F2] hover:bg-[#122B22]"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5 text-white" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5 text-[#C5A059]" /> Add to Cart
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


