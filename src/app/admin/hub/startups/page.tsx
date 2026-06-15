import { AdminHubList } from "@/components/admin/hub-list"

const fields = [
  { key: "title", label: "Nomi" },
  { key: "sector", label: "Sektor" },
  { key: "problem_en", label: "Problem (EN)", type: "textarea" as const, span: 2 as const },
  { key: "problem_uz", label: "Problem (UZ)", type: "textarea" as const, span: 2 as const },
  { key: "problem_ru", label: "Problem (RU)", type: "textarea" as const, span: 2 as const },
  { key: "solution_en", label: "Solution (EN)", type: "textarea" as const, span: 2 as const },
  { key: "solution_uz", label: "Solution (UZ)", type: "textarea" as const, span: 2 as const },
  { key: "solution_ru", label: "Solution (RU)", type: "textarea" as const, span: 2 as const },
  { key: "image", label: "Rasm URL", span: 2 as const },
  { key: "tech_stack", label: "Texnologiyalar", span: 2 as const },
]

export default function Page() {
  return (
    <AdminHubList
      endpoint="/hub/admin/startups/"
      title="Startaplar"
      fields={fields}
      description="Hub startaplari"
      emptyForm={{ title: "", sector: "", problem_en: "", problem_uz: "", problem_ru: "", solution_en: "", solution_uz: "", solution_ru: "", image: "", tech_stack: "" }}
    />
  )
}
