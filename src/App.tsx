import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedConfig, setSelectedConfig] = useState("");

  // Smooth Intersection Observer to highlight current Section in Header
  useEffect(() => {
    const sections = ["hero", "services", "why-us", "process", "pricing", "faq", "contact"];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200; // Offset to activate early
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="lumenx-workspace" className="min-h-screen bg-black text-neutral-200 overflow-x-hidden selection:bg-sky-500 selection:text-black font-sans">
      {/* Floating Elements */}
      <Navbar activeSection={activeSection} />
      <Chatbot />

      {/* Main Single-Page Sections */}
      <main id="lumenx-sections-main">
        <Hero />
        <Services />
        <WhyChooseUs />
        <Process />
        <Pricing onSelectProjectConfig={setSelectedConfig} />
        <FAQ />
        <Contact selectedProjectConfig={selectedConfig} />
      </main>

      {/* Footer Node */}
      <Footer />
    </div>
  );
}
