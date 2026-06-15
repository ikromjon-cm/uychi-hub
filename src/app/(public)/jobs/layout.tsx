import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ish O'rinlari",
  description: "Uychi IT Hub va rezident kompaniyalarda bo'sh ish o'rinlari — developer, dizayner, marketing va boshqa lavozimlar.",
  keywords: ["IT ish Uychi", "dasturchi ish Namangan", "IT vakansiyalar", "stajyorlik Uychi"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
