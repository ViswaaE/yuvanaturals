"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { YuvaLogo } from "@/components/yuva-logo";
import { useCart } from "@/context/cart-context";
import {
  CheckCircle2,
  Lock,
  ShieldCheck,
  Sparkles,
  Truck,
  ArrowLeft,
  Copy,
  Check,
  Smartphone,
  Banknote,
  Clock,
  ArrowRight,
  PackageCheck,
  QrCode,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, finalTotal, rawSubtotal, discountAmount, shippingCost, clearCart } = useCart();
  
  // Customer Details Form State
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const upiId = "yuvanaturals@upi";

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `YN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsSuccess(true);
    clearCart();
  };

  // UPI Deep link URL for mobile
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=Yuva%20Naturals&am=${finalTotal}&cu=INR&tn=Order%20${orderId || "YN-2026"}`;

  // Order Status Tracker Steps
  const orderSteps = [
    { label: "Submitted", description: "Order Received", done: true },
    { label: "Payment Verification", description: "Verifying UPI", active: true },
    { label: "Confirmed", description: "Payment Verified", done: false },
    { label: "Processing", description: "Handcrafting Batch", done: false },
    { label: "Packed", description: "Botanical Cured", done: false },
    { label: "Shipped", description: "In Transit", done: false },
    { label: "Delivered", description: "At Doorstep", done: false },
  ];

  return (
    <PageShell>
      <main className="pb-20 space-y-8 pt-4">
        {/* Navigation Back */}
        <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3C2F] hover:text-[#C5A059]"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Shopping Bag
          </Link>
          <span className="text-xs text-[#7C907C] flex items-center gap-1 font-semibold">
            <Lock className="h-3.5 w-3.5 text-emerald-700" /> 256-Bit Encrypted Secure Checkout
          </span>
        </div>

        {!isSuccess ? (
          <>
            {/* Header Banner */}
            <section className="bg-[#F3EDE4] border border-[#E5DFD5] p-6 sm:p-8 text-center space-y-3">
              <div className="flex justify-center">
                <YuvaLogo variant="hero" showTagline={true} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3C2F]">
                Complete Your Order
              </h1>
              <p className="text-xs text-[#556B61] max-w-lg mx-auto">
                Simple &amp; secure payment via UPI QR code or Cash on Delivery across India.
              </p>
            </section>

            {/* Main Form & Summary Grid */}
            <form onSubmit={handleCompletePayment} className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                {/* 1. Customer Information */}
                <div className="border border-[#E5DFD5] bg-white p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-3 border-b border-[#E5DFD5] pb-3">
                    <span className="flex h-6 w-6 items-center justify-center bg-[#1A3C2F] text-xs font-bold text-[#FAF7F2]">
                      1
                    </span>
                    <h2 className="text-lg font-bold text-[#1A3C2F] font-serif">Customer Details</h2>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ananya Patel"
                      className="mt-1.5 w-full border border-[#E5DFD5] bg-[#FAF7F2] px-4 py-2.5 text-xs outline-none focus:border-[#1A3C2F]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="ananya@example.com"
                        className="mt-1.5 w-full border border-[#E5DFD5] bg-[#FAF7F2] px-4 py-2.5 text-xs outline-none focus:border-[#1A3C2F]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Mobile Number *</label>
                      <input
                        required
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="mt-1.5 w-full border border-[#E5DFD5] bg-[#FAF7F2] px-4 py-2.5 text-xs outline-none focus:border-[#1A3C2F]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address */}
                <div className="border border-[#E5DFD5] bg-white p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-3 border-b border-[#E5DFD5] pb-3">
                    <span className="flex h-6 w-6 items-center justify-center bg-[#1A3C2F] text-xs font-bold text-[#FAF7F2]">
                      2
                    </span>
                    <h2 className="text-lg font-bold text-[#1A3C2F] font-serif">Delivery Address in India</h2>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Flat / House / Street Address *</label>
                    <input
                      required
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Door No, Street, Colony"
                      className="mt-1.5 w-full border border-[#E5DFD5] bg-[#FAF7F2] px-4 py-2.5 text-xs outline-none focus:border-[#1A3C2F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Near landmark"
                      className="mt-1.5 w-full border border-[#E5DFD5] bg-[#FAF7F2] px-4 py-2.5 text-xs outline-none focus:border-[#1A3C2F]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">City *</label>
                      <input
                        required
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="mt-1.5 w-full border border-[#E5DFD5] bg-[#FAF7F2] px-4 py-2.5 text-xs outline-none focus:border-[#1A3C2F]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">State *</label>
                      <input
                        required
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        className="mt-1.5 w-full border border-[#E5DFD5] bg-[#FAF7F2] px-4 py-2.5 text-xs outline-none focus:border-[#1A3C2F]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Pincode *</label>
                      <input
                        required
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="6-digit Pincode"
                        className="mt-1.5 w-full border border-[#E5DFD5] bg-[#FAF7F2] px-4 py-2.5 text-xs outline-none focus:border-[#1A3C2F]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method Selection */}
                <div className="border border-[#E5DFD5] bg-white p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-[#E5DFD5] pb-3">
                    <span className="flex h-6 w-6 items-center justify-center bg-[#1A3C2F] text-xs font-bold text-[#FAF7F2]">
                      3
                    </span>
                    <h2 className="text-lg font-bold text-[#1A3C2F] font-serif">Select Payment Option</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* UPI Payment */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`flex flex-col justify-between border p-4 text-left transition relative ${
                        paymentMethod === "upi"
                          ? "border-[#1A3C2F] bg-[#F3EDE4]"
                          : "border-[#E5DFD5] bg-white hover:bg-[#FAF7F2]"
                      }`}
                    >
                      <span className="absolute -top-2.5 right-3 bg-[#C5A059] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#1A3C2F]">
                        Recommended
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-[#1A3C2F]" />
                          <span className="text-sm font-bold text-[#1A3C2F]">Pay via UPI</span>
                        </div>
                        <p className="mt-1 text-xs text-[#556B61]">
                          Instant payment via Google Pay, PhonePe, Paytm, BHIM, or any UPI App.
                        </p>
                      </div>
                    </button>

                    {/* Cash on Delivery */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex flex-col justify-between border p-4 text-left transition ${
                        paymentMethod === "cod"
                          ? "border-[#1A3C2F] bg-[#F3EDE4]"
                          : "border-[#E5DFD5] bg-white hover:bg-[#FAF7F2]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Banknote className="h-5 w-5 text-[#1A3C2F]" />
                          <span className="text-sm font-bold text-[#1A3C2F]">Cash on Delivery</span>
                        </div>
                        <p className="mt-1 text-xs text-[#556B61]">
                          Pay cash upon delivery at your doorstep.
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* UPI Details & QR Container */}
                  {paymentMethod === "upi" && (
                    <div className="border border-[#C5A059]/40 bg-[#FAF7F2] p-5 sm:p-6 space-y-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">Accepted UPI Apps:</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {["Google Pay", "PhonePe", "Paytm", "BHIM UPI", "Any Bank UPI"].map((app) => (
                            <span
                              key={app}
                              className="border border-[#E5DFD5] bg-white px-3 py-1 text-[11px] font-bold text-[#1A3C2F]"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Deep Link */}
                      <div className="block md:hidden space-y-2">
                        <p className="text-xs font-bold text-[#1A3C2F] uppercase tracking-wider">Pay using UPI App on Mobile:</p>
                        <a
                          href={upiDeepLink}
                          className="flex items-center justify-center gap-2 w-full bg-[#1A3C2F] py-3 text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#122B22] transition"
                        >
                          <Smartphone className="h-4 w-4" /> Open UPI App to Pay ₹{finalTotal}
                        </a>
                      </div>

                      {/* QR Code & UPI ID Display */}
                      <div className="hidden md:flex flex-col sm:flex-row items-center gap-6 border-t border-[#E5DFD5] pt-5">
                        {/* SVG QR Code */}
                        <div className="flex flex-col items-center bg-white p-3.5 border border-[#E5DFD5] text-center">
                          <div className="h-36 w-36 bg-[#FAF7F2] flex flex-col items-center justify-center p-2 border border-[#C5A059]/30">
                            <svg viewBox="0 0 100 100" className="h-full w-full fill-[#1A3C2F]">
                              <rect x="0" y="0" width="30" height="30" rx="2" fill="#1A3C2F" />
                              <rect x="5" y="5" width="20" height="20" rx="1" fill="#FAF7F2" />
                              <rect x="10" y="10" width="10" height="10" fill="#C5A059" />

                              <rect x="70" y="0" width="30" height="30" rx="2" fill="#1A3C2F" />
                              <rect x="75" y="5" width="20" height="20" rx="1" fill="#FAF7F2" />
                              <rect x="80" y="10" width="10" height="10" fill="#1A3C2F" />

                              <rect x="0" y="70" width="30" height="30" rx="2" fill="#1A3C2F" />
                              <rect x="5" y="75" width="20" height="20" rx="1" fill="#FAF7F2" />
                              <rect x="10" y="80" width="10" height="10" fill="#1A3C2F" />

                              <rect x="40" y="10" width="20" height="10" fill="#1A3C2F" />
                              <rect x="35" y="35" width="30" height="30" fill="#1A3C2F" />
                              <rect x="70" y="45" width="20" height="20" fill="#C5A059" />
                              <rect x="45" y="75" width="20" height="20" fill="#1A3C2F" />
                            </svg>
                            <span className="mt-1 text-[8px] font-bold uppercase tracking-widest text-[#C5A059]">
                              YUVA NATURALS QR
                            </span>
                          </div>
                          <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#1A3C2F]">Scan QR with Any App</span>
                        </div>

                        {/* Official UPI ID */}
                        <div className="flex-1 space-y-3">
                          <h3 className="text-sm font-bold text-[#1A3C2F] font-serif">Scan QR or Copy Official UPI ID</h3>
                          <p className="text-xs text-[#556B61] leading-relaxed">
                            Scan the code above or copy our official VPA to transfer <strong className="text-[#1A3C2F]">₹{finalTotal}</strong> directly.
                          </p>

                          <div className="border border-[#E5DFD5] bg-white p-3 flex items-center justify-between gap-3">
                            <div>
                              <span className="text-[9px] font-bold uppercase text-[#C5A059] tracking-wider">Official UPI ID:</span>
                              <p className="text-xs font-mono font-bold text-[#1A3C2F]">{upiId}</p>
                            </div>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="bg-[#1A3C2F] px-3 py-1.5 text-xs font-bold text-[#FAF7F2] hover:bg-[#C5A059] hover:text-[#1A3C2F] transition flex items-center gap-1.5"
                            >
                              {copiedUpi ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-emerald-300" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" /> Copy UPI ID
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#1A3C2F] py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#FAF7F2] hover:bg-[#122B22] transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#C5A059]" /> SUBMIT UPI PAYMENT (₹{finalTotal})
                      </button>
                    </div>
                  )}

                  {/* COD Submission */}
                  {paymentMethod === "cod" && (
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#1A3C2F] py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#FAF7F2] hover:bg-[#122B22] transition flex items-center justify-center gap-2"
                      >
                        <Banknote className="h-4 w-4 text-[#C5A059]" /> PLACE CASH ON DELIVERY ORDER (₹{finalTotal})
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="border border-[#1A3C2F] bg-[#1A3C2F] p-6 sm:p-8 text-[#FAF7F2] space-y-6 h-fit shadow-xl">
                <div>
                  <h2 className="text-xl font-bold font-serif border-b border-white/10 pb-4">Order Summary</h2>

                  {/* Product List */}
                  <div className="mt-4 space-y-3">
                    {cart.map(({ product, quantity }) => (
                      <div key={product.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 flex-shrink-0 bg-white border border-white/20">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-[#FAF7F2] line-clamp-1">{product.name}</p>
                            <p className="text-[10px] text-[#7C907C]">Qty: {quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-[#C5A059]">₹{product.price * quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Breakdown */}
                  <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-[#FAF7F2]/80">
                    <div className="flex justify-between">
                      <span>Bag Subtotal</span>
                      <span className="font-bold text-[#FAF7F2]">₹{rawSubtotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-300">
                        <span>Promo Discount</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Delivery Charge</span>
                      <span className="font-bold text-emerald-300">
                        {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                      </span>
                    </div>

                    <div className="flex justify-between border-t border-white/10 pt-4 text-base font-bold text-[#FAF7F2]">
                      <span>Total Amount</span>
                      <span className="text-2xl font-extrabold text-[#C5A059]">₹{finalTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-[11px] text-[#FAF7F2]/70 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-[#C5A059]" /> Express Delivery in 3–5 Business Days
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#C5A059]" /> 100% Handcrafted Botanical Guarantee
                  </div>
                </div>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen View */
          <div className="mx-auto max-w-3xl space-y-8 animate-in fade-in duration-300">
            <div className="border border-[#E5DFD5] bg-[#F3EDE4] p-8 text-center space-y-4 sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center bg-[#1A3C2F] text-[#C5A059] shadow-md">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <span className="inline-block border border-[#1A3C2F]/20 bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#C5A059]">
                Order Submitted Successfully
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A3C2F]">
                Thank You for Your Order
              </h1>
              <p className="text-xs sm:text-sm text-[#3E564A] max-w-lg mx-auto leading-relaxed">
                Thank you for choosing YUVA NATURALS. Your order has been placed. Our team will verify your payment details and begin dispatching your handcrafted products.
              </p>
            </div>

            {/* Order Details & Tracker */}
            <div className="border border-[#E5DFD5] bg-white p-6 sm:p-10 space-y-6">
              <div className="grid gap-4 sm:grid-cols-3 border-b border-[#E5DFD5] pb-6 text-center sm:text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">Order Reference</span>
                  <p className="text-base font-extrabold text-[#1A3C2F] font-mono mt-0.5">{orderId}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">Payment Status</span>
                  <p className="mt-0.5 text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 border border-amber-200 inline-block">
                    {paymentMethod === "upi" ? "Pending Verification" : "Cash on Delivery"}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">Estimated Delivery</span>
                  <p className="text-xs font-bold text-[#1A3C2F] mt-0.5">3–5 Business Days</p>
                </div>
              </div>

              {/* Order Status Tracker */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A3C2F] font-serif">Order Status Tracker</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {orderSteps.map((step) => (
                    <div
                      key={step.label}
                      className={`flex flex-col items-center justify-between p-2.5 border text-center text-[10px] uppercase font-semibold ${
                        step.active
                          ? "bg-[#1A3C2F] text-[#FAF7F2] border-[#1A3C2F]"
                          : step.done
                          ? "bg-[#F3EDE4] text-[#1A3C2F] border-[#E5DFD5]"
                          : "bg-[#FAF7F2] text-[#7C907C] border-gray-200"
                      }`}
                    >
                      <span>{step.label}</span>
                      <span className="mt-0.5 text-[8px] opacity-80 lowercase">{step.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-4 border border-[#C5A059]/30 flex items-start gap-3 text-xs text-[#556B61] leading-relaxed">
                <Clock className="h-5 w-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A3C2F]">Verification Notice:</strong> For UPI payments, our team verifies transaction IDs within 1–2 hours. Your order status will automatically update to <strong className="text-[#1A3C2F]">Confirmed</strong> once verified.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#E5DFD5]">
                <Link href="/shop" className="flex-1" onClick={() => setIsSuccess(false)}>
                  <button className="w-full bg-[#1A3C2F] py-3.5 text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#122B22] transition flex items-center justify-center gap-2">
                    Continue Shopping <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </PageShell>
  );
}


      </main>
    </PageShell>
  );
}
