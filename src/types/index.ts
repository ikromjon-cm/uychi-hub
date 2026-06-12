export type AccentColor = "accent" | "violet" | "emerald";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface MeetingFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  date: string;
  time: string;
  platform: "zoom" | "teams" | "meet" | "whatsapp" | "telegram";
  topic: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  message: string;
}

export interface InvestorFormData {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  investmentType: string;
  focusSectors: string;
  ticketSize: string;
  timeline: string;
  message: string;
}

export interface StartupFormData {
  founderName: string;
  email: string;
  phone: string;
  startupName: string;
  sector: string;
  stage: string;
  country: string;
  fundingNeeded: string;
  teamSize: string;
  description: string;
  techStack: string;
  website: string;
}

export interface AdminStat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  keywords: string[];
  ogImage: string;
}
