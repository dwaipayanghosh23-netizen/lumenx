import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { SERVICES } from "../data";
import { Service } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Design" | "Development" | "Marketing" | "Automation">("All");
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  // Helper to dynamically render Lucide icons
  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-white" />;
    }
    return <LucideIcons.HelpCircle className="w-5 h-5 text-white" />;
  };

  const filteredServices = SERVICES.filter(
    (service) => selectedCategory === "All" || service.category === selectedCategory
  );

  return (
    <section id="services" className="relative py-24 px-12 bg-black border-y border-zinc-900">
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-zinc-850/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-semibold block">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
              Sleek digital products, <br className="hidden sm:inline" />
              engineered to perform.
            </h2>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              We specialize in custom web assets that pair clean, minimalist aesthetics with rapid local speeds, semantic structures, and state-of-the-art automation.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-zinc-900/50 border border-zinc-800 p-1.5 rounded-full self-center md:self-end">
            {(["All", "Design", "Development", "Marketing", "Automation"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveServiceId(null);
                }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const isExpanded = activeServiceId === service.id;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  id={`service-card-${service.id}`}
                  className={`group relative bg-zinc-900/30 border rounded-3xl p-6 transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                    isExpanded
                      ? "border-zinc-700 bg-zinc-900/80 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                      : "border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/50"
                  }`}
                >
                  <div className="space-y-6">
                    {/* Header: Icon + Category Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        {renderIcon(service.iconName)}
                      </div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-500 bg-zinc-900 border border-zinc-800/60 px-2.5 py-0.5 rounded-full">
                        {service.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold tracking-tight text-white">
                        {service.title}
                      </h3>
                      <p className="text-zinc-400 text-xs font-light leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Expanded Deliverables / Tech Section */}
                  <div className={`mt-6 pt-6 border-t border-zinc-800 transition-all duration-500 overflow-hidden ${
                    isExpanded ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}>
                    <div className="space-y-4">
                      {/* Deliverables Checklist */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                          Core Deliverables
                        </span>
                        <ul className="space-y-1.5">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                              <span className="font-light">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech stack, if any */}
                      {service.techStack && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                            Platform Stack
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {service.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[9px] font-mono text-zinc-400 bg-black border border-zinc-800 px-2 py-0.5 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timeline */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                          Avg. Timeline
                        </span>
                        <span className="text-xs font-semibold font-mono text-emerald-400">
                          {service.averageTimeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <div className="mt-6">
                    <button
                      id={`service-toggle-btn-${service.id}`}
                      onClick={() => setActiveServiceId(isExpanded ? null : service.id)}
                      className="w-full text-center py-2.5 bg-zinc-900 hover:bg-zinc-800 hover:text-white border border-zinc-800 rounded-xl text-[10px] font-semibold tracking-wider uppercase text-zinc-400 transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? "Close Scope" : "Explore Deliverables"}</span>
                      <LucideIcons.ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-180 text-emerald-400" : ""}`} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
