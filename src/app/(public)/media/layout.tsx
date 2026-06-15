import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Media Markaz",
  description: "Uychi Hub media markazi — videolar, foto galereya, press-relizlar va hub faoliyati haqidagi multimedia materiallar.",
  keywords: ["media markaz", "videolar", "foto galereya", "press-reliz", "Uychi Hub media"],
});

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
