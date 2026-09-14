"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, ShoppingBag, Heart, Check, ShieldCheck, Sparkles, Truck, RefreshCw, Leaf, ZoomIn, Zap } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product-card";
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
  const isSoap = product.category === "Bath Bars" || product.category === "Herbal Soaps";

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
      <nav className="text-xs text-[#7C907C] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#1A3C2F]">Home</Link> /{" "}
        <Link href={isCookie ? "/cookies" : "/shop"} className="hover:text-[#1A3C2F]">
          {isCookie ? "Cookies" : "Shop"}
        </Link> /{" "}
        <span className="text-[#1A3C2F] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <section className="grid gap-8 lg:grid-cols-12 bg-white border border-[#E5DFD5] p-6 sm:p-10 shadow-2xs">
        {/* Left: Image Gallery (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div
            onClick={() => setIsZoomed(!isZoomed)}
            className="group relative aspect-square w-full cursor-zoom-in overflow-hidden bg-[#FAF7F2] border border-[#E5DFD5] p-2"
          >
            {product.badge && (
              <span className="absolute left-4 top-4 z-10 bg-[#1A3C2F] px-2.5 py-1 text-[10px] font-semibold text-[#FAF7F2] uppercase tracking-wider">
                {product.badge}
              </span>
            )}
            <Image
              src={selectedImg}
              alt={product.name}
              fill
              priority
              className={`object-cover transition-transform duration-500 ${
                isZoomed ? "scale-140" : "group-hover:scale-104"
              }`}
            />
            <div className="absolute right-3 bottom-3 bg-white/90 p-2 text-[#1A3C2F] shadow-xs">
              <ZoomIn className="h-4 w-4" />
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(imgUrl)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border transition ${
                    selectedImg === imgUrl ? "border-[#1A3C2F] ring-1 ring-[#1A3C2F]" : "border-[#E5DFD5] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={imgUrl} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Purchase Panel (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
              <span>{product.category}</span>
              <span className="bg-[#F3EDE4] px-3 py-1 text-[#1A3C2F] font-bold text-[11px]">
                Weight: {isSoap ? "125g / 4.4 oz" : isCookie ? "300g" : product.size || "250ml"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1A3C2F] leading-tight">
              {product.name}
            </h1>

            {/* Rating & Stock Status */}
            <div className="flex items-center gap-3 text-xs text-[#556B61]">
              <div className="flex items-center gap-1 text-[#C5A059]">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold text-[#1A3C2F]">{product.rating}</span>
              </div>
              <span>&bull;</span>
              <span className="font-medium">{product.reviews} Customer Reviews</span>
              <span>&bull;</span>
              <span className="text-emerald-800 font-medium flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> In Stock &amp; Fresh Batch
              </span>
            </div>

            {/* Price in ₹ */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl sm:text-4xl font-bold text-[#1A3C2F]">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-base text-[#7C907C] line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase">
                  Save ₹{product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm leading-relaxed text-[#3E564A]">
              {product.shortDescription || product.description}
            </p>

            {/* Suitable Types */}
            {product.skinType && (
              <div className="pt-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#7C907C]">Recommended For:</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {product.skinType.map((st) => (
                    <span key={st} className="bg-[#F3EDE4] px-2.5 py-1 text-xs text-[#1A3C2F] font-medium border border-[#E5DFD5]">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions: Qty, Add to Cart, Buy Now */}
          <div className="pt-6 border-t border-[#E5DFD5] space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Quantity:</span>
              <div className="flex items-center border border-[#1A3C2F]/30 bg-[#FAF7F2] px-3 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 text-base font-bold text-[#1A3C2F]"
                >
                  -
                </button>
                <span className="px-4 font-bold text-xs text-[#1A3C2F]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 text-base font-bold text-[#1A3C2F]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-[0.16em] transition ${
                  added ? "bg-emerald-800 text-white" : "bg-[#1A3C2F] text-[#FAF7F2] hover:bg-[#122B22]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4 text-white" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 text-[#C5A059]" /> Add to Cart &bull; ₹{product.price * quantity}
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 bg-[#C5A059] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#1A3C2F] hover:bg-white transition border border-[#C5A059]"
              >
                <Zap className="h-4 w-4" /> Buy Now
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`border p-3.5 transition ${
                  isWishlisted ? "bg-red-50 text-red-500 border-red-200" : "border-[#E5DFD5] text-[#1A3C2F] hover:bg-[#F3EDE4]"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 text-center border-t border-[#E5DFD5] text-[10px] uppercase font-semibold text-[#556B61] tracking-wider">
              <div>&bull; Free Shipping &gt; ₹5000</div>
              <div>&bull; 100% Handcrafted</div>
              <div>&bull; Traditional Recipe</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section: Description, Ingredients, Benefits, Directions, Reviews */}
      <section className="bg-white border border-[#E5DFD5] p-6 sm:p-10 space-y-6">
        <div className="flex gap-2 overflow-x-auto border-b border-[#E5DFD5] pb-3">
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
              className={`whitespace-nowrap px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition ${
                activeTab === tab.id
                  ? "bg-[#1A3C2F] text-[#FAF7F2]"
                  : "bg-[#F3EDE4] text-[#1A3C2F] hover:bg-[#E5DFD5]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pt-2">
          {activeTab === "description" && (
            <div className="space-y-4 text-xs sm:text-sm text-[#3E564A] leading-relaxed">
              <h3 className="text-lg font-bold font-serif text-[#1A3C2F]">About {product.name}</h3>
              <p>{product.description}</p>
              {isSoap && (
                <p className="text-xs text-[#7C907C] italic">
                  Cold-processed in small batches. Each bar features the official YUVA NATURALS embossed stamp and subtle artisanal variations.
                </p>
              )}
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-serif text-[#1A3C2F]">Ingredients &amp; Botanical Formulation</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {product.ingredients.map((ing) => (
                  <div key={ing} className="flex items-center gap-2.5 border border-[#E5DFD5] bg-[#FAF7F2] p-3 text-xs font-semibold text-[#1A3C2F]">
                    <Sparkles className="h-4 w-4 text-[#C5A059] flex-shrink-0" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "benefits" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-serif text-[#1A3C2F]">Key Product Benefits</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 border border-[#E5DFD5] bg-[#FAF7F2] p-3.5 text-xs text-[#3E564A]">
                    <Check className="h-4 w-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "directions" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-serif text-[#1A3C2F]">
                {isCookie ? "Storage & Serving Instructions" : "How to Use"}
              </h3>
              <div className="space-y-3">
                {product.directions.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 border border-[#E5DFD5] bg-[#FAF7F2] p-3.5 text-xs text-[#3E564A]">
                    <span className="flex h-6 w-6 items-center justify-center bg-[#1A3C2F] text-white text-[10px] font-bold">
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#E5DFD5] bg-[#FAF7F2] p-5">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-[#1A3C2F]">{product.rating} / 5.0</h3>
                  <div className="mt-1 flex items-center gap-1 text-[#C5A059]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-[#7C907C]">Based on {product.reviews} verified customer reviews</p>
                </div>
              </div>

              <div className="space-y-4">
                {(product.customerReviews || []).map((rev) => (
                  <div key={rev.id} className="border border-[#E5DFD5] bg-white p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1A3C2F]">{rev.author}</span>
                      <span className="text-[#7C907C]">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#C5A059]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>

                    <h4 className="text-xs font-bold text-[#1A3C2F]">{rev.title}</h4>
                    <p className="text-xs text-[#556B61] leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
            <h2 className="text-2xl font-bold font-serif text-[#1A3C2F]">Complementary Products</h2>
            <Link href={isCookie ? "/cookies" : "/shop"} className="text-xs font-bold tracking-wider uppercase text-[#1A3C2F] hover:text-[#C5A059] transition">
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


