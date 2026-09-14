"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { YuvaLogo } from "@/components/yuva-logo";
import { useCart } from "@/context/cart-context";
import { generateUpiQrSvg } from "@/lib/upi";
import { Order } from "@/types/order";
import {
  CheckCircle2,
  Lock,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Copy,
  Check,
  Smartphone,
  Banknote,
  Clock,
  ArrowRight,
  QrCode,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, finalTotal, rawSubtotal, discountAmount, shippingCost, couponCode, clearCart } =
    useCart();

  // Customer Shipping Details State
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // Payment Selection & UTR State
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi");
  const [utrNumber, setUtrNumber] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Order Submission Result State
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  const upiId = "yuvanaturals@upi";
  const upiRecipientName = "YUVA NATURALS";
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    upiRecipientName
  )}&am=${finalTotal.toFixed(2)}&tn=${encodeURIComponent(
    "Yuva Naturals Order"
  )}&cu=INR`;

  const qrSvgMarkup = generateUpiQrSvg(upiDeepLink);

  const handleCopyUpi = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate cart
    if (cart.length === 0) {
      setErrorMessage("Your shopping bag is empty. Please add items before checking out.");
      return;
    }

    // Validate UTR if UPI selected
    if (paymentMethod === "upi" && (!utrNumber || utrNumber.trim().length < 6)) {
      setErrorMessage("Please enter a valid 12-digit UPI UTR / Transaction Reference Number.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        customer: {
          fullName: customerName,
          email: customerEmail,
          phone: customerPhone,
          addressLine1,
          addressLine2,
          city,
          state,
          pincode,
        },
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        paymentMethod,
        couponCode: couponCode || undefined,
        utrNumber: paymentMethod === "upi" ? utrNumber.trim() : undefined,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success && data.order) {
        setSubmittedOrder(data.order);
        clearCart();
      } else {
        setErrorMessage(data.error || "Failed to submit order. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  // Order Tracker Steps
  const orderSteps = [
    { label: "Submitted", description: "Order Placed", done: true },
    {
      label: "Payment Verification",
      description: submittedOrder?.paymentMethod === "upi" ? "Verifying UTR" : "COD Auto-Verified",
      active: true,
    },
    { label: "Confirmed", description: "Order Verified", done: submittedOrder?.orderStatus === "Confirmed" },
    { label: "Processing", description: "Batch Handcrafting", done: false },
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
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3C2F] hover:text-[#C5A059] transition"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Shopping Bag
          </Link>
          <span className="text-xs text-[#7C907C] flex items-center gap-1 font-semibold">
            <Lock className="h-3.5 w-3.5 text-emerald-700" /> 256-Bit Encrypted Checkout
          </span>
        </div>

        {!submittedOrder ? (
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
                Simple &amp; transparent payments via UPI QR Code or Cash on Delivery across India.
              </p>
            </section>

            {errorMessage && (
              <div className="bg-red-50 border border-red-300 p-4 text-xs text-red-900 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-700 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Main Form & Summary Grid */}
            <form onSubmit={handleSubmitOrder} className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                {/* 1. Customer Information */}
                <div className="border border-[#E5DFD5] bg-white p-6 sm:p-8 space-y-4 shadow-xs">
                  <div className="flex items-center gap-3 border-b border-[#E5DFD5] pb-3">
                    <span className="flex h-6 w-6 items-center justify-center bg-[#1A3C2F] text-xs font-bold text-[#FAF7F2]">
                      1
                    </span>
                    <h2 className="text-lg font-bold text-[#1A3C2F] font-serif">Customer Information</h2>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">
                      Full Name *
                    </label>
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
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">
                        Email Address *
                      </label>
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
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">
                        Mobile Number *
                      </label>
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
                <div className="border border-[#E5DFD5] bg-white p-6 sm:p-8 space-y-4 shadow-xs">
                  <div className="flex items-center gap-3 border-b border-[#E5DFD5] pb-3">
                    <span className="flex h-6 w-6 items-center justify-center bg-[#1A3C2F] text-xs font-bold text-[#FAF7F2]">
                      2
                    </span>
                    <h2 className="text-lg font-bold text-[#1A3C2F] font-serif">Delivery Address in India</h2>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">
                      Flat / House / Street Address *
                    </label>
                    <input
                      required
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="Door No, Street Name, Colony"
                      className="mt-1.5 w-full border border-[#E5DFD5] bg-[#FAF7F2] px-4 py-2.5 text-xs outline-none focus:border-[#1A3C2F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">
                      Landmark / Area (Optional)
                    </label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="Near landmark or apartment name"
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
                <div className="border border-[#E5DFD5] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
                  <div className="flex items-center gap-3 border-b border-[#E5DFD5] pb-3">
                    <span className="flex h-6 w-6 items-center justify-center bg-[#1A3C2F] text-xs font-bold text-[#FAF7F2]">
                      3
                    </span>
                    <h2 className="text-lg font-bold text-[#1A3C2F] font-serif">Select Payment Option</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* UPI Payment Button */}
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
                          <span className="text-sm font-bold text-[#1A3C2F]">Pay via UPI QR</span>
                        </div>
                        <p className="mt-1 text-xs text-[#556B61]">
                          Google Pay, PhonePe, Paytm, BHIM, or any UPI app.
                        </p>
                      </div>
                    </button>

                    {/* Cash on Delivery Button */}
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

                  {/* UPI Details & Real QR Section */}
                  {paymentMethod === "upi" && (
                    <div className="border border-[#C5A059]/40 bg-[#FAF7F2] p-5 sm:p-6 space-y-6">
                      <div className="bg-white p-4 border border-[#E5DFD5] text-xs text-[#556B61] leading-relaxed">
                        <strong className="text-[#1A3C2F] flex items-center gap-1.5">
                          <HelpCircle className="h-4 w-4 text-[#C5A059]" /> How UPI Payment Works:
                        </strong>
                        <p className="mt-1">
                          UPI payments are verified after payment using your 12-digit UTR / transaction reference number.
                        </p>
                      </div>

                      {/* Mobile App Deep Link */}
                      <div className="block md:hidden space-y-2">
                        <p className="text-xs font-bold text-[#1A3C2F] uppercase tracking-wider">
                          Pay directly with installed UPI App:
                        </p>
                        <a
                          href={upiDeepLink}
                          className="flex items-center justify-center gap-2 w-full bg-[#1A3C2F] py-3 text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#122B22] transition"
                        >
                          <Smartphone className="h-4 w-4 text-[#C5A059]" /> Open App to Pay ₹{finalTotal}
                        </a>
                      </div>

                      {/* Real Vector QR Code & Official UPI ID */}
                      <div className="flex flex-col sm:flex-row items-center gap-6 border-t border-b border-[#E5DFD5] py-5">
                        {/* Real Vector SVG QR Code Container */}
                        <div className="flex flex-col items-center bg-white p-4 border border-[#E5DFD5] text-center shadow-xs">
                          <div
                            className="h-40 w-40 bg-white p-2 border border-[#C5A059]/40 flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: qrSvgMarkup }}
                          />
                          <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#1A3C2F]">
                            Scan QR Code to Pay ₹{finalTotal}
                          </span>
                        </div>

                        {/* Official VPA & Copy Button */}
                        <div className="flex-1 space-y-3 text-center sm:text-left">
                          <h3 className="text-sm font-bold text-[#1A3C2F] font-serif">
                            YUVA NATURALS Official VPA
                          </h3>
                          <p className="text-xs text-[#556B61] leading-relaxed">
                            Scan the QR code with Google Pay, PhonePe, Paytm, or BHIM, or transfer exact amount <strong className="text-[#1A3C2F]">₹{finalTotal}</strong> to our official UPI VPA below.
                          </p>

                          <div className="border border-[#E5DFD5] bg-white p-3 flex items-center justify-between gap-3">
                            <div>
                              <span className="text-[9px] font-bold uppercase text-[#C5A059] tracking-wider">
                                Official UPI ID:
                              </span>
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
                                  <Copy className="h-3.5 w-3.5" /> Copy ID
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* UTR Input Requirement */}
                      <div className="space-y-2 bg-white p-4 border border-[#C5A059]/40">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F]">
                          Enter 12-Digit UPI Transaction ID / UTR Number *
                        </label>
                        <p className="text-[11px] text-[#7C907C]">
                          Find the 12-digit UTR reference number in your payment confirmation screen or UPI app statement.
                        </p>
                        <input
                          required={paymentMethod === "upi"}
                          type="text"
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          placeholder="e.g. 987654321012"
                          className="w-full border border-[#E5DFD5] bg-[#FAF7F2] px-4 py-2.5 text-xs font-mono outline-none focus:border-[#1A3C2F]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#1A3C2F] py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#FAF7F2] hover:bg-[#122B22] transition flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          "Submitting Order..."
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-[#C5A059]" /> I&apos;VE PAID — SUBMIT UTR
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* COD Submission Button */}
                  {paymentMethod === "cod" && (
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#1A3C2F] py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#FAF7F2] hover:bg-[#122B22] transition flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          "Placing Order..."
                        ) : (
                          <>
                            <Banknote className="h-4 w-4 text-[#C5A059]" /> PLACE CASH ON DELIVERY ORDER (₹{finalTotal})
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="border border-[#1A3C2F] bg-[#1A3C2F] p-6 sm:p-8 text-[#FAF7F2] space-y-6 h-fit shadow-xl">
                <div>
                  <h2 className="text-xl font-bold font-serif border-b border-white/10 pb-4">
                    Order Summary
                  </h2>

                  {/* Product List */}
                  <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {cart.map(({ product, quantity }) => (
                      <div key={product.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 flex-shrink-0 bg-white border border-white/20">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-[#FAF7F2] line-clamp-1">{product.name}</p>
                            <p className="text-[10px] text-[#7C907C]">Qty: {quantity} | {product.size}</p>
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
                        <span>Promo Discount ({couponCode})</span>
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
                      <span>Grand Total</span>
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
          /* SUCCESS SCREEN VIEW */
          <div className="mx-auto max-w-3xl space-y-8 animate-in fade-in duration-300">
            <div className="border border-[#E5DFD5] bg-[#F3EDE4] p-8 text-center space-y-4 sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center bg-[#1A3C2F] text-[#C5A059] shadow-md">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <span className="inline-block border border-[#1A3C2F]/20 bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#C5A059]">
                Order Submitted
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A3C2F]">
                Thank You for Your Order
              </h1>
              <p className="text-xs sm:text-sm text-[#3E564A] max-w-lg mx-auto leading-relaxed">
                Your order has been recorded in our system. A confirmation notification has been dispatched to your email address.
              </p>
            </div>

            {/* Order Details & Status Tracker */}
            <div className="border border-[#E5DFD5] bg-white p-6 sm:p-10 space-y-6 shadow-xs">
              <div className="grid gap-4 sm:grid-cols-3 border-b border-[#E5DFD5] pb-6 text-center sm:text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                    Order Reference ID
                  </span>
                  <p className="text-base font-extrabold text-[#1A3C2F] font-mono mt-0.5">
                    {submittedOrder.orderId}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                    Payment Status
                  </span>
                  <p className="mt-0.5 text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 border border-amber-200 inline-block">
                    {submittedOrder.paymentStatus}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                    Estimated Delivery
                  </span>
                  <p className="text-xs font-bold text-[#1A3C2F] mt-0.5">3–5 Business Days</p>
                </div>
              </div>

              {/* Submitted Details Notice */}
              {submittedOrder.utrNumber && (
                <div className="bg-[#FAF7F2] p-4 border border-[#C5A059]/40 text-xs text-[#1A3C2F] space-y-1">
                  <p className="font-bold">Submitted UTR Reference Number:</p>
                  <p className="font-mono text-[#C5A059] font-bold">{submittedOrder.utrNumber}</p>
                </div>
              )}

              {/* Order Status Tracker */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A3C2F] font-serif">
                  Order Fulfillment Tracker
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
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
                  <strong className="text-[#1A3C2F]">Payment Verification Notice:</strong> For UPI payments, our admin team verifies submitted UTR numbers. Once verified, your status updates to <strong className="text-[#1A3C2F]">Confirmed</strong> and dispatch begins.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#E5DFD5]">
                <Link href="/shop" className="flex-1" onClick={() => setSubmittedOrder(null)}>
                  <button className="w-full bg-[#1A3C2F] py-3.5 text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#122B22] transition flex items-center justify-center gap-2">
                    Continue Shopping <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link href="/admin/orders" className="flex-1">
                  <button className="w-full bg-[#F3EDE4] border border-[#1A3C2F] py-3.5 text-xs font-bold uppercase tracking-wider text-[#1A3C2F] hover:bg-[#1A3C2F] hover:text-[#FAF7F2] transition flex items-center justify-center gap-2">
                    View in Admin Console
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
