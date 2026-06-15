import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Xizmatlar",
  description: "Uychi Hub AI xizmatlari — AI Chat Yordamchi, Startap Maslahatchisi, Investitsiya Tahlili, Hujjat Generatori, Tarjima va Bilim Bazasi.",
  keywords: ["AI xizmatlar", "AI yordamchi", "sun'iy intellekt", "AI investitsiya", "AI tarjima", "Uychi AI"],
});

export default function AiFeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
