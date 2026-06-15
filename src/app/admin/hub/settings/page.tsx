"use client";

import { useEffect, useState } from "react";
import { apiPatch } from "@/lib/api";
import { Loader2, Check } from "lucide-react";

type Settings = {
  telegram_url: string;
  youtube_url: string;
  instagram_url: string;
  facebook_url: string;
  contact_phone: string;
  contact_email: string;
  address: string;
};

const EMPTY: Settings = {
  telegram_url: "", youtube_url: "", instagram_url: "", facebook_url: "",
  contact_phone: "", contact_email: "", address: "",
};

const FIELDS: { key: keyof Settings; label: string; placeholder: string }[] = [
  { key: "telegram_url", label: "Telegram havolasi", placeholder: "https://t.me/uychihub" },
  { key: "youtube_url", label: "YouTube havolasi", placeholder: "https://youtube.com/@uychihub" },
  { key: "instagram_url", label: "Instagram havolasi", placeholder: "https://instagram.com/uychihub" },
  { key: "facebook_url", label: "Facebook havolasi", placeholder: "https://facebook.com/uychihub" },
  { key: "contact_phone", label: "Telefon", placeholder: "+998 79 224 00 00" },
  { key: "contact_email", label: "Email", placeholder: "info@uychi.uz" },
  { key: "address", label: "Manzil", placeholder: "Istiqlol ko'chasi 15, Uychi, Namangan" },
];

export default function Page() {
  const [form, setForm] = useState<Settings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/hub/settings/")
      .then((r) => r.json())
      .then((d) => setForm({ ...EMPTY, ...d }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      await apiPatch("/hub/settings/", form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xatolik");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Sayt sozlamalari</h1>
        <p className="mt-1 text-[13px] text-muted">
          Ijtimoiy tarmoq havolalari va aloqa ma&apos;lumotlari — saytning footerida ko&apos;rinadi.
        </p>
      </div>

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl border border-border bg-card" />
      ) : (
        <form onSubmit={handleSave} className="space-y-4 rounded-2xl border border-border bg-card p-6">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="mb-1.5 block text-[12px] font-semibold text-muted">{f.label}</label>
              <input
                value={form[f.key]}
                onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] text-foreground outline-none focus:border-accent/40"
              />
            </div>
          ))}
          {error && <p className="text-[12px] text-red-400">{error}</p>}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Saqlash
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-emerald-400">
                <Check className="h-4 w-4" /> Saqlandi
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
