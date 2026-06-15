import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Uchrashuv Belgilash",
  description: "Uychi Hub jamoasi bilan onlayn uchrashuv rejalashtiring — investitsiya, hamkorlik, startap inkubatsiyasi va AI yechimlar bo'yicha muloqot.",
  keywords: ["uchrashuv belgilash", "meeting schedule", "konsultatsiya", "Zoom", "Uychi Hub uchrashuv"],
});

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
