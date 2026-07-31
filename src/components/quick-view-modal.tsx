"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, Shield } from "lucide-react";
import type { Product } from "@/types/product";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const currentImage = selectedImage || product.image;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2.5rem] border border-[#2f2a25]/15 bg-[#fffdf9] p-6 shadow-2xl sm:p-8 lg:p-10">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full border border-[#2f2a25]/10 bg-[#f7efe6] p-2 text-[#2f2a25] transition hover:bg-[#2f2a25] hover:text-[#f7efe6]"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Gallery View */}
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#f7efe6] p-6 shadow-inner">
              <Image
                src={currentImage}
                alt={product.name}
                width={600}
                height={600}
                className="h-[20rem] w-full rounded-[1.5rem] object-cover sm:h-[24rem]"
              />
              {product.badge && (
                <span className="absolute left-6 top-6 rounded-full bg-[#2f2a25] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#f7efe6]">
                  {product.badge}
                </span>
              )}
            </div>

            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      currentImage === imgUrl ? "border-[#9d6d4f]" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={imgUrl} alt={`${product.name} thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-[#9d6d4f]">
                <span>{product.category}</span>
                <span className="rounded-full bg-[#f4e8dd] px-3 py-1 text-[#2f2a25]">{product.size}</span>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-[#2f2a25] sm:text-3xl">{product.name}</h2>

              <div className="mt-3 flex items-center gap-3 text-sm text-[#6e6258]">
                <div className="flex items-center gap-1 text-[#9d6d4f]">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.reviews} customer reviews</span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#2f2a25]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-[#9d6d4f] line-through">₹{product.originalPrice}</span>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#6e6258]">{product.shortDescription}</p>

              {/* Suitable Skin Types */}
              {product.skinType && (
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-widest font-semibold text-[#9d6d4f]">Suitable Skin Types:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.skinType.map((st) => (
                      <span key={st} className="rounded-md border border-[#2f2a25]/10 bg-[#f7efe6] px-2.5 py-1 text-xs text-[#2f2a25]">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Ingredients snippet */}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-widest font-semibold text-[#9d6d4f]">Key Formula Highlights:</p>
                <p className="mt-1 text-xs text-[#6e6258] leading-relaxed">
                  {product.ingredients.slice(0, 5).join(" • ")}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-[#2f2a25]/10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-full border border-[#2f2a25]/20 bg-[#f7efe6] px-3 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2 py-1 text-lg font-bold text-[#2f2a25]"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold text-[#2f2a25]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2 py-1 text-lg font-bold text-[#2f2a25]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition ${
                    added
                      ? "bg-emerald-700 text-white"
                      : "bg-[#2f2a25] text-[#f7efe6] hover:bg-[#9d6d4f]"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" /> Added to Ritual Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" /> Add to Cart (₹{product.price * quantity})
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`rounded-full border border-[#2f2a25]/15 p-3.5 transition ${
                    isWishlisted ? "bg-red-50 text-red-500 border-red-200" : "text-[#2f2a25] hover:bg-[#f7efe6]"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9d6d4f] hover:underline"
                >
                  View Full Product Details & Reviews <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="flex items-center gap-1 text-xs text-[#6e6258]">
                  <Shield className="h-3.5 w-3.5 text-emerald-600" /> 100% Organic & Cruelty-Free
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
