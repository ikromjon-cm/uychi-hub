import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ro'yxatdan O'tish",
  description: "Uychi Hubga ro'yxatdan o'ting — IT mutaxassislar, startapchilar va investorlar uchun eksklyuziv platforma.",
  keywords: ["ro'yxatdan o'tish", "register", "yangi hisob", "Uychi Hub a'zolik"],
  noIndex: true,
});

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
