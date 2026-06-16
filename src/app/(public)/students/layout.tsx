import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Talabalar — Uychi AI & IT Hub",
  description: "Uychi IT Hub talabalari va bitiruvchilari. IT yo'nalishidagi iqtidorli yoshlar portfolio va loyihalari.",
  keywords: ["talabalar", "IT ta'lim", "Uychi", "Namangan", "studentlar"],
});

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
