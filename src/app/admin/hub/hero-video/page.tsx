import { AdminHubList } from "@/components/admin/hub-list"

const fields = [
  { key: "video_url", label: "Video URL", span: 2 as const },
  { key: "video_file", label: "Video fayl", span: 2 as const },
  { key: "is_active", label: "Faol", type: "select" as const, options: [{ label: "Ha", value: "true" }, { label: "Yo'q", value: "false" }] },
]

export default function Page() {
  return (
    <AdminHubList
      endpoint="/hub/admin/hero-video/"
      title="Hero Video"
      description="Bosh sahifa video"
      fields={fields}
      emptyForm={{ video_url: "", video_file: "", is_active: "true" }}
    />
  )
}
