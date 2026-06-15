import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Startap Arizasi",
  description: "Uychi Hub inkubatsiya dasturiga ariza bering — moliyalashtirish, mentorlik, ofis maydoni va global tarmoqqa kirish imkoniyatiga ega bo'ling.",
  keywords: ["startap ariza", "inkubatsiya", "startup apply", "moliyalashtirish", "Uychi Hub inkubator"],
});

export default function StartupApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
