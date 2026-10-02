import { useState } from "react";
import { FAQS } from "../data";
import { FaqItem } from "../types";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"All" | "General" | "Process" | "Pricing" | "Technical">("All");

  const filteredFaqs = FAQS.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <section id="faq" className="relative py-24 px-12 bg-black border-b border-zinc-900">
      <div className="absolute bottom-[10%] right-10 w-[300px] h-[300px] bg-zinc-800/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-semibold block">
            Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Frequently Asked Questions.
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-2xl mx-auto">
            Got technical, financial, or strategic questions? We practice radical clarity. Explore categories below or contact our desk directly.
          </p>

          {/* Category Selectors */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-zinc-900 border border-zinc-850 p-1.5 rounded-full w-fit mx-auto pt-4">
            {(["All", "General", "Process", "Pricing", "Technical"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveFaqId(null);
                }}
                className={`px-4 py-1.5 rounded-full text-[9px] font-semibold tracking-wider uppercase transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion Block */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = activeFaqId === faq.id;

            return (
              <div
                id={`faq-item-${faq.id}`}
                key={faq.id}
                className={`bg-zinc-900/30 border rounded-2xl transition-all duration-300 ${
                  isOpen ? "border-zinc-650" : "border-zinc-850 hover:border-zinc-700"
                }`}
              >
                <button
                  id={`faq-toggle-btn-${faq.id}`}
                  onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-950 border border-zinc-800 px-2.5 py-0.5 rounded-full">
                      {faq.category}
                    </span>
                    <h3 className="text-sm font-semibold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-6 h-6 rounded-full border border-zinc-800 flex items-center justify-center transition-colors text-zinc-400 ${
                    isOpen ? "bg-white text-black border-white" : ""
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Answer box with framer motion transition */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs text-zinc-400 font-light leading-relaxed border-t border-zinc-850 text-left">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
