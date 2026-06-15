import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ta'lim",
  description: "Uychi IT Hubdagi IT kurslar va ta'lim dasturlari — frontend, backend, mobile, AI va boshqa yo'nalishlar.",
  keywords: ["IT kurslar Uychi", "dasturlash kurslari Namangan", "AI ta'lim", "IT ta'lim Uychi"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
