import { Service, PortfolioProject, ProcessStep, PricingTier, FaqItem } from "./types";

export const SERVICES: Service[] = [
  {
    id: "business-websites",
    title: "Business Websites",
    description: "Bespoke, multi-page corporate web presences built to establish professional authority, secure high-value client leads, and tell your brand's unique story.",
    iconName: "Briefcase",
    deliverables: [
      "Custom UI/UX Wireframes & Prototypes",
      "Lead Generation & Contact Funnels",
      "Interactive Team & Portfolio Modules",
      "Seamless CMS (Content Management System) integration"
    ],
    techStack: ["React", "Vite", "Tailwind CSS", "Sanity CMS"],
    averageTimeline: "3-4 Weeks",
    category: "Development"
  },
  {
    id: "personal-websites",
    title: "Personal Websites",
    description: "Highly customized digital portfolios, resume showcases, and personal brand interfaces engineered for creators, freelancers, and ambitious professionals.",
    iconName: "User",
    deliverables: [
      "Interactive Bio & Portfolio showcases",
      "Dynamic Resume & CV download systems",
      "Direct email & contact integrations",
      "Social media grid & RSS feed syndication"
    ],
    techStack: ["React", "Vite", "Motion", "Tailwind CSS"],
    averageTimeline: "1-2 Weeks",
    category: "Design"
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    description: "Laser-focused, ultra-high conversion single-page landing experiences optimized specifically to drive product launches, campaigns, and lead acquisition.",
    iconName: "Target",
    deliverables: [
      "Persuasive structural copywriting advice",
      "Optimized Form & Call-to-Action flows",
      "Scroll-triggered visual storyboards",
      "Advanced heat-map and A/B test setups"
    ],
    techStack: ["React", "Motion", "Tailwind CSS"],
    averageTimeline: "5-7 Days",
    category: "Marketing"
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    description: "Comprehensive visual and technical overhauls of legacy websites to radically improve performance scores, modernization, accessibility, and conversions.",
    iconName: "RefreshCw",
    deliverables: [
      "Legacy site performance & UX audit",
      "SEO preservation & page redirect maps",
      "Completely modernized design language",
      "Lighthouse score improvement (typically 95+)"
    ],
    techStack: ["Modern React Stack", "Tailwind CSS"],
    averageTimeline: "2-3 Weeks",
    category: "Design"
  },
  {
    id: "google-business-setup",
    title: "Google Business Profile",
    description: "Comprehensive local business search optimization, profile setups, mapping integrations, and client review generation strategies.",
    iconName: "MapPin",
    deliverables: [
      "Profile verification & standard setups",
      "Optimized primary/secondary category tags",
      "High-converting review generation link templates",
      "Local map citation building & schema markup"
    ],
    techStack: ["Google Maps API", "Local SEO Schema"],
    averageTimeline: "3-5 Days",
    category: "Marketing"
  },
  {
    id: "seo-foundations",
    title: "SEO Foundations",
    description: "Rigorous on-page search engine optimization engineered to elevate organic visibility, search rankings, local domain authority, and index efficiency.",
    iconName: "Search",
    deliverables: [
      "In-depth keyword intent and competitor research",
      "Semantic HTML structures & metadata maps",
      "XML Sitemaps & robots.txt optimizations",
      "Google Search Console & Analytics setups"
    ],
    techStack: ["Google Search Console", "Ahrefs API", "JSON-LD"],
    averageTimeline: "1 Week",
    category: "Marketing"
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    description: "Proactive monthly updates, software patches, security tracking, daily data backups, and high-priority minor design changes.",
    iconName: "Sliders",
    deliverables: [
      "Continuous runtime monitoring & uptime logs",
      "Weekly asset compilation & security audits",
      "Dedicated developer hours for ongoing requests",
      "Detailed monthly analytics and performance audits"
    ],
    techStack: ["CI/CD pipelines", "AWS Backups", "Sentry tracking"],
    averageTimeline: "Ongoing",
    category: "Automation"
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    description: "Cutting-edge artificial intelligence integration including customer service assistants, automated lead qualifiers, and smart content generation workflows.",
    iconName: "Cpu",
    deliverables: [
      "Custom client-trained chatbot widgets",
      "Automated WhatsApp & Email auto-responses",
      "CRM pipeline routing with AI qualifiers",
      "Automated document summarization matrices"
    ],
    techStack: ["Gemini API", "OpenAI API", "Make.com / Zapier"],
    averageTimeline: "2-3 Weeks",
    category: "Automation"
  }
];

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: "aura-cosmetics",
    title: "Aura Cosmetics",
    category: "Headless E-commerce",
    description: "A highly immersive, cinematic shopping experience for a luxury wellness brand. Fluid transitions, rapid micro-interactions, and a 1.2-second instant-checkout route.",
    clientResult: "+180%",
    clientResultLabel: "Sales Volume",
    gradientFrom: "from-amber-950/40",
    gradientTo: "to-stone-900/60",
    tags: ["React SPA", "Headless Shopify", "Framer Motion", "Tailwind CSS"],
    challenge: "The legacy Shopify theme had heavy loading latency, leading to high bounce rates and cart abandonment on product-heavy media segments.",
    solution: "Rebuilt the front-end using a decoupled, compiled React architecture, converting high-res product models to compressed WebP formats and pre-fetching critical product data on mouse-hover.",
    deliverables: ["Product Grid Animation", "Instant Checkout Pipeline", "Sleek Custom Video Player", "CMS Database Hooks"]
  },
  {
    id: "veloce-motors",
    title: "Veloce Motors",
    category: "Premium Landing Page",
    description: "A breathtaking interactive vehicle showcase for a custom electric vehicle line. Staggered canvas reveals and modular bento configurations mimicking luxury automotive engineering.",
    clientResult: "3.2x",
    clientResultLabel: "Lead Conversions",
    gradientFrom: "from-slate-950/40",
    gradientTo: "to-blue-950/60",
    tags: ["React", "Custom WebGL", "Tailwind CSS", "Motion"],
    challenge: "Traditional sales pipelines struggled to convey the revolutionary customization options of Veloce's modular chassis in standard lists.",
    solution: "Created an Apple-style modular visual interactive configurator with realistic layered renders and high-performance scroll triggers that dynamically update estimated delivery dates.",
    deliverables: ["Modular Customizer Canvas", "Responsive Technical Spec Sheets", "CRM API Lead Hub"]
  },
  {
    id: "apex-analytics",
    title: "Apex Analytics",
    category: "SaaS Platform UI",
    description: "A blazing-fast, light-speed enterprise dashboard featuring real-time telemetry metrics, customizable charts, and intuitive cohort filters designed for data analysts.",
    clientResult: "99.9",
    clientResultLabel: "Lighthouse Score",
    gradientFrom: "from-neutral-950/40",
    gradientTo: "to-zinc-900/60",
    tags: ["React", "D3.js", "Lucide Icons", "Tailwind v4"],
    challenge: "The existing portal with millions of aggregate rows regularly froze when rendering dynamic charts on tablet devices during key meetings.",
    solution: "Optimized drawing pipelines via raw virtualized DOM tables, debounced resize computations, and used Web Workers to offload sorting/filtering arrays in the background.",
    deliverables: ["D3 Cohort Graph Suite", "Adaptive Workspace Grid", "Real-Time Metric WebSockets"]
  },
  {
    id: "chronos-watchmakers",
    title: "Chronos Watchmakers",
    category: "Boutique Portfolio",
    description: "An editorial-grade digital showroom for heritage watch restoration. Ultra-precise layouts, timeless typography, and microscopic zoom views celebrating hand-crafted mechanics.",
    clientResult: "+240%",
    clientResultLabel: "Time On Page",
    gradientFrom: "from-zinc-950/40",
    gradientTo: "to-neutral-900/60",
    tags: ["React Studio", "Tailwind CSS", "Motion UI", "SEO Pro"],
    challenge: "Chronos struggled to justify premium restoration pricing tiers because online portfolios failed to project the meticulous macro details of high-horology.",
    solution: "Engineered an extreme-zoom micro-gallery supporting smooth cursor-tracking magnification, layered over rich audio loops of physical ticking movements.",
    deliverables: ["High-Res Zoom Grid", "Ambient Horology Audio Engine", "Responsive Custom Bookings"]
  },
  {
    id: "synapse-systems",
    title: "Synapse Systems",
    category: "AI Agent Portal",
    description: "An interactive workspace demonstrating autonomous AI workflow optimization. Contains real-time scheduling widgets, prompt sandboxes, and clean system performance dials.",
    clientResult: "85%",
    clientResultLabel: "Automation Gain",
    gradientFrom: "from-indigo-950/40",
    gradientTo: "to-purple-950/60",
    tags: ["Next-Gen UI", "Web API", "Framer Motion", "Tailwind"],
    challenge: "Non-technical enterprise leads struggled to comprehend how Synapse agents automated standard office workloads.",
    solution: "Built an interactive, visual 'Workflow Builder' where prospective clients can drag typical office steps together and see a live simulated AI Agent solve them in real-time.",
    deliverables: ["Visual Workflow Sandbox", "Interactive API Live-Response", "Custom Booking Hub"]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Discovery & Strategy",
    duration: "Days 1-3",
    description: "We deep-dive into your business mechanics, analyze direct local and global competition, determine core goals, and map out a bulletproof technical strategy.",
    deliverables: ["Competitor Analysis Matrix", "Interactive Sitemap Blueprint", "Feature Specification Document"]
  },
  {
    stepNumber: "02",
    title: "High-Fidelity Design",
    duration: "Week 1",
    description: "We craft custom, high-fidelity UI mockups and interactive prototypes using our minimalist design principles—absolutely zero templates.",
    deliverables: ["Tailored Wireframe Prototypes", "Pristine Style & Font Systems", "Responsive Mobile & Desktop Previews"]
  },
  {
    stepNumber: "03",
    title: "Precision Engineering",
    duration: "Weeks 2-3",
    description: "Our developers translate designs into production-ready React/Vite systems. We construct ultra-clean layouts with high-fidelity, purposeful animations.",
    deliverables: ["Clean, Documented TypeScript", "Fully Fluid Layout Engine", "Smooth Framer Motion Interactions"]
  },
  {
    stepNumber: "04",
    title: "Optimization & Quality",
    duration: "Days 12-14",
    description: "We enforce strict quality control, optimizing media files, securing Lighthouse scores near 100, checking cross-browser rendering, and perfecting SEO structures.",
    deliverables: ["Lighthouse Performance Audit", "On-Page SEO Configuration", "Cross-Platform Diagnostics Report"]
  },
  {
    stepNumber: "05",
    title: "Launch & Support",
    duration: "Day 15+",
    description: "We coordinate a seamless server migration to launch your live platform. We train your staff, establish analytics hubs, and begin the dedicated post-launch support.",
    deliverables: ["Zero-Downtime Deployment", "Google Search Indexing Request", "Complete Hand-Off Training Document"]
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "personal",
    name: "Personal",
    price: "₹9,999",
    priceNum: 9999,
    description: "For developers, students, freelancers, creators, photographers, artists, and distinctive personal brands.",
    includes: "Perfect for single-person showcases",
    listItems: [
      "One-page custom website",
      "Fully responsive design",
      "Detailed About & History section",
      "Interactive showcase gallery",
      "Resume download system",
      "Spam-protected Contact form",
      "Social media integration links",
      "On-page SEO Foundations",
      "Mobile speed optimization",
      "2 professional revision rounds",
      "14 days post-launch support"
    ],
    bestFor: "Ideal for individual portfolios & CVs"
  },
  {
    id: "starter",
    name: "Starter",
    price: "₹14,999",
    priceNum: 14999,
    description: "Establish a robust, highly polished digital presence for small businesses, local services, and startups.",
    includes: "Our most popular core business setup",
    listItems: [
      "Up to 5 custom-designed pages",
      "Fully responsive layouts",
      "Lead generation contact forms",
      "WhatsApp Chat API integration",
      "Interactive Google Maps setup",
      "Google Business Profile optimization",
      "On-page SEO Foundations",
      "Core Web Vitals speed tuning",
      "Mobile layout optimization",
      "2 professional revision rounds",
      "14 days post-launch support"
    ],
    bestFor: "Ideal for startups & local service providers",
    highlight: true
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹20,999",
    priceNum: 20999,
    description: "Accelerate your market capture with advanced SEO frameworks, blog content systems, analytics, and custom AI tools.",
    includes: "Starter package features plus:",
    listItems: [
      "Up to 10 custom-designed pages",
      "Rich CMS-powered Blog system",
      "Advanced Google Analytics & Metrics",
      "Professional Google Workspace setup",
      "Advanced, localized SEO Campaign",
      "Interactive Smart AI Chatbot widget",
      "5 professional revision rounds",
      "60 days post-launch support"
    ],
    bestFor: "Ideal for expanding brands & content hubs"
  }
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-01",
    category: "General",
    question: "What makes LumenX different from other agencies or DIY builders?",
    answer: "Unlike templates or generic drag-and-drop builders, LumenX websites are fully custom-engineered from the ground up using modern React. We strictly adhere to minimalist design principles—maximizing clean negative space, emphasizing typographic hierarchy, and integrating smooth, purposeful micro-animations. Your site will load instantly, rank natively on Google, and uniquely reflect your brand authority."
  },
  {
    id: "faq-02",
    category: "Process",
    question: "How long does a typical project take from start to finish?",
    answer: "A standard Personal or Starter project is delivered in 1 to 2 weeks. Growth packages featuring headless CMS systems, custom analytics, or smart AI widgets typically take 2 to 3 weeks. We structure every project into clear milestones so you see continuous development updates."
  },
  {
    id: "faq-03",
    category: "Pricing",
    question: "Are there any hidden recurring fees after the website launch?",
    answer: "Absolutely not. We practice complete pricing transparency. Our quotes cover design, frontend engineering, launch deployment, and post-launch support. The only ongoing fees you'll ever pay are standard infrastructure expenses (like third-party domain registration or custom hosting platforms, which typically cost very little and are billed directly under your credentials so you retain 100% ownership)."
  },
  {
    id: "faq-04",
    category: "Technical",
    question: "Will I be able to update my own content like blogs?",
    answer: "Yes, definitely. For the Growth tier (and optional custom modules on Starter), we integrate a modern Headless Content Management System (such as Sanity or custom dashboard blocks). We provide a simplified, intuitive web interface and a training guide so you can publish new blogs, announcements, and images without writing a single line of code."
  },
  {
    id: "faq-05",
    category: "Process",
    question: "What is your revision and feedback policy during development?",
    answer: "We treat design as a highly collaborative partnership. During Phase 02 (High-Fidelity Design), we review high-end layouts before writing any code. All standard plans include 2 to 5 comprehensive revision rounds where we refine spacing, layouts, and typography. No website is ever launched without your absolute approval."
  },
  {
    id: "faq-06",
    category: "Technical",
    question: "How does the Growth AI Chatbot function?",
    answer: "For our Growth tier, we integrate a highly responsive smart chatbot trained on your company's business profiles, FAQ documents, and service catalogs to handle instant lead captures and triage inquiries 24/7."
  }
];
