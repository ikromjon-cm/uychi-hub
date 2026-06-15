import { AdminHubList } from "@/components/admin/hub-list";

const fields = [
  { key: "name", label: "Nomi" },
  { key: "category", label: "Kategoriya" },
  { key: "logo_url", label: "Logotip URL", span: 2 as const },
];

export default function Page() {
  return (
    <AdminHubList
      endpoint="/hub/admin/partners/"
      title="Hamkorlar"
      description="Hub hamkorlari"
      fields={fields}
      emptyForm={{ name: "", category: "", logo_url: "" }}
    />
  );
}
