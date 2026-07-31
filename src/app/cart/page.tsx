"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2, Tag, ShieldCheck, Check } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/constants/products";

export default function CartPage() {
  const [cartQuantities, setCartQuantities] = useState<{ [id: string]: number }>({
    "yuva-001": 1,
    "yuva-006": 1,
  });

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const cartProducts = [products[0], products[5]]; // Manjishtha Soap + Flora Serum

  const handleQtyChange = (id: string, delta: number) => {
    setCartQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const rawSubtotal = cartProducts.reduce(
    (sum, prod) => sum + prod.price * (cartQuantities[prod.id] || 1),
    0
  );

  const discountAmount = couponApplied ? Math.round(rawSubtotal * 0.15) : 0;
  const finalSubtotal = rawSubtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toLowerCase() === "yuva15" || couponCode.trim().length > 0) {
      setCouponApplied(true);
    }
  };

  return (
    <PageShell>
      <main className="space-y-12 pb-16">
        {/* Banner */}
        <section className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-12">
          <SectionHeading
            eyebrow="Ritual Bag"
            title="Your Selected Skincare Essentials"
            description="Review your artisanal bath bars, serums, and promotional discounts."
          />
        </section>

        {/* Cart Main Section */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Cart Items List */}
          <div className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-white p-6 sm:p-8 shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-[#2E5E4E] font-serif">Shopping Bag Items</h2>

            <div className="space-y-4">
              {cartProducts.map((product) => {
                const qty = cartQuantities[product.id] || 1;
                return (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[1.75rem] border border-[#2E5E4E]/10 bg-[#FAF8F3] p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-inner">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#9d6d4f]">
                          {product.category} • {product.size}
                        </span>
                        <h3 className="text-base font-bold text-[#2E5E4E]">{product.name}</h3>
                        <p className="text-xs text-[#6e6258] mt-1 font-semibold">₹{product.price} each</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#2E5E4E]/10">
                      {/* Quantity Selector */}
                      <div className="flex items-center rounded-full border border-[#2E5E4E]/20 bg-white px-3 py-1">
                        <button
                          onClick={() => handleQtyChange(product.id, -1)}
                          className="px-2 py-0.5 font-bold text-[#2E5E4E]"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-[#2E5E4E]">{qty}</span>
                        <button
                          onClick={() => handleQtyChange(product.id, 1)}
                          className="px-2 py-0.5 font-bold text-[#2E5E4E]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-lg font-bold text-[#2E5E4E]">₹{product.price * qty}</span>

                      <button className="text-[#9d6d4f] hover:text-red-600 transition" aria-label="Remove product">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coupon Code Section */}
            <div className="border-t border-[#2E5E4E]/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Have a Promo or Gift Code?</p>
              <form onSubmit={handleApplyCoupon} className="mt-3 flex gap-3 max-w-md">
                <div className="relative flex-1">
                  <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C9A66B]" />
                  <input
                    type="text"
                    placeholder="Enter YUVA15 for 15% off"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full rounded-full border border-[#2E5E4E]/20 bg-[#FAF8F3] py-3 pl-11 pr-4 text-xs outline-none focus:border-[#C9A66B]"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-[#2E5E4E] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition"
                >
                  Apply
                </button>
              </form>

              {couponApplied && (
                <p className="mt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <Check className="h-4 w-4" /> Promo Code YUVA15 Applied! (15% Off Saved ₹{discountAmount})
                </p>
              )}
            </div>
          </div>

          {/* Order Summary & Checkout Trigger */}
          <div className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#2E5E4E] p-6 sm:p-8 text-[#FAF8F3] shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold font-serif">Order Summary</h2>

              <div className="mt-6 space-y-4 text-xs text-[#FAF8F3]/80">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-[#FAF8F3]">₹{rawSubtotal}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-emerald-300">
                    <span>Promo Discount (15%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Luxury Shipping</span>
                  <span className="font-bold text-emerald-300">COMPLIMENTARY</span>
                </div>

                <div className="flex justify-between">
                  <span>Complimentary Sample</span>
                  <span className="font-bold text-emerald-300">Included</span>
                </div>

                <div className="flex justify-between border-t border-white/10 pt-4 text-lg font-bold text-[#FAF8F3]">
                  <span>Total Due</span>
                  <span className="text-2xl font-extrabold text-[#C9A66B]">₹{finalSubtotal}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Link href="/checkout">
                <button className="w-full rounded-full bg-[#C9A66B] py-4 text-xs font-bold uppercase tracking-widest text-[#2E5E4E] hover:bg-white transition shadow-lg flex items-center justify-center gap-2">
                  <ShoppingBag className="h-4 w-4" /> Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </button>
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#FAF8F3]/70">
                <ShieldCheck className="h-4 w-4 text-[#C9A66B]" /> 30-Day Happiness Guarantee Included
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
