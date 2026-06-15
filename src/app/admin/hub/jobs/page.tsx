import { AdminHubList } from "@/components/admin/hub-list"

const fields = [
  { key: "title_en", label: "Title (EN)" },
  { key: "title_uz", label: "Title (UZ)" },
  { key: "title_ru", label: "Title (RU)" },
  { key: "department", label: "Bo'lim" },
  { key: "image", label: "Rasm URL", span: 2 as const },
  { key: "type", label: "Turi", type: "select" as const, options: [
    { label: "Full-time", value: "fulltime" },
    { label: "Part-time", value: "parttime" },
    { label: "Remote", value: "remote" },
    { label: "Contract", value: "contract" },
  ]},
  { key: "salary", label: "Maosh" },
]

export default function Page() {
  return (
    <AdminHubList
      endpoint="/hub/admin/jobs/"
      title="Ish O'rinlari"
      fields={fields}
      description="Hub vakansiyalari"
      emptyForm={{ title_en: "", title_uz: "", title_ru: "", department: "", image: "", type: "fulltime", salary: "" }}
    />
  )
}
