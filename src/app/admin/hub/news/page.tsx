import { AdminHubList } from "@/components/admin/hub-list"

const fields = [
  { key: "title_en", label: "Title (EN)" },
  { key: "title_uz", label: "Title (UZ)" },
  { key: "title_ru", label: "Title (RU)" },
  { key: "body_en", label: "Body (EN)", type: "textarea" as const, span: 2 as const },
  { key: "body_uz", label: "Body (UZ)", type: "textarea" as const, span: 2 as const },
  { key: "body_ru", label: "Body (RU)", type: "textarea" as const, span: 2 as const },
  { key: "image", label: "Rasm URL", span: 2 as const },
]

export default function Page() {
  return (
    <AdminHubList
      endpoint="/hub/admin/news/"
      title="Yangiliklar"
      description="Hub yangiliklari"
      fields={fields}
      emptyForm={{ title_en: "", title_uz: "", title_ru: "", body_en: "", body_uz: "", body_ru: "", image: "" }}
    />
  )
}
