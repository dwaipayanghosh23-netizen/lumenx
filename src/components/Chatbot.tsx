import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-init",
      sender: "bot",
      text: "Welcome! I am Lumen, your digital strategy assistant. Ask me anything about our services, pricing plans, timelines, or custom modules.",
      time: "Just Now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    { label: "Starter vs Growth?", text: "What is the difference between your Starter and Growth plans?" },
    { label: "Delivery timeline?", text: "How long does a standard website take to design and launch?" },
    { label: "Do you integrate Stripe?", text: "Can you build payment checkouts like Stripe or Razorpay?" },
    { label: "Custom design process?", text: "Explain your design process. Do you use templates?" }
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("starter") && input.includes("growth")) {
      return "The Starter plan (₹14,999) covers up to 5 custom-designed pages, local SEO, mobile tuning, and WhatsApp integrations. The Growth plan (₹20,999) steps this up by offering up to 10 pages, a rich Blog CMS, advanced Google analytics tracking, business emails, and a customized Smart AI Chatbot widget.";
    }
    if (input.includes("starter")) {
      return "Our Starter plan (₹14,999) is ideal for local services and businesses. It features up to 5 mobile-optimized pages, a direct lead capture form, WhatsApp API shortcuts, mapping setups, and 14 days of dedicated post-launch support.";
    }
    if (input.includes("growth")) {
      return "Our Growth plan (₹20,999) is a content powerhouse. It includes up to 10 pages, an integrated CMS-powered blog, custom traffic analytics, professional email configurations, and advanced localized keyword campaigns.";
    }
    if (input.includes("personal")) {
      return "Our Personal plan (₹9,999) is perfect for designers, actors, developers, and creators. It includes a single-page sleek website, resume PDF download links, direct email forms, and 14 days of launching support.";
    }
    if (input.includes("elite") || input.includes("custom") || input.includes("enterprise")) {
      return "We offer flexible packages: Personal (₹9,999), Starter (₹14,999), and Growth (₹20,999). For any enterprise or custom feature requirements beyond Growth, we provide bespoke tailored scoping via our contact brief!";
    }
    if (input.includes("timeline") || input.includes("how long") || input.includes("duration")) {
      return "Our timelines are highly optimized: Personal websites take 5 to 7 days, Starter businesses take 1 to 2 weeks, and Growth configurations generally take 2 to 3 weeks.";
    }
    if (input.includes("stripe") || input.includes("razorpay") || input.includes("payment") || input.includes("checkout")) {
      return "Yes, absolutely! We configure secure payment integrations (Stripe, Razorpay, or PayPal) with automated invoicing as an add-on or tailored module.";
    }
    if (input.includes("template") || input.includes("wordpress") || input.includes("diy")) {
      return "We completely avoid WordPress or generic template builders. All LumenX platforms are handcrafted in modular React/Vite with Tailwind CSS, resulting in instant loading times, custom animations, and clean semantic codebases that will never break.";
    }
    if (input.includes("seo") || input.includes("search") || input.includes("google")) {
      return "Every project we release has built-in on-page SEO. We setup keyword tags, structured schemas (JSON-LD), compress assets, and request direct indexing from Google Search Console so your brand ranks instantly.";
    }
    if (input.includes("budget") || input.includes("price") || input.includes("cost")) {
      return "Our packages scale smoothly from our Personal tier (₹6,999) to our comprehensive Elite tier (₹74,999+). You can also use our Bespoke Cost Calculator in the Pricing section to craft custom combinations!";
    }
    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! How can I help you map out your digital presence today? Feel free to ask about our Pricing, Process, Portfolio, or Services.";
    }

    return "LumenX specializes in bespoke digital engineering. For complex custom questions or direct technical consulting, feel free to fill out our Project Intake Brief in the Contact section, and a senior strategist will call you within 6 business hours!";
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate thinking delay
    setTimeout(() => {
      const botResponseText = generateBotResponse(text);
      const botMsg: Message = {
        id: `msg-bot-${Date.now()}`,
        sender: "bot",
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <>
      {/* Floating launcher trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="chatbot-launcher-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-white text-black hover:bg-neutral-200 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer relative group"
          aria-label="Open Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              <span className="absolute right-0 top-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-ping" />
              <span className="absolute right-0 top-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
            </>
          )}
        </button>
      </div>

      {/* Chat window drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-drawer-container"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 w-full max-w-[360px] h-[500px] bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl z-40 flex flex-col justify-between text-left"
          >
            {/* Header */}
            <div className="bg-zinc-900/40 border-b border-zinc-850 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <Bot className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white tracking-tight">Lumen</h4>
                  <span className="text-[8px] font-mono tracking-wider text-emerald-400 uppercase">
                    Assistant_Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Logs */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-black/40">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isBot ? "" : "flex-row-reverse"}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${
                      isBot
                        ? "bg-zinc-900 border border-zinc-800 text-zinc-300"
                        : "bg-white text-black"
                    }`}>
                      {isBot ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    </div>

                    <div className="space-y-1 max-w-[80%]">
                      <div className={`p-3 rounded-xl text-xs font-light leading-relaxed shadow-sm text-left ${
                        isBot
                          ? "bg-zinc-900 border border-zinc-850 text-zinc-350"
                          : "bg-white text-black font-semibold"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] font-mono text-zinc-600 block px-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Quick replies footer suggestions */}
            {messages.length === 1 && (
              <div className="px-5 py-3 border-t border-zinc-900 bg-zinc-950/25 space-y-1.5 text-left">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">
                  Suggested topics
                </span>
                <div className="flex flex-wrap gap-1">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.label}
                      onClick={() => handleSendMessage(reply.text)}
                      className="text-[9px] text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1 rounded-full transition-all text-left cursor-pointer"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Input Footer */}
            <div className="p-4 border-t border-zinc-900 bg-zinc-950">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  id="chatbot-input-field"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Lumen..."
                  className="flex-1 bg-zinc-900/40 border border-zinc-800 focus:border-zinc-650 rounded-xl px-3 py-2 text-xs font-light text-white placeholder-zinc-750 outline-none transition-all"
                />
                <button
                  id="chatbot-send-btn"
                  type="submit"
                  className="w-8 h-8 rounded-full bg-white text-black hover:bg-zinc-200 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Send Message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
