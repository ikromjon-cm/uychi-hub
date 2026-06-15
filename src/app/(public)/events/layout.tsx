import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tadbirlar",
  description: "Uychi IT Hubdagi tadbirlar — hackathonlar, meetuplar, bootcamplar va konferentsiyalar.",
  keywords: ["IT tadbirlar Uychi", "hackathon Namangan", "IT konferentsiya", "bootcamp Uychi"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
