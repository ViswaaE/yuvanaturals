"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";

const ALL_FAQS = [
  {
    category: "Product & Ingredients",
    items: [
      {
        q: "Are YUVA Naturals bath bars suitable for sensitive or eczema-prone skin?",
        a: "Yes, absolutely. Our bath bars are cold-processed over 6 weeks using farm-fresh goat milk, unrefined shea butter, and cold-pressed plant oils. They retain 100% natural glycerine, preserving the skin's protective moisture barrier without tightness or irritation.",
      },
      {
        q: "Do you use artificial fragrances, parabens, or synthetic sulfates?",
        a: "Never. We formulate strictly without synthetic fragrances, parabens, phthalates, SLS, or artificial dyes. All aromas come from 100% steam-distilled organic essential oils, and all colors derive from natural clays and wild herbs.",
      },
      {
        q: "What makes Goat Milk bath bars different from regular water-based soaps?",
        a: "Goat milk has a pH level remarkably close to human skin, making it immensely soothing. It is naturally rich in lactic acid (a gentle alpha-hydroxy acid) that micro-exfoliates dead cells while nourishing skin with vitamins A, B6, B12, and E.",
      },
    ],
  },
  {
    category: "Usage & Care",
    items: [
      {
        q: "How should I store my handmade bath bar to ensure it lasts long?",
        a: "To maximize the life of your cold-processed bar, keep it on a well-draining wooden or ceramic soap dish away from direct shower spray between uses. Allowing the bar to air-dry keeps it hard and dense for 4 to 6 weeks.",
      },
      {
        q: "How do I apply the Flora Lumin Elixir Serum?",
        a: "Warm 3 to 4 drops between clean palms and gently press onto damp face, neck, and décolletage after cleansing with our bath bars. Use daily morning and evening before applying moisturizer or makeup.",
      },
    ],
  },
  {
    category: "Orders, Shipping & Returns",
    items: [
      {
        q: "How long does shipping take and do you offer complimentary delivery?",
        a: "We offer complimentary standard shipping on all orders over $50. Standard delivery takes 3 to 5 business days. Express shipping (1 to 2 business days) is available at checkout for $12.",
      },
      {
        q: "What is your return & satisfaction guarantee policy?",
        a: "We offer a 30-Day Happiness Guarantee. If you are unsatisfied with your ritual, contact our concierge within 30 days for a full refund or exchange.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>("0-0");

  const toggleFaq = (key: string) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <PageShell>
      <main className="space-y-12 pb-16">
        <section className="rounded-[2.5rem] border border-[#C9A66B]/20 bg-[#F6F1E9] p-8 shadow-[0_30px_90px_rgba(46,94,78,0.06)] sm:p-10 lg:p-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2E5E4E]/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A66B]">
            <HelpCircle className="h-3.5 w-3.5" /> Client Knowledge Base
          </span>
          <h1 className="mt-4 text-4xl font-bold text-[#2E5E4E] sm:text-5xl font-serif">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base text-[#1F332B]/80 max-w-2xl mx-auto">
            Everything you need to know about our cold-processed soapmaking, organic ingredients, skin suitability, and shipping policies.
          </p>
        </section>

        {/* FAQ Accordion Sections */}
        <section className="space-y-10 max-w-4xl mx-auto">
          {ALL_FAQS.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-4">
              <h2 className="text-xl font-bold text-[#2E5E4E] font-serif flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#C9A66B]" /> {cat.category}
              </h2>

              <div className="space-y-3">
                {cat.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={key} className="rounded-[1.75rem] border border-[#2E5E4E]/10 bg-white shadow-sm overflow-hidden transition">
                      <button
                        onClick={() => toggleFaq(key)}
                        className="flex w-full items-center justify-between p-6 text-left font-bold text-base text-[#2E5E4E] font-serif hover:text-[#C9A66B]"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`h-5 w-5 text-[#C9A66B] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-xs text-[#1F332B]/80 leading-relaxed border-t border-[#2E5E4E]/5 pt-4">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
