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
  imageAspect?: "square" | "portrait";
}

export function ProductCard({ product, showRating = true, imageAspect = "portrait" }: ProductCardProps) {
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

  const aspectClass = imageAspect === "portrait" ? "aspect-[3/4]" : "aspect-square";

  return (
    <>
      <article className="group relative flex flex-col overflow-hidden bg-[#FAF7F2] border border-[#E5DFD5] transition-all duration-300 hover:border-[#1A3C2F]/30 hover:shadow-lg">
        {/* Product Image Container */}
        <div className={`relative ${aspectClass} w-full overflow-hidden bg-[#F3EDE4]`}>
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute right-2.5 top-2.5 z-10 p-1.5 transition ${
              isWishlisted
                ? "bg-white text-red-500 shadow-sm"
                : "bg-white/80 text-[#1A3C2F] hover:bg-white hover:text-red-500 opacity-0 group-hover:opacity-100"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>

          {/* Badge Tag */}
          {product.badge && (
            <span className="absolute left-0 top-3.5 z-10 bg-[#1A3C2F] px-2.5 py-0.5 text-[9px] font-bold tracking-[0.14em] text-[#FAF7F2] uppercase">
              {product.badge}
            </span>
          )}

          {/* Sale Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="absolute right-0 top-3.5 z-10 bg-[#C5A059] px-2.5 py-0.5 text-[9px] font-bold tracking-[0.14em] text-[#1A3C2F] uppercase">
              SALE
            </span>
          )}

          {/* Image */}
          <Link href={`/product/${product.slug}`} className="block h-full w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ objectPosition: "center center" }}
            />
          </Link>

          {/* Quick View Overlay */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-1.5 bg-[#1A3C2F]/90 py-2.5 text-[10px] font-bold tracking-widest uppercase text-[#FAF7F2] opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-[#1A3C2F]"
          >
            <Eye className="h-3.5 w-3.5 text-[#C5A059]" /> Quick View
          </button>
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-1 flex-col justify-between space-y-3">
          <div>
            {/* Category & Size */}
            <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.14em] uppercase">
              <span className="text-[#C5A059]">{product.category}</span>
              <span className="text-[#7C907C]">{product.size || "300g"}</span>
            </div>

            {/* Product Title */}
            <Link href={`/product/${product.slug}`}>
              <h3 className="mt-1.5 text-sm font-bold text-[#1A3C2F] transition-colors hover:text-[#C5A059] line-clamp-2 leading-snug font-serif">
                {product.name}
              </h3>
            </Link>

            {/* Short Description */}
            <p className="mt-1.5 text-[11px] text-[#556B61] line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          <div className="pt-3 border-t border-[#E5DFD5] space-y-2.5">
            {/* Price & Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-[#1A3C2F]">₹{product.price}</span>
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
              className={`w-full flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all ${
                added
                  ? "bg-emerald-800 text-white"
                  : "bg-[#1A3C2F] text-[#FAF7F2] hover:bg-[#C5A059] hover:text-[#1A3C2F]"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5 text-white" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
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
