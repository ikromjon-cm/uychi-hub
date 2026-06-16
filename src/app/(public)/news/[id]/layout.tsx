import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Yangilik",
  description: "Uychi Hub yangiliklari — IT Park, startaplar, AI texnologiyalari va Uychi tumanidagi innovatsiyalar haqida so'nggi xabarlar.",
  keywords: ["yangilik", "IT Park xabarlari", "startap yangiliklari", "AI texnologiya", "Uychi Hub news"],
});

export default function NewsDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
