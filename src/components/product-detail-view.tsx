"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Heart, Check, ShieldCheck, Sparkles, Truck, RefreshCw, Leaf, ThumbsUp, ZoomIn } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product-card";
import { products } from "@/constants/products";

export function ProductDetailView({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const [selectedImg, setSelectedImg] = useState<string>(product.image);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"ingredients" | "benefits" | "directions" | "reviews">("ingredients");
  const [isZoomed, setIsZoomed] = useState(false);

  // Frequently Bought Together Bundle state
  const bundleProducts = (product.frequentlyBoughtWith || [])
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined);

  const [selectedBundleSlugs, setSelectedBundleSlugs] = useState<string[]>([
    product.slug,
    ...bundleProducts.map((p) => p.slug),
  ]);
  const [bundleAdded, setBundleAdded] = useState(false);

  const toggleBundleProduct = (slug: string) => {
    if (slug === product.slug) return;
    setSelectedBundleSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const selectedBundleItems = [
    product,
    ...bundleProducts.filter((p) => selectedBundleSlugs.includes(p.slug)),
  ];

  const rawBundlePrice = selectedBundleItems.reduce((acc, item) => acc + item.price, 0);
  const bundleDiscountPrice = Math.round(rawBundlePrice * 0.85);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleAddBundleToCart = () => {
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2500);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Breadcrumb */}
      <nav className="text-xs uppercase tracking-widest text-[#7A9474] font-semibold">
        <Link href="/" className="hover:underline">Home</Link> /{" "}
        <Link href="/shop" className="hover:underline">Shop</Link> /{" "}
        <span className="text-[#2E5E4E] font-bold">{product.name}</span>
      </nav>

      {/* Top Main Product Section */}
      <section className="grid gap-10 rounded-[2.5rem] border border-[#C9A66B]/20 bg-white p-6 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div
            onClick={() => setIsZoomed(!isZoomed)}
            className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-[2rem] bg-[#F6F1E9] p-4 shadow-inner"
          >
            {product.badge && (
              <span className="absolute left-6 top-6 z-10 rounded-full bg-[#2E5E4E] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#FAF8F3]">
                {product.badge}
              </span>
            )}
            <Image
              src={selectedImg}
              alt={product.name}
              fill
              priority
              className={`object-cover transition-transform duration-700 ease-out rounded-[1.5rem] ${
                isZoomed ? "scale-150" : "group-hover:scale-110"
              }`}
            />
            <div className="absolute right-4 bottom-4 rounded-full bg-white/80 p-2.5 shadow-md backdrop-blur-sm text-[#2E5E4E]">
              <ZoomIn className="h-4 w-4" />
            </div>
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(imgUrl)}
                  className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-[1.25rem] border-2 transition ${
                    selectedImg === imgUrl ? "border-[#C9A66B] scale-105" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={imgUrl} alt={`${product.name} gallery ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details & Action */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.25em] text-[#C9A66B]">
              <span>{product.category}</span>
              <span className="rounded-full bg-[#F6F1E9] px-3 py-1 text-[#2E5E4E]">{product.size}</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold text-[#2E5E4E] sm:text-4xl lg:text-5xl font-serif">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-[#6e6258]">
              <div className="flex items-center gap-1 text-[#C9A66B]">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">{product.rating}</span>
              </div>
              <span>•</span>
              <span className="font-semibold text-[#2E5E4E]">{product.reviews} Customer Reviews</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> In Stock
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-4xl font-extrabold text-[#2E5E4E]">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-[#C9A66B] line-through">${product.originalPrice}</span>
              )}
              <span className="rounded-full bg-[#F6F1E9] px-3 py-1 text-xs font-bold text-[#2E5E4E]">
                Free Luxury Shipping
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-[#1F332B]/80">
              {product.description}
            </p>

            {/* Suitable Skin Types */}
            {product.skinType && (
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#C9A66B]">Suitable Skin Type:</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.skinType.map((st) => (
                    <span
                      key={st}
                      className="rounded-full border border-[#2E5E4E]/15 bg-[#F6F1E9] px-3.5 py-1 text-xs font-bold text-[#2E5E4E]"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart Form */}
          <div className="mt-8 border-t border-[#2E5E4E]/10 pt-6 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center rounded-full border border-[#2E5E4E]/20 bg-[#F6F1E9] px-4 py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 text-lg font-bold text-[#2E5E4E]"
                >
                  -
                </button>
                <span className="px-4 font-bold text-[#2E5E4E]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-1 text-lg font-bold text-[#2E5E4E]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full py-4 text-base font-bold transition shadow-lg ${
                  added
                    ? "bg-emerald-700 text-white"
                    : "bg-[#2E5E4E] text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5" /> Added to Ritual Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 text-[#C9A66B]" /> Add to Cart — ${product.price * quantity}
                  </>
                )}
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`rounded-full border border-[#2E5E4E]/15 p-4 transition ${
                  isWishlisted ? "bg-red-50 text-red-500 border-red-200" : "text-[#2E5E4E] hover:bg-[#F6F1E9]"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-center border-t border-[#2E5E4E]/5 text-xs text-[#6e6258]">
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-[#C9A66B]" />
                <span>Complimentary Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Leaf className="h-4 w-4 text-[#C9A66B]" />
                <span>100% Organic & Herbal</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="h-4 w-4 text-[#C9A66B]" />
                <span>Small Batch Fresh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
        <div className="flex gap-2 overflow-x-auto border-b border-[#2E5E4E]/10 pb-4">
          {[
            { id: "ingredients", label: "Ingredients & Formula" },
            { id: "benefits", label: "Skin Benefits" },
            { id: "directions", label: "How to Use" },
            { id: "reviews", label: `Customer Reviews (${product.customerReviews?.length || product.reviews})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest transition ${
                activeTab === tab.id
                  ? "bg-[#2E5E4E] text-[#FAF8F3] shadow-md"
                  : "bg-white/60 text-[#1F332B] hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {activeTab === "ingredients" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-[#2E5E4E] font-serif">Key Formula Highlights</h3>
                <p className="mt-2 text-sm text-[#1F332B]/80">
                  Every ingredient in Yuva Naturals is 100% plant-based, ethically harvested, and free from synthetic parabens or sulfates.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {product.ingredients.map((ing) => (
                  <div key={ing} className="flex items-center gap-3 rounded-2xl border border-[#2E5E4E]/10 bg-white p-4">
                    <div className="rounded-full bg-[#F6F1E9] p-2 text-[#C9A66B]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-[#2E5E4E]">{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "benefits" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#2E5E4E] font-serif">Key Botanical Benefits</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-2xl border border-[#2E5E4E]/10 bg-white p-5">
                    <div className="rounded-full bg-[#F6F1E9] p-2 text-[#2E5E4E]">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#2E5E4E]">{benefit}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "directions" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#2E5E4E] font-serif">Usage Instructions</h3>
              <div className="space-y-4">
                {product.directions.map((step, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-2xl border border-[#2E5E4E]/10 bg-white p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2E5E4E] font-bold text-xs text-[#FAF8F3]">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-[#2E5E4E]">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between rounded-2xl border border-[#2E5E4E]/10 bg-white p-6">
                <div>
                  <h3 className="text-3xl font-bold text-[#2E5E4E] font-serif">{product.rating} / 5.0</h3>
                  <div className="mt-1 flex items-center gap-1 text-[#C9A66B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-[#6e6258]">Based on {product.reviews} verified buyer reviews</p>
                </div>
                <button className="rounded-full bg-[#2E5E4E] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#FAF8F3]">
                  Write a Customer Review
                </button>
              </div>

              <div className="space-y-4">
                {(product.customerReviews || []).map((rev) => (
                  <div key={rev.id} className="rounded-2xl border border-[#2E5E4E]/10 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#2E5E4E]">{rev.author}</span>
                        {rev.verified && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#6e6258]">{rev.date}</span>
                    </div>

                    <div className="mt-2 flex items-center gap-1 text-[#C9A66B]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>

                    <h4 className="mt-3 text-base font-bold text-[#2E5E4E]">{rev.title}</h4>
                    <p className="mt-1.5 text-sm text-[#1F332B]/80 leading-relaxed">{rev.comment}</p>

                    <div className="mt-4 flex items-center gap-2 text-xs text-[#C9A66B] font-semibold">
                      <ThumbsUp className="h-3.5 w-3.5" /> Helpful (14)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Frequently Bought Together Bundle */}
      {bundleProducts.length > 0 && (
        <section className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-white p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#C9A66B]">Complete The Ritual</span>
            <h2 className="text-3xl font-bold text-[#2E5E4E] font-serif">Frequently Bought Together</h2>
            <p className="text-sm text-[#1F332B]/80">Bundle complementary Yuva Naturals products and save 15% automatically.</p>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-[#2E5E4E]/15 bg-[#F6F1E9] p-3 w-56">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#2E5E4E] truncate">{product.name}</p>
                  <p className="text-xs font-bold text-[#C9A66B]">${product.price}</p>
                </div>
              </div>

              {bundleProducts.map((bundleItem) => {
                const isSelected = selectedBundleSlugs.includes(bundleItem.slug);
                return (
                  <div key={bundleItem.id} className="flex items-center gap-4">
                    <span className="text-xl font-bold text-[#C9A66B]">+</span>
                    <button
                      onClick={() => toggleBundleProduct(bundleItem.slug)}
                      className={`flex items-center gap-3 rounded-2xl border p-3 w-56 text-left transition ${
                        isSelected ? "border-[#2E5E4E] bg-[#F6F1E9]" : "border-[#2E5E4E]/10 bg-white opacity-60"
                      }`}
                    >
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white">
                        <Image src={bundleItem.image} alt={bundleItem.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#2E5E4E] truncate">{bundleItem.name}</p>
                        <p className="text-xs font-bold text-[#C9A66B]">${bundleItem.price}</p>
                        <span className="text-[10px] text-emerald-800 font-bold">{isSelected ? "Included" : "Click to add"}</span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-[#2E5E4E]/10 bg-[#F6F1E9] p-6 lg:ml-auto lg:min-w-[280px]">
              <div className="flex justify-between text-xs text-[#6e6258]">
                <span>Items Selected ({selectedBundleItems.length})</span>
                <span className="line-through">${rawBundlePrice}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#2E5E4E]">Bundle Price:</span>
                <span className="text-2xl font-extrabold text-[#2E5E4E]">${bundleDiscountPrice}</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800">You Save 15% (${rawBundlePrice - bundleDiscountPrice})</span>

              <button
                onClick={handleAddBundleToCart}
                className={`mt-2 flex items-center justify-center gap-2 rounded-full py-3 text-xs font-bold transition ${
                  bundleAdded ? "bg-emerald-700 text-white" : "bg-[#2E5E4E] text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E]"
                }`}
              >
                {bundleAdded ? (
                  <>
                    <Check className="h-4 w-4" /> Added Bundle to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 text-[#C9A66B]" /> Add Bundle to Cart (${bundleDiscountPrice})
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-white p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-[#C9A66B]">Complete Your Ritual</p>
              <h2 className="mt-2 text-3xl font-bold text-[#2E5E4E] font-serif">Related Products</h2>
            </div>
            <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-[#C9A66B] hover:underline">
              View All Catalog →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom Add to Cart Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-[#C9A66B]/30 bg-[#2E5E4E]/95 backdrop-blur-md px-6 py-3.5 text-[#FAF8F3] shadow-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white hidden sm:block">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#FAF8F3] line-clamp-1">{product.name}</p>
              <p className="text-[11px] text-[#C9A66B] font-semibold">${product.price} • {product.size}</p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="rounded-full bg-[#C9A66B] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#2E5E4E] hover:bg-white transition flex items-center gap-2 shadow-md"
          >
            <ShoppingBag className="h-4 w-4" /> Add to Cart — ${product.price * quantity}
          </button>
        </div>
      </div>
    </div>
  );
}
