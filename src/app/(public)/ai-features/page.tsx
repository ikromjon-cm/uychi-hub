import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "AI Features",
  description: "Explore Uychi Hub's suite of AI-powered tools: Chat Assistant, Business Consultant, Investment Assistant, Translation, and more.",
  keywords: ["AI Tools Uzbekistan", "AI Business Tools", "AI Investment", "AI Translation Central Asia"],
});

const FEATURES = [
  {
    id: "chat",
    title: "AI Chat Assistant",
    desc: "Our multilingual AI assistant provides instant, accurate answers about investment opportunities, ecosystem services, and regulatory requirements — available 24/7 in English, Russian, Uzbek, Chinese, Arabic, and more.",
    capabilities: ["Real-time multilingual support", "Investment query resolution", "Document Q&A", "Regulatory guidance"],
    accent: "accent" as const,
    icon: "💬",
  },
  {
    id: "business",
    title: "AI Business Consultant",
    desc: "Leverage machine learning-powered strategic insights to evaluate market entry strategies, competitive positioning, and business model optimization specific to the Central Asian tech landscape.",
    capabilities: ["Market analysis reports", "Competitor intelligence", "Business model scoring", "Strategic roadmaps"],
    accent: "violet" as const,
    icon: "📊",
  },
  {
    id: "investment",
    title: "AI Investment Assistant",
    desc: "Intelligent due diligence tool that analyzes startups, generates risk assessments, benchmarks against global comps, and produces structured investment memos in minutes.",
    capabilities: ["Automated due diligence", "Risk scoring models", "Global benchmarking", "Investment memo generation"],
    accent: "emerald" as const,
    icon: "📈",
  },
  {
    id: "startup",
    title: "AI Startup Advisor",
    desc: "A virtual mentor trained on thousands of successful startup trajectories. Provides personalized guidance on product-market fit, fundraising, team building, and scaling strategy.",
    capabilities: ["PMF assessment", "Fundraising playbooks", "Team structure advice", "Scaling frameworks"],
    accent: "accent" as const,
    icon: "🚀",
  },
  {
    id: "translation",
    title: "AI Translation",
    desc: "Context-aware translation engine supporting 40+ languages with domain-specific accuracy for legal, financial, and technical documents. Preserves nuance and professional tone across all translations.",
    capabilities: ["40+ languages", "Legal document translation", "Financial terminology", "Real-time interpretation"],
    accent: "violet" as const,
    icon: "🌐",
  },
  {
    id: "documents",
    title: "AI Document Generator",
    desc: "Automated generation of NDAs, MoUs, investment term sheets, company registration forms, partnership agreements, and pitch decks — compliant with Uzbek and international law.",
    capabilities: ["NDA & MoU generation", "Term sheet automation", "Pitch deck builder", "Compliance checking"],
    accent: "emerald" as const,
    icon: "📄",
  },
  {
    id: "voice",
    title: "AI Voice Assistant",
    desc: "Hands-free access to the Uychi Hub platform via natural language voice commands. Navigate services, book meetings, query databases, and get information without typing.",
    capabilities: ["Voice navigation", "Meeting booking by voice", "Data queries", "Multi-language voice support"],
    accent: "accent" as const,
    icon: "🎙️",
  },
  {
    id: "knowledge",
    title: "AI Knowledge Base",
    desc: "A continuously updated intelligence repository aggregating regulatory frameworks, market reports, investment case studies, and technology trends relevant to the Central Asian digital economy.",
    capabilities: ["Regulatory database", "Market intelligence", "Investment case studies", "Technology trend reports"],
    accent: "violet" as const,
    icon: "🧠",
  },
];

const accentMap = {
  accent: { border: "border-cyan-500/20 hover:border-cyan-500/40", badge: "bg-cyan-500/10 text-cyan-400", dot: "bg-cyan-400", glow: "hover:shadow-[0_0_40px_-10px_rgba(6,247,227,0.2)]" },
  violet: { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400", dot: "bg-violet-400", glow: "hover:shadow-[0_0_40px_-10px_rgba(167,139,250,0.2)]" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400", dot: "bg-emerald-400", glow: "hover:shadow-[0_0_40px_-10px_rgba(52,211,153,0.2)]" },
};

export default function AIFeaturesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-6 pb-20 pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,247,227,0.07)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/15 bg-cyan-500/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            8 AI-Powered Tools
          </div>
          <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.08] tracking-tight text-white">
            The AI Engine Behind<br />
            <span className="gradient-text">Uychi Hub</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-zinc-500">
            A suite of enterprise-grade AI tools built to accelerate business decisions,
            streamline operations, and unlock new opportunities across the Central Asian market.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/schedule" className="rounded-full bg-cyan-400 px-7 py-3 text-[13px] font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_25px_-5px_rgba(6,247,227,0.5)]">
              Schedule a Demo
            </Link>
            <Link href="/#contact" className="rounded-full border border-white/10 px-7 py-3 text-[13px] font-semibold text-zinc-400 transition-all hover:border-white/20 hover:text-white">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
            {FEATURES.map((f) => {
              const c = accentMap[f.accent];
              return (
                <div key={f.id} id={f.id} className={`group rounded-2xl border bg-[#0a0a0a] p-7 transition-all duration-300 hover:-translate-y-0.5 ${c.border} ${c.glow}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-3xl">{f.icon}</div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-white">{f.title}</h2>
                      <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{f.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {f.capabilities.map((cap) => (
                          <span key={cap} className={`rounded-full border border-white/6 px-3 py-1 text-[11px] font-medium ${c.badge}`}>
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/4 bg-[#070707] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Ready to Experience the AI Advantage?</h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-500">Book a live demo with our team and see how AI tools can accelerate your business in Uzbekistan.</p>
          <Link href="/schedule" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-8 py-3.5 text-[14px] font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_30px_-5px_rgba(6,247,227,0.5)]">
            Book a Free Demo →
          </Link>
        </div>
      </section>
    </div>
  );
}
