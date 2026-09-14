"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const currentImage = selectedImage || product.image;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-[#E5DFD5] bg-[#FAF7F2] p-6 shadow-2xl sm:p-8 lg:p-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 border border-[#E5DFD5] bg-white p-2 text-[#1A3C2F] transition hover:bg-[#1A3C2F] hover:text-[#FAF7F2]"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Gallery View (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden bg-white border border-[#E5DFD5]">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute left-4 top-4 bg-[#1A3C2F] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FAF7F2]">
                  {product.badge}
                </span>
              )}
            </div>

            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative h-16 w-16 flex-shrink-0 overflow-hidden border transition ${
                      currentImage === imgUrl ? "border-[#1A3C2F] ring-1 ring-[#1A3C2F]" : "border-[#E5DFD5] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={imgUrl} alt={`${product.name} thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                <span>{product.category}</span>
                <span className="bg-[#F3EDE4] px-2.5 py-0.5 text-[#1A3C2F] font-bold">{product.size || "125g"}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A3C2F]">{product.name}</h2>

              <div className="flex items-center gap-3 text-xs text-[#556B61]">
                <div className="flex items-center gap-1 text-[#C5A059]">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold text-[#1A3C2F]">{product.rating}</span>
                </div>
                <span>&bull;</span>
                <span>{product.reviews} Reviews</span>
              </div>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-bold text-[#1A3C2F]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-[#7C907C] line-through">₹{product.originalPrice}</span>
                )}
              </div>

              <p className="text-xs text-[#3E564A] leading-relaxed">{product.shortDescription}</p>

              {/* Formula Highlights */}
              <div className="pt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#7C907C]">Key Formula Ingredients:</p>
                <p className="mt-1 text-xs text-[#556B61] leading-relaxed">
                  {product.ingredients.slice(0, 5).join(" • ")}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#E5DFD5] space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#1A3C2F]/20 bg-white px-2.5 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2 py-0.5 text-base font-bold text-[#1A3C2F]"
                  >
                    -
                  </button>
                  <span className="px-3 font-bold text-xs text-[#1A3C2F]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2 py-0.5 text-base font-bold text-[#1A3C2F]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex flex-1 items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider transition ${
                    added
                      ? "bg-emerald-800 text-white"
                      : "bg-[#1A3C2F] text-[#FAF7F2] hover:bg-[#122B22]"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4 text-white" /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4 text-[#C5A059]" /> Add to Cart — ₹{product.price * quantity}
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`border p-3 transition ${
                    isWishlisted ? "bg-red-50 text-red-500 border-red-200" : "border-[#E5DFD5] text-[#1A3C2F] hover:bg-[#F3EDE4]"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="font-bold uppercase tracking-wider text-[#1A3C2F] hover:text-[#C5A059] flex items-center gap-1"
                >
                  View Full Product Details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="flex items-center gap-1 text-[11px] text-[#7C907C]">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" /> 100% Natural &amp; Cruelty-Free
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

