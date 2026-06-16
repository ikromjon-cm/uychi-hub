import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Coworking — Uychi AI & IT Hub",
  description: "Zamonaviy coworking maydon. Open desk, meeting room, AI lab va konferens zali. Soatlik va kunlik bron.",
  keywords: ["coworking", "kovorking", "Namangan", "IT coworking", "Uychi"],
});

export default function CoworkingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
