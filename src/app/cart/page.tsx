"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  Trash2,
  Tag,
  ShieldCheck,
  Check,
  ShoppingCart,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  User,
  Phone,
  MapPin,
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
  const [waFormOpen, setWaFormOpen] = useState(false);
  const [waName, setWaName] = useState("");
  const [waMobile, setWaMobile] = useState("");
  const [waAddress, setWaAddress] = useState("");
  const [waPincode, setWaPincode] = useState("");
  const [waNote, setWaNote] = useState("");
  const [waError, setWaError] = useState("");

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

    if (cart.length === 0) {
      setWaError("Your cart is empty. Please add items before ordering.");
      return;
    }
    if (!waName.trim()) {
      setWaError("Please enter your name.");
      return;
    }
    if (!waMobile.trim() || !/^\+?[0-9\s\-]{7,15}$/.test(waMobile.trim())) {
      setWaError("Please enter a valid mobile number.");
      return;
    }

    const customer: CustomerDetails = {
      name: waName.trim(),
      mobile: waMobile.trim(),
      address: waAddress.trim() || undefined,
      pincode: waPincode.trim() || undefined,
      deliveryNote: waNote.trim() || undefined,
    };

    const message = buildCartWhatsAppMessage(cart, rawSubtotal, customer);
    openWhatsApp(message);
  };

  const handleWaButtonClick = () => {
    if (cart.length === 0) {
      setWaError("Your cart is empty. Please add items before ordering.");
      return;
    }
    setWaError("");
    setWaFormOpen((prev) => !prev);
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
            {/* Left: Cart Items List */}
            <div className="border border-[#E5DFD5] bg-white p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4">
                <h2 className="text-xl font-bold text-[#1A3C2F] font-serif">
                  Shopping Bag ({cart.reduce((a, c) => a + c.quantity, 0)} Items)
                </h2>
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
                        <h3 className="text-xs sm:text-sm font-bold text-[#1A3C2F] line-clamp-1">
                          {product.name}
                        </h3>
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

                      <span className="text-sm font-bold text-[#1A3C2F]">
                        ₹{product.price * quantity}
                      </span>

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

            {/* Right: Summary Box */}
            <div className="border border-[#1A3C2F] bg-[#1A3C2F] p-6 sm:p-8 text-[#FAF7F2] flex flex-col justify-between space-y-6 shadow-lg">
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
                    <span>Total Payable</span>
                    <span className="text-2xl font-extrabold text-[#C5A059]">₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <Link
                  id="cart-proceed-to-checkout"
                  href="/checkout"
                  className="w-full bg-[#C5A059] py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#1A3C2F] hover:bg-white transition shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" /> PROCEED TO CHECKOUT &rarr;
                </Link>

                {/* Divider */}
                <div className="flex items-center gap-3 text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                  <span className="flex-1 border-t border-white/10" />
                  or order via WhatsApp
                  <span className="flex-1 border-t border-white/10" />
                </div>

                {/* WhatsApp Order Button */}
                <button
                  id="cart-order-via-whatsapp"
                  type="button"
                  onClick={handleWaButtonClick}
                  className="w-full flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition shadow-md"
                  style={{ backgroundColor: "#25D366" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1DA851")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#25D366")
                  }
                >
                  <MessageCircle className="h-4 w-4" />
                  ORDER VIA WHATSAPP
                  {waFormOpen ? (
                    <ChevronUp className="h-3.5 w-3.5 ml-1 opacity-70" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-70" />
                  )}
                </button>

                {/* Empty-cart inline error (shown even when form is closed) */}
                {waError && !waFormOpen && (
                  <div className="flex items-center gap-2 bg-red-900/30 border border-red-400/40 p-3 text-xs text-red-300 rounded-sm">
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    {waError}
                  </div>
                )}

                {/* Collapsible customer details form */}
                {waFormOpen && (
                  <form
                    onSubmit={handleWhatsAppOrder}
                    className="space-y-3 border border-white/10 bg-white/5 p-4 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                      Your Details (required*)
                    </p>

                    {waError && (
                      <div className="flex items-center gap-2 bg-red-900/30 border border-red-400/40 p-2.5 text-xs text-red-300">
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        {waError}
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
                        placeholder="Your Name *"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-9 pr-3 py-2.5 text-xs outline-none focus:border-[#25D366]"
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
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-9 pr-3 py-2.5 text-xs outline-none focus:border-[#25D366]"
                      />
                    </div>

                    {/* Address */}
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-3.5 w-3.5 text-[#C5A059]" />
                      <textarea
                        id="wa-address"
                        rows={2}
                        value={waAddress}
                        onChange={(e) => setWaAddress(e.target.value)}
                        placeholder="Delivery Address (optional)"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-9 pr-3 py-2.5 text-xs outline-none focus:border-[#25D366] resize-none"
                      />
                    </div>

                    {/* Pincode + Note — side by side on wide screens */}
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        id="wa-pincode"
                        type="text"
                        value={waPincode}
                        onChange={(e) => setWaPincode(e.target.value)}
                        placeholder="Pincode (optional)"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-3 py-2.5 text-xs outline-none focus:border-[#25D366]"
                      />
                      <input
                        id="wa-delivery-note"
                        type="text"
                        value={waNote}
                        onChange={(e) => setWaNote(e.target.value)}
                        placeholder="Delivery note (optional)"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-3 py-2.5 text-xs outline-none focus:border-[#25D366]"
                      />
                    </div>

                    <button
                      id="cart-whatsapp-send"
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition"
                      style={{ backgroundColor: "#25D366" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1DA851")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#25D366")
                      }
                    >
                      <MessageCircle className="h-4 w-4" /> OPEN WHATSAPP TO SEND ORDER
                    </button>

                    <p className="text-[10px] text-white/40 text-center leading-relaxed">
                      WhatsApp will open with your order. Review the message and tap{" "}
                      <strong className="text-white/60">Send</strong> to submit your enquiry.
                    </p>
                  </form>
                )}

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#FAF7F2]/70">
                  <ShieldCheck className="h-4 w-4 text-[#C5A059]" /> 100% Secure Checkout &amp;
                  Botanical Guarantee
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </PageShell>
  );
}
