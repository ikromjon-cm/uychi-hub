import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Maxfiylik Siyosati",
  description: "Uychi Hub maxfiylik siyosati — shaxsiy ma'lumotlaringiz qanday yig'iladi, saqlanadi va ishlatilishi haqida to'liq ma'lumot.",
  keywords: ["maxfiylik siyosati", "privacy policy", "shaxsiy ma'lumotlar", "GDPR"],
  noIndex: true,
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
