import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Markaz",
  description: "Uychi AI Markazi — sun'iy intellekt yechimlari, kompyuter ko'rish, NLP va kelajak texnologiyalari uchun innovatsion laboratoriya.",
  keywords: ["AI markaz", "sun'iy intellekt", "machine learning", "kompyuter ko'rish", "NLP", "Uychi AI"],
});

export default function AiCenterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
