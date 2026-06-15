import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Startap",
  description: "Uychi Hub startap tafsilotlari — asoschilar, texnologiya steki, moliyalashtirish va startap haqida to'liq ma'lumot.",
  keywords: ["startap", "startup detail", "asoschi", "texnologiya", "inkubatsiya"],
});

export default function StartupDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
