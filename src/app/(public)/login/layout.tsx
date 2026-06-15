import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kirish",
  description: "Uychi Hub hisobingizga kiring — startaplar, kurslar va hub xizmatlariga to'liq kirish imkoniyatiga ega bo'ling.",
  keywords: ["kirish", "login", "hisob", "Uychi Hub"],
  noIndex: true,
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
