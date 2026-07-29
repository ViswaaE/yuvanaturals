"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/constants/products";
import { CheckCircle2, CreditCard, Lock, ShieldCheck, Sparkles, Truck, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const checkoutItems = [products[0], products[5]]; // Manjishtha Soap + Flora Serum
  const subtotal = checkoutItems.reduce((acc, item) => acc + item.price, 0);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const shippingCost = shippingMethod === "express" ? 12 : 0;
  const grandTotal = subtotal + shippingCost;

  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <PageShell>
      <main className="pb-16 space-y-8">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9d6d4f] hover:underline">
            <ArrowLeft className="h-4 w-4" /> Return to Cart
          </Link>
          <span className="text-xs text-[#6e6258] flex items-center gap-1 font-semibold">
            <Lock className="h-3.5 w-3.5 text-emerald-700" /> 256-Bit Encrypted Secure Checkout
          </span>
        </div>

        <section className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10">
          <SectionHeading
            eyebrow="Express Checkout"
            title="Complete Your Botanical Order"
            description="Enter your shipping address and payment preferences to finalize your ritual."
          />
        </section>

        {/* Checkout Main Form & Summary Grid */}
        <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Form Columns */}
          <div className="space-y-6">
            {/* 1. Shipping Address */}
            <div className="rounded-[2.25rem] border border-[#2E5E4E]/10 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#2E5E4E]/10 pb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5E4E] text-xs font-bold text-[#FAF8F3]">
                  1
                </span>
                <h2 className="text-xl font-bold text-[#2E5E4E] font-serif">Shipping Address</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">First Name</label>
                  <input
                    required
                    type="text"
                    defaultValue="Elena"
                    className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Last Name</label>
                  <input
                    required
                    type="text"
                    defaultValue="Rostova"
                    className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Street Address</label>
                <input
                  required
                  type="text"
                  defaultValue="142 Magnolia Lane"
                  className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">City</label>
                  <input
                    required
                    type="text"
                    defaultValue="Beverly Hills"
                    className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">State</label>
                  <input
                    required
                    type="text"
                    defaultValue="CA"
                    className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Postal Code</label>
                  <input
                    required
                    type="text"
                    defaultValue="90210"
                    className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Method */}
            <div className="rounded-[2.25rem] border border-[#2E5E4E]/10 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#2E5E4E]/10 pb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5E4E] text-xs font-bold text-[#FAF8F3]">
                  2
                </span>
                <h2 className="text-xl font-bold text-[#2E5E4E] font-serif">Shipping Method</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setShippingMethod("standard")}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                    shippingMethod === "standard"
                      ? "border-[#2E5E4E] bg-[#F6F1E9]"
                      : "border-[#2E5E4E]/15 bg-white opacity-70"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-[#2E5E4E]">Standard Delivery</p>
                    <p className="text-[11px] text-[#6e6258]">3–5 Business Days</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800">FREE</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod("express")}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                    shippingMethod === "express"
                      ? "border-[#2E5E4E] bg-[#F6F1E9]"
                      : "border-[#2E5E4E]/15 bg-white opacity-70"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-[#2E5E4E]">Express Courier</p>
                    <p className="text-[11px] text-[#6e6258]">1–2 Business Days</p>
                  </div>
                  <span className="text-xs font-bold text-[#2E5E4E]">$12.00</span>
                </button>
              </div>
            </div>

            {/* 3. Payment Methods */}
            <div className="rounded-[2.25rem] border border-[#2E5E4E]/10 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#2E5E4E]/10 pb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5E4E] text-xs font-bold text-[#FAF8F3]">
                  3
                </span>
                <h2 className="text-xl font-bold text-[#2E5E4E] font-serif">Payment Selection</h2>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-xs font-bold transition border ${
                    paymentMethod === "card"
                      ? "bg-[#2E5E4E] text-[#FAF8F3] border-[#2E5E4E]"
                      : "bg-[#FAF8F3] text-[#2E5E4E] border-[#2E5E4E]/15"
                  }`}
                >
                  <CreditCard className="h-4 w-4" /> Credit Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-xs font-bold transition border ${
                    paymentMethod === "paypal"
                      ? "bg-[#2E5E4E] text-[#FAF8F3] border-[#2E5E4E]"
                      : "bg-[#FAF8F3] text-[#2E5E4E] border-[#2E5E4E]/15"
                  }`}
                >
                  PayPal Express
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-3 pt-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Card Number</label>
                    <input
                      required
                      type="text"
                      placeholder="4532 •••• •••• 8892"
                      className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Expiry Date</label>
                      <input
                        required
                        type="text"
                        placeholder="08 / 28"
                        className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">CVC / CVV</label>
                      <input
                        required
                        type="text"
                        placeholder="314"
                        className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary & Complete Button */}
          <div className="space-y-6">
            <div className="rounded-[2.25rem] border border-[#2E5E4E]/10 bg-white p-6 sm:p-8 shadow-lg space-y-6">
              <h3 className="text-2xl font-bold text-[#2E5E4E] font-serif">Order Summary</h3>

              {/* Items List */}
              <div className="space-y-3 border-b border-[#2E5E4E]/10 pb-6">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-[#F6F1E9]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2E5E4E] line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-[#6e6258]">{item.size} • Qty: 1</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#2E5E4E]">${item.price}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 text-xs text-[#6e6258]">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-[#2E5E4E]">${subtotal}</span></div>
                <div className="flex justify-between">
                  <span>Shipping ({shippingMethod === "standard" ? "Standard" : "Express"})</span>
                  <span className="font-bold text-emerald-800">{shippingCost === 0 ? "FREE" : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2E5E4E] border-t border-[#2E5E4E]/10 pt-3">
                  <span>Grand Total</span>
                  <span className="text-xl font-extrabold text-[#2E5E4E]">${grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#2E5E4E] py-4 text-xs font-bold uppercase tracking-widest text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-[#C9A66B]" /> Place Order — ${grandTotal}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6e6258]">
                <ShieldCheck className="h-4 w-4 text-emerald-700" /> 30-Day Happiness Guarantee Included
              </div>
            </div>
          </div>
        </form>

        {/* Success Modal */}
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-200">
            <div className="max-w-md w-full rounded-[2.5rem] border border-[#C9A66B]/30 bg-[#FAF8F3] p-8 text-center shadow-2xl space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2E5E4E] text-[#C9A66B]">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A66B]">Order Confirmed</span>
              <h2 className="text-3xl font-bold text-[#2E5E4E] font-serif">Thank You for Your Order!</h2>
              <p className="text-xs text-[#1F332B]/80 leading-relaxed">
                Your order <span className="font-bold text-[#2E5E4E]">#YUVA-9842</span> has been placed successfully. A confirmation email with tracking details has been sent to your email.
              </p>

              <div className="rounded-2xl border border-[#2E5E4E]/10 bg-white p-4 text-left text-xs space-y-1">
                <p className="font-bold text-[#2E5E4E]">Order Summary:</p>
                <p className="text-[#6e6258]">2 Botanical Ritual Items • Total: ${grandTotal}</p>
                <p className="text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                  <Truck className="h-3.5 w-3.5" /> Estimated Delivery: 3 Days
                </p>
              </div>

              <Link
                href="/shop"
                onClick={() => setIsSuccess(false)}
                className="block w-full rounded-full bg-[#2E5E4E] py-3.5 text-xs font-bold uppercase tracking-widest text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition"
              >
                Continue Exploring
              </Link>
            </div>
          </div>
        )}
      </main>
    </PageShell>
  );
}
