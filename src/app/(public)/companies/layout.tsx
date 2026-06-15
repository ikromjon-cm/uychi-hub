import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "IT Kompaniyalar",
  description: "Uychi IT Hubdagi texnologiya kompaniyalari — mahalliy va xalqaro IT firmalar, dasturiy ta'minot ishlab chiqaruvchilar va tech startaplar.",
  keywords: ["IT kompaniyalar", "tech firmalar", "dasturiy ta'minot", "Uychi IT", "Namangan tech"],
});

export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
