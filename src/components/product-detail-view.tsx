"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, ShoppingBag, Heart, Check, ShieldCheck, Sparkles, Truck, RefreshCw, Leaf, ThumbsUp, ZoomIn, Zap } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product-card";
import { products } from "@/constants/products";
import { useCart } from "@/context/cart-context";

export function ProductDetailView({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImg, setSelectedImg] = useState<string>(product.image);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "benefits" | "directions" | "reviews">("description");
  const [isZoomed, setIsZoomed] = useState(false);

  const isCookie = product.category === "Cookies";

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
        <Link href="/" className="hover:text-[#173F32]">Home</Link> /{" "}
        <Link href={isCookie ? "/cookies" : "/shop"} className="hover:text-[#173F32]">
          {isCookie ? "Cookies" : "Shop"}
        </Link> /{" "}
        <span className="text-[#173F32] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Display (Left: Gallery, Right: Details) */}
      <section className="grid gap-8 lg:grid-cols-12 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
        {/* Left: Image Gallery (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div
            onClick={() => setIsZoomed(!isZoomed)}
            className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#FCFAF5] border border-stone-200 p-2"
          >
            {product.badge && (
              <span className="absolute left-4 top-4 z-10 rounded-sm bg-[#173F32] px-2.5 py-1 text-[11px] font-semibold text-[#FCFAF5] uppercase">
                {product.badge}
              </span>
            )}
            <Image
              src={selectedImg}
              alt={product.name}
              fill
              priority
              className={`object-cover transition-transform duration-500 rounded-lg ${
                isZoomed ? "scale-140" : "group-hover:scale-104"
              }`}
            />
            <div className="absolute right-3 bottom-3 rounded-md bg-white/90 p-2 text-[#173F32] shadow-xs">
              <ZoomIn className="h-4 w-4" />
            </div>
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(imgUrl)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition ${
                    selectedImg === imgUrl ? "border-[#173F32]" : "border-stone-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={imgUrl} alt={`${product.name} gallery ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Purchase Options (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#C9A45C]">
              <span>{product.category}</span>
              <span className="rounded-full bg-[#F7F2E8] px-2.5 py-0.5 text-stone-700 font-medium">
                {product.size || "300g"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#173F32]">
              {product.name}
            </h1>

            {/* Rating & Stock Status */}
            <div className="flex items-center gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-1 text-[#C9A45C]">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold text-[#173F32]">{product.rating}</span>
              </div>
              <span>&bull;</span>
              <span className="font-medium text-stone-700">{product.reviews} Reviews</span>
              <span>&bull;</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> In Stock
              </span>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-bold text-[#173F32]">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-base text-stone-400 line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                  Save ₹{product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm leading-relaxed text-stone-700">
              {product.shortDescription || product.description}
            </p>

            {/* Suitable Skin Types or Quick Highlights */}
            {product.skinType && (
              <div className="pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Suitable For:</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {product.skinType.map((st) => (
                    <span key={st} className="rounded-md bg-[#F7F2E8] px-2.5 py-0.5 text-xs text-[#173F32] font-medium">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Form: Quantity, Add to Cart, Buy Now */}
          <div className="mt-6 pt-5 border-t border-stone-200 space-y-3.5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-stone-700">Quantity:</span>
              <div className="flex items-center rounded-md border border-stone-300 bg-[#FCFAF5] px-3 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-1.5 text-base font-bold text-[#173F32]"
                >
                  -
                </button>
                <span className="px-3 font-semibold text-xs text-[#173F32]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-1.5 text-base font-bold text-[#173F32]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-3 text-xs font-semibold uppercase tracking-wider transition ${
                  added ? "bg-emerald-700 text-white" : "bg-[#173F32] text-[#FCFAF5] hover:bg-[#0D2F25]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4 text-white" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 text-[#C9A45C]" /> Add to Cart — ₹{product.price * quantity}
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 rounded-md bg-[#C9A45C] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0D2F25] hover:bg-[#173F32] hover:text-white transition shadow-xs"
              >
                <Zap className="h-4 w-4" /> Buy Now
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`rounded-md border p-3 transition ${
                  isWishlisted ? "bg-red-50 text-red-500 border-red-200" : "border-stone-300 text-[#173F32] hover:bg-[#F7F2E8]"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Service Highlights */}
            <div className="grid grid-cols-3 gap-2 pt-3 text-center border-t border-stone-100 text-[11px] text-stone-600">
              <div className="flex items-center justify-center gap-1">
                <Truck className="h-3.5 w-3.5 text-[#C9A45C]" /> Free Shipping &gt; ₹5000
              </div>
              <div className="flex items-center justify-center gap-1">
                <Leaf className="h-3.5 w-3.5 text-[#C9A45C]" /> 100% Natural
              </div>
              <div className="flex items-center justify-center gap-1">
                <RefreshCw className="h-3.5 w-3.5 text-[#C9A45C]" /> Fresh Small Batch
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COOKIES PRODUCT SPECIFIC DETAILS GRID (If Cookies Category) */}
      {isCookie && (
        <section className="bg-[#F7F2E8] border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold font-serif text-[#173F32]">Product &amp; Food Compliance Information</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs text-stone-800">
            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <p className="text-[10px] uppercase font-semibold text-[#C9A45C]">Net Weight</p>
              <p className="font-bold text-sm text-[#173F32]">300g</p>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <p className="text-[10px] uppercase font-semibold text-[#C9A45C]">MRP (Incl. Taxes)</p>
              <p className="font-bold text-sm text-[#173F32]">₹{product.originalPrice || product.price}</p>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <p className="text-[10px] uppercase font-semibold text-[#C9A45C]">Batch No.</p>
              <p className="font-medium text-stone-700">YN-CK-{product.id.slice(-3)}</p>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <p className="text-[10px] uppercase font-semibold text-[#C9A45C]">Mfg Date</p>
              <p className="font-medium text-stone-700">Aug 2026</p>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <p className="text-[10px] uppercase font-semibold text-[#C9A45C]">Expiry / Best Before</p>
              <p className="font-medium text-stone-700">6 Months from MFD</p>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <p className="text-[10px] uppercase font-semibold text-[#C9A45C]">Storage Instructions</p>
              <p className="font-medium text-stone-700">Store in a cool, dry place in an airtight container.</p>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-stone-200 sm:col-span-2">
              <p className="text-[10px] uppercase font-semibold text-[#C9A45C]">Nutritional Highlights</p>
              <p className="font-medium text-stone-700">Rich in dietary fibre, made with traditional millets, unrefined jaggery, zero artificial preservatives.</p>
            </div>
          </div>
        </section>
      )}

      {/* Tabs Section: Description, Ingredients, Benefits, Directions, Reviews */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
        <div className="flex gap-2 overflow-x-auto border-b border-stone-200 pb-3">
          {[
            { id: "description", label: "Description" },
            { id: "ingredients", label: "Ingredients" },
            { id: "benefits", label: "Benefits" },
            { id: "directions", label: isCookie ? "Storage & Serving" : "How to Use" },
            { id: "reviews", label: `Reviews (${product.customerReviews?.length || product.reviews})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === tab.id
                  ? "bg-[#173F32] text-[#FCFAF5]"
                  : "bg-[#F7F2E8] text-stone-700 hover:bg-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "description" && (
            <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <h3 className="text-base font-bold font-serif text-[#173F32]">About {product.name}</h3>
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold font-serif text-[#173F32]">Ingredients &amp; Formulation</h3>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {product.ingredients.map((ing) => (
                  <div key={ing} className="flex items-center gap-2.5 rounded-lg border border-stone-200 bg-[#FCFAF5] p-3 text-xs font-medium text-[#173F32]">
                    <Sparkles className="h-4 w-4 text-[#C9A45C]" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "benefits" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold font-serif text-[#173F32]">Key Benefits</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-stone-200 bg-[#FCFAF5] p-3.5 text-xs text-stone-700">
                    <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "directions" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold font-serif text-[#173F32]">
                {isCookie ? "Storage & Serving Instructions" : "How to Use"}
              </h3>
              <div className="space-y-2.5">
                {product.directions.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-stone-200 bg-[#FCFAF5] p-3.5 text-xs text-stone-700">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#173F32] text-white text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-stone-200 bg-[#FCFAF5] p-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#173F32]">{product.rating} / 5.0</h3>
                  <div className="mt-1 flex items-center gap-1 text-[#C9A45C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-stone-500">Based on {product.reviews} customer reviews</p>
                </div>
              </div>

              <div className="space-y-3">
                {(product.customerReviews || []).map((rev) => (
                  <div key={rev.id} className="rounded-lg border border-stone-200 bg-white p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#173F32]">{rev.author}</span>
                      <span className="text-stone-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#C9A45C]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>

                    <h4 className="text-xs font-semibold text-[#173F32]">{rev.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h2 className="text-xl font-bold font-serif text-[#173F32]">Related Products</h2>
            <Link href={isCookie ? "/cookies" : "/shop"} className="text-xs font-semibold text-[#173F32] hover:text-[#C9A45C] transition">
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

