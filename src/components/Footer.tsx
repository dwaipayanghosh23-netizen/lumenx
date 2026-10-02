import { ArrowUp, Mail, MapPin } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Process", href: "#process" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer id="footer" className="bg-black border-t border-zinc-900 py-16 px-12 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 text-left">
        {/* Left Side: Agency branding */}
        <div className="space-y-4 max-w-sm">
          <BrandLogo size="lg" lightText={true} />
          <p className="text-zinc-500 text-xs font-light leading-relaxed">
            A premium digital architecture studio crafting distinctive, ultra-performance web platforms for ambitious businesses and individual personal brands worldwide.
          </p>
          {/* Quick contact tags */}
          <div className="space-y-2 pt-2 text-[10px] font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-zinc-650" />
              <a href="mailto:teamlumenx@gmail.com" className="hover:text-white transition-colors">
                teamlumenx@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-650" />
              <span>Kolkata, India (Remote-First)</span>
            </div>
          </div>
        </div>

        {/* Middle Column: Quick Sitemap */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">
            Sitemap
          </h4>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(link.href);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Dynamic Status & Scroll Up */}
        <div className="space-y-4 md:text-right flex flex-col md:items-end">
          <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">
            Studio Location
          </h4>
          <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl space-y-2 max-w-[240px]">
            <p className="text-[10px] font-mono text-zinc-400 leading-normal">
              Kolkata, India / Remote-First Global Collaborations.
            </p>
          </div>

          <button
            id="footer-scroll-to-top"
            onClick={handleScrollToTop}
            className="mt-4 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded-lg text-[9px] font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Scroll To Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom credits */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <span className="text-[10px] font-mono text-zinc-600">
          © 2026 LumenX Studio. All rights reserved.
        </span>
        <span className="text-[10px] font-mono text-zinc-600">
          Bespoke engineering. Absolutely zero template re-use.
        </span>
      </div>
    </footer>
  );
}
