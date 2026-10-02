import { useState } from "react";
import { PROCESS_STEPS } from "../data";
import { ProcessStep } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Check, Calendar, ClipboardCheck } from "lucide-react";

export default function Process() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = PROCESS_STEPS[activeStepIdx];

  return (
    <section id="process" className="relative py-24 px-12 bg-black border-y border-zinc-900">
      <div className="absolute top-[10%] right-0 w-[300px] h-[300px] bg-zinc-800/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-semibold block">
            How We Partner
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Our Development Process.
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            We operate in structured, hyper-collaborative iterations. From initial strategy to final deployment, we provide daily transparent progress updates.
          </p>
        </div>

        {/* Process Flow Interactive Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Pipeline Step Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = activeStepIdx === idx;
              const isCompleted = activeStepIdx > idx;

              return (
                <button
                  id={`process-step-btn-${step.stepNumber}`}
                  key={step.stepNumber}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "bg-zinc-900 border-zinc-700 shadow-md"
                      : "bg-transparent border-zinc-900 hover:border-zinc-800"
                  }`}
                >
                  <div className="flex items-center space-x-4 z-10">
                    {/* Circle counter */}
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-semibold transition-all duration-300 ${
                        isSelected
                          ? "bg-white border-zinc-200 text-black shadow-md"
                          : isCompleted
                          ? "bg-zinc-900 border-zinc-800 text-zinc-400"
                          : "bg-black border-zinc-900 text-zinc-600"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4.5 h-4.5" /> : step.stepNumber}
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono tracking-wider uppercase text-zinc-500">
                        Phase {step.stepNumber}
                      </span>
                      <h3
                        className={`text-sm font-semibold tracking-tight transition-colors ${
                          isSelected ? "text-white" : "text-zinc-400 hover:text-zinc-300"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="flex items-center gap-1.5 z-10">
                    <Calendar className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-400" : "text-zinc-600"}`} />
                    <span className={`text-[10px] font-mono ${isSelected ? "text-emerald-300" : "text-zinc-500"}`}>
                      {step.duration}
                    </span>
                  </div>

                  {/* Selected slider indicator background */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeStepBorders"
                      className="absolute inset-y-0 left-0 w-[2.5px] bg-white"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Side: Active Step Detailed View */}
          <div className="lg:col-span-7 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 md:p-10 min-h-[360px] flex flex-col justify-between relative overflow-hidden">
            {/* Visual Abstract Pattern */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-zinc-800/3 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 text-left"
              >
                {/* Meta details */}
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                      Current Milestone Scope
                    </span>
                    <h4 className="text-xl font-bold tracking-tight text-white">
                      {activeStep.title}
                    </h4>
                  </div>
                  <div className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-mono text-zinc-400">
                    Timeline: {activeStep.duration}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Milestone Overview
                  </h5>
                  <p className="text-zinc-300 text-sm font-light leading-relaxed">
                    {activeStep.description}
                  </p>
                </div>

                {/* Specific Deliverables List */}
                <div className="space-y-3 pt-2">
                  <h5 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Physical Deliverables
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeStep.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex items-start gap-2 text-xs text-zinc-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        <span className="font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
