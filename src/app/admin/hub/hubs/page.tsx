import { AdminHubList } from "@/components/admin/hub-list";

const fields = [
  { key: "title", label: "Nomi" },
  { key: "description", label: "Tavsif", type: "textarea" as const, span: 2 as const },
  { key: "icon", label: "Ikonka" },
];

export default function Page() {
  return (
    <AdminHubList
      endpoint="/hub/admin/hubs/"
      title="Hub yo'nalishlari"
      description="IT Park yo'nalishlari"
      fields={fields}
      emptyForm={{ title: "", description: "", icon: "" }}
    />
  );
}
