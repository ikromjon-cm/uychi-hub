import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Hamkorlar",
  description: "Uychi IT Hubning xalqaro va mahalliy hamkorlari — Google, AWS, Microsoft, IT Park Uzbekistan va boshqalar.",
  keywords: ["Uychi hamkorlar", "IT Park hamkorlar", "xalqaro hamkorlik", "Google for Startups"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
