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
  { label: "Uchrashuv Belgilash",   href: "/schedule",       description: "Jamoamiz bilan uchrashuv belgilang" },
  { label: "Investor Arizasi",      href: "/apply/investor", description: "Investitsiya manfaatingizni yuboring" },
  { label: "Startap Arizasi",       href: "/apply/startup",  description: "Inkubatorga qo'shiling" },
  { label: "Galereya",              href: "/media",          description: "Rasm va videolar" },
  { label: "Kutubxona",             href: "/library",        description: "Tadqiqotlar, qo'llanmalar va shablonlar" },
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
  { value: "241,300+", label: "Tuman Aholisi" },
  { value: "300", label: "Maydoni km²" },
  { value: "53", label: "Mahallalar" },
  { value: "56.4", label: "Chegara km" },
  { value: "1935", label: "Tashkil topgan" },
];
