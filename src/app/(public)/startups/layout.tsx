import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Startaplar",
  description: "Uychi tumanining innovatsion startaplari — mahalliy muammolarga global yechimlar topayotgan rezident startaplar bilan tanishing.",
  keywords: ["Uychi startaplar", "Namangan IT startap", "inkubator", "startap hub"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
