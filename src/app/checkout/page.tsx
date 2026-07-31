"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/constants/products";
import { YuvaLogo } from "@/components/yuva-logo";
import {
  CheckCircle2,
  Lock,
  ShieldCheck,
  Sparkles,
  Truck,
  ArrowLeft,
  QrCode,
  Copy,
  Check,
  Smartphone,
  Banknote,
  Clock,
  ArrowRight,
  PackageCheck,
} from "lucide-react";

export default function CheckoutPage() {
  const checkoutItems = [products[0], products[5]]; // Goat Milk Bath Bar (₹180) + Red Wine Bath Bar (₹200)
  const subtotal = checkoutItems.reduce((acc, item) => acc + item.price, 0);
  
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const shippingCost = subtotal >= 500 ? 0 : (shippingMethod === "express" ? 120 : 50);
  const discountAmount = 50; // Promo savings
  const grandTotal = Math.max(0, subtotal + shippingCost - discountAmount);

  // Form State
  const [customerName, setCustomerName] = useState("Priya Sharma");
  const [customerEmail, setCustomerEmail] = useState("priya.sharma@example.com");
  const [customerPhone, setCustomerPhone] = useState("+91 98765 43210");

  const [address, setAddress] = useState("42 Lotus Colony, Green Park Road");
  const [landmark, setLandmark] = useState("Near Natural Gardens");
  const [city, setCity] = useState("Bengaluru");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("560034");

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("YN-2026-000125");

  const upiId = "yuvanaturals@upi";

  // UPI Deep link URL for mobile
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=Yuva%20Naturals&am=${grandTotal}&cu=INR&tn=Order%20${orderId}%20Yuva%20Naturals`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  // Order Lifecycle Steps
  const orderSteps = [
    { label: "Pending", description: "Order Received", done: true },
    { label: "Payment Verification", description: "Verifying UPI", active: true },
    { label: "Confirmed", description: "Payment Verified", done: false },
    { label: "Processing", description: "Handcrafting Batch", done: false },
    { label: "Packed", description: "Cedar Box Cured", done: false },
    { label: "Shipped", description: "In Transit", done: false },
    { label: "Delivered", description: "At Doorstep", done: false },
  ];

  return (
    <PageShell>
      <main className="pb-16 space-y-8">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9d6d4f] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Ritual Bag
          </Link>
          <span className="text-xs text-[#6e6258] flex items-center gap-1 font-semibold">
            <Lock className="h-3.5 w-3.5 text-emerald-700" /> 256-Bit Encrypted Secure Checkout
          </span>
        </div>

        {!isSuccess ? (
          <>
            {/* Header Banner */}
            <section className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 text-center">
              <div className="mb-4 flex justify-center">
                <YuvaLogo variant="hero" showTagline={true} />
              </div>
              <SectionHeading
                eyebrow="Direct Artisan Checkout"
                title="Complete Your Botanical Ritual Order"
                description="Instant UPI QR Code payment & Cash on Delivery for handcrafted delivery across India."
              />
            </section>

            {/* Checkout Main Form & Summary Grid */}
            <form onSubmit={handleCompletePayment} className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              {/* Form Columns */}
              <div className="space-y-6">
                {/* 1. Customer Information */}
                <div className="rounded-[2.25rem] border border-[#2E5E4E]/10 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 border-b border-[#2E5E4E]/10 pb-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5E4E] text-xs font-bold text-[#FAF8F3]">
                      1
                    </span>
                    <h2 className="text-xl font-bold text-[#2E5E4E] font-serif">Customer Information</h2>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Full Name</label>
                    <input
                      required
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ananya Patel"
                      className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Email Address</label>
                      <input
                        required
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="ananya@example.com"
                        className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Phone Number (WhatsApp)</label>
                      <input
                        required
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address */}
                <div className="rounded-[2.25rem] border border-[#2E5E4E]/10 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 border-b border-[#2E5E4E]/10 pb-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5E4E] text-xs font-bold text-[#FAF8F3]">
                      2
                    </span>
                    <h2 className="text-xl font-bold text-[#2E5E4E] font-serif">Delivery Address in India</h2>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Flat / House / Street Address</label>
                    <input
                      required
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Door No, Street Name"
                      className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Area / Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Near landmark"
                      className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">City</label>
                      <input
                        required
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">State</label>
                      <input
                        required
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Pincode</label>
                      <input
                        required
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="6-digit Pincode"
                        className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="rounded-[2.25rem] border border-[#2E5E4E]/10 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-[#2E5E4E]/10 pb-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5E4E] text-xs font-bold text-[#FAF8F3]">
                      3
                    </span>
                    <h2 className="text-xl font-bold text-[#2E5E4E] font-serif">Payment Method</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Option 1: UPI Payment (Recommended) */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition relative ${
                        paymentMethod === "upi"
                          ? "border-[#2E5E4E] bg-[#F6F1E9] ring-2 ring-[#2E5E4E]/20"
                          : "border-[#2E5E4E]/15 bg-white hover:bg-[#FAF8F3]"
                      }`}
                    >
                      <span className="absolute -top-3 right-4 rounded-full bg-[#C9A66B] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2E5E4E]">
                        Recommended
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-[#2E5E4E]" />
                          <span className="text-sm font-bold text-[#2E5E4E]">UPI Payment</span>
                        </div>
                        <p className="mt-2 text-xs text-[#1F332B]/80 leading-relaxed">
                          Pay instantly using any UPI application (Google Pay, PhonePe, Paytm, BHIM UPI).
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#C9A66B] uppercase tracking-wider">
                        • Instant Deep Link / QR Code
                      </div>
                    </button>

                    {/* Option 2: Cash on Delivery (COD) */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition ${
                        paymentMethod === "cod"
                          ? "border-[#2E5E4E] bg-[#F6F1E9] ring-2 ring-[#2E5E4E]/20"
                          : "border-[#2E5E4E]/15 bg-white hover:bg-[#FAF8F3]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Banknote className="h-5 w-5 text-[#2E5E4E]" />
                          <span className="text-sm font-bold text-[#2E5E4E]">Cash on Delivery (COD)</span>
                        </div>
                        <p className="mt-2 text-xs text-[#1F332B]/80 leading-relaxed">
                          Pay when your order is delivered. Suitable for customers who prefer offline payment.
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#2E5E4E]/70 uppercase tracking-wider">
                        • Offline Delivery Payment
                      </div>
                    </button>
                  </div>

                  {/* UPI Dynamic Payment Details Container */}
                  {paymentMethod === "upi" && (
                    <div className="mt-6 rounded-2xl border border-[#C9A66B]/30 bg-[#FAF8F3] p-6 space-y-6 animate-in fade-in duration-300">
                      {/* Supported UPI Apps Row */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Supported UPI Applications:</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {["Google Pay", "PhonePe", "Paytm", "BHIM UPI", "Any UPI App"].map((app) => (
                            <span
                              key={app}
                              className="rounded-full border border-[#2E5E4E]/15 bg-white px-3.5 py-1 text-xs font-bold text-[#2E5E4E] shadow-sm flex items-center gap-1.5"
                            >
                              <span className="h-2 w-2 rounded-full bg-[#C9A66B]"></span> {app}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Experience: Deep Links */}
                      <div className="block md:hidden space-y-3">
                        <p className="text-xs font-bold text-[#2E5E4E] uppercase tracking-wider">Tap to Pay via Mobile UPI App:</p>
                        <a
                          href={upiDeepLink}
                          className="flex items-center justify-center gap-2 w-full rounded-full bg-[#2E5E4E] py-3.5 text-xs font-bold uppercase tracking-widest text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition shadow-md"
                        >
                          <Smartphone className="h-4 w-4" /> Pay with UPI App (₹{grandTotal})
                        </a>
                      </div>

                      {/* Desktop Experience: QR Code & Copy UPI ID */}
                      <div className="hidden md:flex flex-col sm:flex-row items-center gap-6 border-t border-[#2E5E4E]/10 pt-6">
                        {/* Premium QR Code Display */}
                        <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-[#2E5E4E]/15 shadow-md text-center">
                          <div className="relative h-44 w-44 bg-[#FAF8F3] rounded-xl flex flex-col items-center justify-center p-3 border border-[#C9A66B]/30">
                            {/* Stylized QR Code SVG Representation */}
                            <svg viewBox="0 0 100 100" className="h-full w-full fill-[#2E5E4E]">
                              <rect x="0" y="0" width="30" height="30" rx="4" fill="#2E5E4E" />
                              <rect x="5" y="5" width="20" height="20" rx="2" fill="#FAF8F3" />
                              <rect x="10" y="10" width="10" height="10" fill="#C9A66B" />

                              <rect x="70" y="0" width="30" height="30" rx="4" fill="#2E5E4E" />
                              <rect x="75" y="5" width="20" height="20" rx="2" fill="#FAF8F3" />
                              <rect x="80" y="10" width="10" height="10" fill="#2E5E4E" />

                              <rect x="0" y="70" width="30" height="30" rx="4" fill="#2E5E4E" />
                              <rect x="5" y="75" width="20" height="20" rx="2" fill="#FAF8F3" />
                              <rect x="10" y="80" width="10" height="10" fill="#2E5E4E" />

                              <rect x="40" y="10" width="20" height="10" fill="#2E5E4E" />
                              <rect x="35" y="35" width="30" height="30" fill="#2E5E4E" />
                              <rect x="70" y="45" width="20" height="20" fill="#C9A66B" />
                              <rect x="45" y="75" width="20" height="20" fill="#2E5E4E" />
                              <rect x="75" y="75" width="15" height="15" fill="#C9A66B" />
                            </svg>
                            <span className="mt-1 text-[9px] font-extrabold uppercase tracking-widest text-[#C9A66B]">
                              YUVA NATURALS UPI
                            </span>
                          </div>
                          <span className="mt-2 text-[11px] font-bold text-[#2E5E4E]">Scan to Pay</span>
                        </div>

                        {/* UPI Instructions & Copy UPI ID */}
                        <div className="flex-1 space-y-3">
                          <h3 className="text-base font-bold text-[#2E5E4E] font-serif">Scan to Pay with Any UPI App</h3>
                          <p className="text-xs text-[#1F332B]/80 leading-relaxed">
                            Scan the QR code using Google Pay, PhonePe, Paytm, or any UPI app to send <strong className="text-[#2E5E4E]">₹{grandTotal}</strong> directly to our bank account.
                          </p>

                          <div className="rounded-xl border border-[#2E5E4E]/15 bg-white p-3 flex items-center justify-between gap-3">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A66B]">Official UPI ID:</span>
                              <p className="text-xs font-mono font-bold text-[#2E5E4E]">{upiId}</p>
                            </div>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="rounded-full bg-[#2E5E4E] px-3.5 py-1.5 text-xs font-bold text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition flex items-center gap-1.5 whitespace-nowrap"
                            >
                              {copiedUpi ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-emerald-300" /> Copied!
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

                      {/* Complete Payment Trigger */}
                      <div className="border-t border-[#2E5E4E]/10 pt-4 text-center">
                        <button
                          type="submit"
                          className="w-full rounded-full bg-[#2E5E4E] py-4 text-xs font-bold uppercase tracking-widest text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition shadow-lg flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[#C9A66B]" /> I Have Completed the Payment (₹{grandTotal})
                        </button>
                      </div>
                    </div>
                  )}

                  {/* COD Payment Button Trigger */}
                  {paymentMethod === "cod" && (
                    <div className="mt-4 border-t border-[#2E5E4E]/10 pt-4">
                      <button
                        type="submit"
                        className="w-full rounded-full bg-[#2E5E4E] py-4 text-xs font-bold uppercase tracking-widest text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition shadow-lg flex items-center justify-center gap-2"
                      >
                        <Banknote className="h-4 w-4 text-[#C9A66B]" /> Confirm Cash on Delivery Order — ₹{grandTotal}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#2E5E4E] p-6 sm:p-8 text-[#FAF8F3] shadow-xl flex flex-col justify-between h-fit space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-serif border-b border-white/10 pb-4">Order Summary</h2>

                  {/* Products List */}
                  <div className="mt-4 space-y-3">
                    {checkoutItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-white">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-[#FAF8F3] line-clamp-1">{item.name}</p>
                            <p className="text-[10px] text-[#7A9474]">Qty: 1 • {item.size}</p>
                          </div>
                        </div>
                        <span className="font-bold text-[#C9A66B]">₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-xs text-[#FAF8F3]/80">
                    <div className="flex justify-between">
                      <span>Bag Subtotal</span>
                      <span className="font-bold text-[#FAF8F3]">₹{subtotal}</span>
                    </div>

                    <div className="flex justify-between text-emerald-300">
                      <span>Promo Discount (YUVA15)</span>
                      <span>-₹{discountAmount}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery Charge</span>
                      <span className="font-bold text-emerald-300">
                        {shippingCost === 0 ? "FREE (Orders > ₹500)" : `₹${shippingCost}`}
                      </span>
                    </div>

                    <div className="flex justify-between border-t border-white/10 pt-4 text-lg font-bold text-[#FAF8F3]">
                      <span>Total Amount Payable</span>
                      <span className="text-2xl font-extrabold text-[#C9A66B]">₹{grandTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-[11px] text-[#FAF8F3]/70">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-[#C9A66B]" /> Express Delivery in 3–5 Business Days
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#C9A66B]" /> 100% Handcrafted Organic Guarantee
                  </div>
                </div>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="mx-auto max-w-3xl space-y-8 animate-in fade-in duration-300">
            {/* Thank You Header Card */}
            <div className="rounded-[2.5rem] border border-[#C9A66B]/30 bg-[#F6F1E9] p-8 text-center shadow-xl space-y-4 sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2E5E4E] text-[#C9A66B] shadow-lg">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2E5E4E]/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A66B]">
                <Sparkles className="h-3.5 w-3.5" /> Order Placed Successfully
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#2E5E4E] font-serif">
                Thank You for Your Order
              </h1>
              <p className="text-xs sm:text-sm text-[#1F332B]/80 max-w-xl mx-auto leading-relaxed">
                Thank you for choosing Yuva Naturals. Your order has been received successfully. Our team will verify your payment and begin processing your handcrafted products shortly.
              </p>
            </div>

            {/* Order Details & Verification Status */}
            <div className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-white p-6 sm:p-10 shadow-md space-y-6">
              <div className="grid gap-4 sm:grid-cols-3 border-b border-[#2E5E4E]/10 pb-6 text-center sm:text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A66B]">Order Number</span>
                  <p className="text-base font-extrabold text-[#2E5E4E] font-mono mt-0.5">{orderId}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A66B]">Payment Status</span>
                  <p className="mt-0.5 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block">
                    {paymentMethod === "upi" ? "Pending Verification" : "Cash on Delivery"}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A66B]">Estimated Delivery</span>
                  <p className="text-xs font-bold text-[#2E5E4E] mt-0.5">3–5 Business Days</p>
                </div>
              </div>

              {/* Order Status Lifecycle Tracker */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#2E5E4E] font-serif">Order Status Tracker</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {orderSteps.map((step) => (
                    <div
                      key={step.label}
                      className={`flex flex-col items-center justify-between p-3 rounded-2xl border text-center transition ${
                        step.active
                          ? "bg-[#2E5E4E] text-[#FAF8F3] border-[#2E5E4E] ring-2 ring-[#C9A66B]/50"
                          : step.done
                          ? "bg-[#F6F1E9] text-[#2E5E4E] border-[#2E5E4E]/20"
                          : "bg-[#FAF8F3] text-[#1F332B]/40 border-gray-200"
                      }`}
                    >
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">{step.label}</span>
                      <span className="mt-1 text-[9px] opacity-80">{step.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Note Box */}
              <div className="rounded-2xl bg-[#FAF8F3] p-4 border border-[#C9A66B]/30 flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#C9A66B] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[#1F332B]/80 leading-relaxed">
                  <strong className="text-[#2E5E4E]">Payment Verification Notice:</strong> For UPI payments, our finance team verifies transactions within 1–2 hours. Your order status will automatically update to <strong className="text-[#2E5E4E]">Confirmed</strong> once verified.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#2E5E4E]/10">
                <Link href="/shop" className="flex-1" onClick={() => setIsSuccess(false)}>
                  <button className="w-full rounded-full bg-[#2E5E4E] py-4 text-xs font-bold uppercase tracking-widest text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition shadow-md flex items-center justify-center gap-2">
                    Continue Shopping <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link href="/shop" className="flex-1" onClick={() => setIsSuccess(false)}>
                  <button className="w-full rounded-full border border-[#2E5E4E]/20 bg-white py-4 text-xs font-bold uppercase tracking-widest text-[#2E5E4E] hover:bg-[#F6F1E9] transition flex items-center justify-center gap-2">
                    <PackageCheck className="h-4 w-4" /> View My Orders
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
