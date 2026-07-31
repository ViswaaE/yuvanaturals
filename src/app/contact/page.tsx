"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { Mail, MapPin, Phone, MessageSquare, CheckCircle, ChevronDown, Sparkles } from "lucide-react";
import { YuvaLogo } from "@/components/yuva-logo";

const FAQ_ITEMS = [
  {
    q: "Are YUVA Naturals bath bars suitable for sensitive skin?",
    a: "Yes! All our bath bars are cold-processed with fresh goat milk and soothing oils like almond, olive, and shea butter. They maintain skin lipids and natural glycerine, making them ideal for sensitive, dry, or eczema-prone skin.",
  },
  {
    q: "How long does a single handmade bath bar last?",
    a: "A 125g bar typically lasts 3 to 4 weeks of daily full-body use when stored on a well-draining wooden soap tray between showers.",
  },
  {
    q: "Do you use synthetic fragrances or artificial colorants?",
    a: "Never. We use only 100% pure steam-distilled essential oils, natural clays, herbal powders (like Manjishtha, Wild Turmeric, Kuppaimeni), and botanicals.",
  },
  {
    q: "What is your shipping & return policy?",
    a: "We offer complimentary express shipping on all orders over ₹500. If you are unsatisfied with your ritual within 30 days, we provide hassle-free exchanges or full refunds.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <PageShell>
      <main className="space-y-16 pb-16">
        {/* Banner */}
        <section className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-12 lg:p-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex justify-center">
              <YuvaLogo variant="hero" showTagline={true} />
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2E5E4E]/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A66B]">
              <Sparkles className="h-3.5 w-3.5" /> Client Concierge
            </span>
            <h1 className="mt-4 text-4xl font-bold text-[#2E5E4E] sm:text-5xl font-serif">
              Contact Apothecary
            </h1>
            <p className="mt-4 text-base text-[#1F332B]/80 leading-relaxed">
              Have a question about our botanical formulas, wholesale inquiries, or personalized skincare advice? We are here to assist you.
            </p>
          </div>
        </section>

        {/* Contact Form & Store Info Grid */}
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <div className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-white p-8 shadow-xl sm:p-10">
            <h2 className="text-2xl font-bold text-[#2E5E4E] font-serif">Send Us a Message</h2>
            <p className="mt-2 text-xs text-[#1F332B]/70">Our concierge team typically responds within 24 hours.</p>

            {submitted ? (
              <div className="mt-8 rounded-2xl bg-emerald-50 p-6 text-center border border-emerald-200 animate-in fade-in duration-300">
                <CheckCircle className="mx-auto h-10 w-10 text-emerald-600" />
                <h3 className="mt-3 text-lg font-bold text-emerald-900">Thank You for Reaching Out!</h3>
                <p className="mt-1 text-xs text-emerald-700">Your message has been sent to our apothecary team. We will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">First Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Jane"
                      className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Last Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Doe"
                      className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="jane@example.com"
                    className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Subject</label>
                  <select className="mt-1.5 w-full rounded-full border border-[#2E5E4E]/15 bg-[#FAF8F3] px-4 py-3 text-xs outline-none focus:border-[#C9A66B]">
                    <option>Product Recommendation</option>
                    <option>Order Status Inquiry</option>
                    <option>Wholesale & Gifting</option>
                    <option>Press & Media</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2E5E4E]">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us how we can help your skin ritual..."
                    className="mt-1.5 w-full rounded-2xl border border-[#2E5E4E]/15 bg-[#FAF8F3] p-4 text-xs outline-none focus:border-[#C9A66B]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#2E5E4E] py-4 text-xs font-bold uppercase tracking-widest text-[#FAF8F3] hover:bg-[#C9A66B] hover:text-[#2E5E4E] transition shadow-lg"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Store Info */}
          <div className="flex flex-col justify-between rounded-[2.5rem] border border-[#2E5E4E]/10 bg-[#2E5E4E] p-8 text-[#FAF8F3] shadow-xl sm:p-10">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9A66B] font-bold">Studio Headquarters</span>
              <h2 className="mt-2 text-3xl font-bold font-serif">Visit Our Apothecary</h2>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#C9A66B]/20 p-3 text-[#C9A66B]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FAF8F3]">Address</h4>
                    <p className="mt-1 text-xs text-[#FAF8F3]/80 leading-relaxed">
                      YUVA Naturals Botanical Lab<br />
                      74 Botanical Gardens Way, Suite 400<br />
                      California, CA 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#C9A66B]/20 p-3 text-[#C9A66B]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FAF8F3]">Direct Email</h4>
                    <p className="mt-1 text-xs text-[#FAF8F3]/80">concierge@yuvanaturals.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#C9A66B]/20 p-3 text-[#C9A66B]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FAF8F3]">Phone Concierge</h4>
                    <p className="mt-1 text-xs text-[#FAF8F3]/80">+1 (800) 555-YUVA (9882)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#C9A66B]/20 p-3 text-[#C9A66B]">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FAF8F3]">WhatsApp Live Chat</h4>
                    <p className="mt-1 text-xs text-[#FAF8F3]/80">Mon – Fri: 9:00 AM – 6:00 PM PST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-widest text-[#C9A66B] font-bold">Follow Us</p>
              <div className="mt-3 flex gap-4 text-xs">
                <a href="#" className="hover:text-[#C9A66B] transition">@yuvanaturals</a>
                <span>•</span>
                <a href="#" className="hover:text-[#C9A66B] transition">Pinterest</a>
                <span>•</span>
                <a href="#" className="hover:text-[#C9A66B] transition">YouTube Studio</a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Preview Section */}
        <section className="rounded-[2.5rem] border border-[#2E5E4E]/10 bg-white p-8 sm:p-12 lg:p-14">
          <SectionHeading
            eyebrow="FAQ Preview"
            title="Frequently Asked Questions"
            description="Quick answers regarding our cold-processed bath bars, ingredients, and shipping."
          />

          <div className="mt-8 space-y-4 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-[#2E5E4E]/10 bg-[#FAF8F3] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-bold text-sm text-[#2E5E4E]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-[#C9A66B] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#1F332B]/80 leading-relaxed border-t border-[#2E5E4E]/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
