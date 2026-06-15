import { AdminHubList } from "@/components/admin/hub-list";

const fields = [
  { key: "title", label: "Nomi" },
  { key: "value", label: "Qiymati" },
];

export default function Page() {
  return (
    <AdminHubList
      endpoint="/hub/admin/stats/"
      title="Statistika"
      description="Hub statistikasi"
      fields={fields}
      emptyForm={{ title: "", value: "" }}
    />
  );
}
