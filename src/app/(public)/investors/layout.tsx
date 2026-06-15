import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Investorlar",
  description: "Uychi Hub investorlari — venchur fondlar, angel investorlar va korporativ hamkorlar Uychi tumanidagi IT ekotizimini qo'llab-quvvatlamoqda.",
  keywords: ["investorlar", "venchur kapital", "angel investor", "investment", "Uychi Hub investorlar"],
});

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
