"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Trash2,
  Tag,
  ShieldCheck,
  Check,
  ShoppingCart,
  MessageCircle,
  AlertCircle,
  User,
  Phone,
  MapPin,
  Hash,
  FileText,
  Info,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { useCart } from "@/context/cart-context";
import {
  buildCartWhatsAppMessage,
  openWhatsApp,
  type CustomerDetails,
} from "@/lib/whatsapp";

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

  // WhatsApp ordering state
  const [waName, setWaName] = useState("");
  const [waMobile, setWaMobile] = useState("");
  const [waAddress, setWaAddress] = useState("");
  const [waPincode, setWaPincode] = useState("");
  const [waNote, setWaNote] = useState("");
  const [waError, setWaError] = useState("");
  const [waFallback, setWaFallback] = useState(false);

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

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setWaError("");
    setWaFallback(false);

    if (cart.length === 0) {
      setWaError("Your cart is empty. Please add items before ordering.");
      return;
    }
    if (!waName.trim()) {
      setWaError("Please enter your name.");
      return;
    }
    if (!waMobile.trim() || !/^\+?[0-9\s\-]{7,15}$/.test(waMobile.trim())) {
      setWaError("Please enter a valid mobile number (7–15 digits).");
      return;
    }

    const customer: CustomerDetails = {
      name: waName.trim(),
      mobile: waMobile.trim(),
      address: waAddress.trim() || undefined,
      pincode: waPincode.trim() || undefined,
      deliveryNote: waNote.trim() || undefined,
    };

    try {
      const message = buildCartWhatsAppMessage(cart, rawSubtotal, customer);
      openWhatsApp(message);
      // Show fallback tip briefly so the user knows what to do if WA doesn't open
      setWaFallback(true);
    } catch {
      setWaError(
        "Could not open WhatsApp. Please ensure WhatsApp is installed or try on a device with WhatsApp."
      );
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
            Review your items, then place your order directly via WhatsApp.
          </p>
        </section>

        {cart.length === 0 ? (
          /* Empty Cart View */
          <div className="border border-[#E5DFD5] bg-white p-12 text-center text-[#1A3C2F] space-y-4 max-w-2xl mx-auto">
            <ShoppingCart className="h-12 w-12 text-[#C5A059] mx-auto opacity-70" />
            <h2 className="text-2xl font-serif font-bold">Your Cart is Currently Empty</h2>
            <p className="text-xs text-[#556B61] max-w-sm mx-auto leading-relaxed">
              Explore our handcrafted cold-processed soaps, hair cleansers, and traditional grain
              cookies.
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
            {/* ─── Left: Cart Items ─── */}
            <div className="border border-[#E5DFD5] bg-white p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4">
                <h2 className="text-xl font-bold text-[#1A3C2F] font-serif">
                  Shopping Bag ({cart.reduce((a, c) => a + c.quantity, 0)} Items)
                </h2>
                <Link href="/shop" className="text-xs font-semibold text-[#C5A059] hover:underline">
                  Continue Shopping
                </Link>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#E5DFD5] bg-[#FAF7F2] p-4"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="relative h-20 w-20 flex-shrink-0 bg-white border border-[#E5DFD5]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#C5A059]">
                          {product.category} &bull; {product.size || "125g"}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-[#1A3C2F] line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#7C907C] mt-0.5">₹{product.price} each</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E5DFD5]">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#1A3C2F]/20 bg-white px-2.5 py-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 font-bold text-[#1A3C2F] text-xs"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-[#1A3C2F]">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2 font-bold text-[#1A3C2F] text-xs"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#1A3C2F]">
                        ₹{product.price * quantity}
                      </span>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[#7C907C] hover:text-red-600 transition"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="border-t border-[#E5DFD5] pt-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">
                  Have a Promo or Gift Code?
                </p>
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
                      <Check className="h-4 w-4" /> Promo Code {couponCode} Applied! (15% Savings:
                      ₹{discountAmount})
                    </span>
                    <button onClick={removeCoupon} className="text-xs text-red-600 underline">
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-xs text-red-600 font-semibold">
                    Invalid promo code. Please try YUVA15.
                  </p>
                )}
              </div>
            </div>

            {/* ─── Right: Order Summary + WhatsApp Form ─── */}
            <div className="border border-[#1A3C2F] bg-[#1A3C2F] p-6 sm:p-8 text-[#FAF7F2] flex flex-col space-y-6 shadow-lg">

              {/* Order Totals */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold font-serif border-b border-white/10 pb-4">
                  Order Summary
                </h2>

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
                    <span>Estimated Total</span>
                    <span className="text-2xl font-extrabold text-[#C5A059]">₹{finalTotal}</span>
                  </div>
                </div>

                {/* How-it-works note */}
                <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 p-3 text-[11px] text-[#FAF7F2]/70 leading-relaxed">
                  <Info className="h-3.5 w-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>
                    We confirm orders via WhatsApp. Final shipping charges and payment details will
                    be shared by our team after you send the order.
                  </span>
                </div>
              </div>

              {/* WhatsApp Order Form — always visible as primary action */}
              <form
                onSubmit={handleWhatsAppOrder}
                className="space-y-4 border-t border-white/10 pt-6"
                noValidate
              >
                <div>
                  <p className="text-sm font-bold font-serif text-[#FAF7F2] mb-0.5">
                    Your Details
                  </p>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">
                    Name &amp; mobile are required
                  </p>
                </div>

                {/* Validation / fallback messages */}
                {waError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 bg-red-900/30 border border-red-400/40 p-3 text-xs text-red-300"
                  >
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                    {waError}
                  </div>
                )}

                {waFallback && !waError && (
                  <div
                    role="status"
                    className="flex items-start gap-2 bg-emerald-900/30 border border-emerald-400/30 p-3 text-xs text-emerald-300"
                  >
                    <MessageCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                    WhatsApp opened! Review your order message and tap{" "}
                    <strong className="text-white">Send</strong> to place the enquiry. If it did not
                    open, please ensure WhatsApp is installed on this device.
                  </div>
                )}

                {/* Name */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#C5A059]" />
                  <input
                    id="wa-name"
                    type="text"
                    required
                    value={waName}
                    onChange={(e) => setWaName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-9 pr-3 py-2.5 text-xs outline-none focus:border-[#25D366] transition"
                  />
                </div>

                {/* Mobile */}
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#C5A059]" />
                  <input
                    id="wa-mobile"
                    type="tel"
                    required
                    value={waMobile}
                    onChange={(e) => setWaMobile(e.target.value)}
                    placeholder="Mobile Number * (e.g. 9876543210)"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-9 pr-3 py-2.5 text-xs outline-none focus:border-[#25D366] transition"
                  />
                </div>

                {/* Delivery Address */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-3.5 w-3.5 text-[#C5A059]" />
                  <textarea
                    id="wa-address"
                    rows={2}
                    value={waAddress}
                    onChange={(e) => setWaAddress(e.target.value)}
                    placeholder="Full Delivery Address (optional)"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-9 pr-3 py-2.5 text-xs outline-none focus:border-[#25D366] resize-none transition"
                  />
                </div>

                {/* Pincode + Delivery Note side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[#C5A059]" />
                    <input
                      id="wa-pincode"
                      type="text"
                      value={waPincode}
                      onChange={(e) => setWaPincode(e.target.value)}
                      placeholder="Pincode (optional)"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-8 pr-3 py-2.5 text-xs outline-none focus:border-[#25D366] transition"
                    />
                  </div>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[#C5A059]" />
                    <input
                      id="wa-delivery-note"
                      type="text"
                      value={waNote}
                      onChange={(e) => setWaNote(e.target.value)}
                      placeholder="Delivery note (optional)"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-8 pr-3 py-2.5 text-xs outline-none focus:border-[#25D366] transition"
                    />
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  id="cart-order-via-whatsapp"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg transition-colors"
                  style={{ backgroundColor: "#25D366" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1DA851")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#25D366")
                  }
                >
                  <MessageCircle className="h-5 w-5" />
                  ORDER VIA WHATSAPP
                </button>

                <p className="text-[10px] text-white/40 text-center leading-relaxed">
                  WhatsApp will open with your full order. Review and tap{" "}
                  <strong className="text-white/60">Send</strong> — our team will confirm
                  availability, delivery charge &amp; payment details.
                </p>
              </form>

              {/* Trust badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#FAF7F2]/60 border-t border-white/10 pt-4">
                <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
                100% Handcrafted Botanical Guarantee
              </div>
            </div>
          </div>
        )}
      </main>
    </PageShell>
  );
}
