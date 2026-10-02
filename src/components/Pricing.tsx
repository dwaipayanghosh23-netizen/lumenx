import { useState } from "react";
import { PRICING_TIERS } from "../data";
import { PricingTier } from "../types";
import { Check, Info, Calculator, Sparkles, Send, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface PricingProps {
  onSelectProjectConfig: (config: string) => void;
}

export default function Pricing({ onSelectProjectConfig }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<"standard" | "annual">("standard");
  const [showCalculator, setShowCalculator] = useState(false);

  // Calculator State
  const [calcTier, setCalcTier] = useState<"personal" | "starter" | "growth">("starter");
  const [extraPages, setExtraPages] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addonsList = [
    { id: "copywriting", name: "Premium Copywriting Support", price: 3000, desc: "Bespoke conversions-focused text written for all main sections" },
    { id: "stripe", name: "Stripe / Razorpay Checkout", price: 5000, desc: "Secure multi-currency transactions directly inside your layouts" },
    { id: "cms", name: "Headless CMS (Sanity Panel)", price: 6000, desc: "Admin dashboard to update blogs, items, & portfolios without coding" },
    { id: "whatsapp", name: "WhatsApp Lead Auto-Router", price: 2500, desc: "Instantly route contact submissions into active WhatsApp chats" },
    { id: "maintenance", name: "Extended Support (Extra 30 days)", price: 4000, desc: "Extend premium SLA response, daily backups, & diagnostic checks" },
  ];

  // Price calculations
  const activeBaseTier = PRICING_TIERS.find((t) => t.id === calcTier) || PRICING_TIERS[1];
  const basePrice = activeBaseTier.priceNum;
  
  // Extra pages price (₹1,500 per extra page)
  const extraPagesPrice = extraPages * 1500;
  
  // Addons price
  const addonsPrice = selectedAddons.reduce((acc, curr) => {
    const addon = addonsList.find((a) => a.id === curr);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const totalCalculatedPrice = basePrice + extraPagesPrice + addonsPrice;
  const discountedCalculatedPrice = billingCycle === "annual" ? Math.round(totalCalculatedPrice * 0.85) : totalCalculatedPrice;

  const handleToggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleSendConfigToContact = () => {
    const addonsNames = selectedAddons.map((id) => addonsList.find((a) => a.id === id)?.name).filter(Boolean);
    const summary = `Package: LumenX ${activeBaseTier.name} Tier
Base Price: ${activeBaseTier.price}
Extra Pages: ${extraPages} (+₹${extraPagesPrice.toLocaleString("en-IN")})
Add-ons: ${addonsNames.length > 0 ? addonsNames.join(", ") : "None"} (+₹${addonsPrice.toLocaleString("en-IN")})
Billing Option: ${billingCycle === "annual" ? "Annual Maintenance (-15%)" : "Standard"}
Estimated Project Value: ₹${discountedCalculatedPrice.toLocaleString("en-IN")}`;
    
    onSelectProjectConfig(summary);

    // Scroll to Contact section
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStandardCardSelect = (tier: PricingTier) => {
    const summary = `Package: LumenX ${tier.name} Tier
Base Price: ${tier.price}
Configuration: Standard Plan (No customized add-ons)`;
    onSelectProjectConfig(summary);
    
    // Scroll to Contact
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="relative py-24 px-12 bg-black">
      <div className="absolute top-[20%] left-1/4 w-[400px] h-[400px] bg-zinc-800/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-semibold block">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Plans for every scale.
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Pristine layouts, bespoke engineering, and absolute transparent pricing. No hidden platform markups. Select a predefined plan or construct your own.
          </p>

          {/* Toggle standard / custom calculator */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <button
              onClick={() => setShowCalculator(false)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                !showCalculator
                  ? "bg-white text-black border-white shadow-lg"
                  : "bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              Standard Packages
            </button>
            <button
              id="pricing-toggle-calculator"
              onClick={() => setShowCalculator(true)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border transition-all flex items-center gap-2 cursor-pointer ${
                showCalculator
                  ? "bg-white text-black border-white shadow-lg"
                  : "bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Bespoke Cost Calculator
            </button>
          </div>
        </div>

        {/* Traditional Cards Layout */}
        {!showCalculator ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRICING_TIERS.map((tier) => (
              <div
                id={`pricing-card-${tier.id}`}
                key={tier.id}
                className={`relative bg-zinc-900/30 border rounded-3xl p-8 flex flex-col justify-between transition-all duration-400 ${
                  tier.highlight
                    ? "border-zinc-600 shadow-[0_0_40px_rgba(255,255,255,0.06)] ring-1 ring-white/10 md:scale-[1.03] z-10"
                    : "border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/50"
                }`}
              >
                {/* Visual Accent Badge */}
                {tier.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold font-mono tracking-widest uppercase px-3.5 py-1 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.2)]">
                    Recommended
                  </span>
                )}

                <div className="space-y-6 text-left">
                  {/* Name & price */}
                  <div className="space-y-1.5 pb-6 border-b border-zinc-800/60">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      {tier.bestFor}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {tier.name}
                    </h3>
                    <div className="pt-2 flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                        {tier.price}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed pt-2">
                      {tier.description}
                    </p>
                  </div>

                  {/* Bullet Lists */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                      {tier.includes}
                    </span>
                    <ul className="space-y-2.5">
                      {tier.listItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA button */}
                <div className="pt-8">
                  <button
                    id={`pricing-select-${tier.id}`}
                    onClick={() => handleStandardCardSelect(tier)}
                    className={`w-full py-3 text-center text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer ${
                      tier.highlight
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Interactive Calculator Screen */
          <motion.div
            id="pricing-calculator-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12"
          >
            {/* Left side parameters (8 cols) */}
            <div className="md:col-span-7 p-8 md:p-10 space-y-8 text-left">
              
              {/* Select Package Tier */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  Select Base Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRICING_TIERS.map((tier) => (
                    <button
                      id={`calc-tier-${tier.id}`}
                      key={tier.id}
                      onClick={() => setCalcTier(tier.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                        calcTier === tier.id
                          ? "bg-zinc-950 border-zinc-650 shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                          : "bg-transparent border-zinc-850 hover:border-zinc-800"
                      }`}
                    >
                      <span className={`text-[9px] font-mono ${calcTier === tier.id ? "text-emerald-400" : "text-zinc-500"}`}>
                        {tier.bestFor.replace("Ideal for ", "")}
                      </span>
                      <h4 className="text-sm font-bold text-white pt-1">{tier.name}</h4>
                      <span className="text-xs font-mono text-zinc-400 pt-2">{tier.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for extra custom pages */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  <label>Additional Custom Pages</label>
                  <span className="text-emerald-400 font-semibold">
                    +{extraPages} Page{extraPages !== 1 && "s"} (+₹{(extraPages * 1500).toLocaleString("en-IN")})
                  </span>
                </div>
                <div className="space-y-1">
                  <input
                    id="calc-extra-pages-slider"
                    type="range"
                    min="0"
                    max="15"
                    value={extraPages}
                    onChange={(e) => setExtraPages(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-zinc-600">
                    <span>Base Tier Specs</span>
                    <span>+15 Pages (₹1,500/page)</span>
                  </div>
                </div>
              </div>

              {/* Addons Checklist */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  Select High-Craft Add-ons
                </label>
                <div className="space-y-3">
                  {addonsList.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        id={`calc-addon-btn-${addon.id}`}
                        key={addon.id}
                        onClick={() => handleToggleAddon(addon.id)}
                        className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-start justify-between gap-4 cursor-pointer ${
                          isChecked
                            ? "bg-zinc-950 border-zinc-750"
                            : "bg-transparent border-zinc-850 hover:border-zinc-800"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center ${
                            isChecked ? "bg-emerald-500 border-emerald-400 text-black" : "border-zinc-800 bg-zinc-950"
                          }`}>
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <h5 className="text-xs font-semibold text-white">{addon.name}</h5>
                            <p className="text-[10px] text-zinc-400 font-light mt-0.5">{addon.desc}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-semibold text-emerald-400 flex-shrink-0">
                          +₹{addon.price.toLocaleString("en-IN")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right side live results panel (5 cols) */}
            <div className="md:col-span-5 bg-zinc-950/50 border-t md:border-t-0 md:border-l border-zinc-800 p-8 md:p-10 flex flex-col justify-between text-left">
              
              {/* Detailed Summary Receipt */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-zinc-800 pb-3">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Your Custom Configuration
                </h4>

                <div className="space-y-4">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="text-zinc-400 font-light">
                      LumenX {activeBaseTier.name} Base
                    </span>
                    <span className="font-mono text-white">
                      ₹{basePrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {extraPages > 0 && (
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-zinc-500 font-light">
                        +{extraPages} Custom Page{extraPages !== 1 && "s"}
                      </span>
                      <span className="font-mono text-zinc-300">
                        +₹{extraPagesPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  {selectedAddons.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono text-zinc-600 uppercase block">Selected Upgrades</span>
                      {selectedAddons.map((addonId) => {
                        const ad = addonsList.find((a) => a.id === addonId);
                        if (!ad) return null;
                        return (
                          <div key={addonId} className="flex justify-between items-baseline text-xs pl-2 border-l border-zinc-800">
                            <span className="text-zinc-500 font-light truncate max-w-[160px]">
                              {ad.name}
                            </span>
                            <span className="font-mono text-zinc-300">
                              +₹{ad.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Billing Option Selectors */}
                  <div className="pt-4 border-t border-zinc-800/60 space-y-2">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase block">Maintenance Cycle</span>
                    <div className="grid grid-cols-2 gap-2 bg-zinc-950 border border-zinc-850 p-1 rounded-lg">
                      <button
                        onClick={() => setBillingCycle("standard")}
                        className={`py-1 text-[9px] font-semibold tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                          billingCycle === "standard" ? "bg-zinc-900 text-white" : "text-zinc-500"
                        }`}
                      >
                        Standard SLA
                      </button>
                      <button
                        onClick={() => setBillingCycle("annual")}
                        className={`py-1 text-[9px] font-semibold tracking-wider uppercase rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          billingCycle === "annual" ? "bg-zinc-900 text-emerald-400" : "text-zinc-500"
                        }`}
                      >
                        Annual (-15%)
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Total Cost & CTA button */}
              <div className="space-y-4 pt-10 border-t border-zinc-800/60">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Est. Investment
                  </span>
                  <div className="text-right">
                    {billingCycle === "annual" && (
                      <span className="text-zinc-500 font-mono text-xs line-through block leading-none mb-1">
                        ₹{totalCalculatedPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                    <span className="text-3xl font-mono font-bold text-white tracking-tight leading-none block">
                      ₹{discountedCalculatedPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  id="calc-send-proposal-btn"
                  onClick={handleSendConfigToContact}
                  className="w-full py-4 bg-white text-black hover:bg-zinc-200 font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Apply & Start Project
                </button>
                <p className="text-[8px] font-mono text-zinc-600 text-center uppercase tracking-wider">
                  No credit card required to configure proposal
                </p>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
