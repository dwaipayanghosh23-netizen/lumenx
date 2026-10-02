import { useState } from "react";
import { ArrowRight, Play, Cpu, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const [activeDiagnosticTab, setActiveDiagnosticTab] = useState<"speed" | "seo" | "security">("speed");
  const [speedVal, setSpeedVal] = useState(99);

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 overflow-hidden bg-black"
    >
      {/* Ambient background glows */}
      <div id="hero-ambient-glow-1" className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[35vh] bg-zinc-800/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Tech grid overlay */}
      <div id="hero-grid-overlay" className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center">
        {/* Micro-badge */}
        <motion.div
          id="hero-badge"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-zinc-400 mb-6 w-fit"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-zinc-400">Now Accepting Projects</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-[80px] leading-[0.95] sm:leading-[0.9] font-bold tracking-tight text-white mb-8"
        >
          Build a Digital<br />
          <span className="text-zinc-600">Presence That Works.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-zinc-400 text-lg sm:text-xl max-w-xl font-normal mb-10 leading-relaxed"
        >
          Modern websites designed to help businesses and individuals stand out and grow online. Handcrafted for performance and elegance.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          id="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center mb-24"
        >
          <button
            id="hero-btn-start"
            onClick={() => handleScrollTo("#contact")}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
          >
            Start a Project
          </button>
          
          <button
            id="hero-btn-work"
            onClick={() => handleScrollTo("#services")}
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-white rounded-full font-bold text-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            Explore Services
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Interactive Workspace / Performance Simulator Component */}
        <motion.div
          id="hero-diagnostic-canvas"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative"
        >
          {/* Header Bar */}
          <div className="bg-[#0b0b0d] border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-zinc-500 text-[10px] font-mono ml-4 tracking-wider">
                LUMENX_CORE_V4_DIAGNOSTIC
              </span>
            </div>
            <div className="flex items-center space-x-1 bg-black/40 border border-zinc-800 rounded-lg p-0.5">
              {(["speed", "seo", "security"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveDiagnosticTab(tab)}
                  className={`px-3 py-1 rounded-md text-[9px] font-mono font-medium tracking-wider uppercase transition-all ${
                    activeDiagnosticTab === tab
                      ? "bg-zinc-800 text-emerald-400 border border-zinc-700"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Screen Panel */}
          <div className="p-8 min-h-[220px] flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            {activeDiagnosticTab === "speed" && (
              <>
                <div className="flex-1 space-y-4">
                  <h3 className="text-sm font-semibold tracking-tight text-neutral-200">
                    Engineered for Light-Speed Launch
                  </h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    By removing bulky, bloated frameworks and handcrafting asset pipelines, our pages score at the absolute maximum speed. Toggle the target simulator below:
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                      <span>PRE-FETCHING CACHE</span>
                      <span className="text-emerald-400 font-semibold">{speedVal}% PERFORMANCE</span>
                    </div>
                    <input
                      type="range"
                      min="75"
                      max="100"
                      value={speedVal}
                      onChange={(e) => setSpeedVal(Number(e.target.value))}
                      className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                </div>

                <div className="relative flex flex-col items-center justify-center bg-black/50 border border-zinc-800 rounded-xl p-6 min-w-[200px] h-[160px] shadow-inner">
                  {/* Circular Speed Ring */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        className="stroke-neutral-900"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        className="stroke-emerald-400 transition-all duration-300"
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 48}
                        strokeDashoffset={2 * Math.PI * 48 * (1 - speedVal / 100)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-mono font-bold text-white leading-none">
                        {speedVal}
                      </span>
                      <span className="text-[8px] font-mono text-emerald-400 mt-1 tracking-wider uppercase">
                        Score
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeDiagnosticTab === "seo" && (
              <>
                <div className="flex-1 space-y-4">
                  <h3 className="text-sm font-semibold tracking-tight text-neutral-200">
                    Semantic On-Page Google Mapping
                  </h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    We inject custom structured micro-data (JSON-LD Schemas) and leverage semantic HTML nesting to ensure search engine algorithms index your products flawlessly.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-black/40 border border-zinc-800 rounded-lg p-3">
                      <span className="text-[10px] font-mono text-neutral-500 block">GOOGLE CRAWL</span>
                      <span className="text-xs font-semibold text-green-400 font-mono">100% HEALTHY</span>
                    </div>
                    <div className="bg-black/40 border border-zinc-800 rounded-lg p-3">
                      <span className="text-[10px] font-mono text-neutral-500 block">COMPETITIVE EDGE</span>
                      <span className="text-xs font-semibold text-white font-mono">TOP 3% RANKED</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 bg-black/50 border border-zinc-800 rounded-xl p-5 min-w-[200px] text-[10px] font-mono text-neutral-400">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>LumenX Framework</span>
                  </div>
                  <div className="space-y-1 pl-3 opacity-80 text-[8px] leading-tight">
                    <div>&lt;h1&gt;Digital Presence...&lt;/h1&gt;</div>
                    <div className="text-neutral-600">&lt;script type="application/ld+json"&gt;</div>
                    <div className="text-yellow-500">  "@type": "WebAgency",</div>
                    <div className="text-yellow-500">  "name": "LumenX",</div>
                    <div className="text-neutral-600">&lt;/script&gt;</div>
                    <div className="text-neutral-500">&lt;/script&gt;</div>
                  </div>
                </div>
              </>
            )}

            {activeDiagnosticTab === "security" && (
              <>
                <div className="flex-1 space-y-4">
                  <h3 className="text-sm font-semibold tracking-tight text-neutral-200">
                    Enterprise Trust & Clean Codebases
                  </h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    Zero dynamic database exposures on simple brochures prevents common SQL attacks. Every API endpoint leverages serverless wrappers and strict CORS authentication.
                  </p>
                  <ul className="space-y-1.5 pt-2">
                    <li className="flex items-center gap-2 text-xs text-neutral-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Strict content security headers (CSP)</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-neutral-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zero client-side API credential leaks</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/50 border border-zinc-800 rounded-xl p-6 min-w-[200px] h-[130px] flex flex-col justify-center items-center gap-3 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400">SSL_SECURED_ACTIVE</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
