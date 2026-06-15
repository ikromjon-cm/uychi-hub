import { AdminHubList } from "@/components/admin/hub-list";

const fields = [
  { key: "title", label: "Nomi" },
  { key: "sector", label: "Sektor" },
  { key: "problem", label: "Muammo", type: "textarea" as const, span: 2 as const },
  { key: "solution", label: "Yechim", type: "textarea" as const, span: 2 as const },
  { key: "technologies", label: "Texnologiyalar", span: 2 as const },
  { key: "users", label: "Foydalanuvchilar" },
  { key: "partners", label: "Hamkorlar" },
];

export default function Page() {
  return (
    <AdminHubList
      endpoint="/hub/admin/startups/"
      title="Startaplar"
      description="Hub startaplari"
      fields={fields}
      emptyForm={{ title: "", sector: "", problem: "", solution: "", technologies: "", users: "", partners: "" }}
    />
  );
}
