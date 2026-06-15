import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kutubxona",
  description: "Uychi Hub raqamli kutubxonasi — AI, dasturlash, biznes va texnologiya bo'yicha kitoblar, qo'llanmalar va resurslar.",
  keywords: ["kutubxona", "raqamli resurslar", "IT kitoblar", "qo'llanmalar", "Uychi Hub library"],
});

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
