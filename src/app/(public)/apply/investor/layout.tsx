import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Investor Arizasi",
  description: "Uychi Hubga investitsiya kiriting — venchur kapital, angel investitsiya va korporativ hamkorlik uchun ariza yuboring.",
  keywords: ["investor ariza", "investitsiya", "venchur kapital", "angel investor", "Uychi Hub investitsiya"],
});

export default function InvestorApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
