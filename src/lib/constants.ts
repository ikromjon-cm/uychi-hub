import type { NavLink, SiteConfig } from "@/types";

export const SITE: SiteConfig = {
  name: "Uychi AI & IT Hub",
  url: "https://uychi.uz",
  description:
    "Uychi tumanidagi IT va sun'iy intellekt markazi — startaplar, IT kompaniyalar va yoshlar uchun texnologiya ekotizimi.",
  keywords: [
    "Uychi tumani",
    "Namangan IT",
    "Uychi IT Hub",
    "Startap Namangan",
    "AI Uzbekistan",
    "IT Park Namangan",
    "Sun'iy intellekt",
    "Uychi startaplar",
    "Namangan texnologiya",
    "IT ta'lim Uychi",
  ],
  ogImage: "/og.svg",
};

export const SOCIAL = {
  whatsapp: "https://wa.me/998901234567",
  telegram: "https://t.me/uychi_hub",
  linkedin: "https://linkedin.com/company/uychi-hub",
  twitter: "https://twitter.com/uychi_hub",
};

export const AI_FEATURES: NavLink[] = [
  { label: "AI Chat Assistant", href: "/ai-features#chat", description: "Intelligent 24/7 multilingual support" },
  { label: "AI Business Consultant", href: "/ai-features#business", description: "Strategic insights powered by AI" },
  { label: "AI Investment Assistant", href: "/ai-features#investment", description: "Smart investment analysis" },
  { label: "AI Startup Advisor", href: "/ai-features#startup", description: "AI-driven founder mentorship" },
  { label: "AI Translation", href: "/ai-features#translation", description: "40+ languages, context-aware" },
  { label: "AI Document Generator", href: "/ai-features#documents", description: "Legal & business doc automation" },
  { label: "AI Voice Assistant", href: "/ai-features#voice", description: "Hands-free navigation & queries" },
  { label: "AI Knowledge Base", href: "/ai-features#knowledge", description: "Curated intelligence database" },
];

export const MODULES: NavLink[] = [
  { label: "Online Meeting Booking", href: "/schedule", description: "Schedule meetings instantly" },
  { label: "Virtual Office Tour", href: "/tour", description: "Explore facilities in 3D" },
  { label: "Investor Application", href: "/apply/investor", description: "Submit investment interest" },
  { label: "Startup Application", href: "/apply/startup", description: "Join our incubator" },
  { label: "AI Company Registration", href: "/register", description: "Register with AI assistance" },
  { label: "Newsletter", href: "/newsletter", description: "Latest news & updates" },
  { label: "Media Kit Download", href: "/media", description: "Brand assets & press kit" },
  { label: "Analytics Dashboard", href: "/analytics", description: "Real-time ecosystem data" },
  { label: "Live Statistics", href: "/stats", description: "Live counters & metrics" },
  { label: "Document Center", href: "/documents", description: "Legal & compliance docs" },
  { label: "Resource Library", href: "/resources", description: "Research, guides & templates" },
  { label: "Public API", href: "/api-docs", description: "Integrate Uychi data" },
];

export const ADMIN_NAV: NavLink[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Content Management", href: "/admin/content" },
  { label: "News Management", href: "/admin/news" },
  { label: "Startup Management", href: "/admin/startups" },
  { label: "Investor Management", href: "/admin/investors" },
  { label: "Partner Management", href: "/admin/partners" },
  { label: "Career Management", href: "/admin/careers" },
  { label: "Media Library", href: "/admin/media" },
  { label: "SEO Management", href: "/admin/seo" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "User Roles", href: "/admin/roles" },
  { label: "Permissions", href: "/admin/permissions" },
  { label: "System Logs", href: "/admin/logs" },
  { label: "Backup Center", href: "/admin/backup" },
];

export const STATS = [
  { value: "237,600+", label: "Tuman Aholisi" },
  { value: "309", label: "Maydoni km²" },
  { value: "47", label: "Maktablar" },
  { value: "900+", label: "Kichik Korxona" },
  { value: "5", label: "Sanoat Zonalari" },
];
