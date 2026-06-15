import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Yangiliklar",
  description: "Uychi IT ekotizimidan so'nggi yangiliklar — hamkorliklar, yutuqlar va texnologiya yangiliklari.",
  keywords: ["Uychi yangiliklar", "IT yangiliklar Namangan", "texnologiya yangiliklari"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
