"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2, Tag, ShieldCheck, Check, ShoppingCart, RotateCcw } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    rawSubtotal,
    discountAmount,
    shippingCost,
    finalTotal,
    couponCode,
    couponApplied,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      const success = applyCoupon(inputCoupon);
      if (!success) {
        setCouponError(true);
        setTimeout(() => setCouponError(false), 3000);
      }
    }
  };

  return (
    <PageShell>
      <main className="space-y-10 pb-20 pt-4">
        {/* Banner */}
        <section className="bg-[#F3EDE4] border border-[#E5DFD5] p-6 sm:p-10 text-center space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C5A059]">
            YOUR BOTANICAL BAG
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A3C2F]">
            Selected Skincare &amp; Wellness Essentials
          </h1>
          <p className="text-xs sm:text-sm text-[#556B61] max-w-md mx-auto">
            Review your artisanal bath bars, serums, and promotional discounts.
          </p>
        </section>

        {cart.length === 0 ? (
          /* Empty Cart View */
          <div className="border border-[#E5DFD5] bg-white p-12 text-center text-[#1A3C2F] space-y-4 max-w-2xl mx-auto">
            <ShoppingCart className="h-12 w-12 text-[#C5A059] mx-auto opacity-70" />
            <h2 className="text-2xl font-serif font-bold">Your Cart is Currently Empty</h2>
            <p className="text-xs text-[#556B61] max-w-sm mx-auto leading-relaxed">
              Explore our handcrafted cold-processed soaps, hair cleansers, and traditional grain cookies.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#1A3C2F] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#122B22] transition"
              >
                EXPLORE CATALOG <ArrowRight className="h-4 w-4 text-[#C5A059]" />
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Main Grid */
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Left: Cart Items List */}
            <div className="border border-[#E5DFD5] bg-white p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4">
                <h2 className="text-xl font-bold text-[#1A3C2F] font-serif">Shopping Bag ({cart.reduce((a, c) => a + c.quantity, 0)} Items)</h2>
                <Link href="/shop" className="text-xs font-semibold text-[#C5A059] hover:underline">
                  Continue Shopping
                </Link>
              </div>

              <div className="space-y-4">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#E5DFD5] bg-[#FAF7F2] p-4"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="relative h-20 w-20 flex-shrink-0 bg-white border border-[#E5DFD5]">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#C5A059]">
                          {product.category} &bull; {product.size || "125g"}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-[#1A3C2F] line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-[#7C907C] mt-0.5">₹{product.price} each</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E5DFD5]">
                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-[#1A3C2F]/20 bg-white px-2.5 py-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 font-bold text-[#1A3C2F] text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-[#1A3C2F]">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2 font-bold text-[#1A3C2F] text-xs"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#1A3C2F]">₹{product.price * quantity}</span>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[#7C907C] hover:text-red-600 transition"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="border-t border-[#E5DFD5] pt-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Have a Promo or Gift Code?</p>
                <form onSubmit={handleApplyCoupon} className="flex gap-3 max-w-md">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#C5A059]" />
                    <input
                      type="text"
                      placeholder="Enter YUVA15 for 15% off"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full border border-[#E5DFD5] bg-[#FAF7F2] py-2 pl-9 pr-3 text-xs outline-none focus:border-[#1A3C2F]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#1A3C2F] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#122B22] transition"
                  >
                    Apply
                  </button>
                </form>

                {couponApplied && (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-800">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Check className="h-4 w-4" /> Promo Code {couponCode} Applied! (15% Savings: ₹{discountAmount})
                    </span>
                    <button onClick={removeCoupon} className="text-xs text-red-600 underline">
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-xs text-red-600 font-semibold">Invalid promo code. Please try YUVA15.</p>
                )}
              </div>
            </div>

            {/* Right: Summary Box */}
            <div className="border border-[#1A3C2F] bg-[#1A3C2F] p-6 sm:p-8 text-[#FAF7F2] flex flex-col justify-between space-y-6 shadow-lg">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold font-serif border-b border-white/10 pb-4">Order Summary</h2>

                <div className="space-y-3 text-xs text-[#FAF7F2]/80">
                  <div className="flex justify-between">
                    <span>Bag Subtotal</span>
                    <span className="font-bold text-[#FAF7F2]">₹{rawSubtotal}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-emerald-300">
                      <span>Promo Discount ({couponCode})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="font-bold text-emerald-300">
                      {shippingCost === 0 ? "FREE (Orders > ₹500)" : `₹${shippingCost}`}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-white/10 pt-4 text-base font-bold text-[#FAF7F2]">
                    <span>Total Payable</span>
                    <span className="text-2xl font-extrabold text-[#C5A059]">₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <Link href="/checkout">
                  <button className="w-full bg-[#C5A059] py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#1A3C2F] hover:bg-white transition shadow-md flex items-center justify-center gap-2">
                    <ShoppingBag className="h-4 w-4" /> PROCEED TO CHECKOUT &rarr;
                  </button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#FAF7F2]/70">
                  <ShieldCheck className="h-4 w-4 text-[#C5A059]" /> 100% Secure Checkout &amp; Botanical Guarantee
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </PageShell>
  );
}
eShell>
  );
}
