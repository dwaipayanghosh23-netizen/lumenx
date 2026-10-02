import { Shield, Sparkles, Zap, Code, Terminal, Eye } from "lucide-react";
import { motion } from "motion/react";

export default function WhyChooseUs() {
  const cards = [
    {
      id: "why-design",
      title: "Minimalist Design Philosophy",
      description: "We completely reject bloated templates, boring layouts, and low-quality AI slop. Every layout we forge balances spacious negative space, timeworn typography, and elegant, purposeful interactions.",
      icon: Sparkles,
      span: "md:col-span-2",
      metric: "100%",
      metricLabel: "Bespoke layouts",
    },
    {
      id: "why-speed",
      title: "Performance First",
      description: "Speed is a critical user metric. Our hand-compiled React/Vite builds load in under 1.2 seconds, resulting in maximum SEO scores and elevated client retention.",
      icon: Zap,
      span: "md:col-span-1",
      metric: "<1.2s",
      metricLabel: "Interactive loading",
    },
    {
      id: "why-code",
      title: "No-Bloat Engineering",
      description: "We build on lightweight, cutting-edge frameworks with zero heavy dependencies or redundant plugins. Pristine, documented, type-safe TypeScript engineered to scale smoothly for decades.",
      icon: Code,
      span: "md:col-span-1",
      metric: "99+",
      metricLabel: "Average Lighthouse Score",
    },
    {
      id: "why-transparency",
      title: "Complete Ownership",
      description: "We operate with total absolute transparency. We never markup server overhead or lock you in proprietary hosting platforms. You retain 100% intellectual property, domain keys, and code custody.",
      icon: Shield,
      span: "md:col-span-2",
      metric: "100%",
      metricLabel: "IP Custody & Ownership",
    },
  ];

  return (
    <section id="why-us" className="relative py-24 px-12 bg-black">
      {/* Dynamic ambient background spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-800/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-semibold block">
            The LumenX Edge
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Designed for those who <br className="hidden sm:inline" />
            value distinction.
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            We bridge the massive chasm between standard, low-cost templates and enterprise-grade bespoke architectures, offering world-class visual aesthetics.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                id={`why-us-card-${card.id}`}
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 rounded-3xl p-8 flex flex-col justify-between overflow-hidden ${card.span}`}
              >
                {/* Visual subtle glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-zinc-800/5 rounded-full blur-2xl group-hover:bg-zinc-800/10 transition-all duration-500 pointer-events-none" />

                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Text */}
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Metric footer */}
                <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-end justify-between">
                  <div className="font-mono">
                    <span className="text-3xl font-semibold text-white tracking-tight">
                      {card.metric}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mt-1">
                      {card.metricLabel}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600 group-hover:text-emerald-400 transition-colors duration-300">
                    // LX_EDGE_{idx + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
