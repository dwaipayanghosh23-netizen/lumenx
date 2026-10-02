/**
 * Shared Type Definitions for LumenX Agency Website
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Dynamic icon name referencing lucide-react
  deliverables: string[];
  techStack?: string[];
  averageTimeline: string;
  category: "Design" | "Development" | "Marketing" | "Automation";
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  clientResult: string;
  clientResultLabel: string;
  gradientFrom: string;
  gradientTo: string;
  tags: string[];
  challenge: string;
  solution: string;
  deliverables: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  description: string;
  includes: string;
  listItems: string[];
  highlight?: boolean;
  bestFor: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Process" | "Pricing" | "Technical";
}
