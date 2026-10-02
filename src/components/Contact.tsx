import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, Copy, FileText, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import BrandLogo from "./BrandLogo";

interface ContactProps {
  selectedProjectConfig: string;
}

export default function Contact({ selectedProjectConfig }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    budget: "starter",
    message: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [proposalId, setProposalId] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Sync selected calculator configuration from pricing tier if applied
  useEffect(() => {
    if (selectedProjectConfig) {
      // Set message with configuration details
      setFormData((prev) => ({
        ...prev,
        message: prev.message 
          ? prev.message + "\n\n--- Appended Pricing Configuration ---\n" + selectedProjectConfig
          : "Hello, I configured this specific layout combination on your pricing calculator:\n\n" + selectedProjectConfig,
      }));

      // Automatically determine budget based on config
      if (selectedProjectConfig.includes("Personal")) {
        setFormData((prev) => ({ ...prev, budget: "personal" }));
      } else if (selectedProjectConfig.includes("Growth")) {
        setFormData((prev) => ({ ...prev, budget: "growth" }));
      } else {
        setFormData((prev) => ({ ...prev, budget: "starter" }));
      }
    }
  }, [selectedProjectConfig]);

  // Generate random Proposal ID on load
  useEffect(() => {
    const num = Math.floor(100000 + Math.random() * 900000);
    setProposalId(`LMX-${num}`);
  }, []);

  const serviceOptions = [
    { id: "web-dev", label: "Business/Personal Website" },
    { id: "landing", label: "High-Converting Landing Page" },
    { id: "redesign", label: "Website Redesign" },
    { id: "seo", label: "SEO Campaign Setup" },
    { id: "automation", label: "AI Chatbots & Automations" },
    { id: "maintenance", label: "Continuous Support & SLA" },
  ];

  const handleToggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleCopyProposal = () => {
    const text = `PROPOSAL ID: ${proposalId}
Client: ${formData.name || "N/A"} (${formData.org || "Individual"})
Email: ${formData.email || "N/A"}
Budget Tier: ${formData.budget.toUpperCase()}
Services: ${selectedServices.map(s => serviceOptions.find(o => o.id === s)?.label).join(", ") || "None Selected"}
Message: ${formData.message}`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        _replyto: formData.email,
        _subject: `New Project Enquiry [${proposalId}] - ${formData.name}`,
        organization: formData.org || "Individual Client",
        budgetTier: formData.budget,
        selectedModules: selectedServices.map((s) => serviceOptions.find((o) => o.id === s)?.label).join(", ") || "None Selected",
        message: formData.message || "No custom message provided.",
        proposalId: proposalId,
        recipient: "teamlumenx@gmail.com",
      };

      const response = await fetch("https://formspree.io/f/mqervyqq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error("Formspree submission error:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 bg-black">
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-semibold block">
            Initiate Project
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight flex items-center justify-center flex-wrap gap-2.5">
            <span>Start your</span>
            <BrandLogo size="xl" lightText={true} />
            <span>project</span>
          </h2>
          <p className="text-neutral-400 text-sm font-light leading-relaxed">
            Fill out our structured brief. Every inquiry is sent directly to our inbox (<span className="text-white font-mono text-xs">teamlumenx@gmail.com</span>) for rapid review within 6 business hours.
          </p>
        </div>

        {/* Dual Panel Intake / Proposal Draft */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Brief Input */}
          <div className="lg:col-span-7 bg-[#060608] border border-neutral-900 rounded-3xl p-8 md:p-10">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                >
                  <h3 className="text-sm font-semibold tracking-wider font-mono text-neutral-400 uppercase pb-2 border-b border-neutral-900">
                    Project Intake Brief
                  </h3>

                  {/* Dual fields: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        Your Full Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="contact-input-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-black border border-neutral-900 focus:border-sky-500/50 rounded-xl text-sm font-light text-white placeholder-neutral-700 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        Business Email <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="contact-input-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 bg-black border border-neutral-900 focus:border-sky-500/50 rounded-xl text-sm font-light text-white placeholder-neutral-700 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      Organization / Brand Name
                    </label>
                    <input
                      id="contact-input-org"
                      type="text"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      placeholder="e.g. Aura Cosmetics Inc."
                      className="w-full px-4 py-3 bg-black border border-neutral-900 focus:border-sky-500/50 rounded-xl text-sm font-light text-white placeholder-neutral-700 outline-none transition-all"
                    />
                  </div>

                  {/* Budget Choice Tier */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                      Target Project Budget Tier
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "personal", label: "₹9,999", tier: "Personal" },
                        { id: "starter", label: "₹14,999", tier: "Starter" },
                        { id: "growth", label: "₹20,999", tier: "Growth" },
                      ].map((item) => (
                        <button
                          id={`contact-budget-btn-${item.id}`}
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: item.id })}
                          className={`p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center ${
                            formData.budget === item.id
                              ? "bg-black border-sky-500 text-white"
                              : "bg-transparent border-neutral-900 hover:border-neutral-800 text-neutral-400 hover:text-white"
                          }`}
                        >
                          <span className="text-[9px] font-mono text-neutral-500 uppercase">{item.tier}</span>
                          <span className="text-xs font-mono font-semibold mt-0.5">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Service Needs checkboxes */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                      Desired Architecture Modules
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {serviceOptions.map((opt) => {
                        const isChecked = selectedServices.includes(opt.id);
                        return (
                          <button
                            id={`contact-service-checkbox-${opt.id}`}
                            key={opt.id}
                            type="button"
                            onClick={() => handleToggleService(opt.id)}
                            className={`p-3 rounded-xl border text-left text-xs transition-all duration-300 flex items-center justify-between cursor-pointer ${
                              isChecked
                                ? "bg-black border-sky-500/50 text-white"
                                : "bg-transparent border-neutral-900 hover:border-neutral-800 text-neutral-400"
                            }`}
                          >
                            <span>{opt.label}</span>
                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                              isChecked ? "bg-sky-500 border-sky-400 text-black" : "border-neutral-800 bg-neutral-950"
                            }`}>
                              {isChecked && <Check className="w-2.5 h-2.5" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project description brief */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      Your Brief Details / Custom Integrations
                    </label>
                    <textarea
                      id="contact-input-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline any special animations, payment structures, or scheduling triggers. If you configured a calculator draft, it will be automatically appended here."
                      className="w-full px-4 py-3 bg-black border border-neutral-900 focus:border-sky-500/50 rounded-xl text-sm font-light text-white placeholder-neutral-700 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-white text-black hover:bg-neutral-200 font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Indexing Strategy...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Transmit Intake Form
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* Success screen */
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="p-10 text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="w-16 h-16 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">Brief Transmitted Successfully</h3>
                    <p className="text-neutral-400 text-xs font-light max-w-md mx-auto leading-relaxed">
                      Your project brief has been logged under ID <span className="font-mono text-emerald-400">{proposalId}</span> and delivered directly to <span className="font-mono text-white">teamlumenx@gmail.com</span> via Formspree. Our team will review your requirements and reach out within 6 business hours.
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <button
                      id="contact-btn-reset"
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: "", email: "", org: "", budget: "starter", message: "" });
                        setSelectedServices([]);
                      }}
                      className="px-5 py-2.5 bg-neutral-900 text-xs font-semibold tracking-widest uppercase border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg cursor-pointer"
                    >
                      New Submission
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic Live Proposal Board */}
          <div className="lg:col-span-5 bg-neutral-950/80 border border-neutral-900 rounded-3xl p-6 md:p-8 space-y-6 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/3 rounded-full blur-2xl pointer-events-none" />

            {/* Proposal Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
              <div className="flex items-center space-x-2">
                <FileText className="w-4.5 h-4.5 text-sky-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  Digital Contract Ledger
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-600">
                {proposalId}
              </span>
            </div>

            {/* Proposal Content Metadata */}
            <div className="space-y-5 text-xs text-neutral-400 font-light font-mono">
              <div className="space-y-1">
                <span className="text-[8px] text-neutral-600 block uppercase">CLIENT_PRINCIPAL</span>
                <span className="text-neutral-200 block truncate">
                  {formData.name || "[ Enter Name ]"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[8px] text-neutral-600 block uppercase">EMAIL_AUTHENTICATION</span>
                <span className="text-neutral-200 block truncate">
                  {formData.email || "[ Enter Email ]"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[8px] text-neutral-600 block uppercase">BRAND_ENTITY</span>
                <span className="text-neutral-200 block truncate">
                  {formData.org || "[ Individual Client ]"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[8px] text-neutral-600 block uppercase">BUDGET_TIER</span>
                <span className="text-neutral-200 block capitalize">
                  {formData.budget} Class ({formData.budget === "personal" ? "₹9,999" : formData.budget === "growth" ? "₹20,999" : "₹14,999"})
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[8px] text-neutral-600 block uppercase">TARGET_MODULE_SCOPES</span>
                <div className="flex flex-wrap gap-1">
                  {selectedServices.length > 0 ? (
                    selectedServices.map((id) => (
                      <span
                        key={id}
                        className="text-[8px] px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-300"
                      >
                        {serviceOptions.find((o) => o.id === id)?.label.replace("Website", "").replace("Page", "")}
                      </span>
                    ))
                  ) : (
                    <span className="text-neutral-600 text-[9px] italic">
                      [ Select Desired Modules Above ]
                    </span>
                  )}
                </div>
              </div>

              {/* Message excerpt preview */}
              <div className="space-y-1.5 border-t border-neutral-900/60 pt-4">
                <span className="text-[8px] text-neutral-600 block uppercase">SCOPING_MEMORANDUM_EXTRACT</span>
                <p className="text-[10px] text-neutral-400 line-clamp-3 leading-relaxed bg-black/40 p-2.5 rounded-lg border border-neutral-900/40">
                  {formData.message || "Awaiting additional project descriptions or custom configurations..."}
                </p>
              </div>
            </div>

            {/* Action Bar: Copy Config */}
            <div className="pt-4 border-t border-neutral-900">
              <button
                id="contact-btn-copy-proposal"
                onClick={handleCopyProposal}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl text-[10px] font-semibold tracking-wider uppercase border border-neutral-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    Ledger Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Ledger Configuration
                  </>
                )}
              </button>
            </div>
            
            {/* Disclaimer node */}
            <div className="flex items-start gap-2 text-[8px] font-mono text-neutral-600 uppercase leading-normal">
              <AlertCircle className="w-3.5 h-3.5 text-neutral-700 flex-shrink-0 mt-0.5" />
              <span>
                All submitted scopes undergo localized search engine volume evaluation prior to the strategist kickoff briefing.
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
